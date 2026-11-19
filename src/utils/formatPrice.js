// o preço vem da API em centavos: 3400 -> R$ 34,00
export function formatPrice(valueInCents) {
  return (valueInCents / 100).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
