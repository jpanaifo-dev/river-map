'use client'

import * as React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Estación Automática', href: '/info-automatica' },
  { label: 'Estación Hidrológica', href: '/info-hidrologica' },
  { label: 'Estación Meteorologica', href: '/info-meteorologica' },
]

export const NavBar = () => {
  const pathname = usePathname()
  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Image
                  src="/image/senamhi/logo-senamhi.svg"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
                active={pathname === item.href}
              >
                <Link
                  href={item.href}
                  passHref
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
