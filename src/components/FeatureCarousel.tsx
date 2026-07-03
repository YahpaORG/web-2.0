'use client'

import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

type FeatureCarouselProps = {
  heading: string
  description: string
  imageSlides: {
    src: string
    alt?: string
  }[]
} & React.ComponentPropsWithRef<'section'>

export const FeatureCarousel = ({
  heading = 'Lorem ipsum dolor sit amet',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis lacus vestibulum diam blandit, eu ornare mauris feugiat. Nulla facilisi.',
  imageSlides = [
    { src: '/media/hero.jpg', alt: 'Image 1' },
    { src: '/media/hero.jpg', alt: 'Image 2' },
    { src: '/media/hero.jpg', alt: 'Image 3' },
    { src: '/media/hero.jpg', alt: 'Image 4' },
  ],
  ...props
}: FeatureCarouselProps) => {
  return (
    <section {...props}>
      <div className="container mx-auto p-4 lg:p-16">
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
          <Carousel className="mx-auto w-full max-w-4xl">
            <CarouselContent>
              {imageSlides.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio.Root
                    ratio={16 / 9}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                    />
                  </AspectRatio.Root>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="my-4 flex justify-center gap-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>

          <div className="rounded-lg bg-accent px-8 py-6 lg:max-w-md">
            <h2 className="mb-4 text-center text-2xl font-semibold">
              {heading}
            </h2>

            <p className="text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}