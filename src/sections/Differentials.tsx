import { differentials } from '../data/business'

/**
 * The five reasons read as one wide ledger, so the section keeps the
 * container's measure and the numbers carry the rhythm.
 */
export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="bg-cream">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
                  <h2
            id="diferenciais-title"
            className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-coffee"
          >
            Por que o almoço aqui sabe diferente
          </h2>

                  <ol className="mt-12 grid border-t border-rule/90 sm:grid-cols-2 md:mt-14 lg:grid-cols-5 lg:border-t-0">
            {differentials.map((item, index) => (
              <li
                key={item.title}
                className="border-b border-rule/90 py-6 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 lg:border-r lg:border-b-0 lg:border-t lg:pt-6"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[0.875rem] font-semibold text-terracotta tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-coffee">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-coffee-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
      </div>
    </section>
  )
}
