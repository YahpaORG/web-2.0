import Image from 'next/image'

type SponsorsProps = {
  title: string
  logos: { src: string; alt: string }[]
} & React.ComponentPropsWithRef<'section'>

export const Sponsors = ({
  title = 'Lorem ipsum dolor sit amet',
  logos = [
    { src: '/media/brand.png', alt: '' },
    { src: '/media/brand.png', alt: '' },
    { src: '/media/brand.png', alt: '' },
  ],
  ...props
}: SponsorsProps) => {
  return (
    <section className="my-4" {...props}>
      <div className="container p-8 lg:p-16 m-auto">
        <h2 className="p-6 text-2xl font-semibold text-center">{title}</h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8">
          {logos.map((logo, index) => (
            <div key={index} className="rounded-lg dark:bg-foreground">
              <Image
                alt={logo.alt}
                src={logo.src}
                width={320}
                height={240}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
