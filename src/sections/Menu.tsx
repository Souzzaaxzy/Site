import { business, dishCategories, dishes, type Dish } from '../data/business'
import { formatPrice, orderHrefFor } from '../lib/format'
import { Picture } from '../components/Picture'

function DishEntry({ dish }: { dish: Dish }) {
  const href = orderHrefFor(dish.name)
  const widths = dish.id === 'marmita' ? [360] : [360, 540]

  return (
          <div className="grid gap-6 py-8 md:grid-cols-[minmax(0,236px)_minmax(0,1fr)] md:items-start md:gap-10 md:py-9">
        <Picture
          base={`/img/${dish.imageStem}`}
          widths={widths}
          ratio={5 / 4}
          sizes="(min-width: 768px) 236px, 100vw"
          alt={dish.imageAlt}
          className="w-full overflow-hidden rounded-frame bg-linen"
          imgClassName=""
        />

        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <h3 className="shrink-0 text-[1.0625rem] font-semibold leading-tight tracking-[-0.015em] text-coffee">
              {dish.name}
            </h3>
            <span
              aria-hidden="true"
              className="mb-1.5 min-w-6 flex-1 self-end border-b border-dotted border-rule"
            />
            {dish.price !== null ? (
              <p className="shrink-0 font-display text-[1.25rem] font-semibold leading-none text-coffee tabular-nums">
                {formatPrice(dish.price)}
              </p>
            ) : (
              <p className="shrink-0 text-[0.9375rem] text-ink-muted">sob consulta</p>
            )}
          </div>

          <p className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-coffee-soft">
            {dish.description}
          </p>

          <a
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="mt-2.5 inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-terracotta underline decoration-terracotta/35 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-terracotta-deep hover:decoration-terracotta-deep"
          >
            Pedir este prato
          </a>
        </div>
      </div>
  )
}

export function Menu() {
  return (
    <section id="cardapio" aria-labelledby="cardapio-title" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
                          <h2
                id="cardapio-title"
                className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-coffee"
              >
                Marmitas, porções e xis
              </h2>
          </div>
                      <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-coffee-soft">
              Marmitas, porções e xis montados na hora.
            </p>
        </div>

        {dishCategories.map((category) => {
          const items = dishes.filter((dish) => dish.category === category.id)
          if (items.length === 0) return null
          return (
            <div key={category.id} className="mt-14 md:mt-16">
                              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em] text-coffee">{category.label}</h3>
              <ul className="mt-4 border-t border-rule/90">
                {items.map((dish) => (
                  <DishEntry key={dish.id} dish={dish} />
                ))}
              </ul>
            </div>
          )
        })}

                  <div className="mt-10 flex flex-col gap-4 border-t border-rule/90 pt-6 text-[0.8125rem] leading-relaxed text-ink-muted md:flex-row md:items-start md:justify-between md:gap-10">
            <p className="max-w-[62ch]">
              Valores divulgados em novembro de 2023. Confirme os preços atuais antes de pedir.
            </p>
            <p className="max-w-[46ch] md:text-right">
              Cardápio completo nos{' '}
              <a
                href={business.ordering.linktree.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-coffee underline decoration-rule underline-offset-4 transition-colors hover:decoration-terracotta"
              >
                canais oficiais do {business.name}
              </a>
              .
            </p>
          </div>
      </div>
    </section>
  )
}
