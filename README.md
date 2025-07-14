# Give5 - Volunteer Management Platform

Give5 is a volunteer management platform that connects Mile High Denver residents with community service opportunities. Track your volunteer hours, earn rewards, and make a difference in your community.

## Features

- 🙋 **Event Discovery**: Browse and search volunteer opportunities
- 📅 **Easy Registration**: Sign up for events with one click
- ⏱️ **Hours Tracking**: Automatic tracking with QR check-in/out
- 🏆 **Rewards System**: Earn points and achieve milestones
- 📊 **Progress Dashboard**: View your volunteer impact
- 🏢 **Organization Tools**: Manage events and volunteers

## Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime)
- **Testing**: [Playwright](https://playwright.dev/) for E2E and visual regression
- **Deployment**: Vercel (frontend) + Supabase (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/give5.git
   cd give5
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. Run database migrations:
   ```bash
   supabase db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test:visual` - Run visual regression tests
- `npm run test:update` - Update visual test snapshots

### Project Structure

```
/give5
├── /app              # Next.js app directory (pages)
├── /components       # React components
├── /lib             # Utilities and configurations
├── /supabase        # Database migrations and functions
├── /public          # Static assets
├── /tests           # Test files
└── /dev-docs        # Development documentation
```

### Testing

Visual regression tests ensure UI consistency:

```bash
# Run tests
npm run test:visual

# Update snapshots after intentional changes
npm run test:update
```

## Documentation

- [Development Plan](./dev-docs/development-plan.md)
- [Design Workflow](./dev-docs/design-workflow.md)
- [Functional Implementation](./dev-docs/functional-implementation-plan.md)
- [Project Handoff](./dev-docs/project-handoff.md)

## Contributing

1. Read [CLAUDE.md](./CLAUDE.md) for AI-assisted development guidelines
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

[MIT License](./LICENSE) - feel free to use this project as a template!

## Acknowledgments

- Design inspiration from community volunteer platforms
- Built with Claude AI assistance
- Mile High Denver community for the vision