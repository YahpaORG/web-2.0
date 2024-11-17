import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-xl gap-4 mb-8">
        <h1 className="text-3xl">Welcome to YAHPA</h1>
        <h2 className="font-bold">Striving for accessible healthcare</h2>
        <p>
          We are a group of young professionals and students from various health fields whose
          mission is to help and support the Asian community in various health-related issues.
        </p>
        <div>
          <Button asChild>
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
