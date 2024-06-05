import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { TransferContext } from '../../provider/_context'
import React, { useContext, useState } from 'react'
import { TransferSkeleton } from '../skeleton/index'
import { TransferEmpty } from '../transferEmpty'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Text } from '../../../../../../../common/text'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { fDateTimeCustom } from '../../../../../../../util/formatTime'
import { fNumber } from '../../../../../../../util/formatNumber'

export const TransferTBody = () => {
  const { pageState } = useContext(TransferContext)
  const displayList = pageState.table.display.list
  const loading = pageState.table.display.loading
  return (
    <>
      {displayList.length > 0 && !loading ? (
        displayList.map((item, index) => (
          <OrderTr
            key={index}
            stt={index+1}
            data={item}
            style={{
              borderLeft: '1px solid #e2eaf8',
              borderRight: '1px solid #e2eaf8',
            }}
          />
        ))
      ) : !loading ? (
        <TransferEmpty/>
      ) : (
        <TransferSkeleton rows={15}/>
      )}
    </>
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
        className="transfer-warehouse-management-table__row"
      >
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{props.stt}</Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>
            <Tooltip baseOn={'height'} className={'transfer-warehouse-management-table__tooltipV2'}
                     title={data?.product_name}>
              {data?.product_name}
            </Tooltip>
          </Text>
          <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>
            <Tooltip baseOn={'height'} className={'transfer-warehouse-management-table__tooltipV2'}
                     title={`SKU: ${data.sku}`}>
              SKU:&nbsp;{data.sku}
            </Tooltip>
          </Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{cellCodeOrderFormatDateTime(data?.date_transfer)}</Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text as={'p'}>
            <Tooltip baseOn={'height'} className={'transfer-warehouse-management-table__tooltipV2'}
                     title={data?.warehouse_tranfer}>
              {data?.warehouse_tranfer}
            </Tooltip>
          </Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text as={'p'}>
            <Tooltip baseOn={'height'} className={'transfer-warehouse-management-table__tooltipV2'}
                     title={data?.warehouse_receive}>
              {data?.warehouse_receive}
            </Tooltip>
          </Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{data?.unit_name}</Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{data?.quantity}</Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(+data.cost_price)}</Text>
        </Td>
        <Td className="transfer-warehouse-management-table__cell" data-type="td">
          <Text>{formatMoney(+data?.cost_price * +data?.quantity)}</Text>
        </Td>
      </Tr>
    </>
  )
}
