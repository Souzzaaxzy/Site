import { useMemo, useRef, useState } from 'react'
import { MessageCircle, CalendarClock } from 'lucide-react'
import { business, dailyMenu } from '../data/business'
import { whatsappHref } from '../lib/format'

/** JS `getDay()` is 0 for Sunday; the menu runs Monday through Saturday. */
function todayIndex() {
  const day = new Date().getDay()
  if (day === 0) return 0
  return day - 1
}

export function DailyMenu() {
  const [selected, setSelected] = useState(() => todayIndex())
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const today = useMemo(todayIndex, [])

  const move = (delta: number) => {
    const next = (selected + delta + dailyMenu.length) % dailyMenu.length
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setSelected(0)
      tabRefs.current[0]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      const last = dailyMenu.length - 1
      setSelected(last)
      tabRefs.current[last]?.focus()
    }
  }

  const day = dailyMenu[selected]
  const askHref = whatsappHref(
    `Olá! Gostaria de saber o cardápio de ${day.label.toLowerCase()}.`,
  )

  return (
    <section
      id="cardapio-do-dia"
      aria-labelledby="cardapio-do-dia-title"
      className="scroll-mt-20 bg-coffee text-cream"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-24 md:px-8 md:py-28 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
                          <h2
                id="cardapio-do-dia-title"
                className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-cream"
              >
                O prato de cada dia da semana
              </h2>
          </div>
                      <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-cream/75">
              A cozinha monta o almoço de segunda a sábado.
            </p>
        </div>

                  <div
            role="tablist"
            aria-label="Dias da semana"
            onKeyDown={onKeyDown}
            className="mt-9 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] md:mt-12 md:gap-2 [&::-webkit-scrollbar]:hidden"
          >
            {dailyMenu.map((item, index) => {
              const isSelected = index === selected
              const isToday = index === today
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelected(index)}
                  className={`relative shrink-0 rounded-pill px-4 py-2.5 text-[0.9375rem] transition-[background-color,color] duration-200 ease-[var(--ease-out-soft)] md:px-5 ${
                    isSelected
                      ? 'bg-terracotta text-cream'
                      : 'text-cream/70 hover:bg-cream/10 hover:text-cream'
                  }`}
                >
                  <span className="md:hidden">{item.short}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  {isToday && (
                    <span
                      aria-hidden="true"
                      className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${
                        isSelected ? 'bg-cream' : 'bg-honey'
                      }`}
                    />
                  )}
                  {isToday && <span className="sr-only">(hoje)</span>}
                </button>
              )
            })}
          </div>

                  <div
            role="tabpanel"
            id={`panel-${day.id}`}
            aria-labelledby={`tab-${day.id}`}
            tabIndex={0}
            className="mt-6 rounded-frame border border-cream/15 bg-cream/[0.045] p-6 md:p-9"
          >
            <p className="text-[0.8125rem] text-cream/60">
              {day.label}
              {selected === today && ' · hoje'}
            </p>

            {day.dishes && day.dishes.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {day.dishes.map((dish) => (
                  <li
                    key={dish}
                    className="flex items-start gap-3 border-b border-cream/10 pb-3 text-[1.0625rem] leading-snug text-cream last:border-0 last:pb-0"
                  >
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-honey" />
                    {dish}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="flex items-start gap-3.5">
                  <CalendarClock
                    className="mt-0.5 h-5 w-5 shrink-0 text-honey"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[1.0625rem] leading-snug text-cream">
                      O cardápio de {day.label.toLowerCase()} é divulgado pela cozinha.
                    </p>
                    <p className="mt-1.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-cream/70">
                      O prato muda conforme o mercado e a produção.
                    </p>
                  </div>
                </div>

                {askHref ? (
                  <a
                    href={askHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-pill bg-cream px-6 py-3.5 text-[0.9375rem] font-medium text-coffee transition-[background-color,transform] duration-200 hover:bg-linen active:translate-y-px"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                    Consultar no WhatsApp
                  </a>
                ) : (
                  <p className="shrink-0 rounded-frame border border-cream/20 px-4 py-3 text-[0.8125rem] leading-relaxed text-cream/70 md:max-w-[22ch]">
                    WhatsApp oficial ainda não confirmado. Use os canais oficiais em{' '}
                    <a
                      href={business.ordering.linktree.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-cream underline decoration-cream/40 underline-offset-4"
                    >
                      linktr.ee/temperodmae
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </div>

                  <p className="mt-5 text-[0.8125rem] leading-relaxed text-cream/55">
            Os pratos de cada dia são publicados aqui assim que a cozinha envia a lista da semana.
          </p>
      </div>
    </section>
  )
}
