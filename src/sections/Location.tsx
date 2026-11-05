import { MapPin, Navigation, Clock, MessageCircle } from 'lucide-react'
import { business } from '../data/business'
import { whatsappHref } from '../lib/format'

export function Location() {
  const { address } = business
  const whatsHref = whatsappHref('Olá! Gostaria de confirmar o endereço e o horário de funcionamento.')

  return (
    <section id="contato" aria-labelledby="contato-title" className="scroll-mt-20 bg-linen/55">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          <div>
                          <h2
                id="contato-title"
                className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-coffee"
              >
                No Jardim Cris, São Paulo
              </h2>

                          <address className="mt-6 not-italic">
                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.7} aria-hidden="true" />
                  <p className="text-[1.0625rem] leading-relaxed text-coffee">
                    {address.street}
                    <br />
                    {address.district}, {address.city}, {address.state}
                    <br />
                    CEP {address.postalCode}
                  </p>
                </div>
              </address>

                          <div className="mt-6 flex items-start gap-3.5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-olive" strokeWidth={1.7} aria-hidden="true" />
                <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-coffee-soft">
                  {business.hours.value ?? (
                    <>Horário a confirmar. Consulte os canais oficiais antes de sair de casa.</>
                  )}
                </p>
              </div>

                          <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={business.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill border border-coffee/25 px-6 text-[0.9375rem] font-medium text-coffee transition-[border-color,background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:border-coffee/55 hover:bg-coffee/[0.04] active:translate-y-px"
                >
                  <Navigation
                    className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/cta:-translate-y-0.5"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  Como chegar
                </a>
                {whatsHref && (
                  <a
                    href={whatsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill border border-coffee/25 px-6 text-[0.9375rem] font-medium text-coffee transition-[border-color,background-color,transform] duration-200 hover:border-coffee/55 hover:bg-coffee/[0.04] active:translate-y-px"
                  >
                    <MessageCircle className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                )}
              </div>
          </div>

                      <div className="overflow-hidden rounded-frame border border-rule/90 bg-cream">
              <iframe
                title={`Mapa com a localização do ${business.name}`}
                src={business.maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 md:h-[420px] lg:h-full lg:min-h-[440px]"
              />
            </div>
        </div>
      </div>
    </section>
  )
}
