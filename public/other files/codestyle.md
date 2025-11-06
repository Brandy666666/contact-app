# Frontend Code Style (for public/src — index.html, style.css, app.js)

Sources (adopted)
- Airbnb JavaScript Style Guide — https://github.com/airbnb/javascript  
- Google HTML/CSS Style Guide — https://developers.google.com/style/html-css  
- W3C HTML5 & ARIA recommendations — https://www.w3.org/  
- Stylelint / Prettier / ESLint community best practices

Purpose
This document defines concise frontend coding standards for the files under public/src in this project. Rules prioritize readability, maintainability, accessibility, and security, and are aligned with the sources above.

1. General
- Indentation: 2 spaces.  
- Line length: recommended max 100 columns.  
- End-of-file: single newline required.  
- Naming: CSS classes use kebab-case; JS identifiers use camelCase; constants in JS use UPPER_SNAKE_CASE.  
- Use Prettier for formatting; integrate with ESLint/Stylelint to avoid conflicts.

2. HTML (index.html)
- Use <!DOCTYPE html> and include lang attribute.  
- Include <meta charset="utf-8"> and viewport meta.  
- Prefer semantic elements (header, main, nav, section, footer). Wrap main content in <main> where appropriate.  
- Accessibility:
  - Use <label for="..."> for form controls. If visually hidden labels are needed, apply a sr-only class.  
  - Add ARIA attributes when semantics are insufficient (aria-label, role).  
  - Ensure interactive elements are keyboard accessible and have visible focus styles.  
- Avoid inline scripts/styles with sensitive data.

3. CSS (style.css)
- Organization:
  - Define variables in :root for colors, spacing, radii.  
  - Group styles: layout → components → utilities. Use comments to separate sections.  
- Selectors:
  - Prefer class selectors; avoid high-specificity selectors and IDs.  
  - Keep selector depth minimal to improve maintainability.  
- Naming & Reuse:
  - Use reusable utility classes (.btn, .sr-only).  
  - Keep component CSS scoped by using descriptive class names.  
- Responsive:
  - Prefer mobile-first approach (min-width breakpoints). Keep breakpoints consistent.  
- Accessibility & contrast:
  - Ensure text/background contrast meets WCAG levels (>=4.5:1 for body text).  
- Performance:
  - Avoid expensive selectors and frequent layout-triggering properties in animations (prefer transform/opacity).

4. JavaScript (app.js)
- Style basics:
  - Use const/let (no var). Use single quotes. Semicolons required. Follow Airbnb style.  
  - Use async/await for async flows and handle errors with try/catch.  
- DOM & security:
  - Prefer textContent or DOM methods over innerHTML. If innerHTML is used, escape all user content. Keep escapeHtml function and apply it to every insertion.  
  - When inserting values into attributes, ensure proper encoding (use element.dataset where possible).  
- Event handling:
  - Use addEventListener. For dynamic lists, prefer event delegation (attach one handler to a parent) to avoid repeated binding.  
- Network:
  - Check fetch responses with res.ok and respond appropriately. Show user-friendly error messages.  
  - Disable controls or show loading state during pending requests to prevent duplicate submissions.  
- Modularity & testability:
  - Keep business logic (fetchContacts, validatePhone, renderTable, escapeHtml) as pure functions where possible so they can be unit tested. Consider exporting functions when using a module/bundler.

5. Accessibility & Internationalization
- All interactive controls must be reachable by keyboard and have accessible names.  
- Use proper HTML semantics for screen readers (aria-label, role where necessary).  
- Keep user-visible strings in one place for easier i18n later.

6. Security
- Sanitize/escape all user input before DOM insertion (XSS prevention).  
- For apps with authentication or server state, protect against CSRF and validate inputs server-side as well.

7. Tooling & Linting
- JavaScript: ESLint (recommended extend: ['airbnb-base', 'prettier']). Rules: allow console in dev, enforce max-len 100.  
- CSS: Stylelint (stylelint-config-standard + prettier).  
- HTML: HTMLHint or W3C validation.  
- Formatting: Prettier with consistent config; enable format-on-save in editor.  
- CI: Run lint and tests on PRs.

8. Minimal, concrete recommendations for the current files
- index.html:
  - Add <label for="name"> and <label for="phone"> (or sr-only labels).  
  - Wrap main content in <main class="container"> for semantics.
- style.css:
  - Replace any ellipses or placeholder rules with explicit definitions. Ensure .btn and .empty are implemented and accessible (focus state, contrast).  
  - Prefer mobile-first breakpoints.
- app.js:
  - Keep escapeHtml and use it consistently. Use dataset (element.dataset.id) instead of unencoded attributes when possible.  
  - Replace attachDeleteHandlers re-binding with event delegation on the table body.  
  - Implement loading/disable state on form submission.  
  - Ensure fetchContacts checks res.ok and returns [] or throws with useful message.

9. Quick reviewer checklist
- [ ] Indentation 2 spaces and files end with newline.  
- [ ] HTML is semantic; form controls have labels.  
- [ ] All user content escaped before DOM insertion.  
- [ ] JS uses const/let, single quotes, semicolons.  
- [ ] Event delegation used for dynamic lists, loading states present.  
- [ ] Linting and formatting configured (ESLint, Stylelint, Prettier).

References
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript  
- Google HTML/CSS Style Guide: https://developers.google.com/style/html-css  
- W3C HTML and ARIA guidelines: https://www.w3.org/

End of file.