import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const t = await getTranslations()

  return (
    <div className="relative h-screen overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/media/hero.jpg"
          alt="Background Image"
          className="object-cover object-center w-full h-full"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start h-full mt-24">
        <div className="max-w-4xl text-center">
          <h1 className="mb-4 text-5xl font-bold leading-tight">{t('home.subheader')}</h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-center text-gray-300">
            {t('home.description')}
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/about">{t('home.learn')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
