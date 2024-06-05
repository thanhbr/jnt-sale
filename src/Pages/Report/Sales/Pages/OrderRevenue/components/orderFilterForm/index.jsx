import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/Report/Sales/Pages/OrderRevenue/interfaces/_icons'
import {OrderContext} from 'Pages/Report/Sales/Pages/OrderRevenue/provider/_context'
import {orderActions} from 'Pages/Report/Sales/Pages/OrderRevenue/provider/_reducer'
import {transformOriginData} from 'Pages/Report/Sales/Pages/OrderRevenue/utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {OrderTags} from '../orderTags'
import {OrderSearch} from './_orderSearch'
import {OrderShippingStatus} from './_orderShippingStatus'
import {StyledOrderFilterForm} from './_styled'
import { OrderDateTime } from './_orderDateTime'
import { TimeFilter } from './_timeFilter'
import { useTranslation } from 'react-i18next'

export const OrderFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useOrderFilterForm()
  const {t} = useTranslation()
  const {pageDispatch} = useContext(OrderContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/order/shipping/status`)
      if(!!response.data.success){
        pageDispatch({
          type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
          payload: {
            shippingStatus: {
              list: response.data.data.map(item => ({
                name: item?.name || '',
                value: item?.id || '',
              })),
            },
          },
        })
      }
    }

    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderSearch />
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
        {shouldCollapse && (
          <Button
            appearance="secondary"
            disabled={!canSubmitOtherFilter}
            size="md-"
            onClick={() =>
              canSubmitOtherFilter && functions.applyOrderOtherFilter()
            }
          >
            {t('general_apply')}
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <TimeFilter />
        <OrderShippingStatus />
      </div>
      <div className="order-filter-form__group" style={{marginBottom: 4}}>
        <OrderTags />
      </div>
    </StyledOrderFilterForm>
  )
})
