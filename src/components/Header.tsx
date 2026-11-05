import { useEffect, useId, useRef, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { business } from '../data/business'
import { primaryOrderHref } from '../lib/format'
import { navItems, useActiveSection, useScrolled } from '../lib/useActiveSection'

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(32)
  const active = useActiveSection(navItems.map((i) => i.id))
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-soft)] ${
        scrolled || open
          ? 'border-rule/80 bg-cream/92 backdrop-blur-[6px] shadow-hair'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3.5 md:px-8 lg:py-4">
        <a
          href="#inicio"
          className="flex min-h-11 min-w-0 items-center gap-3"
          aria-label={`${business.name}, início`}
        >
          <img
            src="/img/logo-tempero-96.png"
            alt=""
            width={40}
            height={33}
            className="h-9 w-auto shrink-0 md:h-10"
            decoding="async"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-coffee md:text-lg">
              {business.name}
            </span>
            <span className="hidden text-[0.6875rem] text-ink-muted sm:block">
              {business.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-pill px-3.5 py-2 text-[0.9375rem] transition-colors duration-200 ${
                      isActive ? 'text-coffee' : 'text-coffee-soft hover:text-coffee'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-terracotta transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={primaryOrderHref()}
            className="group/cta hidden h-12 items-center gap-2 whitespace-nowrap rounded-pill bg-terracotta px-5 text-[0.9375rem] font-medium text-cream shadow-cta-compact transition-[background-color,transform,box-shadow] duration-200 hover:bg-terracotta-deep active:translate-y-px sm:inline-flex"
            {...(primaryOrderHref().startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Fazer pedido
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-coffee/20 text-coffee transition-colors duration-200 hover:border-coffee/45 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-rule/70 bg-cream lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)" className="mx-auto max-w-[1180px] px-5 py-4">
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li key={item.id} className={index > 0 ? 'border-t border-rule/60' : ''}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-[1.0625rem] text-coffee"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={primaryOrderHref()}
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-terracotta px-5 py-3.5 font-medium text-cream"
            {...(primaryOrderHref().startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Fazer pedido
          </a>
        </nav>
      </div>
    </header>
  )
}
