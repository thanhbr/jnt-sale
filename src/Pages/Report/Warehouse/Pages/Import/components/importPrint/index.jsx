import { useContext } from 'react'
import { ImportContext } from '../../provider/_context'
import { Text } from '../../../../../../../common/text'
import { fNumber } from '../../../../../../../util/formatNumber'
import { useTranslation } from 'react-i18next'

export const ImportPrint = () => {
  const { pageState } = useContext(ImportContext)
  const displayList = pageState.table.display.list
  const { panels } = pageState
  const {t} = useTranslation()
  return (
    <div style={{ display: 'none' }}>
      <div id={'purchase-print'}>
        <div style={{textAlign: 'center', margin: '24px 0'}}>
          <Text fontWeight={600} fontSize={24} style={{textTransform: 'uppercase'}}>{t('report_import_goods')}</Text>
        </div>
        <div style={{ width: '100%' , display: 'flex', alignItems: 'start', marginBottom: '16px'}}>
          <div style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: 'calc(33% - 8px)', marginRight: '12px' }}>
            <p style={{textTransform: 'uppercase'}}>{t('quantity_received')}:</p>
            <Text fontWeight={600}>{panels.importTotal}</Text>
            <p style={{textTransform: 'uppercase'}}>{t('value_received')} (VNĐ):</p>
            <Text fontWeight={600}>{fNumber(panels.importValueTotal)}</Text>
          </div>
          <div style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px' , width: 'calc(36% - 8px)', marginRight: '12px'}}>
            <p style={{textTransform: 'uppercase'}}>{t('money_paid')} (VNĐ):</p>
            <Text fontWeight={600}>{fNumber(panels.paymentTotal)}</Text>
          </div>
          <div style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: 'calc(31% - 8px)' }}>
            <p style={{textTransform: 'uppercase'}}>{t('debt')} (VNĐ):</p>
            <Text fontWeight={600}>{fNumber(panels.debtsTotal)}</Text>
          </div>
        </div>
        <div style={{marginBottom: '8px'}}><Text>{t('report_print_value_product_import_warehouse')}</Text></div>
        <table style={{ borderCollapse: 'collapse' }}>
          <thead style={{ width: '100%' }}>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>STT</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('product_page_product_name')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('product_sku')}</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('unit')}</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('quantity_received')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}><Text fontWeight={600}>{t('value_received_short')} (VNĐ)</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}><Text fontWeight={600}>{t('warehouse__total')} (VNĐ)</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('init_warehouse')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}><Text fontWeight={600}>{t('import_date')}</Text>
          </th>
          </thead>
          <tbody style={{ width: '100%' }}>
          {displayList.map((item, index) => (
            <tr style={{ width: '100%' }}>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{item?.product_name}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{item?.sku}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{item?.unit_name}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{item?.purchase_quantity}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}>{fNumber(item?.purchase_price)}</td>
              <td
                style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right' }}>{fNumber(item?.purchase_amount)}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{item?.warehouse_name}</td>
              <td style={{
                border: '1px solid rgb(0, 8, 29)',
                padding: '8px', textAlign: 'center'
              }}>{cellCodeOrderFormatDateTime(item?.dt_warehouse)}</td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

const cellCodeOrderFormatDateTime = dateTimeParam => {
  const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
  const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
  const dmy = `${ymd[2] || '--'}-${ymd[1] || '--'}-${ymd[0] || '--'}`
  return `${dmy}`.trim()
}