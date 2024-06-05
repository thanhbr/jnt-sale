import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useShippingDifferenceEmployeeFilterForm
  from 'Pages/Report/Sales/Pages/shippingDifferenceEmployee/hooks/useShippingDifferenceEmployeeFilterForm'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { ShippingDifferenceTags } from '../shippingDifferenceEmployeeTags'
import { OrderDateTime } from './_orderDateTime'
import { StyledOrderFilterForm } from './_styled'
import { ShippingDifferenceContext } from '../../provider/_context'
import { SHIPPING_ICONS } from '../../interfaces/_icons'
import { shippingActions } from '../../provider/_reducer'
import { transformOriginData } from '../../utils/transform'
import { OrderEmployee } from './_orderEmployee'
import { OrderShippingPartner } from './_orderShippingPartner'
import { ORDER_ICONS } from '../../../../../../refactorOrder/interfaces/_icons'
import { OrderSearch } from './_orderSearch'
import { useTranslation } from 'react-i18next'


export const ShippingDifferenceFilterForm = memo(({ ...props }) => {
  const { badge, canSubmitOtherFilter, functions, view } = useShippingDifferenceEmployeeFilterForm()
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(ShippingDifferenceContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'employeeGroupData',
      'employeeListData',
      'shippingPartnerListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
    })

    const originData = transformOriginData(collections)
    pageDispatch({
      type: shippingActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: originData,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/admin/users`),
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
      ])

      collectOriginData(response)
    }
    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
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
          icon={ORDER_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t('general_other_filters')}
        </Button>
        {shouldCollapse && (<Button
          appearance="secondary"
          size="md-"
          disabled={!canSubmitOtherFilter || !loading}
          onClick={() =>
            canSubmitOtherFilter && functions.applyShippingDifferenceOtherFilter()
          }
        >
          {t('general_apply')}
        </Button>)}
      </div>
      <div className="order-filter-form__button-fix">
        <Button
          appearance="secondary"
          size="md-"
          icon={SHIPPING_ICONS.detail}
          onClick={() => view.onChange(view.type?.value == 1 ? view.type.list[1] : view.type.list[0])}
        >
          {t(view.type?.name) || '--'}
        </Button>
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime/>
        <OrderEmployee/>
        <OrderShippingPartner/>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <ShippingDifferenceTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
