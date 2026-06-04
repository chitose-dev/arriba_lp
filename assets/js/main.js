const lineUrl = "https://lin.ee/8yWT6iB";

document.documentElement.classList.add("js");

const contentSections = [
  {
    id: "entry",
    kicker: "ENTRY",
    title: "お子さまの学年・目的に合わせて、入口を選んでください。",
    lead: "アリバでは、現在中学生、現6年生、現在小学生、スクール希望者で案内内容を分けています。同じサッカーでも、今必要な環境、体験の目的、申し込む理由は違います。",
    cards: [
      {
        title: "ジュニアユース募集 現在中学生",
        text: "今の環境で、本当に次のステージへ進めるのか。そう感じている中学生へ。アリバでは、途中入部・移籍相談を受け付けています。",
        href: "#junior-youth"
      },
      {
        title: "2027年度ジュニアユース体験会 現6年生",
        text: "中学年代で伸びる準備は、小学生のうちから始まります。現6年生対象。2027年度ジュニアユース体験会を受付中です。",
        href: "#trial-2027"
      },
      {
        title: "ジュニア募集 現在小学生",
        text: "小学生年代で、考えてプレーする土台を作る。ただ上手く蹴るだけではなく、試合で使える判断力まで育てます。",
        href: "#junior"
      },
      {
        title: "花屋敷校スクール募集",
        text: "チーム登録なしで、平日に上手くなる。火曜、水曜、火曜と水曜から選べる花屋敷校スクールです。",
        href: "#school"
      }
    ]
  },
  {
    id: "policy",
    kicker: "POLICY",
    title: "指導理念",
    lead: "技術だけを増やしても、試合で使えなければ本当の成長にはつながりません。",
    paragraphs: [
      "アリバでは、身体機能、脳への刺激、実戦で使える技術、試合に近い負荷、多様な運動経験を組み合わせ、選手の成長につなげます。",
      "ただ上手く蹴れる選手を増やすことが目的ではありません。試合の中で、見て、判断して、選んで、実行できる選手を育てることが目的です。"
    ],
    points: ["身体機能", "脳への刺激", "実戦技術", "試合に近い負荷", "多様な運動経験"]
  },
  {
    id: "reason",
    kicker: "REASON",
    title: "アリバが選ばれる理由",
    lead: "アリバは、プレーの結果だけでなく、その理由まで見て育てます。",
    paragraphs: [
      "同じミスでも、原因は選手ごとに違います。足元の技術が原因の場合もあれば、見る場所、判断の準備、身体の向き、気持ちの余裕が原因の場合もあります。",
      "結果だけを見て叱るのではなく、なぜそのプレーになったのかを整理し、次に何を見ればよいか、どんな準備をすればよいかまで伝えます。"
    ],
    points: ["少人数制", "個人ごとの指導", "認知・判断", "身体操作", "進路までの育成"]
  },
  {
    id: "method",
    kicker: "METHOD",
    title: "指導内容",
    lead: "技術だけで終わらせない。試合で使える力に変えるため、身体、脳、技術、判断をつなげて育てます。",
    cards: [
      { title: "身体機能改善", text: "身体の使い方を整え、本来持っている力を発揮しやすい状態を目指します。" },
      { title: "ライフキネティック", text: "脳に刺激を入れながら身体を動かし、認知能力、反応、集中力、空間認識、視野の拡大につなげます。" },
      { title: "テクニックドリル", text: "認知、判断、実行を取り入れながら、試合で起こる状況に近い形で技術を磨きます。" },
      { title: "スペイン式トレーニング", text: "ポジショニング、判断、ボールの動かし方、相手との駆け引きを意識し、試合で使える判断力を育てます。" },
      { title: "マルチスポーツ", text: "サッカーだけでは得にくい動きや刺激も取り入れ、身体操作、バランス、反応、柔軟な動きを育てます。" }
    ]
  },
  {
    id: "junior-youth",
    kicker: "JUNIOR YOUTH",
    title: "ジュニアユース募集 現在中学生",
    lead: "今の環境で、本当に次のステージへ進めるのか。そう感じている中学生へ。",
    paragraphs: [
      "試合には出ているけれど、成長を感じにくい。練習はしているけれど、何が課題なのか分からない。もっと本気で取り組める環境に行きたい。高校年代を見据えて、今から変わりたい。",
      "そんな選手に必要なのは、ただ練習量を増やすことではありません。今の自分に何が足りないのか、どこを見れば判断が変わるのか、どの技術をどの場面で使うべきなのかを整理できる環境が必要です。",
      "アリバでは、途中入部・移籍相談にも対応しています。移籍選手には、ユニフォーム等のサポートもあります。"
    ],
    points: ["途中入部相談", "移籍相談", "ユニフォーム等サポート", "送迎相談", "保護者当番なし", "無料体験あり"]
  },
  {
    id: "trial-2027",
    kicker: "2027 TRIAL",
    title: "2027年度ジュニアユース体験会 現6年生",
    lead: "中学年代で伸びる準備は、小学生のうちから始まります。",
    paragraphs: [
      "中学年代で伸びる選手は、ただ技術があるだけではありません。見る力、判断する力、選ぶ力、実行する力、失敗しても考え直す力が必要になります。",
      "小学生年代では足元の技術や身体能力だけで目立つことがあります。しかし中学年代に入ると、相手の強度、判断の速さ、ポジショニング、身体の使い方、メンタルの安定が求められます。",
      "全国レベルの高校進学を目指したい選手、本気で自分を変えたい選手、考えてプレーできるようになりたい選手は、まず体験会でアリバの練習を感じてください。"
    ],
    points: ["参加無料", "複数回相談可能", "電話相談可能", "保護者当番なし", "送迎相談可能"]
  },
  {
    id: "junior",
    kicker: "JUNIOR",
    title: "ジュニア募集 現在小学生",
    lead: "小学生年代で、考えてプレーする土台を作る。",
    paragraphs: [
      "小学生年代で大切なのは、技術を覚えることだけではありません。見る、考える、選ぶ、動く、試合で使う。この流れを小学生年代から積み上げることが、中学年代での成長につながります。",
      "アリバのジュニアでは、技術、判断、認知、身体操作をつなげて育てます。ボールを扱う力だけでなく、どこを見るのか、いつ動くのか、どの選択肢を選ぶのかまで考えられる選手を目指します。"
    ],
    points: ["技術力", "見る力", "判断力", "身体操作", "試合で使う力", "中学年代への土台"]
  },
  {
    id: "school",
    kicker: "SCHOOL",
    title: "花屋敷校スクール募集",
    lead: "チーム登録なしで、平日に上手くなる。",
    paragraphs: [
      "もっと上手くなりたい。でも、いきなりチームに入るのは不安。今のチームに所属したまま、個人技術や判断力を伸ばしたい。平日に練習回数を増やしたい。そんな選手のための平日スクールです。",
      "花屋敷校スクールは、チーム登録なしで参加できます。技術だけでなく、試合で使うための判断や身体の使い方まで育てます。"
    ],
    cards: [
      { title: "対象", text: "小学1年生から中学2年生。" },
      { title: "曜日", text: "火曜、水曜、火曜と水曜の週2回から選べます。" },
      { title: "時間", text: "低学年 17:30から19:00。高学年 18:00から20:00。" },
      { title: "特徴", text: "送迎あり。当番なし。チーム登録なし。花屋敷グラウンド開催。" }
    ]
  },
  {
    id: "career",
    kicker: "CAREER",
    title: "進路実績",
    lead: "進路は、最後だけ頑張って変わるものではありません。次のステージで伸びる力を、日々の練習から積み上げます。",
    paragraphs: [
      "アリバでは、高校年代、その先の環境でも伸び続ける選手を育てることを大切にしています。今の試合に勝つことは目標にします。でも、それだけを目的にはしません。"
    ],
    cards: [
      { title: "Jユース", text: "ベガルタ仙台、水戸ホーリーホック、ファジアーノ岡山、カマタマーレ讃岐、レノファ山口、FC大阪" },
      { title: "プレミアリーグ", text: "桐生第一高校、旭川実業高校" },
      { title: "プリンスリーグ", text: "報徳学園高校、作陽高校、瀬戸内高校、綾羽高校、明桜高校、高知高校、札幌大谷高校、京都共栄高校、京都橘高校、上越高校、滝川第二高校、関西大学北陽高校" },
      { title: "海外", text: "スペイン、ブラジル、アメリカなど数チーム" }
    ],
    note: "表示する実績は、過去8年間の合格実績です。合格時の所属リーグで分類しています。進路や合格を保証するものではありません。"
  },
  {
    id: "parent",
    kicker: "PARENT",
    title: "保護者向け安心",
    lead: "体験前の不安を、先に相談できます。",
    paragraphs: [
      "送迎、練習日、今のレベル、進路相談まで事前に確認できます。チーム選びで不安なのは、選手だけではありません。",
      "通えるか、続けられるか、負担は大きくないか、今のレベルで参加できるか、途中から入って大丈夫か。そうした不安を、体験前に電話相談できます。"
    ],
    points: ["保護者当番なし", "送迎相談あり", "無料体験あり", "電話相談あり", "途中入部・移籍相談あり"]
  },
  {
    id: "place",
    kicker: "PLACE",
    title: "練習場所",
    lead: "集中して取り組める、花屋敷グラウンド。",
    paragraphs: [
      "平日の通常練習は、宝塚市の花屋敷グラウンドで行っています。人工芝の環境で、基礎技術から実戦形式まで集中して取り組めます。"
    ],
    cards: [
      { title: "住所", text: "花屋敷グラウンド。宝塚市花屋敷荘園4-2-35。" },
      { title: "通常練習", text: "火曜、水曜、金曜 18:00から20:00。" },
      { title: "補足", text: "送迎相談あり。保護者当番なし。" }
    ]
  },
  {
    id: "trial",
    kicker: "TRIAL",
    title: "無料体験",
    lead: "文章だけでは、アリバの練習は伝わりません。",
    paragraphs: [
      "まずは無料体験で、コーチの声かけと練習の空気を感じてください。どんな声かけをするのか、選手との距離感はどうか、少人数制の雰囲気はどうか、今のレベルで参加できるのかを実際に確認できます。",
      "現在中学生、現6年生、現在小学生、スクール希望者それぞれに合わせてご案内します。"
    ],
    points: ["練習の雰囲気", "コーチの声かけ", "選手との距離感", "通いやすさ", "送迎相談", "進路相談"],
    actions: [
      { label: "無料体験に申し込む", href: "/practice_session/", type: "primary" },
      { label: "LINEで相談する", href: lineUrl, type: "dark" },
      { label: "電話で相談する", href: "tel:09095484524", type: "secondary" }
    ]
  }
];

