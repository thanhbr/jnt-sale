import { useContext } from 'react'
import { TransferContext } from '../../provider/_context'
import { Text } from '../../../../../../../common/text'
import { fNumber } from '../../../../../../../util/formatNumber'
import { useTranslation } from 'react-i18next'
import { Th } from '../../../../../../../layouts/tableLayout/_th'
import { Tr } from '../../../../../../../layouts/tableLayout/_tr'

export const TransferPrint = () => {
  const { pageState } = useContext(TransferContext)
  const displayList = pageState.table.display.list
  const { panels } = pageState
  const {t} = useTranslation()
  return (
    <div style={{ display: 'none' }}>
      <div id={'transfer-print'}>
        <div style={{textAlign: 'center', margin: '24px 0'}}>
          <Text fontWeight={600} fontSize={24} style={{textTransform: 'uppercase'}}>{t('report_transfer')}</Text>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'start', marginBottom: '16px' }}>
          <div style={{
            border: '1px solid rgb(0, 8, 29)',
            padding: '8px',
            width: 'calc(50% - 12px)',
            marginRight: '24px',
            paddingLeft: '24px'
          }}>
            <p style={{textTransform: 'uppercase'}}>{t('transfer_quantity')}:</p>
            <Text fontWeight={600}>{fNumber(panels.total_quantity)}</Text>
          </div>
          <div style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: 'calc(50% - 12px)',
            paddingLeft: '24px' }}>
            <p style={{textTransform: 'uppercase'}}>{t('transfer_value')} (VNĐ):</p>
            <Text fontWeight={600}>{fNumber(panels.total_amount)}</Text>
          </div>
        </div>
        <table style={{ borderCollapse: 'collapse' , width: '100%'}}>
          <thead style={{ width: '100%' }}>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '2%' }}><Text fontWeight={600}>STT</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '11%' }}><Text fontWeight={600}>{t('transfer_date')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '11%' }}><Text fontWeight={600}>{t('init_warehouse')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '14%' }}><Text fontWeight={600}>{t('transfer_date')}</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '20%' }}><Text fontWeight={600}>{t('product')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '10%' }}><Text fontWeight={600}>{t('product_page_product_sku')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '8%' }}><Text fontWeight={600}>{t('warehouse__unit')}</Text></th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '8%' }}><Text fontWeight={600}>{t('quantity')}</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '8%',textAlign: 'right' }}><Text fontWeight={600}>{t('general_cost_price')} (VNĐ)</Text>
          </th>
          <th style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', width: '8%',textAlign: 'right' }}><Text fontWeight={600}>{t('warehouse__total')} (VNĐ)</Text>
          </th>
          </thead>
          <tbody style={{ width: '100%' }}>
          {displayList.map((item, index) => (
            <tr style={{ width: '100%' }}>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'left',width: '10%'  }}>{item?.warehouse_tranfer}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center',width: '10%'  }}>{item?.warehouse_receive}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center',width: '14%' }}>{cellCodeOrderFormatDateTime(item?.date_transfer)}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center',width: '20%' }}>{item?.product_name}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center',width: '10%' }}>{item?.sku}</td>
              <td
                style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center', width: '8%' }}>{item?.unit_name}</td>
              <td
                style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'center', width: '8%' }}>{item?.quantity}</td>
              <td style={{ border: '1px solid rgb(0, 8, 29)', padding: '8px', textAlign: 'right', width: '8%' }}>{fNumber(item?.cost_price)}</td>
              <td style={{
                border: '1px solid rgb(0, 8, 29)',
                padding: '8px', textAlign: 'right', width: '8%'
              }}>{fNumber(+item?.quantity * +item?.cost_price)}</td>
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