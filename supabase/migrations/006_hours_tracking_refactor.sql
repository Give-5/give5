-- Add cached hours fields to profiles table
ALTER TABLE profiles 
ADD COLUMN total_verified_hours DECIMAL(6,2) DEFAULT 0,
ADD COLUMN current_month_hours DECIMAL(4,2) DEFAULT 0,
ADD COLUMN current_year_hours DECIMAL(5,2) DEFAULT 0,
ADD COLUMN last_hours_update TIMESTAMPTZ DEFAULT NOW();

-- Create index for performance
CREATE INDEX idx_profiles_total_hours ON profiles(total_verified_hours);

-- Drop the volunteer_hours table and related objects
DROP TRIGGER IF EXISTS on_hours_verified ON volunteer_hours;
DROP FUNCTION IF EXISTS calculate_volunteer_hours();
DROP TABLE IF EXISTS volunteer_hours;

-- Update the rewards table structure
ALTER TABLE rewards
DROP COLUMN IF EXISTS total_hours,
ADD COLUMN last_calculated_at TIMESTAMPTZ DEFAULT NOW();

-- Function to calculate hours from check-in/check-out
CREATE OR REPLACE FUNCTION calculate_event_hours(
    checked_in TIMESTAMPTZ,
    checked_out TIMESTAMPTZ
) RETURNS DECIMAL(4,2) AS $$
BEGIN
    IF checked_in IS NULL OR checked_out IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Calculate hours and round to 2 decimal places
    RETURN ROUND(EXTRACT(EPOCH FROM (checked_out - checked_in)) / 3600, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update user's cached hours
CREATE OR REPLACE FUNCTION update_user_hours()
RETURNS TRIGGER AS $$
DECLARE
    total_hours DECIMAL(6,2);
    month_hours DECIMAL(4,2);
    year_hours DECIMAL(5,2);
    user_points INTEGER;
BEGIN
    -- Only process if attendance is confirmed
    IF NEW.attended = true AND NEW.checked_in_at IS NOT NULL AND NEW.checked_out_at IS NOT NULL THEN
        
        -- Calculate total verified hours
        SELECT COALESCE(SUM(
            calculate_event_hours(er.checked_in_at, er.checked_out_at)
        ), 0)
        INTO total_hours
        FROM event_registrations er
        WHERE er.volunteer_id = NEW.volunteer_id
        AND er.attended = true
        AND er.checked_in_at IS NOT NULL
        AND er.checked_out_at IS NOT NULL;
        
        -- Calculate current month hours
        SELECT COALESCE(SUM(
            calculate_event_hours(er.checked_in_at, er.checked_out_at)
        ), 0)
        INTO month_hours
        FROM event_registrations er
        JOIN events e ON e.id = er.event_id
        WHERE er.volunteer_id = NEW.volunteer_id
        AND er.attended = true
        AND er.checked_in_at IS NOT NULL
        AND er.checked_out_at IS NOT NULL
        AND DATE_TRUNC('month', e.date) = DATE_TRUNC('month', CURRENT_DATE);
        
        -- Calculate current year hours
        SELECT COALESCE(SUM(
            calculate_event_hours(er.checked_in_at, er.checked_out_at)
        ), 0)
        INTO year_hours
        FROM event_registrations er
        JOIN events e ON e.id = er.event_id
        WHERE er.volunteer_id = NEW.volunteer_id
        AND er.attended = true
        AND er.checked_in_at IS NOT NULL
        AND er.checked_out_at IS NOT NULL
        AND DATE_TRUNC('year', e.date) = DATE_TRUNC('year', CURRENT_DATE);
        
        -- Update profile with cached hours
        UPDATE profiles
        SET 
            total_verified_hours = total_hours,
            current_month_hours = month_hours,
            current_year_hours = year_hours,
            last_hours_update = NOW()
        WHERE id = NEW.volunteer_id;
        
        -- Calculate points (1 hour = 1 point)
        user_points := FLOOR(total_hours);
        
        -- Update rewards
        UPDATE rewards
        SET 
            points_earned = user_points,
            milestone_5_hours = (total_hours >= 5),
            milestone_10_hours = (total_hours >= 10),
            milestone_25_hours = (total_hours >= 25),
            milestone_50_hours = (total_hours >= 50),
            milestone_100_hours = (total_hours >= 100),
            last_calculated_at = NOW()
        WHERE volunteer_id = NEW.volunteer_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating hours when registration is updated
CREATE TRIGGER update_hours_on_registration_change
    AFTER INSERT OR UPDATE OF attended, checked_in_at, checked_out_at ON event_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_user_hours();

-- Function to recalculate all user hours (for maintenance)
CREATE OR REPLACE FUNCTION recalculate_all_user_hours()
RETURNS void AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Loop through all users with registrations
    FOR user_record IN
        SELECT DISTINCT volunteer_id
        FROM event_registrations
        WHERE attended = true
    LOOP
        -- Trigger recalculation by updating a dummy field
        UPDATE event_registrations
        SET notes = COALESCE(notes, '')
        WHERE id = (
            SELECT id 
            FROM event_registrations 
            WHERE volunteer_id = user_record.volunteer_id 
            AND attended = true 
            LIMIT 1
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the auto-checkout function to remove volunteer_hours references
CREATE OR REPLACE FUNCTION public.auto_checkout_volunteers()
RETURNS void AS $$
DECLARE
    event_record RECORD;
    registration_record RECORD;
BEGIN
    -- Find all events that ended but have volunteers not checked out
    FOR event_record IN
        SELECT id, date, end_time
        FROM events
        WHERE status = 'active'
        AND date + end_time < NOW()
    LOOP
        -- Find all registrations that need checkout
        FOR registration_record IN
            SELECT id, volunteer_id, checked_in_at
            FROM event_registrations
            WHERE event_id = event_record.id
            AND checked_in_at IS NOT NULL
            AND checked_out_at IS NULL
            AND cancelled_at IS NULL
        LOOP
            -- Auto checkout with event end time
            UPDATE event_registrations
            SET 
                checked_out_at = event_record.date + event_record.end_time,
                attended = true,
                hours_completed = calculate_event_hours(
                    checked_in_at, 
                    event_record.date + event_record.end_time
                )
            WHERE id = registration_record.id;
        END LOOP;
        
        -- Mark event as completed
        UPDATE events
        SET status = 'completed'
        WHERE id = event_record.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a helpful view for hour statistics
CREATE OR REPLACE VIEW volunteer_hour_stats AS
SELECT 
    p.id as volunteer_id,
    p.full_name,
    p.email,
    p.total_verified_hours,
    p.current_month_hours,
    p.current_year_hours,
    r.points_earned,
    r.points_redeemed,
    r.current_points,
    r.milestone_5_hours,
    r.milestone_10_hours,
    r.milestone_25_hours,
    r.milestone_50_hours,
    r.milestone_100_hours,
    COUNT(DISTINCT er.event_id) as total_events_attended,
    p.last_hours_update
FROM profiles p
JOIN rewards r ON r.volunteer_id = p.id
LEFT JOIN event_registrations er ON er.volunteer_id = p.id AND er.attended = true
GROUP BY p.id, p.full_name, p.email, p.total_verified_hours, p.current_month_hours, 
         p.current_year_hours, r.points_earned, r.points_redeemed, r.current_points,
         r.milestone_5_hours, r.milestone_10_hours, r.milestone_25_hours, 
         r.milestone_50_hours, r.milestone_100_hours, p.last_hours_update;

-- Grant access to the view
GRANT SELECT ON volunteer_hour_stats TO authenticated;