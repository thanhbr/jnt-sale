import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import { CodContext } from '../../provider/_context'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {useContext, useEffect, useState} from 'react'
import {CodPanel} from './CodPanel'
import {StyledCODPanels} from './_styled'
import {useTranslation} from "react-i18next";

export const CodPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(CodContext)
  const {filter, panels, table} = pageState
  const [canFetch, setCanFetch] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const splitDate = dateTimeValue.split(' - ')
      const startDate = convertDateTimeToApiFormat(splitDate[0])
      const endDate = convertDateTimeToApiFormat(splitDate[1])
      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/order/delivery/cod-total-list?keyword=&date_type=recieved&start_date=${startDate}&end_date=${endDate}&shipping_partner=1&shipping_status=&comparing_check=&user=&per_page=${table.pagination.amount}&start=${table.pagination.active}`
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
                weightTotal: response?.data?.data?.total_weight || 0,
                orderTotal: response?.data?.data?.totals || 0,
                partsignTotal : response?.data?.data?.total_partsign || 0,
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
    <StyledCODPanels {...props}>
      <CodPanel
        className="cod-order-panels__item"
        title={t("total_orders")}
        currency="đơn"
        value={panels.orderTotal}
      />
      <CodPanel
        className="cod-order-panels__item"
        currency="₫"
        title={t("total_cod_signed")}
        value={panels.partsignTotal}
      />
      
      <CodPanel
        className="cod-order-panels__item"
        currency="₫"
        title={t("total_order_shipping")}
        value={panels.shippingFeeTotal}
      />
      <CodPanel
        className="cod-order-panels__item"
        currency="₫"
        title={t("total_cod")}
        value={panels.codTotal}
      />
    </StyledCODPanels>
  )
}
