import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CallToAction } from '@/components/CallToAction'

const IMAGES = [
  { src: '/media/1.jpg' },
  { src: '/media/2.jpg' },
  { src: '/media/3.jpg' },
  { src: '/media/4.jpg' },
]

export default async function HomePage() {
  const t = await getTranslations('HomePage')

  return (
    <div>
      <section className="relative h-screen overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/media/hero.jpg"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 w-full h-[20rem] bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-start h-full mt-24">
          <div className="max-w-3xl px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">{t('Hero.title')}</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-center text-gray-300">
              {t('Hero.description')}
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/about">{t('Hero.learn')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col-reverse items-center gap-8 px-6 my-12 jusify-center lg:flex-row">
        <div className="flex flex-1">
          <Carousel className="w-full max-w-sm mx-auto md:max-w-xl">
            <CarouselContent>
              {IMAGES.map((image, index) => (
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
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-bold">{t('Carousel.title')}</h2>
            <p>{t('Carousel.description')}</p>
          </div>
        </div>
      </section>
      <section className="p-12 my-4">
        <h2 className="p-6 text-2xl font-semibold text-center">{t('Sponsors.title')}</h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8">
          <div className="rounded-lg dark:bg-foreground">
            <Image
              alt=""
              src="/media/sponsors/patisseriecocobun.svg"
              width={320}
              height={240}
              className="object-contain"
            />
          </div>
          <div className="rounded-lg dark:bg-foreground">
            <Image
              alt=""
              src="/media/sponsors/preso.webp"
              width={320}
              height={240}
              className="object-contain rounded-lg"
            />
          </div>
          <Image
            alt=""
            src="/media/sponsors/kimphat.svg"
            width={320}
            height={240}
            className="object-contain rounded-lg"
          />
        </div>
      </section>
      <section id="latest">{/* TODO: add news section here */}</section>
      <CallToAction
        heading={t('CTA.title')}
        description={t('CTA.description')}
        buttons={{
          primary: {
            text: t('CTA.primary'),
            url: '/signup',
          },
          secondary: {
            text: t('CTA.secondary'),
            url: '/registry',
          },
        }}
        className="flex justify-center w-full"
      />
    </div>
  )
}
