import { daysInMonth, getDateFromNow, getMonthFromNow, getYearFromNow } from '../../Employee/utils/date'
import { formatDatetime } from '../../../../../../common/form/datePicker/_functions'

export const transformDateTime = data => {
  return checkTypeDateType(data)
}

const checkTypeDateType = data => {
  switch (data.type) {

    case 'date':
      return handleDateTime(data.value)

    case 'month':
      return handleMonthTime(data.value)

    case 'quarter':
      return handleQuarterTime(data.value)

    case 'year':
      return handleYearTime(data.value)

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
    )} - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })}`
  }
  if (value == 15) {
    const dateTimeDefaultValue = [getDateFromNow(-15), getDateFromNow(0, { type: 'end' })]
    return `${formatDatetime(
      dateTimeDefaultValue[0], { onlyDate: true }
    )} - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })}`
  }
  if (value == 30) {
    const dateTimeDefaultValue = [getDateFromNow(-30), getDateFromNow(0, { type: 'end' })]
    return `${formatDatetime(
      dateTimeDefaultValue[0], { onlyDate: true }
    )} - ${formatDatetime(dateTimeDefaultValue[1], { onlyDate: true })}`
  }
  if (value == 'month') { // tháng này
    return `01/0${month}/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
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
    return `01/0${month}/${year} - ${days}/0${month}/${year}`
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
    return `01/${month}/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }

  if (value == '6month') {
    // 6 tháng qua

    if (month < 6) {
      month = 11 - month
      year = year - 1
    } else {
      month = month - 5
    }
    if (month < 10) month = `0${month}`
    return `01/${month}/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }
  if (value == 'lyear') {
    let lyear = year - 1
    return `01/01/${lyear} - 31/12/${lyear}`
  }
  if (value == 'year') {
    return `01/01/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }

}

const handleMonthTime = value => {
  let month = getMonthFromNow(0)
  let year = getYearFromNow(0)
  if (value == 3) {
    let lmonth = +month - 2
    let lyear = +year
    if (+month == 1) { // tháng 1 lùi về tháng 11 năm trước
      lmonth = 11
      lyear = +year - 1
    }
    if (+month == 2) { // tháng 2 lùi về tháng 12 năm trước
      lmonth = 12
      lyear = +year - 1
    }
    return `01/${lmonth}/${lyear} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }
  if (value == 12) {
    let lmonth = month + 1
    let lyear = 0
    if (+month == 12) {
      lmonth = 1
      lyear = +year
    } else {
      //lùi 1 năm
      lyear = +year - 1
    }
    return `01/${lmonth}/${lyear} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }
  if (value == 'lyear') {
    let lyear = year - 1
    return `01/01/${lyear} - 31/12/${lyear}`
  }
  if (value == 'year') {
    return `01/01/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }

}

const handleQuarterTime = value => {

  let month = getMonthFromNow(0)
  let year = getYearFromNow(0)
  let quarter = Math.ceil(month / 3)
  let lmonth
  if (value == 4) {
    if (quarter == 4) {
      return `01/01/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
    } else {
      lmonth = 12 - ((4 - quarter) * 3) + 1
      return `01/${lmonth}/${year - 1} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
    }
  }
  if (value == 'lyear') {
    let lyear = year - 1
    return `01/01/${lyear} - 31/12/${lyear}`
  }
  if (value == 'year') {
    return `01/01/${year} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
  }

}

const handleYearTime = value => {

  let year = getYearFromNow(0)
  return `01/01/${year + 1  - value} - ${formatDatetime(getDateFromNow(0, { type: 'end' }), { onlyDate: true })}`
}