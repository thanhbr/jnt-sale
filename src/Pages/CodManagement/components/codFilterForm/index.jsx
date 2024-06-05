import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import codFilterForm from '../../hooks/useCodFilterForm'
import { COD_ICONS } from '../../interfaces/_icons'
import { CodContext } from '../../provider/_context'
import { orderActions } from '../../provider/_reducer'
import { transformOriginData } from '../../utils/transform'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { CodTags } from '../codTags'
import { OrderDateTime } from './_orderDateTime'
import { OrderSearch } from './_orderSearch'
import { OrderShippingPartner } from './_orderShippingPartner'
import { StyledOrderFilterForm } from './_styled'
import { OrderEmployee } from './_orderEmployee'
import { OrderComparing } from './_orderComparing'
import {useTranslation} from "react-i18next";

export const CodFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = codFilterForm()

  const { pageState, pageDispatch } = useContext(CodContext)
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const { t } = useTranslation()

  const collectOriginData = data => {
    const fields = [
      'shippingPartnerListData',
      'employeeListData'
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
    })
    pageDispatch({
      type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth('get', `${config.API}/admin/users`),
      ])
      
      collectOriginData(response)
    }

    fetchData()
  }, [])


  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-cod-filter-form__group"  style={pageState.table.loading == false ?  {cursor: 'no-drop',pointerEvents: 'none'} : {pointerEvents: 'auto'}}>
        <OrderSearch/>
        <Button
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
              ? '9+'
              : badge.others
              : undefined
          }
          badgeType="danger"
          icon={COD_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t("general_other_filters")}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter}
            onClick={() =>
              canSubmitOtherFilter &&functions.applyDeliveryOtherFilter()
            }
          >
            {t("general_apply")}
          </Button>
        )}
      </div>
      <div
        className="order-cod-filter-form__group order-cod-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime/>
        {/* <OrderShippingPartner/> */}
        <OrderEmployee />
        <OrderComparing />
      </div>
      <div className="order-cod-filter-form__group" style={pageState.table.loading == false ?  {cursor: 'no-drop',pointerEvents: 'none', marginBottom: 4 } : {pointerEvents: 'auto', marginBottom: 4 }} >
        <CodTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
