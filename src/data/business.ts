/*
 * Every commercial fact lives here so the owner can update the site
 * without touching a component. Anything marked `unconfirmed` is shown on
 * the page with a visible "confirmar" note and must be reviewed before
 * the site goes live.
 */

export type Confidence = 'confirmed' | 'unconfirmed'

export const business = {
  name: 'Tempero de Mãe',
  legalName: 'Restaurante Tempero de Mãe',
  tagline: 'A culinária da Memória e do Afeto',
  signature: 'Feita com carinho',
  positioning: 'Restaurante, marmitaria e delivery',
  yearsInBusiness: 7,

  address: {
    street: 'Rua Criseida, 311A',
    district: 'Jardim Cris',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '05821-130',
    country: 'Brasil',
  },

  maps: {
    place:
      'https://www.google.com/maps/place/Tempero+de+M%C3%A3e+-+R.+Criseida,+311A+-+Jardim+Cris,+S%C3%A3o+Paulo+-+SP,+05821-130/data=!4m2!3m1!1s0x94ce53006dcad5cd:0x24f739ce4f0d3fa8',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Rua+Criseida,+311A+-+Jardim+Cris,+S%C3%A3o+Paulo+-+SP,+05821-130',
    embed:
      'https://www.google.com/maps?q=Rua%20Criseida%2C%20311A%20-%20Jardim%20Cris%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005821-130&output=embed',
  },

  /**
   * The Linktree profile points its "Faça seu Pedido" button at a GrandChef
   * store that presents itself as "Restaurante e Pizzaria Tempero de Mãe".
   * The Maps record for Rua Criseida does not mention a pizzaria, so the
   * owner must confirm the store belongs to the same business before the
   * site presents it as the official ordering channel.
   */
  ordering: {
    linktree: {
      url: 'https://linktr.ee/temperodmae',
      label: 'Linktree oficial',
      confidence: 'confirmed' as Confidence,
    },
    grandchef: {
      url: 'https://temperodemae.grandchef.com.br',
      label: 'Faça seu Pedido',
      confidence: 'unconfirmed' as Confidence,
      note: 'Apresenta-se como "Restaurante e Pizzaria Tempero de Mãe". Confirme se é a mesma loja.',
    },
    toop: {
      url: 'https://toop-temperodemae.pedidoon.net/',
      label: 'Cardápio online',
      confidence: 'unconfirmed' as Confidence,
      note: 'Cardápio e preços consultados em nov/2023; o texto cita entregas em Santa Rosa.',
    },
  },

  /**
   * The only number on the ordering platform was a placeholder from its own
   * theme, and the Linktree button points to a number in another area code.
   * No phone number is published until the owner confirms one.
   */
  whatsapp: {
    number: null as string | null,
    confidence: 'unconfirmed' as Confidence,
    note: 'Nenhum número foi confirmado. Informe o WhatsApp oficial para publicá-lo.',
  },

  hours: {
    value: null as string | null,
    confidence: 'unconfirmed' as Confidence,
    note: 'Horário de funcionamento não confirmado.',
  },

  social: {
    instagram: { handle: '@temperodmae', url: 'https://www.instagram.com/temperodmae/' },
    linktree: { handle: 'temperodmae', url: 'https://linktr.ee/temperodmae' },
  },
}

export const delivery = {
  intro: 'Entregamos no Jardim Cris e região.',
  steps: [
    { title: 'Escolha o prato', body: 'Veja o cardápio do dia.' },
    {
      title: 'Chame no WhatsApp',
      body: 'Envie o endereço completo.',
    },
    {
      title: 'Receba em casa',
      body: 'Combinamos pagamento e horário.',
    },
  ],
}

export type DishCategory = 'marmitas' | 'porcoes' | 'xis'

export interface Dish {
  id: string
  name: string
  description: string
  price: number | null
  /** File stem under /img, e.g. `dish-marmita`. */
  imageStem: string
  imageAlt: string
  category: DishCategory
  priceConfidence: Confidence
}

