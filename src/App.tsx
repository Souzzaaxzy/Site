import { Header } from './components/Header'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Menu } from './sections/Menu'
import { DailyMenu } from './sections/DailyMenu'
import { Delivery } from './sections/Delivery'
import { Differentials } from './sections/Differentials'
import { Location } from './sections/Location'
import { Footer } from './sections/Footer'
import { MobileOrderBar } from './components/MobileOrderBar'
import { StructuredData } from './components/StructuredData'

export default function App() {
  return (
    <>
      <StructuredData />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-coffee focus:px-5 focus:py-3 focus:text-cream"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Menu />
        <DailyMenu />
        <Delivery />
        <Differentials />
        <Location />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  )
}
