# CapyFile Alternative Web Client

<p align="center">
   <a href="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/integration.yaml">
      <img alt="Github Actions Integration Status" src="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/integration.yaml/badge.svg">
   </a>
   <a href="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/tagging.yaml">
      <img alt="Github Actions Tagging Status" src="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/tagging.yaml/badge.svg?branch=dev">
   </a>
   <a href="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/release.yaml">
      <img alt="Github Actions Release Status" src="https://github.com/PedroChaparro/alternative-frontend-react/actions/workflows/release.yaml/badge.svg?branch=main">
   </a>
   <br />
   <a href="https://github.com/prettier/prettier">
      <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
   </a>
   <a href="https://github.com/eslint/eslint">
      <img alt="linter: eslint" src="https://img.shields.io/badge/linter-eslint-7C7CEA.svg?style=flat-square">
   </a>
   <a href="https://github.com/microsoft/playwright">
      <img alt="testing: playwright" src="https://img.shields.io/badge/testing-playwright-A6D388.svg?style=flat-square">
   </a>
   <a href="https://github.com/shadcn-ui/ui">
      <img alt="UI library: shadcn/ui" src="https://img.shields.io/badge/UI_library-shadcn/ui-000.svg?style=flat-square">
   </a>
</p>

## Preview 🖼️

<div align="center">
   <img style="width:525px" src="https://github.com/PedroChaparro/alternative-frontend-react/assets/62714297/1895de2f-6a82-4823-b4cb-5e3d9ead1cc3" alt="CapyFile client preview"/>
</div>
![capyfile-web]()

## Differences with the official client 🤔

- This client is built with shadcn/ui which contributes to having consistent styles across the application and improves the user experience and accessibility (Ex: Keyboard navigation ⌨️).

- All features are implemented in this client ✨.

- All the domain use cases are tested with end-to-end tests using playwright 🧪.

- Some features are implemented using React Hooks (Eg: [filesReducer.tsx](./src/hooks/user-files/filesReducer.tsx)) and the Context API, which makes the code more readable and maintainable without the need to use a state management library like Redux ⚛️.

- This project has a custom [Navigation Implementation](./src/context/files/FoldersNavigationContext.tsx) based on a Queue, which allows the user to navigate through the folders using a "go back" button ⏪.

## Development 🛠️

1. Clone the project

```bash
git clone https://github.com/PedroChaparro/unofficial-frontend-react.git
cd ./unofficial-frontent-react
```

2. Install dependencies

```bash
pnpm i
```

3. Run the the necessary services

```bash
docker-compose up
```

4. Start the development server

```bash
pnpm dev
```

Make sure you follow the [Contribution Guidelines](https://github.com/hawks-atlanta/docs/blob/main/CONTRIBUTING.md) and update or create new tests under the [`e2e`](./e2e) folder.
