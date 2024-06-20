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
          <NavigationMenuItem>
            <Link
              href="/"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/'}
              >
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/info-hidrologica"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/info-hidrologica'}
              >
                Información Hidrológica
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/info-meteorologica"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/info-meteorologica'}
              >
                Información Meteorológica
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/monitoreo-meteorologico"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === '/monitoreo-meteorologico'}
              >
                Monitoreo Meteorológico
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
