import { Text } from 'common/text'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { EmployeeContext } from 'Pages/Report/Sales/Pages/Employee/provider/_context'
import { useContext, useState } from 'react'
import { OrderSkeleton } from '../skeleton/index'
import { EmployeeEmpty } from '../employeeEmpty'
import { formatMoney } from 'util/functionUtil'
import { fNumber } from '../../../../../../../util/formatNumber'
import { Tooltip as TooltipV2 } from '../../../../../../../common/tooltipv2'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const EmployeeTBody = () => {
  const { pageState } = useContext(EmployeeContext)
  const displayList = pageState.table.display.list

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => (
          <OrderTr
            key={index}
            stt={index}
            data={item}
            style={{
              borderLeft: '1px solid #e2eaf8',
              borderRight: '1px solid #e2eaf8',
              width: 1604
            }}
          />
        ))
      ) : loading ? (
        <EmployeeEmpty/>
      ) : (
        <OrderSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTr = ({ data, ...props }) => {
  let orderDetail = data?.arr_status
  let preOrderDetail = orderDetail.slice(0, 6)
  let postOrderDetail = orderDetail.slice(6, 8)
  const {t} = useTranslation()
  return (
    <>
      <Tr
        {...props}
        className="employee-management-table__row report-table__employee-row"
      >
        <Td className="employee-management-table__cell">
          {+props.stt + 1}
        </Td>
        <Td className="employee-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>
            <TooltipV2 className="employee-management-table__tooltipV2" title={data?.fullname} baseOn="height">
              {data?.fullname}
            </TooltipV2>
          </Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'}>({t('average_order_value')}: {formatMoney(data?.total_avg)})</Text>
        </Td>
        {preOrderDetail.map((order, index) => (
          <Td className="employee-management-table__cell" data-type="td" key={index}>
            <Text as={'p'}>{formatMoney(!!order?.total_cod ? order?.total_cod : 0)}</Text>
            <Text as={'p'} fontSize={13} color={'#7C88A6'}>{fNumber(order?.total_orders)} {t('orders')}</Text>
          </Td>
        ))}
        <Td className="employee-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>{formatMoney(data?.total_cod || 0)}</Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'} fontWeight={600}>{data?.total_order || 0}  <Text fontSize={13} color={'#7C88A6'}>{t('orders')}</Text> &nbsp;
            <Text color={data?.total_rate >= 80 ? '#00AB56' : data?.total_rate >= 50 ? '#FF9F41' : '#FF424E'} fontWeight={600} fontSize={11}>({data?.total_rate}%)</Text>
          </Text>
        </Td>
        {postOrderDetail.map((order,index) => (
          <Td className="employee-management-table__cell" data-type="td" key={`t-${index}`}>
            <Text as={'p'}>{formatMoney(!!order?.total_cod ? order?.total_cod : 0)}</Text>
            <Text as={'p'} fontSize={13} color={'#7C88A6'} >{fNumber(order?.total_orders)} {t('orders')}</Text>
          </Td>
        ))}
      </Tr>
    </>
  )
}
