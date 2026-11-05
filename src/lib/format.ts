import { business } from '../data/business'

export const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

export function formatPrice(value: number) {
  return brl.format(value)
}

export const whatsappHref = (message: string) =>
  business.whatsapp.number
    ? `https://wa.me/${business.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    : null

/**
 * The ordering channel is only presented as official once it is confirmed.
 * Until then every "pedir" action falls back to the WhatsApp conversation,
 * which needs no third-party account.
 */
export function primaryOrderHref() {
  if (business.whatsapp.number) {
    return whatsappHref('Olá! Gostaria de fazer um pedido.') as string
  }
  if (business.ordering.grandchef.confidence === 'confirmed') {
    return business.ordering.grandchef.url
  }
  return business.ordering.linktree.url
}

export function orderHrefFor(dishName: string) {
  return whatsappHref(`Olá! Gostaria de pedir: ${dishName}.`) ?? primaryOrderHref()
}
