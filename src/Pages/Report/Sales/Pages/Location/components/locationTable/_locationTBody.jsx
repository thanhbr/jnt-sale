import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { LocationContext } from 'Pages/Report/Sales/Pages/Location/provider/_context'
import { useContext, useState } from 'react'
import { OrderSkeleton } from '../skeleton/index'
import { LocationEmpty } from '../locationEmpty'
import { Text } from '../../../../../../../common/text'
import { Tooltip as TooltipV2 } from '../../../../../../../common/tooltipv2'
import { formatMoney } from '../../../../../../../util/functionUtil'
import { fNumber } from '../../../../../../../util/formatNumber'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const LocationTBody = () => {
  const { pageState } = useContext(LocationContext)
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
            }}
          />
        ))
      ) : loading ? (
        <LocationEmpty/>
      ) : (
        <OrderSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const {t} = useTranslation()
  let orderDetail = data?.arr_status
  return (
    <>
      <Tr
        {...props}
        className="location-management-table__row"
      >
        <Td className="location-management-table__cell">
          {+props.stt + 1}
        </Td>
        <Td className="location-management-table__cell" data-type="td">
          <Text as={'p'} fontWeight={600}>
            <TooltipV2 className="location-management-table__tooltipV2" title={data?.name} baseOn="height">
              {data?.name}
            </TooltipV2>
          </Text>
          <Text as={'p'} fontSize={13} color={'#7C88A6'}>({t('average_order_value')}: {formatMoney(data?.total_avg)})</Text>
        </Td>
        <Td className="location-management-table__cell" data-type="td">
          <Text as={'p'}>{data?.total_order || 0} {t('orders')}</Text>
        </Td>
        <Td className="location-management-table__cell" data-type="td">
          <Text as={'p'}>{formatMoney(data?.total_cod || 0)}</Text>
        </Td>
        {orderDetail.map(order => (
          <Td className="location-management-table__cell" data-type="td">
            <Text as={'p'} fontSize={14}
                  fontWeight={!![4, 5].includes(+order?.shipping_status_id) ? 600 : 400}>{formatMoney(!!order?.total_cod ? order?.total_cod : 0)}</Text>
            <Text as={'p'} fontSize={13} color={'#7C88A6'} fontWeight={600}>{fNumber(order?.total_orders)} <Text
              fontSize={13} color={'#7C88A6'}>{t('orders')}</Text>  &nbsp;
              {
                !![4, 5].includes(+order?.shipping_status_id) &&
                <Text color={order?.total_rate >= 80 ? '#00AB56' : order?.total_rate >= 50 ? '#FF9F41' : '#FF424E'}
                      fontWeight={600}
                      fontSize={11}
                >({order?.total_rate}%)</Text>
              }
            </Text>
          </Td>
        ))}
        <Td className="location-management-table__cell" data-type="td">
          <Tooltip title={(<Text as={'p'} color={'#fff'} fontSize={13}
                                 style={{ textAlign: 'center', width: '100%!important' }}>Xem khách hàng có địa chỉ<br/> ở khu vực này</Text>)}
                   placement={'bottom-end'}
          >
            <Text as={'a'} href={`/report/sales/customer?city_id=${data?.city_id}`} className={'notebook-customer'}>{
              REPORT_SALE_ICONS.notebook
            }</Text>
          </Tooltip>
        </Td>
      </Tr>
    </>
  )
}