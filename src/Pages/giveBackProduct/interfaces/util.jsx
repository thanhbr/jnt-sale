export const calculatedGivebackProduct = (data) => {
  let totalAmount = 0
  let provisionalAmount = 0 // Tiền tạm tính của đơn hàng
  const listOrderReturn = data

  listOrderReturn.is_refund = 1
  listOrderReturn.checkAllProduct = 1
  listOrderReturn?.products?.map(item => {
    item.original_number = +item.quantity - +item.quantity_returned
    item.amount_paid = +item.quantity - +item.quantity_returned
    item.value_paid = +item?.discount_type === 1
      ? (+item?.price * +item.quantity) - +item?.discount
      : +item?.discount_type === 2
        ? (+item?.price - +item?.discount) * item.quantity
        : (+item?.price * item.quantity) - (+item?.discount / +item.quantity)
    item.payment_method = []
    item.payment_money = 0

    // Tổng tiền sản phẩm sau khi giảm giá
    item.total_amount_product_after_discount = +item?.discount_type === 1
      ? (+item?.price * +item?.original_number - +item?.discount)
      : (+item?.discount_type === 2
        // ? (+item?.price * +item?.original_number * (1 - +item?.discount_value / 100))
        ? +item?.total_price
        : (+item?.price * +item?.original_number - (+item?.discount / +item.original_number)))
    provisionalAmount += item.total_amount_product_after_discount
    // Giảm giá trên sản phẩm
    item.discount_price_paid = +item?.discount_type === 2 ? +item?.discount : (+item?.discount / +item?.original_number)
    return item
  })
  listOrderReturn?.products?.map(item => {
    // Trọng số sản phẩm
    item.product_weight = +item?.total_amount_product_after_discount / provisionalAmount
    // Giảm giá sản phẩm theo tổng đơn hàng
    item.product_discount_total_order = +listOrderReturn?.order_discount_type === 1
      ? +item.product_weight * +listOrderReturn?.order_discount_value / +item.original_number
      : +item.product_weight * (+listOrderReturn?.order_discount_value / 100 * provisionalAmount) / +item.original_number
    // Tổng giảm giá mỗi sản phẩm
    item.total_discount_per_product = (+item?.discount_price_paid || 0) + (+item?.product_discount_total_order || 0)
    // Đơn giá hàng trả
    item.unit_price_paid = parseInt((+item?.price || 0) - (+item?.total_discount_per_product || 0), 10)
    // item.unit_price_paid = !!!item?.discount_type
    //   ? parseInt(+item?.price - +item?.total_discount_per_product, 10)
    //   : parseInt(+item?.total_price - +item?.total_discount_per_product, 10)
    // Giá trị hàng trả gợi ý
    // item.suggested_return_value = (+item?.discount_type === 2 || !!!item?.discount_type) ? parseInt(+item?.unit_price_paid * +item?.original_number, 10) : +item?.unit_price_paid
    item.suggested_return_value = parseInt((+item?.unit_price_paid || 1) * (+item?.original_number || 1), 10)
    // item.return_value = (+item?.discount_type === 2 || !!!item?.discount_type)
    //                   ? parseInt(+item?.unit_price_paid * +item?.original_number, 10)
    //                   : +item?.unit_price_paid
    item.return_value = parseInt((+item?.unit_price_paid || 1) * (+item?.original_number || 1), 10)
    totalAmount += +item.return_value
    return item
  })

  listOrderReturn.value_paid = listOrderReturn?.products?.length > 0 ? totalAmount : +listOrderReturn?.total_amount
  listOrderReturn.payment_money = listOrderReturn?.products?.length > 0 ? totalAmount : +listOrderReturn?.total_amount

  return listOrderReturn
}