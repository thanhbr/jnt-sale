import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import deliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { DELIVERY_ICONS } from 'Pages/deliveryManagement/interfaces/_icons'
import { DeliveryContext } from 'Pages/deliveryManagement/provider/_context'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import { transformOriginData } from 'Pages/deliveryManagement/utils/transform'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { DeliveryTags } from '../deliveryTags'
import { DeliveryAdvancedSearch } from './DeliveryAdvancedSearch'
import { OrderDateTime } from './_orderDateTime'
import { OrderDuplicate } from './_orderDuplicate'
import { OrderProduct } from './_orderProduct'
import { OrderSearch } from './_orderSearch'
import { OrderShippingPartner } from './_orderShippingPartner'
import { StyledOrderFilterForm } from './_styled'
import { OrderPrint } from './_orderPrint'
import { OrderInteraction } from './_orderInteraction'
import { AdjustCOD } from './_adjustCOD'
import { OrderAllocation } from './_orderAllocation'
import { useTranslation } from 'react-i18next'

export const DeliveryFilterForm = memo(({ ...props }) => {
  const { t, i18n } = useTranslation()
  const { badge,canSubmitOtherFilter, functions } = deliveryFilterForm()

  const { pageState, pageDispatch } = useContext(DeliveryContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      // 'shippingStatusListData',
      'shippingPartnerListData',
      'productListData',
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
        // sendRequestAuth('get', `${config.API}/order/delivery/status-list`),
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth(
          'get',
          `${config.API}/product/list-all-product-details?per_page=20&start=0`,
        ),
      ])
      
      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderSearch/>
        <DeliveryAdvancedSearch/>
        <Button
          disabled={!loading}
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
          {t('other_filters')}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyDeliveryOtherFilter()
            }
          >
          {t('apply')}
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime/>
        <OrderPrint/>
        {/*<OrderShippingPartner/>*/}
        <OrderProduct/>
        <OrderDuplicate/>
        <OrderInteraction/>
        <AdjustCOD/>
        <OrderAllocation/>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <DeliveryTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
