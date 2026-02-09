import { CallToAction } from '@/components/CallToAction'
import { FeatureCarousel } from '@/components/FeatureCarousel'
import { Hero } from '@/components/Hero'
import { Sponsors } from '@/components/Sponsors'
import { ZapIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('HomePage')

  return (
    <div>
      <Hero
        heading={t('Hero.title')}
        description={t('Hero.description')}
        imageSrc="/media/hero2.jpg"
        button={{ text: t('Hero.discover'), url: '/about', icon: <ZapIcon className="size-4" /> }}
        trustText={t('Hero.trust')}
      />
      <FeatureCarousel
        heading={t('Carousel.title')}
        description={t('Carousel.description')}
        imageSlides={[
          { src: '/media/1.jpg', alt: 'Image 1' },
          { src: '/media/2.jpg', alt: 'Image 2' },
          { src: '/media/3.jpg', alt: 'Image 3' },
          { src: '/media/4.jpg', alt: 'Image 4' },
        ]}
      />

      <Sponsors
        title={t('Sponsors.title')}
        logos={[
          { src: '/media/sponsors/patisseriecocobun.svg', alt: '' },
          { src: '/media/sponsors/preso.webp', alt: '' },
          { src: '/media/sponsors/kimphat.svg', alt: '' },
        ]}
      />

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
        className="flex justify-center w-full mb-16"
      />
    </div>
  )
}
