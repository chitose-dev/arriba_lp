# ARRIBA LP Project Memory

Last updated: 2026-05-28

## Current Production State

- Production URL: `https://arriba.club/`
- Production server: `harmony3.sakura.ne.jp`
- Production document root: `/home/harmony3/www/arriba.club/`
- Current public root is a static LP only:
  - `index.html`
  - `style.css`
  - `assets/`
- WordPress is no longer exposed from the public root.
- `https://arriba.club/wp-login.php` should return 404.

## WordPress Backup

WordPress files and database were moved out of the public root and backed up on the server.

- Backup directory: `/home/harmony3/_backup_wp_arriba_20260527_094451/`
- Backup includes WordPress core files, `wp-content/`, `wp-config.php`, `.htaccess`, and `database.sql.gz`.
- Do not restore WordPress unless explicitly requested; normal LP updates should only touch static files.

## Source Control

- GitHub remote: `https://github.com/chitose-dev/arriba_lp.git`
- Main branch contains the deployed GA4 tag/events and the non-credentialed update manual.
- Latest pushed commit after GA4/manual work: `4e87c6b Add GA4 events and update manual`
- Production `index.html` and `assets/js/main.js` were verified to match local hashes after deployment.

## GA4

- GA4 measurement ID: `G-5YW0V5NV07`
- Tag is installed in `index.html`.
- Custom events are sent from `assets/js/main.js`:
  - `trial_cta_click`
  - `phone_click`
  - `line_click`
  - `trial_form_start`
  - `trial_form_submit`
  - `modal_open`
- Recommended GA4 key events:
  - `trial_form_submit`
  - `line_click`
  - `phone_click`

## Update Manuals

- Git-tracked manual without credentials:
  - `docs/arriba_lp_update_manual_20260527.pdf`
  - `docs/arriba_lp_update_manual.html`
- Credential-bearing client PDF was generated locally on the Desktop only and must not be committed:
  - `/Users/ogikubo/Desktop/arriba_lp_update_manual_20260527.pdf`
  - `/Users/ogikubo/Desktop/arriba_lp_update_manual_with_credentials_20260528.pdf`

## Deployment Notes

- Use SCP/FTP to `harmony3.sakura.ne.jp` when direct server access is needed.
- Upload target for static LP files:
  - `/home/harmony3/www/arriba.club/index.html`
  - `/home/harmony3/www/arriba.club/style.css`
  - `/home/harmony3/www/arriba.club/assets/`
- Do not commit credentials, password-bearing PDFs, temporary deploy plugins, or ZIP upload bundles.
