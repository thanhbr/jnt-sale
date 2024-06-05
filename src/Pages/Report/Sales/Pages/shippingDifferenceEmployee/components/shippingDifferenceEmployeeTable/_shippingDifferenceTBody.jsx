import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ShippingDifferenceContext } from 'Pages/Report/Sales/Pages/shippingDifferenceEmployee/provider/_context'
import { useContext, useState } from 'react'
import { OrderSkeleton } from '../skeleton/index'
import { ShippingDifferenceEmpty } from '../shippingDifferenceEmployeeEmpty'
import { Text } from '../../../../../../../common/text'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { fNumber } from '../../../../../../../util/formatNumber'
import { useTranslation } from 'react-i18next'

export const ShippingDifferenceTBody = () => {
  const { pageState } = useContext(ShippingDifferenceContext)
  const displayList = pageState.table.display.list
  const arr_details = pageState.table.display.arr_details
  const viewType = pageState.view
  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => viewType.value == 1 ? (
            <OrderTrOverView
              key={index}
              stt={index}
              data={item}
              arr_detail={arr_details[item.order_id]}

              style={{
                borderLeft: '1px solid #e2eaf8',
                borderRight: '1px solid #e2eaf8',
                width: '100&'
              }}
            />
          )
          :
          (
            <OrderTr
              key={index}
              stt={index}
              data={item}
              arr_detail={arr_details[item.order_id]}

              style={{
                borderLeft: '1px solid #e2eaf8',
                borderRight: '1px solid #e2eaf8',
                width: 1604
              }}
            />
          ))
      ) : loading ? (
        <ShippingDifferenceEmpty/>
      ) : (
        <OrderSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTrOverView = ({ data, arr_detail, ...props }) => {
  const {t} = useTranslation()
  return (
    <>
      <Tr
        {...props}
        className="shipping-fee-management-table__row"
      >
        <Td className="shipping-fee-management-table__cell">
          {+props.stt + 1}
        </Td>
        <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="td">
          <Text as={'p'} fontWeight={600}>{data?.name == ' ' ? 'Không có nguồn' : data.name}</Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'}>({t('report__shipping_cost_difference_avg')}: {formatMoney(+(+data?.total_ship_fee_custom - +data?.total_ship_fee)  / data?.total_orders || 0)})</Text>
        </Td>
        <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell"
            style={{ paddingRight: '24px' }}>
          <Text as={'p'}>{formatMoney(data?.total_ship_fee_custom || 0)}</Text>
        </Td>
        <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell"
            style={{ paddingRight: '24px' }}>
          <Text as={'p'}>{formatMoney(data?.total_ship_fee || 0)}</Text>
        </Td>
        <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" data-type="td">
          <Text as={'p'}
                fontWeight={600}>{formatMoney((+data?.total_ship_fee_custom - +data?.total_ship_fee) || 0)}</Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'} fontWeight={600}>{data?.total_orders || 0}
            <Text fontSize={13} color={'#7C88A6'}>&nbsp; {t('orders')}</Text>
          </Text>
        </Td>
      </Tr>
    </>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const {t} = useTranslation()
  let orderDetail = data?.arr_status
  let preOrderDetail = orderDetail.slice(0, 6)
  return (
    <>
      <Tr
        {...props}
        className="shipping-fee-management-table__row report-table__employee-row"
      >
        <Td className="shipping-fee-management-table__cell">
          {+props.stt + 1}
        </Td>
        <Td className="shipping-fee-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>{data?.name == ' ' ? 'Không có nguồn' : data.name}</Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'}>({t('report__shipping_cost_difference_avg')}: {formatMoney(+(+data?.total_ship_fee_custom - +data?.total_ship_fee) / data?.total_orders || 0)})</Text>
        </Td>
        {preOrderDetail.map(order => (
          <Td className="shipping-fee-management-table__cell" data-type="td">
            <Text as={'p'}>{formatMoney(+order?.total_ship_fee_custom - +order?.total_ship_fee)}</Text>
            <Text as={'p'} fontSize={13} color={'#7C88A6'}>{fNumber(order?.total_orders)} {t('orders')}</Text>
          </Td>
        ))}
        <Td className="shipping-fee-management-table__cell" data-type="td">
          <Text as={'p'}
                fontWeight={600}>{formatMoney((+data?.total_ship_fee_custom - +data?.total_ship_fee) || 0)}</Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'} fontWeight={600}>{data?.total_orders || 0}
            <Text fontSize={13} color={'#7C88A6'}>&nbsp; {t('orders')}</Text>
          </Text>
        </Td>
      </Tr>
    </>
  )
}
