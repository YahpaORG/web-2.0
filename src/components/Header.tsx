'use server'

import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/server/get-user.action'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import { ThemeDropdown } from './ThemeDropdown'

export async function Header() {
  const user = await getUser()

  return (
    <header className="flex items-center justify-between mx-6 mt-4 mb-12">
      <div className="flex flex-col justify-center flex-1">
        <span className="text-2xl font-semibold">
          <Link href="/">YAHPA</Link>
        </span>
        <span className="text-sm">Young Asian Health Professional Association</span>
      </div>

      <nav className="flex justify-center flex-1">
        <ul className="flex flex-row items-center gap-4">
          <li>
            <Link href="/registry">Registry</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-end flex-1">
        <ul className="flex flex-row items-center gap-4">
          {user ? (
            <>
              <li>
                <Link href="/account">My Account</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <li>
              <Button asChild>
                <Link href="/login">Join YAHPA</Link>
              </Button>
            </li>
          )}

          <li>
            <ThemeDropdown />
          </li>
        </ul>
      </div>
    </header>
  )
}
