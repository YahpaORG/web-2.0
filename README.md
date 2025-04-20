# YAHPA - Website 2.0

YAHPA is a non-profit organization composed of students in healthcare and future health professionals based in Montreal with the goal of providing better ressources and healthcare to adults and elderly individuals of Asian origin residing in the Greater Montreal area.

## Getting Started

Before starting the project you will need the following

- [pnpm](https://pnpm.io/) - A package manager to install project dependencies and run project scripts.
- [node](https://nodejs.org/en) - Javascript runtime environment, recommended to download the LTS version.
- [Mongodb Compass](https://www.mongodb.com/products/tools/compass) - A tool to interact and visualize MongoDB databases.

### Installation

Run these commands to install the package dependencies and start the project locally.

```bash
pnpm install
pnpm dev
```

### Environment Variables

By default, the project starts to run locally with a local instance of a mongodb database.

## Technologies & Documentation

- [Next.js](https://nextjs.org/docs) - React framework using the App Router.
- [PayloadCMS](https://payloadcms.com/docs/getting-started/what-is-payload) - Open sourced backend implementation for Next.js
- [Resend](https://resend.com/) - Email provider with API and SMTP
  utility classes for design
- [next-intl](https://next-intl.dev/) - Adds translation support to Next.js
- [zod](https://zod.dev/) - Typescript friendly schema validation
- [TailwindCSS](https://tailwindcss.com/) - CSS
- [Typescript](https://www.typescriptlang.org/)

## Localization and Internationalization (i18n)

Internationalization with Next.js App Router uses the sub-route strategy where the content under the dynamic `[locale]` route can provide translated texts through either the `useTranslations` hook(client-side) or passing the translations from `getTranslations` function (server-side) to a server component.

- [i18n setup with next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)

## Design and Styling

Find inspiration and guides to creating well-thought out web designs and components from these sources:

- [Figma Free Templates](https://www.figma.com/@figmaguru) - Free Figma design templates for various businesses from FigmaGuru
- [Aceternity UI](https://ui.aceternity.com/components) - Beautiful Tailwind CSS and Framer Motion Components, built with Next.js and TypeScript.
- [shadcn/ui](https://ui.shadcn.com/) - Open sourced library for React components using TailwindCSS
- [Unsplash](https://unsplash.com/) - Great source for free high-quality images.
