<?php
declare(strict_types=1);

mb_language('Japanese');
mb_internal_encoding('UTF-8');

$adminEmail = 'info@arriba.club';
$siteName = 'アリバサッカークラブ';

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function post_value(string $key): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        $value = implode(', ', $value);
    }
    $value = trim((string) $value);
    return str_replace(["\r", "\0"], '', $value);
}

function render_page(string $title, string $message, bool $success): void
{
    http_response_code($success ? 200 : 400);
    $class = $success ? 'success' : 'error';
    echo '<!doctype html><html lang="ja"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">';
    echo '<title>' . h($title) . ' | アリバサッカークラブ</title>';
    echo '<link rel="stylesheet" href="./style.css?v=20260612-transport-validation">';
    echo '</head><body><main class="result-page">';
    echo '<div class="result-card ' . $class . '">';
    echo '<h1>' . h($title) . '</h1>';
    echo '<p>' . nl2br(h($message)) . '</p>';
    echo '<div class="result-actions">';
    echo '<a class="submit-button" href="/">トップへ戻る</a>';
    echo '<a class="secondary-button compact" href="./">フォームへ戻る</a>';
    echo '</div></div></main></body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    render_page('送信できませんでした', 'フォームから送信してください。', false);
}

if (post_value('website') !== '') {
    render_page('送信できませんでした', '入力内容を確認して再度お試しください。', false);
}

$fields = [
    'event_date' => '体験希望日',
    'name' => '名前',
    'furigana' => 'ふりがな',
    'grade' => '学年',
    'preference' => '希望',
    'transportation' => '送迎',
    'city' => '市町村',
    'current_team' => '現在所属チーム',
    'phone' => '電話番号',
    'email' => 'メールアドレス',
    'email_confirm' => 'メールアドレス確認用',
    'guardian_name' => '保護者氏名',
    'source' => '体験会をどこで知りましたか？',
    'message' => '備考',
];

$data = [];
foreach ($fields as $key => $label) {
    $data[$key] = post_value($key);
}

$required = [
    'event_date',
    'name',
    'furigana',
    'grade',
    'preference',
    'transportation',
    'city',
    'current_team',
    'phone',
    'email',
    'email_confirm',
    'guardian_name',
    'source',
];

$errors = [];
$selectionFields = [
    'event_date',
    'grade',
    'preference',
    'transportation',
    'source',
];
foreach ($required as $key) {
    if ($data[$key] === '') {
        $action = in_array($key, $selectionFields, true) ? '選択' : '入力';
        $errors[] = $fields[$key] . 'を' . $action . 'してください。';
    }
}

$date = $data['event_date'] !== '' ? DateTime::createFromFormat('Y-m-d', $data['event_date']) : false;
if ($data['event_date'] !== '' && (!$date || $date->format('Y-m-d') !== $data['event_date'])) {
    $errors[] = '体験希望日をカレンダーから選択してください。';
}

if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'メールアドレスの形式を確認してください。';
}

if (
    $data['email'] !== ''
    && $data['email_confirm'] !== ''
    && $data['email'] !== $data['email_confirm']
) {
    $errors[] = 'メールアドレスと確認用メールアドレスが一致していません。';
}

$allowedPreferences = [
    '2027年度ジュニアユース体験会',
    '今年度ジュニアユース(現中学生)選手',
    'ジュニア(小学生)選手',
    '平日スクール',
];
if ($data['preference'] !== '' && !in_array($data['preference'], $allowedPreferences, true)) {
    $errors[] = '希望を選択し直してください。';
}

$allowedTransportation = [
    'JR川西池田駅から利用する',
    '能勢口駅近辺から利用する',
    '利用しない',
];
if ($data['transportation'] !== '' && !in_array($data['transportation'], $allowedTransportation, true)) {
    $errors[] = '送迎を選択し直してください。';
}

if ($errors !== []) {
    render_page(
        '送信できませんでした',
        "以下の項目を確認してください。\n・" . implode("\n・", array_values(array_unique($errors))),
        false
    );
}

$data['message'] = $data['message'] !== '' ? $data['message'] : 'なし';

$lines = [
    '以下の内容で体験会のお申し込みがありました。',
    '',
    '---------------------',
];

foreach ($fields as $key => $label) {
    if ($key === 'email_confirm') {
        continue;
    }
    $lines[] = $label . ': ' . $data[$key];
}

$lines[] = '---------------------';
$adminBody = implode("\n", $lines);

$customerBody = implode("\n", [
    $data['name'] . ' 様',
    $data['guardian_name'] . ' 様',
    '',
    'この度は体験会にお申し込みいただき、誠にありがとうございます。',
    '以下の内容でお申し込みを受け付けました。',
    '',
    '---------------------',
    '体験希望日: ' . $data['event_date'],
    '名前: ' . $data['name'],
    'ふりがな: ' . $data['furigana'],
    '学年: ' . $data['grade'],
    '希望: ' . $data['preference'],
    '送迎: ' . $data['transportation'],
    '市町村: ' . $data['city'],
    '現在所属チーム: ' . $data['current_team'],
    '電話番号: ' . $data['phone'],
    'メールアドレス: ' . $data['email'],
    '保護者氏名: ' . $data['guardian_name'],
    '体験会をどこで知りましたか？: ' . $data['source'],
    '備考: ' . $data['message'],
    '---------------------',
    '',
    '体験会当日にお会いできることを楽しみにしております。',
    '何かご不明な点がございましたら、お気軽にお問い合わせください。',
    'どうぞよろしくお願い致します。',
    '',
    $siteName,
]);

$encodedSite = mb_encode_mimeheader($siteName, 'UTF-8');
$adminHeaders = implode("\r\n", [
    'MIME-Version: 1.0',
    'From: ' . $encodedSite . ' <' . $adminEmail . '>',
    'Reply-To: ' . $data['email'],
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);
$customerHeaders = implode("\r\n", [
    'MIME-Version: 1.0',
    'From: ' . $encodedSite . ' <' . $adminEmail . '>',
    'Reply-To: ' . $adminEmail,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$mailParams = '-f' . $adminEmail;
$adminSent = mb_send_mail($adminEmail, '体験会の新規お申込みがありました', $adminBody, $adminHeaders, $mailParams);
$customerSent = mb_send_mail($data['email'], '体験会のお申込みありがとうございます', $customerBody, $customerHeaders, $mailParams);

$logDir = __DIR__ . '/submissions';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
if (is_dir($logDir) && is_writable($logDir)) {
    $fp = @fopen($logDir . '/applications.csv', 'ab');
    if ($fp) {
        fputcsv($fp, array_merge([date('c')], array_values($data)));
        fclose($fp);
    }

    $mailLog = @fopen($logDir . '/mail_results.log', 'ab');
    if ($mailLog) {
        fwrite($mailLog, sprintf(
            "[%s] admin=%s customer=%s to=%s name=%s\n",
            date('c'),
            $adminSent ? 'ok' : 'failed',
            $customerSent ? 'ok' : 'failed',
            $data['email'],
            $data['name']
        ));
        fclose($mailLog);
    }
}

if (!$adminSent) {
    render_page('送信できませんでした', 'メッセージの送信に失敗しました。時間をおいて再度お試しいただくか、LINEまたはお電話でお問い合わせください。', false);
}

$message = '体験会のお申し込みを受け付けました。';
if (!$customerSent) {
    $message .= "\n申込者控えメールの送信に失敗した可能性がありますが、クラブへの申込通知は送信されています。";
}

render_page('送信完了', $message, true);
