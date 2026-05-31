import {
  Tailwind,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr
} from '@react-email/components'

type AccountConfirmationEmailProps = {
  validationUrl?: string
  locale?: 'en' | 'fr'
}

const translations = {
  en: {
    preview: 'Confirm your YAHPA account',
    heading: 'Confirm your email address',
    body: 'Your confirmation link is below \u2014 enter it in your browser and we\'ll help you get signed in.',
    button: 'Confirm my email',
    ignore: 'If you didn\'t request this email, there\'s nothing to worry about, you can safely ignore it.',
    footer: 'Young Asian Health Professionals Association · Montreal, QC',
  },
  fr: {
    preview: 'Confirmez votre compte YAHPA',
    heading: 'Confirmez votre adresse courriel',
    body: 'Votre lien de confirmation est ci-dessous — entrez-le dans votre navigateur et nous vous aiderons à vous connecter.',
    button: 'Confirmer mon courriel',
    ignore: 'Si vous n\'avez pas demandé ce courriel, ne vous inquiétez pas, vous pouvez l\'ignorer.',
    footer: 'Association des jeunes professionnels asiatiques de la santé · Montréal, QC',
  },
}


const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || ''

// hsl(194, 82%, 56%) converted to hex
const brand = {
  primary: '#29c0e3',
  primaryDark: '#1a9db8',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
  background: '#f9fafb',
  white: '#ffffff',
}

export default function AccountConfirmationEmail({
  validationUrl = '#',
  locale = 'en',
}: AccountConfirmationEmailProps) {
  const t = translations[locale]

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={{ backgroundColor: brand.background, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', margin: 0, padding: 0 }}>

        {/* Outer wrapper */}
        <Container style={{ maxWidth: '600px', margin: '40px auto', backgroundColor: brand.white, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

          {/* Header bar */}
          <Section style={{ padding: '32px 48px', textAlign: 'center' }}>
            <Img
              src={`${"https://yahpa-demo.vercel.app"}/media/1_Without_Background.png`}
              height="120"
              alt="YAHPA"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Section>

          {/* Body */}
          <Section style={{ padding: '8px 48px 32px' }}>
            <Heading style={{
              fontSize: '22px',
              fontWeight: '700',
              color: brand.text,
              margin: '0 0 16px',
              textAlign: 'center',
            }}>
              {t.heading}
            </Heading>
            <Text style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: brand.text,
              margin: '0 0 32px',
              textAlign: 'center',
            }}>
              {t.body}
            </Text>
            <Section style={{ textAlign: 'center', margin: '0 0 32px' }}>
              <Button
                href={validationUrl}
                style={{
                  backgroundColor: brand.primary,
                  color: brand.white,
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  letterSpacing: '0.01em',
                }}
              >
                {t.button}
              </Button>
            </Section>
            <Hr style={{ borderColor: brand.border, margin: '0 0 24px' }} />
            <Text style={{
              fontSize: '13px',
              color: brand.muted,
              textAlign: 'center',
              margin: 0,
              lineHeight: '1.6',
            }}>
              {t.ignore}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{
            backgroundColor: brand.background,
            borderTop: `1px solid ${brand.border}`,
            padding: '24px 48px',
            textAlign: 'center',
          }}>
            <Text style={{
              fontSize: '12px',
              color: brand.muted,
              margin: 0,
              lineHeight: '1.6',
            }}>
              {t.footer}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html >
  )
}