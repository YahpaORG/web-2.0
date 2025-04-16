# YAHPA - Website 2.0

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk

## Localization and Internationalization

Internationalization with Next.js App Router uses the sub-route strategy where the content under the dynamic `[lang]` route can provide translated texts through either the `useTranslation` hook(client-side) or passing the translations from `getTranslations` function (server-side) to a server component.

- [Official Next.js App Routing Template](https://github.com/vercel/next.js/tree/canary/examples/i18n-routing)
- [i18n guide for App Router](https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization)
- [i18n for client-side components](https://github.com/vercel/next.js/discussions/57405)