const faqItems = [
  {
    q: "未経験でも体験できますか？",
    a: "はい、体験できます。アリバでは、今の上手い・下手だけで判断するのではなく、サッカーが好きで、これから成長したい気持ちを大切にしています。体験では、練習への取り組み方、コーチの声かけへの反応、考えてプレーしようとする姿勢も見ながらご案内します。"
  },
  {
    q: "現在中学生でも入部相談できますか？",
    a: "はい、現在中学生の途中入部・移籍相談を受け付けています。今の環境で成長を感じにくい、もっと本気で取り組める場所を探している、高校年代を見据えて環境を変えたい、という選手もご相談いただけます。"
  },
  {
    q: "現6年生はいつ体験できますか？",
    a: "現6年生は、2027年度ジュニアユース体験会として受付しています。中学年代で伸びるためには、小学生のうちから、見る力、判断する力、選ぶ力、実行する力を準備していくことが大切です。"
  },
  {
    q: "小学生も入れますか？",
    a: "はい、現在小学生向けにジュニア募集があります。小学生年代では、ただ上手く蹴るだけではなく、見る、考える、選ぶ、動く、試合で使う、という流れを身につけることを大切にしています。"
  },
  {
    q: "スクールだけでも参加できますか？",
    a: "はい、花屋敷校スクールはチーム登録なしで参加できます。現在のチームに所属したまま、平日に練習回数を増やしたい、個人技術や判断力を伸ばしたい、試合で使える力を身につけたい選手に向けたスクールです。"
  },
  {
    q: "保護者当番はありますか？",
    a: "ありません。アリバでは、保護者当番なしで参加できます。保護者の方の負担をできるだけ少なくし、選手が練習に集中できる環境を大切にしています。"
  },
  {
    q: "送迎はありますか？",
    a: "送迎相談が可能です。練習場所や曜日、通える時間帯によって確認が必要なため、詳しくは体験前にご相談ください。"
  }
];

