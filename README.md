# Etsy review prettier

Local viewer for an Etsy review JSON export. Reviews stay in the browser. Existing page content and bundled samples are retained.

## Development

Use Node.js 24 and `npm ci --ignore-scripts`. Run `npm run dev`; production output remains `public/`, preserving the original publish directory. Static source files now live in `static/` so Vite can safely recreate the publish directory. Run `npm run build` and `npm run preview` to inspect production output. No deploy workflow is included.

Svelte 5, Vite 8, the Svelte Vite plugin 7 and current export libraries are migrated together. CSV export uses the v3 object API. Unused JSZip/js-file-download and obsolete Rollup plugins are removed. TypeScript 7.0.2 was attempted but npm rejected svelte-check 4.7.6's peer range (`^5 || ^6`); TypeScript 6.0.3 is the compatible hold until the checker supports 7.

## Validation

`npm test` covers synthetic JSON/schema validation and export cleanup on success/failure. `npm run check` checks all Svelte/TypeScript sources. Browser checks: `npx playwright install chromium webkit && npm run test:browser` after build.

Read-only PR CI runs all checks. Browser tests block nonlocal traffic, including existing analytics, and use synthetic reviews only; no Etsy account, order data or scraping is used. WebKit engine tests do not claim native Safari/device coverage. Screenshots and traces are retained as CI artifacts.

Invalid input leaves the last valid review list visible and reports the error. Image export waits for the DOM to hide controls and restores controls even if capture or download fails. Concurrent exports are disabled; cancelled uploads are ignored and stale file reads cannot replace newer input.
