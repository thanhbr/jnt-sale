import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {DeliveryContext} from 'Pages/partSign/provider/_context'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {useContext, useEffect, useState} from 'react'
import {DeliveryPanel} from './partSignPanel'
import {StyledDeliveryPanels} from './_styled'
import {useTranslation} from "react-i18next";

export const PartSignPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(DeliveryContext)
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
          `${config.API}/order/partsign/total-list?keyword=&date_type=sended&start_date=${startDate}&end_date=${endDate}&shipping_partner=&user_id=&order_origin_id=`,
        )

        if (!!response?.data?.success) {
          setCanFetch(false)
          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              pagination: {
                totalItems: response?.data?.data?.totals || 0,
              },
              panels: {
                codTotal: response?.data?.data?.total_cod || 0,
                partSignCODTotal: response?.data?.data?.total_cod_partsign || 0,
                partaSignTotal: response?.data?.data?.totals || 0,
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
        title={t("total_sign_1_part")}
        value={panels.partaSignTotal}
      />
      <DeliveryPanel
        className="order-panels__item"
        currency="₫"
        title={t("total_amount_cod")}
        value={panels.codTotal}
      />
      <DeliveryPanel
        className="order-panels__item"
        currency="₫"
        title={t("total_cod_signed")}
        value={panels.partSignCODTotal}
      />
    </StyledDeliveryPanels>
  )
}
