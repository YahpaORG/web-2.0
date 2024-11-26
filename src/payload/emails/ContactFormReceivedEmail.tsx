import {
  Tailwind,
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type ContactFormReceivedEmailProps = {
  name: string
  reason: string
  date: Date
  message: string
}

const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || ''

export default function ContactFormReceivedEmail({
  name = 'Jimmy Choo',
  reason = 'General Information',
  message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan risus massa, sed gravida eros viverra nec. Suspendisse tincidunt hendrerit ex.',
  date = new Date(),
}: ContactFormReceivedEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>We received your request</Preview>
        <Body>
          <Container className="flex items-center justify-center max-w-3xl font-sans">
            <Img
              src={`${baseUrl}/media/1_Without_Background.png`}
              width="480"
              height="240"
              className="mx-auto my-12"
              alt="YAHPA"
            />
            <Text>Hello {name},</Text>
            <Text>
              Thank you for reaching out to us, we received your request for {reason} sent on{' '}
              {date.toDateString()}. One of our members will get back to you as soon as possible.
            </Text>
            <Section className="flex items-center justify-center p-12 rounded-md bg-gray-50">
              <Text className="italic text-gray-500">{message}</Text>
            </Section>

            <Text>Best regards,</Text>
            <Text>YAHPA</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
