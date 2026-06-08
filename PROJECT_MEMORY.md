# ARRIBA LP Project Memory

Last updated: 2026-06-08

## Current Production State

- Production URL: `https://arriba.club/`
- Production server: `harmony3.sakura.ne.jp`
- Production document root: `/home/harmony3/www/arriba.club/`
- Current public root is a static LP only:
  - `index.html`
  - `style.css`
  - `assets/`
  - `practice_session/`
- WordPress is no longer exposed from the public root.
- `https://arriba.club/wp-login.php` should return 404.
- Verified on 2026-05-28 10:28 JST:
  - Production `index.html`, `style.css`, and `assets/js/main.js` match local SHA-256 hashes.
  - `https://arriba.club/` returns 200.
  - `https://arriba.club/wp-login.php` returns 404.
  - Local static preview at `http://127.0.0.1:8088/` returns 200.

## WordPress Backup

WordPress files and database were moved out of the public root and backed up on the server.

- Backup directory: `/home/harmony3/_backup_wp_arriba_20260527_094451/`
- Backup includes WordPress core files, `wp-content/`, `wp-config.php`, `.htaccess`, and `database.sql.gz`.
- Do not restore WordPress unless explicitly requested; normal LP updates should only touch static files.

## Source Control

- GitHub remote: `https://github.com/chitose-dev/arriba_lp.git`
- Main branch contains the deployed GA4 tag/events, the non-credentialed update manual, and the June 2026 LP content/layout rebuild.
- Current local and `origin/main` head at the 2026-06-08 check: `0f3b05a Use current sixth grade wording`.
- Production `index.html` and `assets/js/main.js` were verified to match local hashes after the GA4/manual deployment; production has not been re-verified in this memory after the June LP rebuild.

## GA4

- GA4 measurement ID: `G-5YW0V5NV07`
- Tag is installed in `index.html`.
- Custom events are sent from `assets/js/main.js`:
  - `trial_cta_click`
  - `phone_click`
  - `line_click`
  - `modal_open`
- LP CTA clicks to `/practice_session/` are tracked as `trial_cta_click`.
- The old embedded LP trial form and LINE copy dialog were removed from the LP on 2026-05-30.
- Recommended GA4 key events:
  - `trial_cta_click`
  - `line_click`
  - `phone_click`

## June 2026 LP Rebuild

- The LP was updated on 2026-06-04 and 2026-06-05 with revised recruitment copy, new `assets/img/arriba-2026/` images, modal-heavy detail sections, and mobile hero/CTA refinements.
- Current top-level LP copy uses audience labels such as `現在中学生`, `現在6年生`, `現在小学生`, and `スクール希望`.
- Current stylesheet and script cache versions in `index.html` are `20260604-arriba-rebuild`.
- Local verification on 2026-06-08:
  - `git status --short` was clean before this memory update.
  - `http://127.0.0.1:8088/` returned 200 via `python3 -m http.server`.
  - `node --check assets/js/main.js` passed.
  - Local referenced assets/pages, page anchors, and modal `data-modal` targets all resolved.
  - PHP CLI was not installed locally, so `practice_session/*.php` lint could not be run on this machine.
- Additional local update on 2026-06-08:
  - Four recruitment entry items were moved into independent blocks in this order: `ジュニアユース募集`, `2027年度体験会`, `ジュニア募集`, `花屋敷校スクール`.
  - New downloaded images were copied into `assets/img/arriba-2026/` with ASCII filenames.
  - Modal hero images use `modal-*.jpg` assets at a 16:9 layout with no letterbox padding from CSS.
  - Added modal triggers/assets for FAQ, final CTA, and footer club information.
  - Local checks passed for HTML references, modal targets, anchor targets, `node --check assets/js/main.js`, and Playwright screenshots for desktop/mobile views.

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
  - `/home/harmony3/www/arriba.club/practice_session/`
- Do not commit credentials, password-bearing PDFs, temporary deploy plugins, or ZIP upload bundles.

## Practice Session Form

- Rebuilt and deployed `/practice_session/` on 2026-05-30 after the old WordPress page returned 404.
- Current files:
  - `practice_session/index.php`
  - `practice_session/submit.php`
  - `practice_session/style.css`
- The existing LP no longer contains an embedded application form.
- All public LP application CTAs now point to `/practice_session/`.
- Form behavior:
  - Normal server-side PHP form post to `practice_session/submit.php`.
  - Admin notification is sent to `info@arriba.club`.
  - Applicant confirmation email is sent to the submitted email address.
  - Submissions are also appended to `practice_session/submissions/applications.csv` on production when writable.
  - Mail send results are appended to `practice_session/submissions/mail_results.log` on production when writable.
- Mail delivery notes:
  - Uses `mb_send_mail()`.
  - Uses `From: info@arriba.club` and envelope sender `-finfo@arriba.club`.
  - If applicant confirmation mail still fails to arrive despite `customer=ok` in `mail_results.log`, switch to authenticated SMTP using the `info@arriba.club` mailbox.
- Form fields include:
  - calendar date field for `event_date`.
  - applicant name, furigana, grade, preference, city, current team, phone, email, email confirmation, guardian name, source, and notes.
- 2027 junior youth preference text is `2027年度ジュニアユース体験会`; do not add grade text there unless explicitly requested.
- Header/back links use `トップへ戻る`, not `LPへ戻る`.
- Result page primary button is `トップへ戻る`; smaller secondary button is `フォームへ戻る`.
- Current practice form CSS cache version: `style.css?v=20260530-3`.
- Production verification on 2026-05-30:
  - `https://arriba.club/practice_session/` returns 200.
  - PHP lint passed for `practice_session/index.php` and `practice_session/submit.php`.
  - POST test returned the success screen.
  - Server mail log showed `admin=ok customer=ok` for a Gmail test submission.
- Production backup before the 2026-05-30 form rebuild:
  - `/home/harmony3/_backup_static_arriba_20260530_180032`

## Document Download Pages

- Added local static document download pages on 2026-05-28:
  - `/arriba/` entrance page.
  - `/2026JY/`, `/2026J/`, `/2027JY/`, `/hana/`, `/kojin/` category pages.
  - PDF files live under each category's `files/` directory with URL-safe English filenames.
- Category pages and `robots.txt` include noindex/disallow signals; the public LP does not link to these pages.
- Deployed these pages and files to production on 2026-05-28.
- Production verification:
  - `https://arriba.club/arriba/` originally used Basic authentication, then authentication was removed on request.
  - `https://arriba.club/arriba/` returns 200 without authentication after removal.
  - Category pages and sample PDF return 200.
