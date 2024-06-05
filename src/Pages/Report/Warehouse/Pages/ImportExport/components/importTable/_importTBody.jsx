import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ImportExportContext} from '../../provider/_context'
import React, { useContext, useState } from 'react'
import { ImportSkeleton } from '../skeleton/index'
import { ImportEmpty } from '../importEmpty'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Text } from '../../../../../../../common/text'
import { formatMoney } from '../../../../../../../util/functionUtil'
import {fNumber} from "../../../../../../../util/formatNumber";
import { useTranslation } from 'react-i18next'

export const ImportTBody = () => {
  const { pageState } = useContext(ImportExportContext)
  const displayList = pageState.table.display.list
  const loading = pageState.table.display.loading
  return (
    <>
      {displayList.length > 0 && !loading ? (
        displayList.map((item, index) => (
          <OrderTr
            key={index}
            stt={index}
            data={item}
            style={{
              borderLeft: '1px solid #e2eaf8',
              borderRight: '1px solid #e2eaf8',
              width: "100%"
            }}
          />
        ))
      ) : !loading ? (
        <ImportEmpty/>
      ) : (
        <ImportSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTr = ({ data, ...props }) => {
  const {t} = useTranslation()
  return (

    <>
      {Array.isArray(data) ? data?.map(data=> <Tr
          {...props}
          className="import-export-warehouse-management-table__row"
      >
        <Td className="import-export-warehouse-management-table__cell" data-type="td">
          {+props.stt + 1}
        </Td>
        <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
          {data?.product_name ? <Text as={'p'}  fontWeight={600}>
                <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltipV2'} title={data?.product_name}>
                  {data?.product_name || '---'}
                </Tooltip>
              </Text>
              : <Text as={'p'} color={'#7C88A6'} fontWeight={400}>
                <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltipV2'} title={data?.product_name}>
                  {data?.product_name || '---'}
                </Tooltip>
              </Text>
          }

          <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltip-sku'} title={`SKU: ${data.sku}`}>
            <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>SKU:&nbsp;{data.sku  || '---'}</Text>
          </Tooltip>
        </Td>
        <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
          <Text as={'p'}>
            <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltip-warehouse'} title={data?.warehouse_name}>
              {data?.warehouse_name  || '---'}
            </Tooltip>
          </Text>
        </Td>
        <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
          <Text color={'#00081D'}>{formatMoney(data.value_purchase)}</Text>
          <Text
              fontSize={12}
              as={'p'}
              color={'#00AB56'}
              fontWeight={500}
              style={{ background: '#EBFFF5',padding:'0 6px',borderRadius:'50px'}}
          >
            {t('report_quantity_SL')}: {fNumber(data?.quantity_purchase)}
          </Text>
        </Td>
        <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
          <Text color={'#00081D'}>{formatMoney(data.value_order)}</Text>
          <Text
              fontSize={12}
              as={'p'}
              color={'#FC4C0A'}
              fontWeight={500}
              style={{ background: '#FFF0EB',padding:'0 6px',borderRadius:'50px'}}
          >
            {t('report_quantity_SL')}: {fNumber(data?.quantity_order)}
          </Text>
        </Td>
        <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
          <Text color={'#00081D'}>{formatMoney(data.value_warehouse)}</Text>
          <Text
              fontSize={12}
              as={'p'}
              color={'#1A94FF'}
              fontWeight={500}
              style={{ background: '#EBF5FF',padding:'0 6px',borderRadius:'50px'}}
          >
            {t('report_quantity_SL')}: {fNumber(data?.quantity_warehouse)}
          </Text>

        </Td>
      </Tr>)
      :
          <Tr
              {...props}
              className="import-export-warehouse-management-table__row"
          >
            <Td className="import-export-warehouse-management-table__cell" data-type="td">
              {+props.stt + 1}
            </Td>
            <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
              {data?.product_name ? <Text as={'p'}  fontWeight={600}>
                    <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltipV2'} title={data?.product_name}>
                      {data?.product_name || '---'}
                    </Tooltip>
                  </Text>
                  : <Text as={'p'} color={'#7C88A6'} fontWeight={400}>
                    <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltipV2'} title={data?.product_name}>
                      {data?.product_name || '---'}
                    </Tooltip>
                  </Text>
              }
              <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltip-sku'} title={`SKU: ${data.sku}`}>
                <Text as={'p'} fontWeight={400} color={'#7C88A6'} fontSize={13}>SKU:&nbsp;{data.sku || '---'}</Text>
              </Tooltip>
            </Td>
            <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
              <Text as={'p'}>
                <Tooltip baseOn={'height'} className={'import-export-warehouse-management-table__tooltip-warehouse'} title={data?.warehouse_name}>
                  {data?.warehouse_name || '---'}
                </Tooltip>
              </Text>
            </Td>
            <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
              <Text color={'#00081D'}>{formatMoney(data.value_purchase)}</Text>
              <Text
                  fontSize={12}
                  as={'p'}
                  color={'#00AB56'}
                  fontWeight={500}
                  style={{ background: '#EBFFF5',padding:'0 6px',borderRadius:'50px'}}
              >
                {t('report_quantity_SL')}: {fNumber(data?.quantity_purchase)}
              </Text>
            </Td>
            <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
              <Text color={'#00081D'}>{formatMoney(data.value_order)}</Text>
              <Text
                  fontSize={12}
                  as={'p'}
                  color={'#FC4C0A'}
                  fontWeight={500}
                  style={{ background: '#FFF0EB',padding:'0 6px',borderRadius:'50px'}}
              >
                {t('report_quantity_SL')}: {fNumber(data?.quantity_order)}
              </Text>
            </Td>
            <Td className="import-export-warehouse-management-table__cell" data-type="td" data-type="td">
              <Text color={'#00081D'}>{formatMoney(data.value_warehouse)}</Text>
              <Text
                  fontSize={12}
                  as={'p'}
                  color={'#1A94FF'}
                  fontWeight={500}
                  style={{ background: '#EBF5FF',padding:'0 6px',borderRadius:'50px'}}
              >
                {t('report_quantity_SL')}: {fNumber(data?.quantity_warehouse)}
              </Text>

            </Td>
          </Tr>
      }

    </>
  )
}
