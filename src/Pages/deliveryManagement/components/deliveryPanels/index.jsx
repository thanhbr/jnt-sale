import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import { DeliveryContext } from 'Pages/deliveryManagement/provider/_context'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {useContext, useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import {DeliveryPanel} from './DeliveryPanel'
import {StyledDeliveryPanels} from './_styled'
import { useTranslation } from 'react-i18next'

export const DeliveryPanels = ({...props}) => {
  const { t, i18n } = useTranslation()
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {filter, panels, table} = pageState
  const [canFetch, setCanFetch] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const splitDate = dateTimeValue.split(' - ')
      const querySearch = searchParams.get('search') || ''
      const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
      const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])
      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/order/delivery/total-list?keyword=${querySearch}&date_type=sended&start_date=${startDate}&end_date=${endDate}&shipping_partner=&shipping_status=&product_id&is_duplicate=&is_printed&item_details&down_cod&per_page=${table.pagination.amount}&start=${table.pagination.active}`
        )

        if (!!response?.data?.success) {
          setCanFetch(false)
          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              pagination: {
                totalItems: response?.data?.data?.totals || 0

              },
              panels: {
                codTotal: response?.data?.data?.total_cod || 0,
                orderTotal: response?.data?.data?.totals || 0,
                shippingFeeTotal: response?.data?.data?.total_ship_fee || 0,
              },
            },
          })
        }
      }

      fetchData()
    }
  }, [filter?.dateTime?.activeValue?.value])
  return (
    <StyledDeliveryPanels {...props}>
      <DeliveryPanel
        className="order-panels__item"
        title={t('total_quantity')}
        value={panels.orderTotal}
      />
      <DeliveryPanel
        className="order-panels__item"
        currency="₫"
        title={t('total_COD')}
        value={panels.codTotal}
      />
      <DeliveryPanel
        className="order-panels__item"
        currency="₫"
        title={t('total_shipping_fee')}
        value={panels.shippingFeeTotal}
      />
    </StyledDeliveryPanels>
  )
}
