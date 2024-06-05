export const CalculatePayment = (listItem,productInfo,vat) => {
  const tmpPrice = listItem.reduce((p, n) => {
    const itemPrice =
      Number(n?.price || 0) * Number(n?.quantity || 0)

    return p + itemPrice
  }, 0)
  const totalAmount = +tmpPrice + Number(vat)

  return +totalAmount + Number(productInfo?.totalReturn) - Number(productInfo?.totalPayment)
}