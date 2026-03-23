# LLMGuiDemo Notes

## Design direction

- Keep the shell flat and plain.
- Avoid gradients.
- Avoid decorative shadows.
- Avoid chunky controls.
- Avoid very round corners.
- Prefer a clean, Notion-like density over glossy app chrome.

## Theming

- The component must work in both light and dark mode.
- Theme tokens should remain configurable through CSS custom properties and the component `tokens` prop.
- Playground examples should include a theme toggle so `theme="system"` can be checked quickly.

## Collapse behavior

- Major regions should be author-configurable:
  - whole sidebar rail
  - sidebar sections
  - right-side pane sections such as files or notes
  - bottom utility panes such as terminal
  - composer area
  - message groups and per-message detail blocks
- Collapse defaults should support viewport-specific rules so authors can choose different defaults for:
  - `mobile`
  - `tablet`
  - `desktop`
- User toggles should win after interaction instead of being reset immediately on the next render.

## Fonts

- Do not hardcode custom font stacks into the component.
- Use the site font variables provided by Webtrotion:
  - `--font-sans`
  - `--font-mono`
- Allow font overrides through demo-specific CSS variables when needed.

## Content examples

- Do not use Conductor naming or repo-review examples in the public demo fixtures.
- Prefer realistic examples based on recipe imports, screenshots, and publishing workflows.

## Assets

- Provider icons live in `custom-components/media/` so Webtrotion can rewrite and serve them the same way as the upstream custom-component examples.
