import { about, business } from '../data/business'
import { Picture } from '../components/Picture'

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 bg-linen/55">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
                      <Picture
              base="/img/cozinha"
              widths={[720, 960, 1280]}
              ratio={16 / 9}
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt={about.photo.alt}
              className="w-full overflow-hidden rounded-frame bg-cream"
              imgClassName=""
              objectPosition="50% 45%"
            />

          <div className="order-1 lg:order-2">
                          <h2
                id="sobre-title"
                className="text-[clamp(1.875rem,4.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-coffee"
              >
                {about.heading}
              </h2>

            <div className="mt-5 space-y-5">
              {about.paragraphs.map((text) => (
                                  <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-coffee-soft">
                    {text}
                  </p>
              ))}
            </div>

                          <figure className="mt-9 border-l-2 border-terracotta/60 pl-5">
                <blockquote className="font-display text-[1.375rem] font-medium italic leading-snug text-coffee">
                  “{business.tagline}”
                </blockquote>
                <figcaption className="mt-2 text-[0.8125rem] text-ink-muted">
                  Assinatura do {business.name}
                </figcaption>
              </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
