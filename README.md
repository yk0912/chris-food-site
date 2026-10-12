# クリスフードサービス合同会社 コーポレートサイト

Astro（静的サイト）＋ Decap CMS（管理画面 `/admin/`）。

## 開発
```
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的HTMLを出力
```

## どこを編集するか
| 内容 | ファイル（管理画面からも編集可） |
|---|---|
| 会社情報・SNS・全体の写真 | `src/data/site.json` |
| 店舗（武蔵野店・し～くん・成蹊無人販売所） | `src/data/shops.json` |
| メニュー | `src/data/menu.json` |
| プロデュース／システム開発の本文 | `src/data/business.json` |
| リスキリング講座 | `src/data/reskilling.json`（`status`で「準備中／申請中／対象講座」を切替） |
| お知らせ | `src/content/news/*.md` |
| 特定商取引法表記・個人情報保護方針 | `src/pages/tokushoho.astro` / `privacy.astro`（管理画面の対象外） |

写真は `public/uploads/` に置かれ、管理画面から差し替えるとGitHubに保存→自動で再公開されます。

## 公開手順（Cloudflare Pages + GitHub）
1. このフォルダを GitHub リポジトリにする。
2. Cloudflare Pages でリポジトリを接続（ビルド: `npm run build`、出力: `dist`）。
3. GitHub で OAuth App を作成（Callback URL: `https://chrisbakery.jp/api/callback`）。
4. Cloudflare Pages の環境変数に `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` を設定。
5. `public/admin/config.yml` の `repo: OWNER/REPO` を実際のリポジトリ名に書き換える。
6. `https://chrisbakery.jp/admin/` にアクセスしてGitHubでログイン。

## 公開前に必要な入力（TODO）
- `site.json` の `form.endpoint`（Formspree のフォームURL）
- 資本金・従業員数（空欄のため非表示）
- 武蔵野店・成蹊無人販売所の最新写真、成蹊無人販売所の利用時間・住所の確認
- し～くんのサンドイッチ屋さんの住所・営業時間の最新確認（旧サイトの情報）
- メニューの価格・取扱店舗の確認（プレミアム食パン「清」は価格未入力）
- リスキリング講座の内容（`published:false` のサンプルは本番に出ません）と、助成金の最新要件の確認
- 特定商取引法表記の「要入力」項目
