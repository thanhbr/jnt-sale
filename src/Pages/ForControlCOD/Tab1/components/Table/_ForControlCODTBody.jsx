import { formatDatetime } from 'common/form/datePicker/_functions'
import { Text } from 'common/text'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useRow from 'Pages/ForControlCOD/Tab1/hooks/useRow'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab1/provider/_context'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { formatMoney } from 'util/functionUtil'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useAlert from '../../../../../hook/useAlert'
import UseForControlCODFilterForm from '../../hooks/useForControlCODFilterForm'
import { orderActions } from '../../provider/_reducer'
import { DetailModal } from '../DetailModal'
import { ForControlCODEmpty } from '../Empty'
import { OrderSkeleton } from '../skeleton/index'
import { RowOrderExtra } from './_rowForControlCODExtra'

export const ForControlCODTBody = () => {
  const {pageState} = useContext(ForControlCODContext)
  const displayList = pageState.table.display.list
  const arr_details = pageState.table.display.arr_details

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => (
          <OrderTr
            key={index}
            data={item}
            arr_detail={arr_details[item.order_id]}
          />
        ))
      ) : loading ? (
        <ForControlCODEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const ForControlCODRow = useRow(data)
  const {row} = ForControlCODRow
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const {pageState, pageDispatch} = useContext(ForControlCODContext)

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])

  const handleOpenDetailPopup = () => {
    setOpenDetailModal(true)
  }

  return (
    <>
      <Tr
        {...props}
        className="for-controlCOD-table__row"
      >
        <Td className="for-controlCOD-table__cell" data-type="td">
          <Text as='a' onClick={handleOpenDetailPopup} color="#1A94FF">{data.paymentCycle}</Text>
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
        {data.payNumber}
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
          {formatDatetime(data?.payDate)}
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
          {formatDatetime(data?.paymentDate)}
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
          {formatMoney(data?.price)}
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
          {formatMoney(data?.cod)}
        </Td>
        <Td className="for-controlCOD-table__cell" data-type="td">
          {formatMoney(data.moneyBack)}
        </Td>
      </Tr>
      {openDetailModal && (
        <DetailModal onClose={() => setOpenDetailModal(false)} data={data} />
      )}
    </>
  )
}
