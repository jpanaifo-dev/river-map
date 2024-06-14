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
          variant={pathname === '/info-meteorologica' ? 'default' : 'link'}
        >
          <Link href="/info-meteorologica">Visor</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/info-meteorologica/tabla' ? 'default' : 'link'}
        >
          <Link href="/info-meteorologica/tabla">Tabla</Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === '/info-meteorologica/grafico' ? 'default' : 'link'
          }
        >
          <Link href="/info-meteorologica/grafico">Gráfico</Link>
        </Button>
      </div>
    </section>
  )
}
