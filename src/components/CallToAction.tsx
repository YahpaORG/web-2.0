import { Button } from '@/components/ui/button'

type CallToActionProps = {
  heading: string
  description: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
} & React.ComponentPropsWithRef<'section'>

export function CallToAction({
  heading = 'Call to Action',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis!',
  buttons = {
    primary: {
      text: 'Get Started',
      url: 'https://www.shadcnblocks.com',
    },
    secondary: {
      text: 'Learn More',
      url: 'https://www.shadcnblocks.com',
    },
  },
  ...props
}: CallToActionProps) {
  return (
    <section {...props}>
      <div className="container">
        <div className="flex flex-col items-center p-8 text-center rounded-lg bg-accent md:rounded-xl lg:p-16">
          <h3 className="max-w-3xl mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h3>
          <p className="max-w-3xl mb-8 text-muted-foreground lg:text-lg">{description}</p>
          <div className="flex flex-col justify-center w-full gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button className="w-full sm:w-auto" asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
