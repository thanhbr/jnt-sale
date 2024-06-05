import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import shippingTrackingFilterForm from '../../hooks/useShippingTrackingFilterForm'
import { DELIVERY_ICONS } from '../../interfaces/_icons'
import { ShippingTrackingContext } from '../../provider/_context'
import { orderActions } from '../../provider/_reducer'
import { transformOriginData } from '../../utils/transform'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { OrderDateTime } from './_orderDateTime'
import { OrderSearch } from './_orderSearch'
import { StyledOrderFilterForm } from './_styled'
import { ResoleStatus } from './_resovleStatus'
import { OrderInteraction } from './_orderInteraction'
import { ShippingTrackingTags } from '../shippingTrackingTags'
import { ShippingTrackingEmployee } from './_orderEmployee'

export const ShippingTrackingFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = shippingTrackingFilterForm()

  const { pageState, pageDispatch } = useContext(ShippingTrackingContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'employeeGroupData',
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
        sendRequestAuth('get', `${config.API}/admin/employee/groups`),
        sendRequestAuth('get', `${config.API}/admin/users`),
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
          icon={DELIVERY_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          Bộ lọc khác
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter}
            onClick={() =>
              canSubmitOtherFilter &&functions.applyShippingTrackingOtherFilter()
            }
          >
            Áp dụng
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime/>
        <ResoleStatus/>
        <ShippingTrackingEmployee/>
        <OrderInteraction/>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <ShippingTrackingTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
