import { FiltersMeteSection } from "@/components/meteorogical/FiltersSection/FiltersSection";
import { MeteorologicalProvider } from "@/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MeteorologicalProvider>
        <main>
          <section>
            <header className="bg-blue-500 p-4">
              <h1 className="text-white text-2xl">Info Meteorologica</h1>
            </header>
          </section>
          <section className="flex flex-col md:flex-row">
            <aside className="w-full md:w-64 md:min-w-64 md:max-w-64 sticky top-0 h-screen">
              <FiltersMeteSection />
            </aside>
            <article className="w-full md:w-3/4 bg-white p-4">
              {children}
            </article>
          </section>
        </main>
      </MeteorologicalProvider>
    </>
  );
}
