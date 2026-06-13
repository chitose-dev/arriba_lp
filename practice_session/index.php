<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>無料体験・選手募集 | アリバサッカークラブ</title>
  <meta name="description" content="アリバサッカークラブの体験会申込フォームです。体験希望日を選び、必要事項を入力して送信してください。">
  <meta name="robots" content="noindex, follow">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="アリバサッカークラブ">
  <meta property="og:title" content="無料体験・選手募集 | アリバサッカークラブ">
  <meta property="og:description" content="現在中学生、現在6年生、小学生、花屋敷スクールの無料体験を受け付けています。">
  <meta property="og:url" content="https://arriba.club/practice_session/">
  <meta property="og:image" content="https://arriba.club/assets/img/ogp-arriba-brochure.jpg?v=20260612">
  <meta property="og:image:secure_url" content="https://arriba.club/assets/img/ogp-arriba-brochure.jpg?v=20260612">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="アリバサッカークラブ 無料体験・選手募集パンフレット">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="無料体験・選手募集 | アリバサッカークラブ">
  <meta name="twitter:description" content="現在中学生、現在6年生、小学生、花屋敷スクールの無料体験を受け付けています。">
  <meta name="twitter:image" content="https://arriba.club/assets/img/ogp-arriba-brochure.jpg?v=20260612">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;800;900&amp;display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
  <link rel="stylesheet" href="./style.css?v=20260612-transport-validation">
  <script src="./validation.js?v=20260612-transport-validation" defer></script>
</head>
<body>
  <header class="practice-header">
    <a class="brand" href="/">
      <img src="/assets/img/logo.png" alt="アリバサッカークラブ">
    </a>
    <a class="back-link" href="/">トップへ戻る</a>
  </header>

  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">TRIAL SESSION</p>
        <h1>体験会案内</h1>
        <p>体験会への参加をご希望される方は、下記フォームよりお申し込みください。</p>
      </div>
      <figure>
        <img src="/assets/img/trial.jpg" alt="体験練習でボールを追う選手">
      </figure>
    </section>

    <section class="form-section" id="form">
      <div class="section-heading">
        <h2 class="application-heading">↓ こちらからお申し込み下さい ↓</h2>
        <p>送信後、入力いただいたメールアドレスへ控えを自動送信します。</p>
      </div>

      <div class="form-error-summary" id="form-error-summary" role="alert" aria-live="assertive" tabindex="-1" hidden>
        <p>入力内容を確認してください</p>
        <ul></ul>
      </div>

      <form class="practice-form" action="./submit.php" method="post" novalidate>
        <input type="text" name="website" class="hp-field" tabindex="-1" autocomplete="off">

        <label>
          <span>体験希望日 <strong>※</strong></span>
          <input type="date" name="event_date" required>
        </label>

        <label>
          <span>名前 <strong>※</strong></span>
          <input type="text" name="name" required autocomplete="name">
        </label>

        <label>
          <span>ふりがな <strong>※</strong></span>
          <input type="text" name="furigana" required>
        </label>

        <label>
          <span>学年 <strong>※</strong></span>
          <select name="grade" required>
            <option value="">以下から選択してください</option>
            <option>中学3年生</option>
            <option>中学2年生</option>
            <option>中学1年生</option>
            <option>小学6年生</option>
            <option>小学5年生</option>
            <option>小学4年生</option>
            <option>小学3年生</option>
            <option>小学2年生</option>
            <option>小学1年生</option>
            <option>新小学1年生</option>
          </select>
        </label>

        <fieldset>
          <legend>希望 <strong>※</strong></legend>
          <label><input type="radio" name="preference" value="2027年度ジュニアユース体験会" required checked> 2027年度ジュニアユース体験会</label>
          <label><input type="radio" name="preference" value="今年度ジュニアユース(現中学生)選手"> 今年度ジュニアユース(現中学生)選手</label>
          <label><input type="radio" name="preference" value="ジュニア(小学生)選手"> ジュニア(小学生)選手</label>
          <label><input type="radio" name="preference" value="平日スクール"> 平日スクール</label>
        </fieldset>

        <fieldset>
          <legend>送迎 <strong>※</strong></legend>
          <label><input type="radio" name="transportation" value="JR川西池田駅から利用する" required> JR川西池田駅から利用する</label>
          <label><input type="radio" name="transportation" value="能勢口駅近辺から利用する"> 能勢口駅近辺から利用する</label>
          <label><input type="radio" name="transportation" value="利用しない"> 利用しない</label>
        </fieldset>

        <label>
          <span>市町村 <strong>※</strong></span>
          <input type="text" name="city" required>
        </label>

        <label>
          <span>現在所属チーム <strong>※</strong></span>
          <input type="text" name="current_team" required>
        </label>

        <label>
          <span>電話番号 <strong>※</strong></span>
          <input type="tel" name="phone" required inputmode="tel" autocomplete="tel">
        </label>

        <label>
          <span>メールアドレス <strong>※</strong></span>
          <input type="email" name="email" required autocomplete="email">
        </label>

        <label>
          <span>メールアドレス確認用 <strong>※</strong></span>
          <input type="email" name="email_confirm" required autocomplete="email">
        </label>

        <label>
          <span>保護者氏名 <strong>※</strong></span>
          <input type="text" name="guardian_name" required>
        </label>

        <label>
          <span>体験会をどこで知りましたか？ <strong>※</strong></span>
          <select name="source" required>
            <option>ホームページ</option>
            <option>インスタグラム</option>
            <option>X</option>
            <option>知り合いに聞いた</option>
            <option>その他</option>
          </select>
        </label>

        <label class="wide">
          <span>備考</span>
          <textarea name="message" rows="4"></textarea>
        </label>

        <div class="notice wide">
          <p>※ご注意</p>
          <ul>
            <li>お申し込みいただきました個人情報については、アリバサッカークラブにて適切に管理し、アリバサッカークラブからのご連絡及びイベントのご案内以外には利用しません。</li>
            <li>体験中はアリバコーチ、スタッフからのコーチング及び運営に関する指示の遵守をお願いします。</li>
            <li>体験にお越しの際はサッカーが出来る服装、レガース及び水筒等をご持参下さい。</li>
            <li>体験中のけが等についてアリバサッカークラブは一切責任を負いません。自己の責任において対応をお願いします。</li>
          </ul>
        </div>

        <button class="submit-button wide" type="submit">送信する</button>
      </form>
    </section>

    <section class="line-section">
      <div>
        <p class="kicker">LINE</p>
        <h2>LINEで相談する場合</h2>
        <p>LINEの場合はお友達追加していただき、下記の必要事項をトーク画面より送信してください。</p>
        <ul>
          <li>体験会の希望日時</li>
          <li>名前（ふりがな）</li>
          <li>学年</li>
          <li>市町村</li>
          <li>現在所属チーム</li>
          <li>送迎利用の有無</li>
          <li>電話番号</li>
          <li>保護者氏名</li>
        </ul>
      </div>
      <a class="line-button" href="https://lin.ee/8yWT6iB">LINEで相談する</a>
    </section>
  </main>
</body>
</html>
