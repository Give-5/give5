-- Seed data for development
-- This file is run with `supabase db reset` to populate the database with test data

-- Create test users (passwords are all "password123")
-- Note: In production, users would sign up through the app
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'volunteer@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"full_name": "John Volunteer"}'),
    ('22222222-2222-2222-2222-222222222222', 'organizer@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"full_name": "Jane Organizer"}'),
    ('33333333-3333-3333-3333-333333333333', 'admin@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"full_name": "Admin User"}');

-- Update profiles with appropriate roles
UPDATE profiles SET role = 'volunteer' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE profiles SET role = 'organization' WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE profiles SET role = 'admin' WHERE id = '33333333-3333-3333-3333-333333333333';

-- Create test organizations
INSERT INTO organizations (id, name, description, contact_email, created_by)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Denver Parks & Recreation', 'Maintaining and improving Denver''s beautiful parks', 'parks@denver.gov', '22222222-2222-2222-2222-222222222222'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Food Bank of the Rockies', 'Fighting hunger in Colorado', 'info@foodbankrockies.org', '22222222-2222-2222-2222-222222222222');

-- Add organizer to organizations
INSERT INTO organization_members (organization_id, user_id, role)
VALUES 
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'admin'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'admin');

-- Create test events
INSERT INTO events (
    id, title, description, organization_id, date, start_time, end_time, 
    location_name, location_address, max_volunteers, status, provided_items
)
VALUES 
    (
        'e1111111-1111-1111-1111-111111111111',
        'Community Garden Cleanup',
        'Help maintain and improve a community garden. Tasks include planting, weeding, watering, mulching, and general garden upkeep.',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        CURRENT_DATE + INTERVAL '7 days',
        '09:00:00',
        '12:00:00',
        'Sunridge Commons Park',
        '2785 W Pinecrest Drive Denver, CO 80219',
        50,
        'active',
        ARRAY['Water', 'PPE', 'Tools']
    ),
    (
        'e2222222-2222-2222-2222-222222222222',
        'Park Cleanup & Picnic',
        'Help beautify Denver''s iconic park, then unwind with snacks and community vibes under the sun.',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        CURRENT_DATE + INTERVAL '14 days',
        '10:00:00',
        '13:00:00',
        'City Park',
        '2001 Colorado Blvd, Denver, CO',
        30,
        'active',
        ARRAY['Water', 'Snacks', 'Cleaning supplies']
    ),
    (
        'e3333333-3333-3333-3333-333333333333',
        'Food Bank Sorting',
        'Sort and package donated food items for distribution to families in need.',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        CURRENT_DATE + INTERVAL '3 days',
        '14:00:00',
        '17:00:00',
        'Food Bank of the Rockies',
        '10700 E 45th Ave, Denver, CO 80239',
        20,
        'active',
        ARRAY['Gloves', 'Aprons']
    );

-- Create some test registrations
INSERT INTO event_registrations (event_id, volunteer_id)
VALUES 
    ('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'),
    ('e2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111');

-- Add some completed hours for the volunteer
INSERT INTO volunteer_hours (volunteer_id, event_id, hours, verified, verified_by)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'e3333333-3333-3333-3333-333333333333', 3.0, true, '22222222-2222-2222-2222-222222222222');

-- Note: The rewards table will be automatically updated by the trigger