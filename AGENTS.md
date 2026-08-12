# Nomad Roasters LP

- Figma Make仕様、確定本文、`public/images` の登録済みアセットをデザイン・内容の正とする。外部画像URLを追加しない。
- React + Vite + strict TypeScript を npm（`package-lock.json`）で管理する。依存関係を変えたら lockfile を同期する。
- Tailwind CSS v4 の CSS-first 構成を `src/index.css` で維持し、v3 設定を混在させない。コンポーネントは PascalCase、ファイル名は kebab-case、繰り返しデータはコンポーネントの近くに置く。
- グローバルCSSはフォント、トークン、リセット、共通スタイルに限定する。操作はReact state/propsで管理し、セマンティックHTML、可視フォーカス、reduced motionを守る。
- `npm run format` / `format:check` / `lint` / `typecheck` / `test` / `build` / `test:e2e` を利用する。E2Eの対象viewportは Desktop 1440px、Tablet 768px、Mobile 390px。
- 複数エージェント時のソース書き込みは実装担当1体に限定し、品質担当は読み取り専用とする。
- 明示指示なしにGitHub公開、デプロイ、履歴変更を行わない。
