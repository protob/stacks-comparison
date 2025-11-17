working  dir is `crud-app-sqlite/frontend`
do `cd crud-app-sqlite/frontend` first

The core design system and Tailwind v4 modular configuration you implemented are fundamentally correct and closely aligned with modern best practices as of November 2025. However, several UI and token usage problems remain—especially inconsistent application in components, fluid sizing, and dark/light mode control. Below is a literal, detailed to-do list specifying file paths, code actions, and design system enforcement for proper usage across the React app. These steps are **explicit and deliberate**—do not delegate decision-making to the AI agent.[1][2][3]

***

### Critical Issues Observed

- Inconsistent token application, especially for backgrounds, typography, and spacing; some places use raw color/spacing values or incomplete token usage.
- Mixed or “sloppy” light/dark mode UI, resulting in visual artifacts; lack of authoritative dark mode control via Tailwind or design tokens; probable missing app-level class toggling.[4][5][1]
- Overly large, uneven UI elements and form fields; non-fluid spacing/sizing.
- Class composition and conditional logic scattered, not strictly organized by design system tokens.[6][7][1]
- Some missing usage of container queries and vertical rhythm tokens.

***

### AI Agent To-Do Steps to Fix Design System Usage

#### 1. Enforce Token-Only Styling in All Components
- **Target Files**: `src/components/common/*`, `src/components/items/*`, `src/components/layout/*`, `src/pages/*`
- **Action**: Scan every component for direct usage of Tailwind utility classes referencing raw colors, spacing, or font sizes (e.g., `bg-gray-50`, `p-4`, `text-lg`). Replace them with token-based Tailwind class references **using the custom tokens defined in your main CSS/theme** (e.g., `bg-surface`, `text-text-primary`, `p-card-padding`, `rounded-button-radius`, etc.).
- **How**: 
  - Use the established three-tier token architecture (primitive, semantic, component-specific tokens).[8][9][1]
  - *Example Replacement*: Change
    ```jsx
    <div className="bg-gray-50 text-gray-900 p-4">
    ```
    to
    ```jsx
    <div className="bg-surface text-text-primary p-card-padding">
    ```
  - Ensure that **every** color, space, and font reference maps to a design token rather than a raw value.

#### 2. Fix Dark/Light Mode Application Across the App
- **Target Files**: `src/App.tsx`, `src/main.tsx`, `src/components/layout/AppSidebar.tsx`, any theme toggling components (e.g., `ThemeToggle.tsx`)
- **Action**: Authoritatively control dark mode by toggling a `dark` class on the root HTML node, using React state sourced from Zustand (`theme` in `useUiStore`). *Never* rely on isolated component-level dark classes.[5][10][1][4]
- **How to implement**:  
  - In `src/main.tsx` or `src/App.tsx`, use a React `useEffect` that updates the HTML root’s class based on global theme state:
    ```tsx
    useEffect(() => {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);
    ```
  - Refactor `ThemeToggle.tsx` to update Zustand’s theme value only, not local state.
  - Ensure all Tailwind color, background, and token utilities automatically respond to `.dark` on the root (`tailwind.config.js` must set `darkMode: 'class'`).

#### 3. Normalize Element Sizing and Rhythm
- **Target Files**: `src/components/common/*`, `src/components/items/*`, especially form fields, buttons, cards
- **Action**: Audit for oversized UI elements (e.g., buttons, inputs, popups) and replace static sizes with fluid/elegant token usage: vertical rhythm, modular scale, component padding. Set size via `clamp` and tokens like `p-input-padding`, `text-button-font`, etc..[1]
- **How**:
  - For form controls, enforce:
    ```jsx
    <input className="p-input-padding-x p-input-padding-y rounded-input-radius" ... />
    ```
  - For buttons, cards, modal popups, use tokens for padding, radius, font size.
  - Remove excess spacing/gaps, referring strictly to utility tokens (e.g., `gap-component-internal`, `margin-between-sections`).

