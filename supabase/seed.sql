-- Seed data for Give5 application
-- Run this with: supabase db reset or execute in SQL editor

-- Clean up existing data first (in reverse order of dependencies)
TRUNCATE TABLE incentive_redemptions CASCADE;
TRUNCATE TABLE business_incentives CASCADE;
TRUNCATE TABLE business_members CASCADE;
TRUNCATE TABLE businesses CASCADE;
TRUNCATE TABLE event_registrations CASCADE;
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE organization_members CASCADE;
TRUNCATE TABLE organizations CASCADE;
TRUNCATE TABLE rewards CASCADE;
TRUNCATE TABLE profiles CASCADE;

-- Create test users (using Supabase auth)
-- Note: These users can sign in with email/password
-- Password for all test users: TestPass123!
DO $$
DECLARE
    user_id1 uuid;
    user_id2 uuid;
    user_id3 uuid;
    user_id4 uuid;
    user_id5 uuid;
BEGIN
    -- Create volunteer users
    user_id1 := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
    VALUES (
        user_id1,
        '00000000-0000-0000-0000-000000000000',
        'volunteer1@example.com',
        crypt('TestPass123!', gen_salt('bf')),
        NOW(),
        '{"full_name": "Sarah Johnson"}',
        NOW(),
        NOW()
    );

    user_id2 := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
    VALUES (
        user_id2,
        '00000000-0000-0000-0000-000000000000',
        'volunteer2@example.com',
        crypt('TestPass123!', gen_salt('bf')),
        NOW(),
        '{"full_name": "Mike Chen"}',
        NOW(),
        NOW()
    );

    -- Create organization admin
    user_id3 := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
    VALUES (
        user_id3,
        '00000000-0000-0000-0000-000000000000',
        'org.admin@example.com',
        crypt('TestPass123!', gen_salt('bf')),
        NOW(),
        '{"full_name": "Emily Rodriguez"}',
        NOW(),
        NOW()
    );

    -- Create Give5 admin
    user_id4 := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
    VALUES (
        user_id4,
        '00000000-0000-0000-0000-000000000000',
        'admin@give5.org',
        crypt('TestPass123!', gen_salt('bf')),
        NOW(),
        '{"full_name": "Admin User"}',
        NOW(),
        NOW()
    );

    -- Create business admin
    user_id5 := gen_random_uuid();
    INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
    VALUES (
        user_id5,
        '00000000-0000-0000-0000-000000000000',
        'business.owner@example.com',
        crypt('TestPass123!', gen_salt('bf')),
        NOW(),
        '{"full_name": "David Martinez"}',
        NOW(),
        NOW()
    );

    -- Wait for triggers to create profiles, then update roles
    PERFORM pg_sleep(1);

    -- Update user roles
    UPDATE profiles SET role = 'volunteer', phone = '(303) 555-0101' WHERE email = 'volunteer1@example.com';
    UPDATE profiles SET role = 'volunteer', phone = '(303) 555-0102' WHERE email = 'volunteer2@example.com';
    UPDATE profiles SET role = 'organization', phone = '(303) 555-0201' WHERE email = 'org.admin@example.com';
    UPDATE profiles SET role = 'admin', phone = '(303) 555-0301' WHERE email = 'admin@give5.org';
    UPDATE profiles SET role = 'volunteer', phone = '(303) 555-0401' WHERE email = 'business.owner@example.com';

    -- Create organizations with real Denver organizations
    INSERT INTO organizations (id, name, description, website, contact_email, contact_phone, address, created_by)
    SELECT 
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
        'Denver Food Bank',
        'Fighting hunger in the Denver metro area since 1978. We distribute food to hundreds of hunger relief programs throughout Metro Denver and northern Colorado.',
        'https://foodbankrockies.org',
        'volunteer@foodbankrockies.org',
        '(303) 371-9250',
        '10700 E 45th Ave, Denver, CO 80239',
        id
    FROM profiles WHERE email = 'org.admin@example.com';

    INSERT INTO organizations (id, name, description, website, contact_email, contact_phone, address, created_by)
    SELECT 
        'b2c3d4e5-f678-90ab-cdef-123456789012'::uuid,
        'Habitat for Humanity Metro Denver',
        'Building homes, communities, and hope. We bring people together to build homes, communities and hope.',
        'https://habitatmetrodenver.org',
        'info@habitatmetrodenver.org',
        '(303) 534-2929',
        '3245 Eliot St, Denver, CO 80211',
        id
    FROM profiles WHERE email = 'org.admin@example.com';

    INSERT INTO organizations (id, name, description, website, contact_email, contact_phone, address, created_by)
    SELECT 
        'c3d4e5f6-7890-abcd-ef12-345678901234'::uuid,
        'Denver Parks & Recreation',
        'Maintaining and improving Denver parks for the community. Join us in keeping Denver beautiful!',
        'https://denvergov.org/parks',
        'parksvolunteer@denvergov.org',
        '(720) 913-1311',
        '201 W Colfax Ave, Denver, CO 80202',
        id
    FROM profiles WHERE email = 'org.admin@example.com';

    -- Add organization members
    INSERT INTO organization_members (organization_id, user_id, role)
    SELECT 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid, id, 'admin'
    FROM profiles WHERE email = 'org.admin@example.com';

    INSERT INTO organization_members (organization_id, user_id, role)
    SELECT 'b2c3d4e5-f678-90ab-cdef-123456789012'::uuid, id, 'admin'
    FROM profiles WHERE email = 'org.admin@example.com';

    INSERT INTO organization_members (organization_id, user_id, role)
    SELECT 'c3d4e5f6-7890-abcd-ef12-345678901234'::uuid, id, 'admin'
    FROM profiles WHERE email = 'org.admin@example.com';

    -- Create businesses
    INSERT INTO businesses (id, name, description, category, website, contact_email, contact_phone, address, created_by)
    SELECT 
        'd4e5f678-90ab-cdef-1234-567890123456'::uuid,
        'Denver Coffee Company',
        'Local coffee roaster committed to community support',
        'restaurant',
        'https://denvercoffee.com',
        'community@denvercoffee.com',
        '(303) 555-0501',
        '1234 Market St, Denver, CO 80202',
        id
    FROM profiles WHERE email = 'business.owner@example.com';

    INSERT INTO businesses (id, name, description, category, website, contact_email, contact_phone, address, created_by)
    SELECT 
        'e5f67890-abcd-ef12-3456-789012345678'::uuid,
        'Mile High Sports Store',
        'Your local sports equipment retailer',
        'retail',
        'https://milehighsports.com',
        'info@milehighsports.com',
        '(303) 555-0601',
        '5678 Broadway, Denver, CO 80203',
        id
    FROM profiles WHERE email = 'admin@give5.org';

    -- Add business members
    INSERT INTO business_members (business_id, user_id, role)
    SELECT 'd4e5f678-90ab-cdef-1234-567890123456'::uuid, id, 'admin'
    FROM profiles WHERE email = 'business.owner@example.com';

