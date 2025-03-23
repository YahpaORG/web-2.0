import {
  Tailwind,
  Body,
  Button,
  Container,
  Head,
  Hr,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type AccountConfirmationEmailProps = {
  validationUrl?: string
}

const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || ''

export default function AccountConfirmationEmail({
  validationUrl = '#',
}: AccountConfirmationEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Basic Email</Preview>
        <Body>
          <Container className="flex items-center justify-center w-full max-w-3xl font-sans border-red-500 border-3">
            <Img
              src={`${baseUrl}/media/1_Without_Background.png`}
              width="480"
              height="240"
              className="mx-auto my-12"
              alt="YAHPA"
            />
            <Heading className="text-xl text-center">Confirm your email address</Heading>

            <Text>
              Your confirmation link is below - enter it in your browser and we&apos;ll help you get
              signed in.
            </Text>

            <Section className="flex items-center justify-center p-12 rounded-md bg-gray-50">
              <Button
                href={validationUrl}
                className="px-3 py-2 mx-auto font-medium leading-4 text-white bg-orange-600 rounded-md"
              >
                Confirm my email
              </Button>
            </Section>

            <Text className="text-gray-500">
              If you didn&apos;t request this email, there&apos;s nothing to worry about, you can
              safely ignore it.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
