import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <section className="my-8 md:my-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Main content */}
          <div className="col-span-1 grid gap-8 md:col-span-2 md:gap-16">
            <div className="flex flex-col">
              <div className="rounded-lg p-6">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl xl:text-6xl">
                  {t.rich('about.header', {
                    blue: (chunks) => <span className="text-primary">{chunks}</span>,
                  })}
                </h1>

                <h2 className="mb-8 text-xl font-semibold md:text-2xl">
                  {t('about.subheader')}
                </h2>

                <p className="text-base md:text-lg">{t('about.description')}</p>
              </div>
            </div>

            <AspectRatio.Root ratio={16 / 9} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/1.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
              />
            </AspectRatio.Root>
          </div>

          {/* Column 2 */}
          <div className="grid gap-4">
            <AspectRatio.Root ratio={4 / 3} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/2.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>

            <AspectRatio.Root ratio={2 / 3} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/3.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>

            <AspectRatio.Root ratio={1} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/4.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>
          </div>

          {/* Column 3 */}
          <div className="grid gap-4">
            <AspectRatio.Root ratio={2 / 3} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/5.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>

            <AspectRatio.Root ratio={1} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/6.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>

            <AspectRatio.Root ratio={1} className="relative overflow-hidden rounded-lg">
              <Image
                src="/media/7.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </AspectRatio.Root>
          </div>
        </div>
      </div>
    </section>
  )
}