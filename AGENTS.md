# Agent Guidelines for Burifolio-v2

- When you need to search docs, use `context7` tools.

## Build/Test Commands

- **Use `bun` for all commands** (not npm/yarn/pnpm)
- Dev server: `bun run dev` (runs on port 1234)
- Build: `bun run build` (runs `astro check` then `astro build`)
- Preview: `bun run preview`
- Format: `bun run prettier`
- No test suite currently configured

## Code Style

### Formatting

- Use Prettier with single quotes, no semicolons
- Plugins: astro, tailwindcss, astro-organize-imports (auto-sorts imports)
- Run `bun run prettier` before committing

### TypeScript

- Strict mode enabled with `strictNullChecks`
- Use explicit types for function returns
- Prefer type safety: avoid `any`, use proper CollectionEntry types

### Imports

- Use `@/` alias for `src/` (e.g., `import { foo } from '@/lib/utils'`)
- Imports auto-organized by prettier-plugin-astro-organize-imports

### Naming

- Files: kebab-case for utilities, PascalCase for components
- Functions: camelCase with descriptive names (e.g., `getAllPosts`, `isSubpost`)
- Types: PascalCase (e.g., `TOCHeading`, `TOCSection`)

### Error Handling

- Return `null` for missing data rather than throwing
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### React Components

- Use function declarations, not arrow functions
- Destructure props in function signature
- Use `cn()` utility for conditional classNames
