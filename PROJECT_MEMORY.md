# ARRIBA LP Project Memory

Last updated: 2026-06-16

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
- Latest production update on 2026-06-13:
  - `index.html`, `style.css`, and `practice_session/index.php` are deployed.
  - Production CSS cache version is `20260613-responsive-fix`.
  - Production was checked directly at widths from 390px through 1440px with no horizontal page overflow.
  - Production `index.html` and `style.css` matched the local SHA-256 hashes after deployment.
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
- Main branch contains the deployed GA4 tag/events, the June 2026 LP rebuild, the responsive fixes, and the current practice form.
- Latest production commit: `4e7c20f Use Japanese club name in trial form`.
- Recent layout commits:
  - `47e0cc8 Fix tablet responsive layout`
  - `3c42943 Improve desktop LP section layout`
- GitHub Pages preview: `https://chitose-dev.github.io/arriba_lp/`
- GitHub Pages was verified after commit `47e0cc8` at 876px, 1024px, 1100px, 1200px, and 1440px.

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

- The LP was updated through 2026-06-09 with revised recruitment copy, new `assets/img/arriba-2026/` images, modal-heavy detail sections, and responsive layout refinements.
- Current top-level LP copy uses audience labels such as `現在中学生`, `現在6年生`, `現在小学生`, and `スクール希望`.
- Current cache versions in `index.html`:
  - CSS: `20260613-responsive-fix`
  - JavaScript: `20260611-sentence-breaks`
  - Modal article fetch: `20260610-schedules`
- Local verification on 2026-06-08:
  - `git status --short` was clean before this memory update.
  - `http://127.0.0.1:8088/` returned 200 via `python3 -m http.server`.
  - `node --check assets/js/main.js` passed.
  - Local referenced assets/pages, page anchors, and modal `data-modal` targets all resolved.
  - PHP CLI was not installed locally, so `practice_session/*.php` lint could not be run on this machine.
- Additional local update on 2026-06-08:
  - Four recruitment entry items were moved into independent blocks in this order: `ジュニアユース募集`, `2027年度体験会`, `ジュニア募集`, `花屋敷スクール`.
  - New downloaded images were copied into `assets/img/arriba-2026/` with ASCII filenames.
  - Modal hero images use `modal-*.jpg` assets at a 16:9 layout with no letterbox padding from CSS.
  - Added modal triggers/assets for FAQ, final CTA, and footer club information.
  - Local checks passed for HTML references, modal targets, anchor targets, `node --check assets/js/main.js`, and Playwright screenshots for desktop/mobile views.
- Additional local update on 2026-06-09:
  - The duplicate four-card recruitment list was removed from the entry section. Keep the main entry image, explanatory modal teaser, top four-way navigation, and independent recruitment blocks.
  - The 13 supplied long-form articles are stored in `assets/content/modal-articles.md` and loaded into the corresponding modals.
  - Supported article markup is `###` for headings, `>` for lead boxes, `-` for lists, `!` for note boxes, `**bold**`, `__underline__`, `==red marker==`, and `^^blue emphasis^^`.
  - Mobile modal structure is intentionally split into a scrolling `.modal-scroll` area and a direct-child `.modal-footer-actions` area. The two action buttons remain visible at the bottom while only the article area scrolls.
  - Do not move the mobile modal footer back to the viewport or modal root. The former viewport-fixed approach caused an iPhone Safari blank area with dynamic viewport/call-status UI.
  - Do not alter mobile layout or modal geometry unless explicitly requested. The verified 390px-wide layout has a two-column action footer and unchanged panel/scroll/footer dimensions.
  - Desktop modal readability is handled only in `@media (min-width: 901px)`: reduced hero-image height, wider panel, controlled article line length, and centered related links/actions.
  - Desktop checks passed at 1024x768, 1440x900, and 1920x1080. Mobile regression checks passed at 390x844 and 390x650.
  - All four recruitment titles use the same blue first-view styling and explicit two-line spans: `ジュニアユース募集 / 現在中学生`, `2027年度体験会 / 現在6年生`, `ジュニア募集 / 現在小学生`, and `花屋敷スクール / 火曜・水曜`. Verified without overflow at 320px, 390px, 430px, and 1024px widths.
  - Every main-page section `h2` and the hero title use blue `#005bac` with font weight 500 and no text shadow. This applies to all 15 page sections. Modal article headings remain black.
  - Main-page section headings are larger than the earlier hero-matched baseline. JavaScript sets `--heading-length` and, when needed, `--heading-fit-size` from the actual rendered width so longer titles scale down only enough to fit.
  - Phone section titles start at a unified 24px. The measured-fit script reduces only a single-line title that actually exceeds its available width.
  - Main-page titles retain blue and weight 500, but use relaxed negative tracking (`-0.035em`, phone `-0.025em`) and `1.12` line-height for readability.
  - The activity schedule is grouped by junior youth, junior lower grades, junior upper grades, trial sessions, and Hanayashiki School 1/2 in the place section and its modal.
  - The official note block sits after FAQ and before the final CTA, linking to `https://note.com/arriba`. Desktop shows a tappable button and `assets/img/arriba-note-qr.png`; phones show the direct button without the redundant QR.
  - The official note block begins with four equal audience links for current junior-high students, current sixth graders, elementary students, and school participants.
  - Mobile modal article copy uses slightly larger type and relaxed line-height; schedule details use lists to create clear breaks.
  - Modal prose is left-aligned and the renderer inserts a line break after each Japanese full stop `。`, except at the end of a paragraph. Headings and list items are unchanged.
  - Non-recruitment headings do not wrap except the long final CTA, which may wrap naturally on narrow screens. The ENTRY title is forced to one line, and its mobile text column is widened so it remains prominent at 320px. Recruitment headings retain their intentional title/target structure.
  - Main section title-to-copy spacing follows the hero rhythm: 12px on phones, 14px through 1100px, and 28px on wide desktop. Section-heading bottom margins are reset so they do not stack with paragraph margins.
  - On phones, circle-list labels such as `体験会の概要` are 0.82rem and the text inside the circles uses `clamp(0.66rem, 3.1vw, 0.84rem)`. Circle dimensions and layout are unchanged.
  - Current confirmed practice schedule:
    - 火・水・金: 小学生低学年 17:30-19:00、小学生高学年 18:00-20:00、中学生 18:00-20:00
    - 日・休・祝: 主に近隣のグラウンドにて試合
  - Client confirmation message: `/Users/ogikubo/Desktop/アリバLP_クライアント確認依頼.txt`

