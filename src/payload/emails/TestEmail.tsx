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

type TestEmailProps = {
  name: string
}

const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || ''

export default function TestEmail({ name = 'Jimmy Choo' }: TestEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Basic Email</Preview>
        <Body>
          <Container className="flex items-center justify-center max-w-3xl font-sans">
            <Img
              src={`${baseUrl}/media/1_Without_Background.png`}
              width="480"
              height="240"
              alt="YAHPA"
            />
            <Text>Hello {name},</Text>
            <Text>Welcome to YAHPA, we look forward to seeing you on the registry soon!</Text>
            <Section>
              <Button
                className="px-3 py-2 font-medium leading-4 text-white bg-orange-600 rounded-md"
                href={`${baseUrl}/account`}
              >
                Get Started
              </Button>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