END $$;

-- Create events for the next month
INSERT INTO events (organization_id, title, description, date, start_time, end_time, location_name, location_address, max_volunteers, requirements, provided_items, status)
VALUES 
    -- Food Bank events
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
     'Food Sorting and Packing', 
     'Help sort donated food items and pack food boxes for families in need. This is a great opportunity for groups and individuals to make a direct impact on hunger relief in our community.',
     CURRENT_DATE + INTERVAL '3 days', '09:00:00', '12:00:00',
     'Denver Food Bank Warehouse', '10700 E 45th Ave, Denver, CO 80239',
     30, ARRAY['Must be able to stand for extended periods', 'Closed-toe shoes required'], 
     ARRAY['Gloves', 'Aprons', 'Water'], 'active'),
     
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
     'Mobile Food Pantry Distribution', 
     'Assist with distributing food directly to community members at our mobile pantry location. Volunteers will help with setup, food distribution, and cleanup.',
     CURRENT_DATE + INTERVAL '7 days', '14:00:00', '17:00:00',
     'Montbello Recreation Center', '15555 E 53rd Ave, Denver, CO 80239',
     20, ARRAY['Must be able to lift 25 lbs', 'Outdoor activity'], 
     ARRAY['T-shirts', 'Water', 'Snacks'], 'active'),

    -- Habitat for Humanity events
    ('b2c3d4e5-f678-90ab-cdef-123456789012', 
     'Home Building - Framing Day', 
     'Join us for an exciting day of home construction! No experience necessary - we will teach you everything you need to know about framing a home.',
     CURRENT_DATE + INTERVAL '5 days', '08:00:00', '16:00:00',
     'Green Valley Ranch Build Site', '4890 Argonne Way, Denver, CO 80249',
     25, ARRAY['Must be 16 or older', 'Closed-toe shoes required', 'Long pants required'], 
     ARRAY['Tools', 'Safety equipment', 'Lunch', 'Water'], 'active'),

    -- Parks & Rec events
    ('c3d4e5f6-7890-abcd-ef12-345678901234', 
     'Washington Park Cleanup & Beautification', 
     'Help maintain one of Denver''s most beloved parks! Activities include litter pickup, mulching, planting flowers, and general park beautification.',
     CURRENT_DATE + INTERVAL '1 day', '09:00:00', '12:00:00',
     'Washington Park', '701 S Franklin St, Denver, CO 80209',
     40, ARRAY['All ages welcome', 'Wear weather-appropriate clothing'], 
     ARRAY['Tools', 'Gloves', 'Trash bags', 'Water'], 'active'),

    ('c3d4e5f6-7890-abcd-ef12-345678901234', 
     'Tree Planting in City Park', 
     'Join us in expanding Denver''s urban forest! Learn proper tree planting techniques while helping to green our city.',
     CURRENT_DATE + INTERVAL '10 days', '08:30:00', '13:00:00',
     'City Park', '2001 Colorado Blvd, Denver, CO 80205',
     50, ARRAY['Must be able to dig and lift', 'Closed-toe shoes required'], 
     ARRAY['Shovels', 'Trees', 'Mulch', 'Gloves', 'Refreshments'], 'active');

