-- Create businesses table
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT, -- restaurant, retail, service, etc.
    website TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    address TEXT NOT NULL,
    logo_url TEXT,
    created_by UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Create business_members table (who can manage the business)
CREATE TABLE business_members (
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member', -- member, admin
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (business_id, user_id)
);

-- Create business_incentives table
CREATE TABLE business_incentives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    discount_type TEXT NOT NULL, -- percentage, fixed_amount, bogo, free_item
    discount_value TEXT, -- "20" for 20%, "$5" for fixed, etc.
    minimum_hours_required INTEGER DEFAULT 0, -- minimum volunteer hours to qualify
    valid_from DATE,
    valid_until DATE,
    terms_conditions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    max_redemptions INTEGER, -- null means unlimited
    redemptions_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (valid_until IS NULL OR valid_until >= valid_from),
    CONSTRAINT valid_redemptions CHECK (max_redemptions IS NULL OR redemptions_count <= max_redemptions)
);

-- Create incentive_redemptions table to track usage
CREATE TABLE incentive_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incentive_id UUID NOT NULL REFERENCES business_incentives(id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    points_spent INTEGER DEFAULT 0,
    notes TEXT,
    UNIQUE(incentive_id, volunteer_id, redeemed_at) -- Prevent duplicate redemptions
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_active ON businesses(is_active);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_business_incentives_business ON business_incentives(business_id);
CREATE INDEX idx_business_incentives_active ON business_incentives(is_active);
CREATE INDEX idx_business_incentives_hours ON business_incentives(minimum_hours_required);
CREATE INDEX idx_incentive_redemptions_volunteer ON incentive_redemptions(volunteer_id);
CREATE INDEX idx_incentive_redemptions_incentive ON incentive_redemptions(incentive_id);

-- Apply updated_at triggers
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_incentives_updated_at BEFORE UPDATE ON business_incentives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment redemption count
CREATE OR REPLACE FUNCTION increment_redemption_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE business_incentives
    SET redemptions_count = redemptions_count + 1
    WHERE id = NEW.incentive_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update redemption count
CREATE TRIGGER after_incentive_redemption
    AFTER INSERT ON incentive_redemptions
    FOR EACH ROW
    EXECUTE FUNCTION increment_redemption_count();

-- Function to check if user can redeem incentive
CREATE OR REPLACE FUNCTION check_incentive_eligibility()
RETURNS TRIGGER AS $$
DECLARE
    user_hours DECIMAL(6,2);
    min_hours INTEGER;
    is_active BOOLEAN;
    max_redemptions INTEGER;
    current_redemptions INTEGER;
BEGIN
    -- Get user's total verified hours
    SELECT COALESCE(total_hours, 0)
    INTO user_hours
    FROM rewards
    WHERE volunteer_id = NEW.volunteer_id;
    
    -- Get incentive requirements
    SELECT minimum_hours_required, business_incentives.is_active, 
           business_incentives.max_redemptions, business_incentives.redemptions_count
    INTO min_hours, is_active, max_redemptions, current_redemptions
    FROM business_incentives
    WHERE id = NEW.incentive_id;
    
    -- Check if incentive is active
    IF NOT is_active THEN
        RAISE EXCEPTION 'This incentive is no longer active';
    END IF;
    
    -- Check hours requirement
    IF user_hours < min_hours THEN
        RAISE EXCEPTION 'Insufficient volunteer hours. Required: %, Current: %', min_hours, user_hours;
    END IF;
    
    -- Check redemption limit
    IF max_redemptions IS NOT NULL AND current_redemptions >= max_redemptions THEN
        RAISE EXCEPTION 'This incentive has reached its redemption limit';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to check eligibility before redemption
CREATE TRIGGER before_incentive_redemption
    BEFORE INSERT ON incentive_redemptions
    FOR EACH ROW
    EXECUTE FUNCTION check_incentive_eligibility();