export const dishes: Dish[] = [
  {
    id: 'marmita',
    name: 'Marmita',
    description: 'Arroz, feijão, proteína do dia e acompanhamento.',
    price: 20,
    imageStem: 'dish-marmita',
    imageAlt: 'Marmita do Tempero de Mãe com arroz, feijão e acompanhamentos',
    category: 'marmitas',
    priceConfidence: 'unconfirmed',
  },
  {
    id: 'porcao-de-panquecas',
    name: 'Porção de Panquecas',
    description: 'Porção com 10 unidades a sua escolha: carne ou frango.',
    price: 35,
    imageStem: 'dish-panquecas',
    imageAlt: 'Porção de panquecas do Tempero de Mãe servida em prato',
    category: 'porcoes',
    priceConfidence: 'unconfirmed',
  },
  {
    id: 'xis-burguer',
    name: 'Xis Burguer',
    description: 'Calabresa, alface, maionese e molho especial.',
    price: 25,
    imageStem: 'dish-xis-burguer',
    imageAlt: 'Xis Burguer do Tempero de Mãe com calabresa, alface e molho especial',
    category: 'xis',
    priceConfidence: 'unconfirmed',
  },
  {
    id: 'xis-salada',
    name: 'Xis Salada',
    description: 'Xis salada especial, montado na hora.',
    price: 25,
    imageStem: 'dish-xis-salada',
    imageAlt: 'Xis Salada especial do Tempero de Mãe',
    category: 'xis',
    priceConfidence: 'unconfirmed',
  },
]

export const dishCategories: { id: DishCategory; label: string }[] = [
  { id: 'marmitas', label: 'Marmitas' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'xis', label: 'Xis' },
]

export interface DailyMenuDay {
  id: string
  label: string
  short: string
  dishes: string[] | null
}

/**
 * The establishment publishes a different menu each weekday, but no verified
 * menu content was available. Each day stays empty on purpose and the section
 * shows a "consultar no WhatsApp" state instead of invented dishes.
 */
export const dailyMenu: DailyMenuDay[] = [
  { id: 'segunda', label: 'Segunda-feira', short: 'Seg', dishes: null },
  { id: 'terca', label: 'Terça-feira', short: 'Ter', dishes: null },
  { id: 'quarta', label: 'Quarta-feira', short: 'Qua', dishes: null },
  { id: 'quinta', label: 'Quinta-feira', short: 'Qui', dishes: null },
  { id: 'sexta', label: 'Sexta-feira', short: 'Sex', dishes: null },
  { id: 'sabado', label: 'Sábado', short: 'Sáb', dishes: null },
]

export const differentials = [
  {
    title: 'Comida caseira de verdade',
    body: 'Panela, tempero na medida.',
  },
  {
    title: 'Cardápio que muda todo dia',
    body: 'Um prato por dia.',
  },
  {
    title: 'Praticidade no dia a dia',
    body: 'Marmita pronta para o almoço.',
  },
  {
    title: 'Carinho no preparo',
    body: 'Montado depois do pedido.',
  },
  {
    title: 'Delivery na região',
    body: 'Entrega no Jardim Cris.',
  },
]

export const about = {
  heading: 'Comida caseira no Jardim Cris há mais de sete anos.',
  paragraphs: [
    'Nasceu da culinária da memória e do afeto: comida feita em casa, sem atalho e sem pressa. São mais de sete anos de almoço, marmita e delivery no Jardim Cris, na zona leste de São Paulo.',
  ],
  photo: {
    src: '/img/cozinha.jpg',
    alt: 'Mãos sovando massa sobre uma mesa enfarinhada',
  },
}

export const photoCredits = [
  {
    label: 'Shixart1985',
    url: 'https://commons.wikimedia.org/wiki/File:Baker_woman%27s_hands_kneading_bread_dough.jpg',
    licence: 'CC BY 2.0',
  },
  {
    label: 'CEphoto, Uwe Aranas',
    url: 'https://commons.wikimedia.org/wiki/File:Taipei_Taiwan_Jiaozi-Restaurant-14th-Avenue-01.jpg',
    licence: 'CC BY-SA 3.0',
  },
  {
    label: 'Ssemmanda will',
    url: 'https://commons.wikimedia.org/wiki/File:Kneading_Chapati_Dough_04.jpg',
    licence: 'CC BY-SA 4.0',
  },
]

export const unconfirmedNotes = [
  'Preços das marmitas, panquecas e xis: valores divulgados em nov/2023.',
  'WhatsApp oficial: nenhum número confirmado.',
  'Horário de funcionamento: não confirmado.',
  'Canal de pedidos: confirmar se a loja do GrandChef é a mesma do Jardim Cris.',
]