#### 4. Refactor Global and Component Styles
- **Target Files**: `src/styles/main.css`, `src/index.css`, `tailwind.config.js`
- **Action**: Ensure all root tokens are exposed as CSS custom properties and mapped in Tailwind config. Remove unused or duplicate tokens. Update global selectors so default backgrounds, text colors, focus states pull from the token palette.
- **How**:
  - In `src/styles/main.css`, every CSS property must reference a custom property (e.g., `background-color: var(--color-background)`).
  - Use Tailwind layer cascade and only custom classes in global CSS if needed.
  - In `tailwind.config.js`, set `darkMode: 'class'`, and make sure relevant semantic token classes are mapped.

#### 5. Enforce Container Queries and Responsiveness
- **Target Files**: `src/components/layout/*`, `src/components/items/*`, `src/pages/*`
- **Action**: Apply container query utilities (e.g., `.container-aware`, `.grid-auto-items`) to critical containers and grids. Remove hardcoded breakpoints; rely on tokenized rhythm and grid sizes.
- **How**:  
  ```jsx
  <div className="container-aware grid-auto-items">
  ```
  - Always prefer tokens and intrinsic sizing over manual breakpoint media queries.

#### 6. Audit for Missing Semantic Tokens in New/Refactored Components
- **Target Files**: All components created since refactor (check Git log or file modified dates)
- **Action**: Any recent or AI-generated components must be scanned for token usage conformity. If a new token is needed (e.g., for a distinct button or card style), *define* it in `main.css` and reference it in component code.  
- **How**:  
  - Add missing tokens to CSS and use them in JSX.
  - Accompany every UI addition or change with a token-based mapping.

#### 7. Strictly Avoid Mixing Raw Utility Classes and Tokens
- **Target Files**: Entire `src/` directory
- **Action**: Remove any instance where Tailwind raw classes are combined with token classes for the same property. Use only token classes, with rare exceptions for utility helpers (e.g., `sr-only`, `overflow-hidden`).
- **How**:  
  - Regex search for direct utility usage; replace with aligned token class.

#### 8. Update Documentation and Usage Examples
- **Target Files**: `README.md`, internal docs in repo
- **Action**: Update documentation to reflect strict token usage, explain token architecture, and provide explicit examples for contributors.
- **How**:  
  - Add code samples for correct use in new components.
  - Document the token naming scheme (e.g., `color.background.active`, `button.radius.md`).

***

### References & Current Best Practices
- Cross-platform token enforcement and naming.[2][9][8][1]
- Authoritative dark/light mode via root HTML class, Zustand-driven state.[10][4][5][1]
- Modular Tailwind 4, avoid mixing raw classes and CSS modules—use tokens and mapped classes only.[7][6][1]
- Modern vertical rhythm, fluid typography, spacing, responsive design via container queries and tokens.[1]
- Audit tokens for duplicates and unused entries; keep governance strict and consistent.[11]

***

### Summary Table: Action Mapping

| Step | File Path(s) | Action (Condensed) |
|------|--------------|--------------------|
| 1    | src/components/*, src/pages/* | Replace raw utilities with token classes everywhere [1] |
| 2    | src/App.tsx, src/main.tsx, src/components/layout/AppSidebar.tsx | Global dark mode via Zustand + `.dark` on html [4][5][1] |
| 3    | src/components/common/* | Enforce fluid, tokenized sizing and vertical rhythm [1] |
| 4    | src/styles/main.css, src/index.css, tailwind.config.js | Token-only CSS, update layer hierarchy and darkMode [1] |
| 5    | src/components/layout/*, pages/* | Update grids for container queries, rhythm tokens [1] |
| 6    | src/components/* (new), main.css | Scan recent changes for missing tokens, add as needed [1] |
| 7    | src/* | Remove raw utility classes, enforce tokens [7][1] |
| 8    | README.md | Update documentation for enforced token strategy [1] |

All steps are explicit, path-specific, and designed to ensure rigorous adherence to your modern design system. No fallback to old versions, no delegation—take direct control over every change proposed here.[2][1]

