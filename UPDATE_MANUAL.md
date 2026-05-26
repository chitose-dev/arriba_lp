# ARRIBA LP 更新マニュアル

このマニュアルは、現在のWordPress環境をバックアップ退避し、完成版の静的LPで `arriba.club` の公開内容を置き換えるための作業方針とFTP更新手順です。
認証情報はこのファイルには記載しません。FTP、サーバーパネル、WordPress管理者のID/パスワードは別管理してください。

## 1. 現WordPressサイトの確認結果

2026-05-26にPlaywrightでWordPress管理画面へログインし、読み取りのみで確認しました。サイトの変更作業は行っていません。

- 公開URL: `https://arriba.club/`
- CMS: WordPress
- 表示設定:
  - フロントページ: 固定ページ「トップ」
  - 投稿ページ: 固定ページ「News」
  - パーマリンク: `/%postname%/`
- 現在のテーマ:
  - 有効テーマ: `SWELL CHILD`
  - 親テーマ: `SWELL`
- 主な管理メニュー:
  - 投稿
  - イベント
  - メディア
  - 固定ページ
  - スライダー
  - LP
  - ブログパーツ
  - SWELL設定
  - お問い合わせ
  - SEO PACK
  - WP Mail SMTP
- 固定ページ:
  - 21件
  - 公開済み17件、下書き4件
  - 「トップ」がフロントページ
  - 「News」が投稿ページ
- 投稿:
  - 9件
  - うち3件はパスワード保護中の書式ダウンロード記事
- LPカスタム投稿:
  - 4件
  - 公開済み2件、下書き2件
  - 「アリバサッカークラブ体験会」あり
- イベント:
  - 385件
  - The Events Calendarで管理されている可能性が高い
- 主な有効プラグイン:
  - All-in-One WP Migration and Backup
  - Contact Form 7
  - EasyMedia - Increase Media Upload Size
  - Redirection
  - SEO SIMPLE PACK
  - The Events Calendar
  - WP Mail SMTP
  - XO Slider

## 2. 完成版LPの構成

このリポジトリは静的LPです。公開に必要な主なファイルは次の通りです。

```text
index.html
style.css
assets/
  img/
  js/main.js
```

`assets/video/arriba-trial.mp4` は現状のHTML/CSS/JSから参照されていません。動画ブロックを削除した完成版として公開する場合、サーバーへアップロードしなくても問題ありません。

## 3. 置き換え方針

今回の方針は、WordPressテーマ化ではなく、公開ディレクトリの中身を完成版LPに置き換える方法です。

WordPress本体、テーマ、プラグイン、投稿、イベント、メディアは公開ディレクトリから退避します。削除ではなくバックアップフォルダへ移動、またはローカルへ全ダウンロードして保管します。

置き換え後の公開ディレクトリは、基本的に次の構成にします。

```text
public_html/
  index.html
  style.css
  assets/
    img/
    js/main.js
```

置き換え後は、通常 `https://arriba.club/wp-login.php` にはアクセスできなくなります。WordPress管理画面、投稿、イベント、Contact Form 7、SWELL設定なども公開側では使わない前提です。

戻せる状態を維持するため、既存WordPressファイルとデータベースのバックアップは必須です。

## 4. FTPで確認するサーバー構成

FTP接続後、まずドメイン `arriba.club` の公開ディレクトリを特定します。サーバーによって名前が異なります。

よくある候補:

```text
/public_html/
/www/
/html/
/home/{account}/public_html/
/home/{account}/arriba.club/public_html/
/domains/arriba.club/public_html/
```

WordPressが入っている公開ディレクトリには、通常このようなファイルがあります。

```text
index.php
.htaccess
wp-config.php
wp-admin/
wp-content/
wp-includes/
```

重要なディレクトリ:

```text
wp-content/themes/
wp-content/themes/swell/
wp-content/themes/swell_child/
wp-content/plugins/
wp-content/uploads/
```

`wp-content/uploads/` は画像やメディアの保管場所なので、削除や上書きはしません。

## 5. FTP更新手順: WordPress環境を静的LPで置き換える

### 5.1 事前バックアップ

1. FTPで公開ディレクトリを確認する
2. All-in-One WP MigrationでWordPress全体のバックアップを取得する
3. サーバーパネル側でデータベースバックアップを取得する
4. FTPでWordPressファイル一式をローカルへダウンロードする
5. `wp-config.php`、`.htaccess`、`wp-content/uploads/` がバックアップに含まれていることを確認する

最低限バックアップ対象に含めるもの:

```text
index.php
.htaccess
wp-config.php
wp-admin/
wp-content/
wp-includes/
```

### 5.2 サーバー上で既存WordPressを退避

