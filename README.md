Quick notes — Greenvill Associates site

- Bank logos:
  - SVG placeholders are in `assets/images/*.svg`. Replace them with your actual bank logo files keeping the same filenames (`sbi.svg`, `hdfc.svg`, `icici.svg`, `axis.svg`, `canara.svg`, `bob.svg`, `pnb.svg`). Optimized SVGs (simple shapes) are preferred for fast loading.

- Quick callback form (Web3Forms):
  - To enable serverless submissions, open `assets/scripts/main.js` and set the `WEB3FORMS_KEY` constant to your Web3Forms access key.
  - If `WEB3FORMS_KEY` is empty, the form falls back to a `mailto:` submission.

- Next steps you can ask me to do:
  - Replace logos with supplied images and auto-optimize.
  - Wire the form reply-to and redirect upon successful submission.
  - Run an accessibility/SEO audit and fix items.
