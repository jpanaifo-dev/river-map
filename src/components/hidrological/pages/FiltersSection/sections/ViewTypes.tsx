'use clien'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ViewTypes = () => {
  const pathname = usePathname()

  return (
    <section className='flex flex-col gap-1'>
      <h1 className="text-sm font-medium">Vizualizar como</h1>
      <div className="flex">
        <Button
          asChild
          variant={pathname === '/info-hidrologica' ? 'default' : 'link'}
        >
          <Link href="/info-hidrologica">Visor</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/info-hidrologica/tabla' ? 'default' : 'link'}
        >
          <Link href="/info-hidrologica/tabla">Tabla</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === '/info-hidrologica/grafico' ? 'default' : 'link'
          }
        >
          <Link href="/info-hidrologica/grafico">Gráfico</Link>
        </Button>
      </div>
    </section>
  )
}
