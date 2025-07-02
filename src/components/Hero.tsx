import { HeartHandshakeIcon, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { AspectRatio } from './ui/aspect-ratio'

type HeroProps = {
  icon?: React.ReactNode
  heading: string
  description: string
  button: {
    text: string
    icon?: React.ReactNode
    url: string
  }
  trustText?: string
  imageSrc?: string
  imageAlt?: string
} & React.ComponentPropsWithRef<'section'>

export const Hero = ({
  icon = <HeartHandshakeIcon className="size-6" />,
  heading = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis lacus vestibulum diam blandit, eu ornare mauris feugiat. Nulla facilisi.',
  button = {
    text: 'Discover Features',
    icon: <Zap className="ml-2 size-4" />,
    url: 'https://www.shadcnblocks.com',
  },
  trustText = 'Lorem ipsum dolor sit amet',
  imageSrc = 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  imageAlt = 'placeholder',
  ...props
}: HeroProps) => {
  return (
    <section className="py-8 overflow-hidden lg:py-32" {...props}>
      <div className="container p-8 mx-auto lg:p-16">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="p-16 border rounded-full size-full md:p-32">
                <div className="border rounded-full size-full"></div>
              </div>
            </div>
            <span className="flex items-center justify-center mx-auto border rounded-full size-16 md:size-20">
              {icon}
            </span>
            <h2 className="max-w-5xl mx-auto text-3xl font-medium text-center text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="max-w-3xl mx-auto text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" asChild>
                <Link href={button.url}>
                  {button.text} {button.icon}
                </Link>
              </Button>
              {trustText && <div className="text-xs text-muted-foreground">{trustText}</div>}
            </div>
          </div>
          <AspectRatio ratio={16 / 9} className="overflow-hidden shadow-xl rounded-2xl">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
          </AspectRatio>
        </div>
      </div>
    </section>
  )
}