function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    page_location: window.location.href,
    ...params
  });
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderCards(cards = []) {
  if (!cards.length) return null;
  const grid = createElement("div", "content-grid");
  cards.forEach((card) => {
    const cardElement = card.href
      ? createElement("a", "content-card", null)
      : createElement("article", "content-card", null);
    if (card.href) cardElement.href = card.href;
    cardElement.appendChild(createElement("h3", null, card.title));
    cardElement.appendChild(createElement("p", null, card.text));
    grid.appendChild(cardElement);
  });
  return grid;
}

function renderPoints(points = []) {
  if (!points.length) return null;
  const list = createElement("ul", "content-points");
  points.forEach((point) => {
    list.appendChild(createElement("li", null, point));
  });
  return list;
}

function renderActions(actions = []) {
  if (!actions.length) return null;
  const wrap = createElement("div", "section-actions");
  actions.forEach((action) => {
    const link = createElement("a", `btn btn-${action.type || "secondary"}`, action.label);
    link.href = action.href;
    wrap.appendChild(link);
  });
  return wrap;
}

function renderSection(section, index) {
  const element = createElement("section", `lp-section content-section ${index % 2 ? "content-section-alt" : ""}`);
  element.id = section.id;

  const inner = createElement("div", "content-inner");
  const copy = createElement("div", "section-copy");
  copy.dataset.animate = "slideLeft";
  copy.appendChild(createElement("p", "section-kicker", section.kicker));
  copy.appendChild(createElement("h2", null, section.title));
  copy.appendChild(createElement("p", "content-lead", section.lead));

  (section.paragraphs || []).forEach((paragraph) => {
    copy.appendChild(createElement("p", null, paragraph));
  });

  inner.appendChild(copy);

  const points = renderPoints(section.points);
  if (points) inner.appendChild(points);

  const cards = renderCards(section.cards);
  if (cards) inner.appendChild(cards);

  if (section.note) inner.appendChild(createElement("p", "content-note", section.note));

  const actions = renderActions(section.actions);
  if (actions) inner.appendChild(actions);

  element.appendChild(inner);
  return element;
}

