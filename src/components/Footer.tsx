import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-4 bg-neutral-900">
      <span className="mb-2 text-white">All rights deserved YAHPA © 2021</span>

      <Link href="/admin" className="text-sm text-white hover:underline">
        Admin Portal
      </Link>
    </footer>
  )
}
