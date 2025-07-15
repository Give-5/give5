-- Enable Row Level Security on business tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_incentives ENABLE ROW LEVEL SECURITY;
ALTER TABLE incentive_redemptions ENABLE ROW LEVEL SECURITY;

-- Businesses policies
-- Anyone can view active businesses
CREATE POLICY "Active businesses are viewable by everyone"
    ON businesses FOR SELECT
    USING (is_active = true OR
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = businesses.id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Give5 admins can create businesses
CREATE POLICY "Give5 admins can create businesses"
    ON businesses FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business admins and Give5 admins can update businesses
CREATE POLICY "Business admins can update their business"
    ON businesses FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = businesses.id
            AND user_id = auth.uid()
            AND role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business members policies
-- Business members can view their business's members
CREATE POLICY "Business members can view members"
    ON business_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM business_members bm
            WHERE bm.business_id = business_members.business_id
            AND bm.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business admins and Give5 admins can manage members
CREATE POLICY "Business admins can insert members"
    ON business_members FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = business_members.business_id
            AND user_id = auth.uid()
            AND role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Business admins can update members"
    ON business_members FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM business_members bm
            WHERE bm.business_id = business_members.business_id
            AND bm.user_id = auth.uid()
            AND bm.role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Business admins can delete members"
    ON business_members FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM business_members bm
            WHERE bm.business_id = business_members.business_id
            AND bm.user_id = auth.uid()
            AND bm.role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business incentives policies
-- Anyone can view active incentives
CREATE POLICY "Active incentives are viewable by everyone"
    ON business_incentives FOR SELECT
    USING (is_active = true OR
        EXISTS (
            SELECT 1 FROM business_members bm
            JOIN businesses b ON b.id = bm.business_id
            WHERE b.id = business_incentives.business_id
            AND bm.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business members can create incentives
CREATE POLICY "Business members can create incentives"
    ON business_incentives FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = business_incentives.business_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business members can update their incentives
CREATE POLICY "Business members can update incentives"
    ON business_incentives FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = business_incentives.business_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Business members can delete their incentives
CREATE POLICY "Business members can delete incentives"
    ON business_incentives FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM business_members
            WHERE business_id = business_incentives.business_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Incentive redemptions policies
-- Users can view their own redemptions
CREATE POLICY "Users can view own redemptions"
    ON incentive_redemptions FOR SELECT
    USING (volunteer_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM business_members bm
            JOIN business_incentives bi ON bi.business_id = bm.business_id
            WHERE bi.id = incentive_redemptions.incentive_id
            AND bm.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Users can redeem incentives for themselves
CREATE POLICY "Users can redeem incentives"
    ON incentive_redemptions FOR INSERT
    WITH CHECK (volunteer_id = auth.uid());

-- Business members can update redemptions (mark as used, add notes)
CREATE POLICY "Business members can update redemptions"
    ON incentive_redemptions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM business_members bm
            JOIN business_incentives bi ON bi.business_id = bm.business_id
            WHERE bi.id = incentive_redemptions.incentive_id
            AND bm.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );