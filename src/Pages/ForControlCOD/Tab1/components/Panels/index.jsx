import { sendRequestAuth } from 'api/api'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import { Text } from 'common/text'
import config from 'config'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab1/provider/_context'
import { orderActions } from '../../provider/_reducer'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ForControlCODPanel } from './ForControlCODPanel'
import { StyledForControlCODPanels } from './_styled'
import {useTranslation} from "react-i18next";

export const ForControlCODPanels = ({...props}) => {
  const {pageState, pageDispatch} = useContext(ForControlCODContext)
  const {filter, panels, table} = pageState
  const [canFetch, setCanFetch] = useState(true)
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue && canFetch) {
      const splitDate = dateTimeValue.split(' - ')
      const querySearch = searchParams.get('search') || ''
      const startDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[0]).split(' ')[0]
      const endDate = querySearch
        ? ''
        : convertDateTimeToApiFormat(splitDate[1]).split(' ')[0]
      const fetchData = async () => {
        const response = await sendRequestAuth(
          'get',
          `${config.API}/cod/cod-total?code_type=4&date_type=0&start_date=${startDate}&end_date=${endDate}`,
        )

        if (!!response?.data?.success) {
          setCanFetch(false)
          pageDispatch({
            type: orderActions.PANELS_UPDATE,
            payload: {
              panels: {
                hadpaidSum: response?.data?.data[3]?.hadpaidSum || 0,
                count_order: response?.data?.data[3]?.count_order || 0,
              },
            },
          })
        }
      }

      fetchData()
    }
  }, [filter?.dateTime?.activeValue?.value])

  return (
    <StyledForControlCODPanels {...props}>
      <div className="for-control-cod-panels">
        <ForControlCODPanel
          className="order-panels__item"
          title={t("order_quantity")}
          value={panels.count_order}
          titleTooltip={
            t("tooltip_qty_order_store_complete")
          }
        />

        <ForControlCODPanel
          className="order-panels__item"
          currency="₫"
          title={t("total_payment_amount")}
          value={panels.hadpaidSum}
          titleTooltip={t("total_payment_amount_store_complele")}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '8px',
          marginTop: '8px',
        }}
      >
        <Text
          fontWeight={600}
          style={{
            marginRight: '4px',
          }}
        >
          {t("money_for_control")}
        </Text>
        <Text>
          = {t("money_cod")} + {t("have_discountt")} - ({t("order_shipping")} + {t("have_fee_shipping")} + {t("have_fee_refund")} + {t("have_fee_bank")} + {t("have_fee_other")})
        </Text>
      </div>
    </StyledForControlCODPanels>
  )
}
