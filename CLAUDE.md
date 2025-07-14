# Give5 App - Development Guide for Claude

## Project Overview
Give5 is a volunteer management platform for Mile High Denver that connects volunteers with community service opportunities. Users can browse events, register for volunteer activities, track their hours, and earn rewards.

## Current Status (After Initial Commit)
- ✅ **UI Implementation**: All pages built and visually tested
- ✅ **Database Design**: Schema, migrations, and RLS policies created
- ✅ **Development Infrastructure**: Testing, linting, and workflows configured
- 🚧 **Backend Integration**: Supabase configured but not connected to UI
- ⏳ **Authentication**: Setup complete, implementation pending

## Tech Stack
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Edge Functions)
- **Testing**: Playwright for E2E and visual regression
- **Deployment**: Vercel (frontend), Supabase (backend)

## Important Commands
Always run these commands when making code changes:
- `npm run lint` - Check for linting errors
- `npm run test:visual` - Run visual regression tests
- `npm run dev` - Start development server (runs on port 3000)

## Supabase Setup Requirements
When setting up Supabase, we need:
1. Project URL: `https://[project-ref].supabase.co`
2. Anon Key: For client-side access
3. Service Role Key: For server-side/admin access (keep secure!)

## Database Schema

### Tables Needed:
1. **profiles** (extends Supabase auth.users)
   - id (uuid, FK to auth.users)
   - email
   - full_name
   - role (volunteer, organization, admin)
   - created_at
   - updated_at

2. **organizations**
   - id (uuid)
   - name
   - description
   - contact_email
   - created_by (FK to profiles)
   - created_at

3. **events**
   - id (uuid)
   - title
   - description
   - date
   - start_time
   - end_time
   - location_name
   - location_address
   - max_volunteers
   - organization_id (FK)
   - created_at
   - status (active, cancelled, completed)

4. **event_registrations**
   - id (uuid)
   - event_id (FK)
   - volunteer_id (FK to profiles)
   - registered_at
   - cancelled_at
   - attended (boolean)
   - hours_completed (decimal)

5. **volunteer_hours**
   - id (uuid)
   - volunteer_id (FK)
   - event_id (FK)
   - hours (decimal)
   - verified_by (FK to profiles)
   - created_at

6. **rewards**
   - id (uuid)
   - volunteer_id (FK)
   - points_earned
   - points_redeemed
   - created_at

## File Structure
```
/give5
├── /app                    # Next.js app directory
├── /components            # React components
├── /lib                   # Utilities and helpers
│   ├── /supabase         # Supabase client and helpers
│   ├── /hooks            # Custom React hooks
│   └── /types            # TypeScript types
├── /supabase             # Supabase project files
│   ├── /migrations       # SQL migrations
│   ├── /functions        # Edge functions
│   └── config.toml       # Local config
├── /public               # Static assets
└── /tests                # Test files
```

## Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## Development Workflow
1. Always check current directory with `pwd`
2. Create feature branches for new work
3. Run visual tests before committing
4. Use meaningful commit messages
5. Keep migrations in `/supabase/migrations`

## Key Features to Implement
1. **Authentication Flow**
   - Email/password signup
   - Google OAuth
   - Role-based access (volunteer, organization, admin)

2. **Event Management**
   - CRUD operations for events
   - Registration limits
   - Automatic status updates

3. **Hours Tracking**
   - QR code check-in/out
   - Manual hour entry with verification
   - Monthly/yearly summaries

4. **Rewards System**
   - Points for completed hours
   - Milestone rewards (5, 10, 25, 50 hours)
   - Redemption tracking

## Testing Guidelines
- Visual tests compare against screenshots in `/dev-docs/screenshots/`
- Update snapshots with `npm run test:update` when UI changes
- Test on mobile (390x844), tablet (768x1024), and desktop (1440x900)

## Security Considerations
- Use Row Level Security (RLS) for all tables
- Validate all inputs on both client and server
- Never expose service role key to client
- Use Supabase Auth for all authentication

## Version Control & Documentation Process

### Commit Guidelines
1. **Before Committing**:
   - Run `npm run lint` to check for errors
   - Run `npm run test:visual` to ensure UI consistency
   - Update relevant documentation

2. **Commit Message Format**:
   ```
   type(scope): description
   
   - Detailed change 1
   - Detailed change 2
   
   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

3. **Types**: feat, fix, docs, style, refactor, test, chore
4. **Scopes**: ui, auth, db, api, tests, docs

### Documentation Requirements
1. **When Adding Features**:
   - Update CLAUDE.md with new patterns
   - Add to project-handoff.md if significant
   - Document in relevant dev-docs/

2. **When Changing Schema**:
   - Create new migration file
   - Update type definitions
   - Document in functional-implementation-plan.md

3. **When Modifying UI**:
   - Add/update screenshots if needed
   - Run visual tests
   - Update design-workflow.md if process changes

### Project Handoff Process
1. Create comprehensive handoff document
2. Update CLAUDE.md with current state
3. Ensure all TODOs are in task list
4. Commit with detailed message
5. Tag with version if milestone

## Common Issues & Solutions
1. **Port conflicts**: Dev server defaults to 3000, will try 3001, 3002
2. **Image 404s**: Place images in `/public/images/`
3. **Type errors**: Run `npm run lint` to check
4. **Visual test failures**: Compare with design, update if intentional
5. **Supabase connection**: Check .env.local and MCP configuration

## Useful Supabase MCP Commands
When MCP is active, you can:
- Execute SQL queries directly
- Manage auth users
- Deploy edge functions
- Configure storage buckets
- Set up real-time channels

## Development Workflow Checklist
- [ ] Read CLAUDE.md for context
- [ ] Check current TODOs
- [ ] Make changes following patterns
- [ ] Test thoroughly
- [ ] Update documentation
- [ ] Commit with clear message

Remember: Always communicate what manual steps are needed (like creating Supabase project, adding environment variables, etc.)