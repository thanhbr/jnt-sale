import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ImportContext } from '../../provider/_context'
import React, { useContext, useState } from 'react'
import { ImportSkeleton } from '../skeleton/index'
import { ImportEmpty } from '../importEmpty'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Text } from '../../../../../../../common/text'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { fNumber } from '../../../../../../../util/formatNumber'

export const ImportTBody = () => {
  const { pageState } = useContext(ImportContext)
  const displayList = pageState.table.display.list
  const loading = pageState.table.display.loading
  return (
    <div  id={'import-warehouse-management-table__body'}>
      {displayList.length > 0 && !loading ? (
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
      ) : !loading ? (
        <ImportEmpty/>
      ) : (
        <ImportSkeleton rows={15}/>
      )}
    </div>
  )
}

const cellCodeOrderFormatDateTime = dateTimeParam => {
  const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
  const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
  const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
  return `${dmy}`.trim()
}
const OrderTr = ({ data, arr_detail, ...props }) => {
  return (
    <>
      <Tr
        {...props}
        className="import-warehouse-management-table__row"
      >
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>
            <Tooltip baseOn={'height'} className={'import-warehouse-management-table__tooltipV2'} title={data?.product_name}>
              {data?.product_name}
            </Tooltip>
          </Text>
          <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>
            <Tooltip baseOn={'height'} className={'import-warehouse-management-table__tooltipV2'} title={`SKU: ${data.sku}`}>
              SKU:&nbsp;{data.sku}
            </Tooltip>
          </Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text as={'p'}>
            <Tooltip baseOn={'height'} className={'import-warehouse-management-table__tooltipV2'} title={data?.warehouse_name}>
              {data?.warehouse_name}
            </Tooltip>
          </Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{cellCodeOrderFormatDateTime(data?.dt_warehouse)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{fNumber(data.purchase_quantity)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.purchase_price)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.purchase_vat)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.purchase_amount)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.return_amount)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.return_vat)}</Text>
        </Td>
        <Td className="import-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(data.total_remain)}</Text>
        </Td>
      </Tr>
    </>
  )
}
