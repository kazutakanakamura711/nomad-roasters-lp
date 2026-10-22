# Nomad Roasters LP

Figma Makeの仕様をもとに制作した、東京のスペシャルティコーヒーブランド「Nomad Roasters」のランディングページです。

## 技術スタック

- React 19 / Vite 8 / strict TypeScript
- Tailwind CSS v4（CSS-first）
- Framer Motion
- ESLint / Prettier / Husky / lint-staged
- Vitest + Testing Library / Playwright

## 開発

Node.jsは `.nvmrc` に指定した `24.22.1`、npmは `11.19.1` を使用します。
`nvm` を導入済みの場合は、次の手順で指定バージョンをインストール・使用します。

```sh
nvm install
nvm use
npm ci
npm run dev
```

Node.jsを更新する場合は `.nvmrc` と `package.json` の `engines.node` を更新してください。
npmも更新する場合は `packageManager` と `engines.npm` を揃えます。
更新後は `npm ci`、`npm audit`、`npm run validate`、`npm run test:e2e` を確認してください。

VercelのNode.js設定は `24.x` を使用します。マイナー・パッチ更新はVercelが管理し、
ローカル用の `.nvmrc` とは別に扱います。
詳細は [VercelのNode.jsバージョン管理](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) を参照してください。

## コマンド

```sh
# フォーマット、Lint、型チェック、単体テスト、production build
npm run validate

# Desktop 1440px、Tablet 768px、Mobile 390px のE2E
npm run test:e2e

# production buildのみ
npm run build
```

## コンテンツとアセット

ヒーロー、ブランドストーリー、コーヒー選択、プロセス、ロースタリー、定期便、カフェ、Journal、Instagram、最終CTA、フッターを実装しています。

写真アセットはすべて `public/images` にローカル保存しています。外部画像URLへは依存せず、ビルド成果物にも同梱されます。

## 公開前の確認

公開前に `npm run validate` と `npm run test:e2e` を実行してください。後者では主要な表示、アンカー遷移、横スクロールの有無を3つの対象ビューポートで確認します。faviconは32px、192px、Apple Touch Icon 180pxを `public` に用意しています。
