import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function AboutPage() {
  const t = await getTranslations()

  return (
    <>
      <section className="my-8 md:my-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <div className="grid col-span-2 gap-16">
              <div className="flex flex-col">
                <div className="p-6 rounded-lg">
                  <h1 className="mb-4 text-6xl font-bold">{t('about.header')}</h1>
                  <h2 className="mb-8 text-2xl font-semibold">{t('about.subheader')}</h2>
                  <p className="text-lg text-primary">{t('about.description')}</p>
                </div>
              </div>
              <AspectRatio ratio={16 / 9}>
                <Image className="object-cover rounded-lg" src="/media/1.jpg" alt="" fill />
              </AspectRatio>
            </div>
            <div className="grid gap-4">
              <AspectRatio ratio={4 / 3}>
                <Image className="object-cover rounded-lg" src="/media/2.jpg" alt="" fill />
              </AspectRatio>
              <AspectRatio ratio={2 / 3}>
                <Image className="object-cover rounded-lg" src="/media/3.jpg" alt="" fill />
              </AspectRatio>
              <AspectRatio ratio={1}>
                <Image className="object-cover rounded-lg" src="/media/4.jpg" alt="" fill />
              </AspectRatio>
            </div>
            <div className="grid gap-4">
              <AspectRatio ratio={2 / 3}>
                <Image className="object-cover rounded-lg" src="/media/5.jpg" alt="" fill />
              </AspectRatio>
              <AspectRatio ratio={1}>
                <Image className="object-cover rounded-lg" src="/media/6.jpg" alt="" fill />
              </AspectRatio>
              <AspectRatio ratio={1}>
                <Image className="object-cover rounded-lg" src="/media/7.jpg" alt="" fill />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