公開ディレクトリ直下で、既存WordPressをバックアップフォルダへ移動します。FTPソフトでリネームや移動ができる場合は、削除せずにサーバー上へ残します。

例:

```text
public_html/
  _backup_wp_20260526/
    index.php
    .htaccess
    wp-config.php
    wp-admin/
    wp-content/
    wp-includes/
```

移動できないサーバーの場合は、ローカルに全バックアップを取った後、公開ディレクトリ直下のWordPressファイルを削除してからLPをアップロードします。

### 5.3 静的LPをアップロード

公開ディレクトリ直下に以下を配置します。

```text
public_html/
  index.html
  style.css
  assets/
    img/
    js/main.js
```

動画を使わない完成版なら、`assets/video/` はアップロード対象外で構いません。

アップロード後、`index.html` 内の本番URLを確認します。

- `og:url` を `https://arriba.club/` にする
- `og:image` を `https://arriba.club/assets/img/ogp-arriba-trial-2027.jpg` にする
- `twitter:image` も同じ本番URLにする
- CSS/JS/画像のパスが `./assets/...` のまま動くことを確認する

### 5.4 `.htaccess` の扱い

WordPressの `.htaccess` はバックアップへ退避します。静的LPだけにする場合、公開ディレクトリ直下の `.htaccess` は必要最小限にします。

まずは `.htaccess` なしで表示確認します。必要があれば、HTTPSリダイレクトやキャッシュ制御だけを追加します。

WordPressのリライト設定が残っていると、静的LPの表示や404に影響するため、WordPress用 `.htaccess` はそのまま戻さないでください。

### 5.5 確認項目

- `https://arriba.club/` で完成版LPが表示される
- 画像が全て表示される
- CSSが崩れていない
- `assets/js/main.js` が読み込まれている
- スマホで横スクロールが出ない
- モーダルCTAがスマホ下部で常時表示される
- iPhone Safariの下部ナビゲーションとCTAが干渉しない
- 電話リンク `tel:09095484524` が動く
- LINEまたは申込導線が意図したURLへ遷移する
- OGP画像が `https://arriba.club/` の画像になっている
- `https://arriba.club/wp-login.php` にアクセスして、WordPressが公開されていない状態になっていることを確認する
- 存在しないURLが不自然なWordPress画面に飛ばないことを確認する

## 6. 作業後のサーバー構成

作業後は、公開ディレクトリ直下にWordPress本体が残っていない状態にします。

```text
public_html/
  index.html
  style.css
  assets/
    img/
    js/main.js
  _backup_wp_20260526/
    index.php
    .htaccess
    wp-config.php
    wp-admin/
    wp-content/
    wp-includes/
```

サーバー上にバックアップフォルダを置けない場合は、ローカルバックアップのみでも可能です。その場合、復旧に時間がかかるため、作業直後の確認を丁寧に行います。

## 7. ロールバック手順

1. 現在の静的LPファイルを退避する
2. `_backup_wp_YYYYMMDD/` の中身を公開ディレクトリ直下へ戻す
3. `index.php`、`.htaccess`、`wp-config.php`、`wp-admin/`、`wp-content/`、`wp-includes/` が直下に戻っていることを確認する
4. `https://arriba.club/wp-login.php` にアクセスできることを確認する
5. `https://arriba.club/` を確認する

## 8. 更新時に触らないもの

バックアップ前に以下は削除、上書きしません。置き換え作業時は、バックアップ完了後に公開ディレクトリから退避します。

```text
wp-config.php
.htaccess
wp-content/uploads/
wp-content/plugins/
wp-content/themes/swell/
wp-content/themes/swell_child/
```

特に `wp-config.php` はデータベース接続情報を含むため、外部共有しないでください。

## 9. 次に必要な情報

実作業に入る前に、以下を確認します。

- FTPまたはSFTPの接続情報
- サーバーの管理画面情報
- `arriba.club` の公開ディレクトリ
- サーバー上にバックアップフォルダを置けるか
- データベースバックアップの取得方法
- 申込先URL、LINE URL、電話番号、OGP画像の最終確認
- キャッシュ機能、CDN、WAFの有無

## 10. 推奨する進め方

今回のLP公開は、次の順番で進めます。

1. FTPで公開ディレクトリを確認する
2. All-in-One WP MigrationでWordPress全体をバックアップする
3. サーバーパネルまたはFTPでWordPressファイルとDBをバックアップする
4. 公開ディレクトリ直下のWordPressファイルをバックアップフォルダへ退避する
5. 完成版LPの `index.html`、`style.css`、`assets/` を公開ディレクトリ直下へアップロードする
6. `https://arriba.club/` をPCとスマホで確認する
7. 問題があればバックアップからWordPressを戻す

WordPress化は行いません。公開ディレクトリを静的LPの構成へ置き換える前提です。
