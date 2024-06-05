import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {OrderTags} from '../orderTags'
import {OrderDateTime} from './_orderDateTime'
import {OrderEmployee} from './_orderEmployee'
import {OrderSearch} from './_orderSearch'
import {StyledOrderFilterForm} from './_styled'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
import {FacebookOrdersContext} from "../../provider/_context";
import {PageSelected} from "./_pageSelected";
import {OrderPost} from "./_orderPost"
import {OrderFacebookStatus} from './_orderStatus'
import {facebookConversationActions} from "../../provider/_actions";
import {transformOriginData} from "../../utils/transform";
export const OrderFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useFacebookFilterForm()

  const {pageState,pageDispatch} = useContext(FacebookOrdersContext)
  const {filter} = pageState

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

    pageDispatch({
      type: facebookConversationActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/groups`),
        sendRequestAuth('get', `${config.API}/admin/users`),
        sendRequestAuth('get', `${config.API}/order/shipping/status`),
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth(
            'get',
            `${config.API}/product/list-all-product-details?per_page=20&start=0`,
        ),
        sendRequestAuth('get', `${config.API}/order/origins`),
        sendRequestAuth('get', `${config.API}/warehouse/warehouses`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
      <StyledOrderFilterForm {...props}>
        <div className="order-filter-facebook-form__group">
          <OrderSearch />
          {/*<OrderAdvancedSearch />*/}
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
              onClick={() => pageDispatch({type: 'SET_SHOULD_COLLAPSE',payload: !filter.shouldCollapse})}
          >
            Bộ lọc khác
          </Button>
          {filter.shouldCollapse && (
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
            className="order-filter-facebook-form__group order-filter-facebook-form__collapse"
            data-collapse={filter.shouldCollapse}
        >
          <OrderDateTime />
          <PageSelected />
          <OrderPost />
          <OrderEmployee />
          <OrderFacebookStatus/>
        </div>
        <div className="order-filter-facebook-form__group" style={{marginBottom: 4}}>
          <OrderTags />
        </div>
      </StyledOrderFilterForm>
  )
})
