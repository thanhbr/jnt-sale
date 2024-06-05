import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useRow from '../../hooks/useRow'
import { ProductRevenueContext } from 'Pages/Report/Sales/Pages/ProductRevenue/provider/_context'
import React, { useContext, useState } from 'react'
import { OrderSkeleton } from '../skeleton/index'
import { ProductRevenueEmpty } from '../productRevenueEmpty'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Text } from '../../../../../../../common/text'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { Tooltip as TooltipV1 } from '../../../../../../../common/tooltip'

export const ProductRevenueTBody = () => {
  const { pageState } = useContext(ProductRevenueContext)
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
              width: 1800
            }}
          />
        ))
      ) : loading ? (
        <ProductRevenueEmpty/>
      ) : (
        <OrderSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const employeeRow = useRow(data)
  const { cell, row } = employeeRow
  const { codeOrder } = cell

  return (
    <>
      <Tr
        {...props}
        className="productRevenue-management-table__row"
      >
        <Td className="productRevenue-management-table__cell">
          {+props.stt + 1}
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>
            <Tooltip baseOn={'height'} className={'productRevenue-management-table__tooltipV2'} title={data?.product_name}>
              {data?.product_name}
            </Tooltip>
          </Text>
          {data.product_model?.length < 15
            ? <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>SKU: {data.product_model}</Text>
            : <TooltipV1 title={`SKU: ${data.product_model}`}>
              <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>SKU: {data.product_model?.substring(0, 15)+'...'}</Text>
            </TooltipV1>
          }
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text as={'p'}>
            <Tooltip baseOn={'height'} className={'productRevenue-management-table__tooltipV2'} title={data?.unit_name}>
              {data?.unit_name}
            </Tooltip>
          </Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.cost_price)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.total_price_avg)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{data.total_quantity}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.revenue_before_discount)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.total_discount)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.revenue_after_discount)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.total_cost_price)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{formatMoney(data.profit)}</Text>
        </Td>
        <Td className="productRevenue-management-table__cell" data-type="td">
          <Text>{data.rate}%</Text>
        </Td>
      </Tr>
    </>
  )
}