## June 13 Responsive and Delivery Update

- Desktop sections were rebuilt to reduce unused vertical space:
  - Main split sections use text on the left and images on the right.
  - Circle points remain a compact single row on desktop.
  - Career and place buttons stay with their left-side copy instead of dropping below the image.
  - Section backgrounds extend to the viewport edges.
- The final application block:
  - Uses the left-copy/right-image layout on PC and tablet.
  - Uses `assets/img/arriba-2026/modal-final-cta.jpg` as a 16:9 image on widths of 601px and above.
  - Keeps the existing phone layout below 601px.
  - Uses explicit title lines: `まずは体験で、` and `練習の空気を。`.
- Tablet/narrow desktop fixes apply only from 601px through 1100px:
  - Circle items use compact fixed responsive sizes and stay on one row.
  - Trial buttons remain side by side without overlapping the image.
  - Final CTA image, buttons, and audience links no longer overlap.
- Responsive verification completed on 2026-06-13:
  - Automated widths: 320, 390, 600, 601, 768, 876, 900, 901, 1024, 1100, 1101, 1200, 1280, 1366, 1440, 1600, and 2048px.
  - Additional portrait/landscape viewport checks covered phone, tablet, narrow desktop, standard desktop, and large desktop.
  - Confirmed no page-level horizontal overflow, no image/action overlap, and no multi-row circle lists at 601px and above.
- Production backups for the final June 13 changes are stored locally under:
  - `/Users/ogikubo/Desktop/arriba_production_backups/`
- Current delivery files:
  - `/Users/ogikubo/Desktop/千歳開発/取引先/アリバ/納品/アリバサッカークラブLP_最新版納品_20260613.zip`
  - `/Users/ogikubo/Desktop/千歳開発/取引先/アリバ/納品/アリバサッカークラブLP_納品仕様書_20260613.pdf`
- The delivery ZIP was rebuilt after the latest form wording change and passed `unzip -t`.
- The delivery specification is a visually checked two-page A4 PDF. It documents the PC/tablet two-column layout and unchanged phone layout.

## June 16 Client Revision

- GitHub update only, not yet deployed to production:
  - Added the supplied 2027 junior-youth recruitment header image as `assets/img/arriba-2026/jy-2027-header.jpg`.
  - The supplied image is used in the modal header image position for `modal-trial-2027` only.
  - Do not insert this image as a separate top-of-page banner.
  - Updated the CSS cache version in `index.html` to `20260616-modal-header-title-fix`.
  - On phone widths, `.recruit-title` keeps the target labels visible at one shared size, with the recruitment blocks using a slightly wider text column so each title fits on one line:
    - `ジュニアユース募集 現在中学生`
    - `2027年度体験会 現在6年生`
    - `ジュニア募集 現在小学生`
    - `花屋敷スクール 火曜・水曜`
- Local checks completed on 2026-06-16:
  - `node --check assets/js/main.js` passed.
  - HTML local asset references and modal IDs resolved with no missing references.
  - `git diff --check` passed.
  - Local `http://127.0.0.1:8088/` and the new header image returned 200.
  - Chrome device emulation at 390px and 320px showed no page-level horizontal overflow and no `.recruit-title` wrapping/overflow.
- Deployment note:
  - SSH to `harmony3.sakura.ne.jp` timed out during banner exchange from this environment on 2026-06-16.

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
  - applicant name, furigana, grade, preference, transportation, city, current team, phone, email, email confirmation, guardian name, source, and notes.
  - transportation is a required radio choice: `JR川西池田駅から利用する`, `能勢口駅近辺から利用する`, or `利用しない`.
  - client-side validation shows an error summary plus an inline reason at each invalid field; server-side validation returns the exact invalid field names as a fallback.
- 2027 junior youth preference text is `2027年度ジュニアユース体験会`; do not add grade text there unless explicitly requested.
- Header/back links use `トップへ戻る`, not `LPへ戻る`.
- Result page primary button is `トップへ戻る`; smaller secondary button is `フォームへ戻る`.
- Current practice form asset cache version: `20260612-transport-validation` for CSS and JavaScript.
- Form-facing club-name text is standardized as `アリバサッカークラブ`.
  - The logo alternative text and both caution statements were updated on 2026-06-13.
  - Production form HTML was checked and contains no visible `ARRIBAサッカークラブ` string.
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
