'use client'

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
      <div className="container p-8 lg:p-16">
        <div className="flex flex-row gap-8">
          <Carousel className="w-full max-w-sm mx-auto md:max-w-xl">
            <CarouselContent>
              {imageSlides.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="mx-auto relative w-[24rem] h-[18rem] lg:w-[36rem] lg:h-[26rem]">
                    <Image src={image.src} alt="" className="object-cover rounded-xl" fill />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 my-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          <div className="p-8 rounded-lg bg-accent max-h-min">
            <h2 className="mb-4 text-2xl font-semibold text-center">{heading}</h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
