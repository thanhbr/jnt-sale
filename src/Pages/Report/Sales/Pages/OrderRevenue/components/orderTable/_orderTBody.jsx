import { Skeleton } from '@mui/material'
import { Text } from 'common/text'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useOrderRow from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderRow'
import { ORDER_ICONS } from 'Pages/Report/Sales/Pages/OrderRevenue/interfaces/_icons'
import { OrderContext } from 'Pages/Report/Sales/Pages/OrderRevenue/provider/_context'
import { useContext, useState } from 'react'
import { OrderEmpty } from '../orderEmpty'
import { RowOrderExtra } from './_rowOrderExtra'
import { formatMoney } from 'util/functionUtil'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export const OrderTBody = () => {
  const { pageState } = useContext(OrderContext)
  const { table } = pageState

  const displayList = table.display.list
  const displayLoading = table.display.loading
  const paginationAmount = table.pagination.amount
  const paginationTotalItems = table.pagination.totalItems

  return (
    <>
      {displayLoading ? (
        Array.from(Array(paginationAmount), (e, i) => (
          <OrderPlaceholder key={i}/>
        ))
      ) : paginationTotalItems > 0 ? (
        displayList.map(item =>
          <OrderTr key={item.id}
                   data={item}
                   style={{
                     borderLeft: '1px solid #e2eaf8',
                     borderRight: '1px solid #e2eaf8',
                   }}
          />)
      ) : (
        <OrderEmpty/>
      )}
    </>
  )
}

const OrderPlaceholder = ({ ...props }) => {
  return (
    <Tr {...props} className="order-revenue-table__row">
      {Array.from(Array(11), (e, i) => (
        <Td key={i} className="order-revenue-table__cell" data-type="td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </Td>
      ))}
    </Tr>
  )
}

const OrderTr = ({ data, ...props }) => {
  const { pageState } = useContext(OrderContext)
  const orderRow = useOrderRow(data)
  const { cell, detail, row } = orderRow

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])

  return (
    <>
      <Tr
        {...props}
        className="order-revenue-table__row"
        extra={
          <RowOrderExtra
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={orderRow}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="order-revenue-table__cell" data-type="td">
          <Text as={'a'} href={`/orders?search=${data.id}`} target={'_blank'} color={'#1A94FF'}>{data.id}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>---</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>---</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.total_quantity ? data?.total_quantity : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.discount_product ? formatMoney(data?.discount_product) : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.total_price_product ? formatMoney(+data?.product_selling_price) : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.total_cost_price ? formatMoney(data?.total_cost_price) : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.ship_fee ? formatMoney(data?.ship_fee) : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{!!data?.order_discount ? formatMoney(data?.order_discount) : '---'}</Text>
        </Td>
        <Td className="order-revenue-table__cell" data-type="td">
          <Text>{formatMoney((+data?.product_selling_price - +data?.order_discount) || 0)}</Text>
        </Td>
        <Td
          className="order-revenue-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <Text>{formatMoney(((+data?.product_selling_price - +data?.order_discount) - +data?.total_cost_price) || 0)}</Text>

          <button
            className="order-revenue-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ORDER_ICONS.up}
          </button>
        </Td>
      </Tr>
    </>
  )
}
