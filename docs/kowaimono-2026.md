# 怪談イベント「怖いものみたさ」クーポンLP

公開URL: https://chrisbakery.jp/events/kowaimono-2026/

## 仕組み
- ページ本体: `src/pages/events/kowaimono-2026/index.astro`
  - サイト共通のヘッダー・フッター(`Base.astro`)は使わない単独ページ。
  - 店名・営業時間・アクセス・地図・サンドイッチの商品名/価格/写真は、公式データ
    (`src/data/shops.json` の `ckun-sandwich` と `src/data/menu.json` の「サンドイッチ」)から読み込む。
    管理画面で価格などを更新すると、LPにも反映される。
  - クーポンの内容(２０％OFF、有効期間、利用条件)と住所の表記は、`index.astro` に直接書いてある。
  - 利用期間の判定(開催前/期間中/終了)は日本時間。`START` / `END` を `index.astro` 末尾のスクリプトで変更できる。
- `noindex,nofollow`: HTML の meta と `public/_headers`(X-Robots-Tag)の両方で指定。`sitemap.xml` にも載せていない。
- 更新と公開: ファイルを編集して `main` に push すると、Cloudflare Pages が自動でビルド・公開する(サイト全体と同じ仕組み)。

## スポンサー枠の画像とQR(`public/events/kowaimono-2026/sponsor/`)
| ファイル | 内容 |
|---|---|
| `sponsor-slot.png` | 掲載画像 2400×1011px(約2.374:1) |
| `sponsor-slot.html` | 掲載画像の編集用 HTML/CSS |
| `coupon-qr.svg` / `coupon-qr.png` | QR単体(黒白・余白4モジュール込み、PNGは820×820px) |

- QR のURL: `https://chrisbakery.jp/events/kowaimono-2026/`
- 掲載画像の書き出し(Edge):
  `msedge --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=2400,1011 --screenshot=sponsor-slot.png sponsor-slot.html`
- QRの上に文字や装飾を重ねないこと。余白(4モジュール)を削らないこと。

## メルマガ登録リンク
- `https://1lejend.com/stepmail/kd.php?no=crUAEvq`（し～くんのサンドイッチレター）。
- 出典: ミッテン府中の店舗ページに掲載されている現行の登録先。chrisbakery.jp の公式店舗ページ自体には、メルマガ登録の記載はない。
- 不要になったら `index.astro` の `<section class="mail">` を削除する。
