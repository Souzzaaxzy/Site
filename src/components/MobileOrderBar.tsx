import { MessageCircle, UtensilsCrossed } from 'lucide-react'
import { business } from '../data/business'
import { primaryOrderHref } from '../lib/format'
import { useScrolled } from '../lib/useActiveSection'

/**
 * On phones the header's CTA sits far from the thumb, so a compact bar
 * appears once the visitor has left the hero.
 */
export function MobileOrderBar() {
  const visible = useScrolled(560)
  const href = primaryOrderHref()
  const external = href.startsWith('http')

  return (
    <div
      data-visible={visible}
      className="mobile-order-bar fixed inset-x-0 bottom-0 z-40 border-t border-coffee/10 bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-[6px] sm:hidden"
    >
      <div className="flex items-center gap-3">
        <a
          href="#cardapio"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill border border-coffee/25 text-[0.9375rem] font-medium text-coffee"
        >
          <UtensilsCrossed className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          Cardápio
        </a>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill bg-terracotta text-[0.9375rem] font-medium text-cream"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          Fazer pedido
        </a>
      </div>
      <span className="sr-only">
        Pedidos pelo canal oficial de {business.name}
      </span>
    </div>
  )
}
