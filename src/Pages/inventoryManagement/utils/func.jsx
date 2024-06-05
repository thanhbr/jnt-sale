import { replaceAllCustom } from '../../../util/functionUtil'

export const CalculatePayment = (listItem,productInfo) => {

  const tmpPrice = listItem.reduce((p, n) => {
    const itemPrice =
      Number(n?.price || 0) * Number(n?.quantity || 0)

    return p + itemPrice
  }, 0)
  const vat_price = productInfo.vat?.length > 3 ? replaceAllCustom(productInfo.vat, ',', '') : productInfo.vat
  const totalAmount = +tmpPrice + Number(vat_price)

  return +totalAmount + Number(productInfo?.totalReturn) - Number(productInfo?.totalPayment)
}