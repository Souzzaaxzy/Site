import { business, dishes, dailyMenu } from '../data/business'

/**
 * Schema.org markup for a restaurant. Every field here is verified: the name,
 * the address from the Google Maps record, the menu items and prices published
 * by the establishment itself, and the social profiles. Opening hours, phone
 * number and price range are deliberately omitted rather than guessed.
 */
export function StructuredData() {
  const hasDailyMenu = dailyMenu.some((day) => day.dishes && day.dishes.length > 0)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://temperodemae.com.br/#restaurante',
    name: business.name,
    alternateName: business.legalName,
    description:
      'Restaurante, marmitaria e delivery de comida caseira no Jardim Cris, São Paulo. Marmitas, porções e xis, com cardápio que muda durante a semana.',
    slogan: business.tagline,
    url: 'https://temperodemae.com.br/',
    image: 'https://temperodemae.com.br/img/hero-tempero-1280.jpg',
    servesCuisine: ['Brasileira', 'Comida caseira', 'Marmita'],
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, Cartão de crédito, Cartão de débito, Pix',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'City',
      name: 'São Paulo',
    },
    hasMap: business.maps.place,
    sameAs: [business.social.instagram.url, business.social.linktree.url],
    ...(hasDailyMenu ? {} : { menu: 'https://temperodemae.com.br/#cardapio' }),
    hasMenu: {
      '@type': 'Menu',
      name: 'Cardápio Tempero de Mãe',
      hasMenuSection: {
        '@type': 'MenuSection',
        name: 'Pratos',
        hasMenuItem: dishes.map((dish) => ({
          '@type': 'MenuItem',
          name: dish.name,
          description: dish.description,
          ...(dish.price !== null
            ? {
                offers: {
                  '@type': 'Offer',
                  price: dish.price.toFixed(2),
                  priceCurrency: 'BRL',
                },
              }
            : {}),
        })),
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      // Static, hand-written JSON-LD; no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
