export const transformOriginData = data => {
  return {
    employee: {
      list: data.employeeListData.map(item => ({
        name: item?.fullname || '',
        value: item?.user_id || '',
        groups: item?.user_group
          ? item.user_group.split(',').filter(item => !!item)
          : [],
      })),
      type: {
        list: data.employeeGroupData.map(item => ({
          name: item?.group_name || '',
          value: item?.id || '',
        })),
      },
    },
    product: {
      list: data.productListData.map(item => ({
        data: item || null,
        name: item?.product_name || '',
        value: item?.id || '',
      })),
    },
    shippingPartner: {
      list: data.shippingPartnerListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    shippingStatus: {
      list: data.shippingStatusListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    source: {
      list: data.sourceListData.map(item => ({
        name: item?.name || '',
        value: item?.id || '',
      })),
    },
    warehouse: {
      list: data.warehouseListData.map(item => ({
        name: item?.warehouse_name || '',
        value: item?.id || '',
      })),
    },
  }
}


export const transformPaymentMethodData = data => ({
  data,
  name: data?.name || '---',
  value: data?.id || '',
})


export const transformQueryObjToString = data => {
  let queryString = '?'
  let i = 0
  for (const [key, value] of Object.entries(data)) {
    queryString += `${i > 0 ? '&' : ''}${key}=${value}`
    i++
  }
  return queryString
}
import { daysInMonth, getDateFromNow, getMonthFromNow, getYearFromNow } from '../../Employee/utils/date'
import { formatDatetime } from '../../../../../../common/form/datePicker/_functions'

export const transformDateTime = data => {
  return checkTypeDateType(data)
}

const checkTypeDateType = data => {
  switch (data.type) {

    case 'date':
      return handleDateTime(data.value)

    default:
      return false

  }
}

const handleDateTime = value => {
  let month = +getMonthFromNow(0)
  let year = +getYearFromNow(0)
  if (value == 7) {
    const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0, { type: 'end' })]
    return `${formatDatetime(
      dateTimeDefaultValue[0], { onlyDate: true }
    )} 00:00 - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })} 23:59`
  }
  if (value == 15) {
    const dateTimeDefaultValue = [getDateFromNow(-15), getDateFromNow(0, { type: 'end' })]
    return `${formatDatetime(
      dateTimeDefaultValue[0], { onlyDate: true }
    )} 00:00 - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })} 23:59`
  }
  if (value == 30) {
    const dateTimeDefaultValue = [getDateFromNow(-30), getDateFromNow(0, { type: 'end' })]
    return `${formatDatetime(
      dateTimeDefaultValue[0], { onlyDate: true }
    )} 00:00 - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })} 23:59`
  }
  if (value == 'month') { // tháng này
    return `01/0${month}/${year} 00:00 - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })} 23:59`
  }
  if (value == 'lmoth') {
    // tháng trước
    let days = 0
    if (month == 1) { // tháng 1 lùi về 1 năm
      month = 12
      year = year - 1
    } else {
      month = month - 1
    }
    days = daysInMonth(month, year)
    return `01/0${month}/${year} 00:00 - ${days}/0${month}/${year} 23:59`
  }

  if (value == '3month') {
    // 3 tháng qua
    if (month == 1) { // tháng 1 lùi về 1 năm
      month = 11
      year = year - 1
    } else if (month == 2) { // tháng 2 lùi về 1 năm
      month = 12
      year = year - 1
    } else {
      month = month - 2
    }
    if (month < 10) month = `0${month}`
    return `01/${month}/${year} 00:00 - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })} 23:59`
  }

  if (value == '6month') {
    // 6 tháng qua

    if (month < 6) {
      month = 12 + month - 5
      year = year - 1
    } else {
      month = month - 5
    }
    if (month < 10) month = `0${month}`
    return `01/${month}/${year} 00:00 - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })} 23:59`
  }
  if (value == 'lyear') {
    let lyear = year - 1
    return `01/01/${lyear} 00:00 - 31/12/${lyear} 23:59`
  }
  if (value == 'year') {
    return `01/01/${year} 00:00 - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })} 23:59`
  }

}
