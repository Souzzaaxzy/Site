import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { business } from '../data/business'
import { primaryOrderHref } from '../lib/format'
import { Picture } from '../components/Picture'

export function Hero() {
  const orderHref = primaryOrderHref()

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative scroll-mt-20">
      <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 lg:pb-20 lg:pt-12">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)] lg:gap-12 xl:gap-16">
          <div className="order-2 lg:order-1">
                          <h1
                id="hero-title"
                className="text-[clamp(2.125rem,5.6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-coffee"
              >
                Comida caseira com
                <br />
                <span className="text-terracotta">sabor de casa</span>.
              </h1>

                          <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-coffee-soft">
                Comida preparada com carinho, ingredientes selecionados e aquele sabor especial
                que transforma qualquer refeição em um momento melhor.
              </p>

                          <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={orderHref}
                  {...(orderHref.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group/cta inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill bg-terracotta px-7 text-base font-medium text-cream shadow-cta transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:bg-terracotta-deep active:translate-y-px"
                >
                  Faça seu pedido
                  <ArrowRight
                    className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/cta:translate-x-1"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#cardapio"
                  className="inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill border border-coffee/25 px-7 text-base font-medium text-coffee transition-[border-color,background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:border-coffee/55 hover:bg-coffee/[0.04] active:translate-y-px"
                >
                  <UtensilsCrossed className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} aria-hidden="true" />
                  Conheça nosso cardápio
                </a>
              </div>

                          <dl className="mt-9 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-rule/80 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.8125rem] text-ink-muted">Restaurante e delivery no Jardim Cris</dt>
                  <dd className="font-display text-[1.375rem] font-semibold text-coffee">
                    +{business.yearsInBusiness} anos de cozinha
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.8125rem] text-ink-muted">Cardápio</dt>
                  <dd className="font-display text-[1.375rem] font-semibold text-coffee">
                    Renovado na semana
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.8125rem] text-ink-muted">Entrega</dt>
                  <dd className="font-display text-[1.375rem] font-semibold text-coffee">
                    {business.address.district} e região
                  </dd>
                </div>
              </dl>
          </div>

                      <div className="relative">
              <Picture
                base="/img/hero-tempero"
                widths={[720, 960, 1200]}
                ratio={1}
                sizes="(min-width: 1024px) 44vw, 100vw"
                alt="Mãos sovando massa sobre uma mesa enfarinhada, no preparo da comida do Tempero de Mãe"
                className="hero-enter w-full overflow-hidden rounded-frame bg-linen"
                imgClassName=""
                priority
                objectPosition="50% 42%"
              />
            </div>
        </div>
      </div>
    </section>
  )
}
