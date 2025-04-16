# YAHPA - Website 2.0

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk

## Localization and Internationalization

Internationalization with Next.js App Router uses the sub-route strategy where the content under the dynamic `[locale]` route can provide translated texts through either the `useTranslations` hook(client-side) or passing the translations from `getTranslations` function (server-side) to a server component.

- [i18n setup with next-intl](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
