# Agent Guidelines for Figurine AI

## Commands
- **Dev server**: `pnpm dev` (Next.js with Turbopack) - NEVER RUN
- **Build**: `pnpm build` (Next.js with Turbopack) - NEVER RUN
- **Start**: `pnpm start`
- **Lint**: `pnpm lint` (ESLint with Next.js rules)
- **Test**: No tests configured yet

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Framework**: Next.js 15 with App Router
- **Imports**: External imports first, then relative with `@/` alias
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Names**: Use kebab-case for component files
- **Styling**: Tailwind CSS with `cn()` utility for conditional classes
- **Components**: Use shadcn registries from `@components.json`, `@radix-ui` primitives with `class-variance-authority`
- **8bit Registry**: Creates components in `ui/8bit/` directory
- **Types**: Use `React.ComponentProps` for prop types, explicit type imports
- **Formatting**: No semicolons, consistent with existing codebase
- **Error Handling**: Use try/catch for async operations, validate with Zod schemas