import Image from 'next/image'

export const Banner = () => {
  return (
    <>
      <main className="relative h-screen">
        <Image
          src="/image/banners/river.webp"
          alt="banner"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
        <section>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center">
                <h1 className="text-4xl text-white font-bold">
                  Sistema de Información Hidrológica
                </h1>
                <p className="text-white">
                  Información hidrológica, consultas y descargas
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
