import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {orderActions} from 'Pages/refactorOrder/provider/_reducer'
import {transformOriginData} from 'Pages/refactorOrder/utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {OrderTags} from '../orderTags'
import {OrderAdvancedSearch} from './_orderAdvancedSearch'
import {OrderDateTime} from './_orderDateTime'
import {OrderDuplicate} from './_orderDuplicate'
import {OrderEmployee} from './_orderEmployee'
import {OrderProduct} from './_orderProduct'
import {OrderSearch} from './_orderSearch'
import {OrderShippingPartner} from './_orderShippingPartner'
import {OrderShippingStatus} from './_orderShippingStatus'
import {OrderSource} from './_orderSource'
import {OrderWarehouse} from './_orderWarehouse'
import {StyledOrderFilterForm} from './_styled'

export const OrderFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useOrderFilterForm()

  const {pageDispatch} = useContext(OrderContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'employeeGroupData',
      'employeeListData',
      'shippingStatusListData',
      'shippingPartnerListData',
      'productListData',
      'sourceListData',
      'warehouseListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })

    const originData = transformOriginData(collections)

    pageDispatch({
      type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: originData,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/admin/users`),
        sendRequestAuth('get', `${config.API}/order/shipping/status`),
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth(
          'get',
          `${config.API}/product/list-all-product-details?per_page=20&start=0`,
        ),
        sendRequestAuth('get', `${config.API}/order/origins?per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/warehouse/warehouses?per_page=9999999&start=0`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderSearch />
        <OrderAdvancedSearch />
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
          Bộ lọc khác
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            disabled={!canSubmitOtherFilter}
            size="md-"
            onClick={() =>
              canSubmitOtherFilter && functions.applyOrderOtherFilter()
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
        <OrderDateTime />
        <OrderEmployee />
        <OrderShippingStatus />
        {/*<OrderShippingPartner />*/}
        <OrderProduct />
        <OrderSource />
        <OrderWarehouse />
        <OrderDuplicate />
      </div>
      <div className="order-filter-form__group" style={{marginBottom: 4}}>
        <OrderTags />
      </div>
    </StyledOrderFilterForm>
  )
})
