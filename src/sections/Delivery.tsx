import { ArrowRight, Bike, ExternalLink, MessageCircle } from 'lucide-react'
import { business, delivery } from '../data/business'
import { primaryOrderHref, whatsappHref } from '../lib/format'
import { Picture } from '../components/Picture'

export function Delivery() {
  const orderHref = primaryOrderHref()
  const whatsHref = whatsappHref('Olá! Gostaria de fazer um pedido para entrega.')

  return (
    <section id="delivery" aria-labelledby="delivery-title" className="scroll-mt-20 bg-cream">
      <Picture
        base="/img/faixa-massa"
        widths={[960, 1280, 1920]}
        ratio={21 / 9}
        sizes="100vw"
        alt="Mãos abrindo massa sobre uma bancada enfarinhada"
        className="h-[140px] w-full overflow-hidden bg-linen md:h-[200px]"
        imgClassName="opacity-95"
        objectPosition="50% 48%"
      />

      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 xl:gap-20">
          <div>
                          <h2
                id="delivery-title"
                className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-coffee"
              >
                Delivery no Jardim Cris
              </h2>
                          <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-coffee-soft">
                {delivery.intro}
              </p>

                          <div className="mt-9 flex flex-wrap items-center gap-3">
                {whatsHref ? (
                  <a
                    href={whatsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill bg-terracotta px-6 text-[0.9375rem] font-medium text-cream shadow-cta transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:bg-terracotta-deep active:translate-y-px"
                  >
                    <MessageCircle className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} aria-hidden="true" />
                    Pedir pelo WhatsApp
                    <ArrowRight
                      className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/cta:translate-x-1"
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <a
                    href={orderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill bg-terracotta px-6 text-[0.9375rem] font-medium text-cream shadow-cta transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:bg-terracotta-deep active:translate-y-px"
                  >
                    <Bike className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} aria-hidden="true" />
                    Ver canais de pedido
                    <ArrowRight
                      className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/cta:translate-x-1"
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </a>
                )}
                <a
                  href={business.ordering.linktree.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill border border-coffee/25 px-6 text-[0.9375rem] font-medium text-coffee transition-[border-color,background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:border-coffee/55 hover:bg-coffee/[0.04] active:translate-y-px"
                >
                  <ExternalLink className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} aria-hidden="true" />
                  Todos os canais
                </a>
              </div>

          </div>

                      <ol className="border-t border-rule/90">
              {delivery.steps.map((step, index) => (
                <li key={step.title} className="border-b border-rule/90">
                  <div className="flex gap-5 py-6">
                    <span
                      aria-hidden="true"
                      className="font-display text-[0.9375rem] font-semibold text-terracotta tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-coffee">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-coffee-soft">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
        </div>
      </div>
    </section>
  )
}