function renderFaq() {
  const section = createElement("section", "lp-section content-section faq-section");
  section.id = "faq";

  const inner = createElement("div", "content-inner");
  const copy = createElement("div", "section-copy");
  copy.dataset.animate = "slideLeft";
  copy.appendChild(createElement("p", "section-kicker", "FAQ"));
  copy.appendChild(createElement("h2", null, "よくある質問"));
  copy.appendChild(createElement("p", "content-lead", "体験前によくある不安を、先に確認できます。"));
  inner.appendChild(copy);

  const list = createElement("div", "faq-list");
  faqItems.forEach((item) => {
    const details = createElement("details", "faq-item");
    details.appendChild(createElement("summary", null, item.q));
    details.appendChild(createElement("p", null, item.a));
    list.appendChild(details);
  });
  inner.appendChild(list);

  section.appendChild(inner);
  return section;
}

function renderFinalCta() {
  const section = createElement("section", "final-section final-section-text");
  section.id = "final";
  const inner = createElement("div", "final-inner");
  inner.dataset.animate = "slideLeft";
  inner.appendChild(createElement("h2", null, "アリバの練習は、文章だけでは伝わりません。"));
  inner.appendChild(createElement("p", null, "選手への声かけ。一人ひとりを見る距離感。考えてプレーすることを大切にする空気。次のステージまで見据えた育成。"));
  inner.appendChild(createElement("p", null, "まずは無料体験で、アリバの練習を感じてください。"));

  const actions = createElement("div", "final-actions");
  const trial = createElement("a", "btn btn-primary", "無料体験に申し込む");
  trial.href = "/practice_session/";
  const phone = createElement("a", "btn btn-dark", "電話で相談する");
  phone.href = "tel:09095484524";
  actions.append(trial, phone);
  inner.appendChild(actions);

  section.appendChild(inner);
  return section;
}

function renderContent() {
  const root = document.getElementById("content-sections");
  if (!root) return;

  const fragment = document.createDocumentFragment();
  contentSections.forEach((section, index) => {
    fragment.appendChild(renderSection(section, index));
  });
  fragment.appendChild(renderFaq());
  fragment.appendChild(renderFinalCta());
  root.appendChild(fragment);
}

function scrollToAnchor(hash, smooth = true) {
  if (!hash || hash === "#") return false;
  if (hash === "#top") {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    return true;
  }
  const target = document.querySelector(hash);
  const header = document.querySelector(".site-header");
  if (!target) return false;

  const offset = header?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  return true;
}

function setupMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const globalMenu = document.querySelector(".global-menu");
  if (!menuToggle || !globalMenu) return;

  const closeMenu = () => {
    globalMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = globalMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  globalMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const didScroll = scrollToAnchor(hash);
      if (!didScroll) return;

      event.preventDefault();
      history.pushState(null, "", hash);
    });
  });
}

function setupTracking() {
  document.querySelectorAll('a[href="/practice_session/"], a[href="https://arriba.club/practice_session/"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("trial_cta_click", {
        click_text: link.textContent.trim(),
        link_url: link.getAttribute("href")
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("phone_click", {
        click_text: link.textContent.trim(),
        link_url: link.getAttribute("href")
      });
    });
  });

  document.querySelectorAll('a[href*="lin.ee"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("line_click", {
        click_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });
}

function setupReveal() {
  const animatedItems = document.querySelectorAll("[data-animate], .lp-section, .final-section, .mini-nav, .site-footer");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add(entry.target.dataset.animate ? "is-visible" : "is-inview");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "-4% 0px -8% 0px", threshold: 0.04 });

  animatedItems.forEach((item) => observer.observe(item));
}

renderContent();
setupMenu();
setupAnchorLinks();
setupTracking();
setupReveal();

window.addEventListener("load", () => {
  if (location.hash) window.setTimeout(() => scrollToAnchor(location.hash, false), 80);
});
