-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Users can read all profiles (for displaying names, etc.)
CREATE POLICY "Profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Profiles are automatically created via trigger, no INSERT policy needed

-- Organizations policies
-- Anyone can view organizations
CREATE POLICY "Organizations are viewable by everyone"
    ON organizations FOR SELECT
    USING (true);

-- Organization admins can insert organizations
CREATE POLICY "Organization admins can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('organization', 'admin')
        )
    );

-- Organization members can update their organization
CREATE POLICY "Organization members can update their organization"
    ON organizations FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = organizations.id
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

-- Organization members policies
-- Members can view their organization's members
CREATE POLICY "Organization members can view members"
    ON organization_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_members.organization_id
            AND om.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Organization admins can manage members
CREATE POLICY "Organization admins can insert members"
    ON organization_members FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = organization_members.organization_id
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

CREATE POLICY "Organization admins can update members"
    ON organization_members FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_members.organization_id
            AND om.user_id = auth.uid()
            AND om.role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Organization admins can delete members"
    ON organization_members FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_members.organization_id
            AND om.user_id = auth.uid()
            AND om.role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Events policies
-- Anyone can view active events
CREATE POLICY "Active events are viewable by everyone"
    ON events FOR SELECT
    USING (status = 'active' OR
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = events.organization_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Organization members can create events
CREATE POLICY "Organization members can create events"
    ON events FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = events.organization_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Organization members can update their events
CREATE POLICY "Organization members can update events"
    ON events FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = events.organization_id
            AND user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Event registrations policies
-- Users can view their own registrations
CREATE POLICY "Users can view own registrations"
    ON event_registrations FOR SELECT
    USING (volunteer_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM organization_members om
            JOIN events e ON e.organization_id = om.organization_id
            WHERE e.id = event_registrations.event_id
            AND om.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Users can register for events
CREATE POLICY "Users can register for events"
    ON event_registrations FOR INSERT
    WITH CHECK (volunteer_id = auth.uid());

-- Users can update their own registrations (cancel)
CREATE POLICY "Users can update own registrations"
    ON event_registrations FOR UPDATE
    USING (volunteer_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM organization_members om
            JOIN events e ON e.organization_id = om.organization_id
            WHERE e.id = event_registrations.event_id
            AND om.user_id = auth.uid()
        )
    );

-- Volunteer hours policies
-- Users can view their own hours
CREATE POLICY "Users can view own hours"
    ON volunteer_hours FOR SELECT
    USING (volunteer_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM organization_members om
            JOIN events e ON e.organization_id = om.organization_id
            WHERE e.id = volunteer_hours.event_id
            AND om.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Organization members can insert hours for their events
CREATE POLICY "Organization members can insert hours"
    ON volunteer_hours FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM organization_members om
            JOIN events e ON e.organization_id = om.organization_id
            WHERE e.id = volunteer_hours.event_id
            AND om.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Organization members can update hours for their events
CREATE POLICY "Organization members can update hours"
    ON volunteer_hours FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            JOIN events e ON e.organization_id = om.organization_id
            WHERE e.id = volunteer_hours.event_id
            AND om.user_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Rewards policies
-- Users can view their own rewards
CREATE POLICY "Users can view own rewards"
    ON rewards FOR SELECT
    USING (volunteer_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role = 'admin'
        )
    );

-- Rewards are managed by system triggers, no direct INSERT/UPDATE/DELETE