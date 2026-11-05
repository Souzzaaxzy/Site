import { Instagram, Link2, MapPin, MessageCircle } from 'lucide-react'
import { business, photoCredits, unconfirmedNotes } from '../data/business'
import { primaryOrderHref, whatsappHref } from '../lib/format'
import { navItems } from '../lib/useActiveSection'

const year = new Date().getFullYear()

export function Footer() {
  const { address } = business
  const orderHref = primaryOrderHref()
  const whatsHref = whatsappHref('Olá! Gostaria de fazer um pedido.')

  return (
    <footer className="bg-coffee text-cream">
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/img/logo-tempero-96.png"
                alt=""
                width={48}
                height={39}
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="font-display text-xl font-semibold leading-tight text-cream">
                  {business.name}
                </p>
                <p className="text-[0.8125rem] text-cream/60">{business.tagline}</p>
              </div>
            </div>

            <address className="mt-6 flex items-start gap-3 not-italic">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[0.9375rem] leading-relaxed text-cream/75">
                {address.street}
                <br />
                {address.district}, {address.city}, {address.state}
                <br />
                CEP {address.postalCode}
              </span>
            </address>

            <p className="mt-4 max-w-[40ch] text-[0.8125rem] leading-relaxed text-cream/55">
              {business.hours.value
                ? `Funcionamento: ${business.hours.value}`
                : 'Horário de funcionamento a confirmar.'}
              {!business.whatsapp.number && ' WhatsApp oficial ainda não confirmado.'}
            </p>
          </div>

          <nav aria-label="Atalhos do site">
            <h2 className="text-[0.8125rem] font-medium text-cream/60">Navegar</h2>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.8125rem] font-medium text-cream/60">Pedir e acompanhar</h2>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={orderHref}
                  {...(orderHref.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Fazer um pedido
                </a>
              </li>
              {whatsHref && (
                <li>
                  <a
                    href={whatsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a
                  href={business.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={business.social.linktree.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  <Link2 className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Todos os canais
                </a>
              </li>
              <li>
                <a
                  href={business.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Como chegar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-6">
          <div className="mb-8">
            <h2 className="text-[0.8125rem] font-medium text-cream/60">
              Informações a confirmar com o estabelecimento
            </h2>
            <ul className="mt-4 grid gap-x-10 gap-y-2 md:grid-cols-2">
              {unconfirmedNotes.map((note) => (
                <li key={note} className="text-[0.8125rem] leading-relaxed text-cream/70">
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <p data-credits className="text-[0.75rem] leading-relaxed text-cream/60">
            Fotos dos pratos: do próprio estabelecimento. Fotos ilustrativas de preparo:{' '}
            {photoCredits.map((credit) => (
              <a
                key={credit.label}
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/25 underline-offset-2 transition-colors hover:text-cream"
              >
                {credit.label}
              </a>
            ))}
            . Licenças Creative Commons, Wikimedia Commons.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-[0.75rem] text-cream/50 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {business.legalName}. Todos os direitos reservados.
            </p>
            <p>
              Preços e horários sujeitos a confirmação pelo estabelecimento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