-- Create some registrations for volunteer1
INSERT INTO event_registrations (event_id, volunteer_id, registered_at)
SELECT 
    e.id,
    p.id,
    NOW() - INTERVAL '2 days'
FROM events e
CROSS JOIN profiles p
WHERE p.email = 'volunteer1@example.com'
AND e.title IN ('Washington Park Cleanup & Beautification', 'Food Sorting and Packing');

-- Create some past events with completed hours for volunteer1
INSERT INTO events (id, organization_id, title, description, date, start_time, end_time, location_name, location_address, max_volunteers, status)
VALUES 
    ('f1234567-89ab-cdef-1234-567890abcdef', 
     'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
     'Holiday Food Drive',
     'Special holiday food sorting and distribution event',
     CURRENT_DATE - INTERVAL '30 days', '10:00:00', '14:00:00',
     'Denver Food Bank', '10700 E 45th Ave, Denver, CO 80239',
     50, 'completed'),
     
    ('f2345678-9abc-def1-2345-6789abcdef12',
     'c3d4e5f6-7890-abcd-ef12-345678901234',
     'Fall Park Cleanup',
     'Annual fall cleanup at Cheesman Park',
     CURRENT_DATE - INTERVAL '14 days', '09:00:00', '12:00:00',
     'Cheesman Park', '1599 E 8th Ave, Denver, CO 80218',
     30, 'completed');

-- Add completed registrations with hours
INSERT INTO event_registrations (event_id, volunteer_id, registered_at, checked_in_at, checked_out_at, attended)
SELECT 
    'f1234567-89ab-cdef-1234-567890abcdef'::uuid,
    p.id,
    CURRENT_DATE - INTERVAL '35 days',
    (CURRENT_DATE - INTERVAL '30 days')::timestamp + TIME '10:00:00',
    (CURRENT_DATE - INTERVAL '30 days')::timestamp + TIME '14:00:00',
    true
FROM profiles p WHERE p.email = 'volunteer1@example.com';

INSERT INTO event_registrations (event_id, volunteer_id, registered_at, checked_in_at, checked_out_at, attended)
SELECT 
    'f2345678-9abc-def1-2345-6789abcdef12'::uuid,
    p.id,
    CURRENT_DATE - INTERVAL '20 days',
    (CURRENT_DATE - INTERVAL '14 days')::timestamp + TIME '09:15:00',
    (CURRENT_DATE - INTERVAL '14 days')::timestamp + TIME '11:45:00',
    true
FROM profiles p WHERE p.email = 'volunteer1@example.com';

-- Create business incentives
INSERT INTO business_incentives (business_id, title, description, discount_type, discount_value, minimum_hours_required, valid_from, valid_until, is_active)
VALUES 
    ('d4e5f678-90ab-cdef-1234-567890123456',
     '20% Off Coffee & Pastries',
     'Show your Give5 app and get 20% off your entire purchase! Valid for volunteers with 5+ hours.',
     'percentage',
     '20',
     5,
     CURRENT_DATE,
     CURRENT_DATE + INTERVAL '90 days',
     true),
     
    ('d4e5f678-90ab-cdef-1234-567890123456',
     'Free Coffee Friday',
     'Get a free coffee every Friday! For dedicated volunteers with 25+ hours.',
     'free_item',
     'One free coffee',
     25,
     CURRENT_DATE,
     CURRENT_DATE + INTERVAL '60 days',
     true),
     
    ('e5f67890-abcd-ef12-3456-789012345678',
     '$10 Off Sports Equipment',
     'Get $10 off any purchase of $50 or more. Perfect for active volunteers!',
     'fixed_amount',
     '10',
     10,
     CURRENT_DATE,
     CURRENT_DATE + INTERVAL '120 days',
     true);

-- Update the volunteer hour calculation trigger to run
-- This will calculate hours for volunteer1 based on their completed events
UPDATE event_registrations 
SET attended = true 
WHERE volunteer_id IN (SELECT id FROM profiles WHERE email = 'volunteer1@example.com')
AND checked_out_at IS NOT NULL;