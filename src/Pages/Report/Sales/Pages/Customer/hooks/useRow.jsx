import { useContext } from 'react'
import { CustomerContext } from '../provider/_context'

const useOrderRow = data => {
  const { pageState, pageDispatch } = useContext(CustomerContext)
  const { table } = pageState
  const isLoading = table.detail.loading
  const detailActive = table.detail.active


  // ==================== CELL ========================================
  // CODE ORDER
  const codeOrderhaveInventory = data?.has_inventory === '1'

  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }

  // PAYMENT
  const cellPaymentGetStatus = () => {
    const amount = Number(data?.total_amount) || 0
    const payment = Number(data?.total_payment) || 0
    if (amount <= payment) return 'success'
    if (payment > 0 && amount > payment) return 'warning'
    return 'danger'
  }

  return {
    cell: {
      codeOrder: {
        dateTime: cellCodeOrderFormatDateTime(data?.dt_created),
        haveInventory: codeOrderhaveInventory,
      },
      payment: { status: cellPaymentGetStatus() },
    },
    detail: {
      isLoading,
      active: detailActive,
      tabs: { payment: { formatDateTime: cellCodeOrderFormatDateTime } },
    },
  }
}

export default useOrderRow
