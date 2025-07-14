-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', '')
    );
    
    -- Create initial rewards record for volunteers
    INSERT INTO public.rewards (volunteer_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate and update volunteer hours
CREATE OR REPLACE FUNCTION public.calculate_volunteer_hours()
RETURNS trigger AS $$
DECLARE
    total_hours DECIMAL(6,2);
    new_points INTEGER;
BEGIN
    -- Calculate total verified hours for the volunteer
    SELECT COALESCE(SUM(hours), 0)
    INTO total_hours
    FROM volunteer_hours
    WHERE volunteer_id = NEW.volunteer_id
    AND verified = true;
    
    -- Calculate points (1 hour = 1 point)
    new_points := FLOOR(total_hours);
    
    -- Update rewards record
    UPDATE rewards
    SET 
        total_hours = total_hours,
        points_earned = new_points,
        milestone_5_hours = (total_hours >= 5),
        milestone_10_hours = (total_hours >= 10),
        milestone_25_hours = (total_hours >= 25),
        milestone_50_hours = (total_hours >= 50),
        milestone_100_hours = (total_hours >= 100)
    WHERE volunteer_id = NEW.volunteer_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rewards when hours are verified
CREATE OR REPLACE TRIGGER on_hours_verified
    AFTER INSERT OR UPDATE OF verified ON volunteer_hours
    FOR EACH ROW
    WHEN (NEW.verified = true)
    EXECUTE FUNCTION public.calculate_volunteer_hours();

-- Function to check event registration capacity
CREATE OR REPLACE FUNCTION public.check_event_capacity()
RETURNS trigger AS $$
DECLARE
    current_registrations INTEGER;
    max_capacity INTEGER;
BEGIN
    -- Get current registration count
    SELECT COUNT(*)
    INTO current_registrations
    FROM event_registrations
    WHERE event_id = NEW.event_id
    AND cancelled_at IS NULL;
    
    -- Get max capacity
    SELECT max_volunteers
    INTO max_capacity
    FROM events
    WHERE id = NEW.event_id;
    
    -- Check if event is full
    IF current_registrations >= max_capacity THEN
        RAISE EXCEPTION 'Event is at full capacity';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to check capacity before registration
CREATE OR REPLACE TRIGGER before_event_registration
    BEFORE INSERT ON event_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.check_event_capacity();

-- Function to automatically check out volunteers after event ends
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
                hours_completed = EXTRACT(EPOCH FROM (event_record.date + event_record.end_time - checked_in_at)) / 3600
            WHERE id = registration_record.id;
            
            -- Create volunteer hours record
            INSERT INTO volunteer_hours (volunteer_id, event_id, registration_id, hours)
            VALUES (
                registration_record.volunteer_id,
                event_record.id,
                registration_record.id,
                EXTRACT(EPOCH FROM (event_record.date + event_record.end_time - registration_record.checked_in_at)) / 3600
            );
        END LOOP;
        
        -- Mark event as completed
        UPDATE events
        SET status = 'completed'
        WHERE id = event_record.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to run auto-checkout (requires pg_cron extension)
-- This would be set up in Supabase dashboard or via SQL if pg_cron is enabled
-- SELECT cron.schedule('auto-checkout-volunteers', '0 * * * *', 'SELECT public.auto_checkout_volunteers();');