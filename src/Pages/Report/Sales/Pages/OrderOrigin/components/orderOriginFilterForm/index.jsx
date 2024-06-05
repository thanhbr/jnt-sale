import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useOrderOriginFilterForm from 'Pages/Report/Sales/Pages/OrderOrigin/hooks/useOrderOriginFilterForm'
import { OrderOriginContext } from 'Pages/Report/Sales/Pages/OrderOrigin/provider/_context'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { OrderOriginTags } from '../orderOriginTags'
import { OrderDateTime } from './_orderDateTime'
import { StyledOrderFilterForm } from './_styled'
import { OrderSource } from './_orderSource'
import { useTranslation } from 'react-i18next'

export const OrderOriginFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = useOrderOriginFilterForm()
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(OrderOriginContext)
  const { loading } = pageState.table

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/order/origins?per_page=9999999&start=0`)
      if(!!response?.data?.success){
        const sourceListData = response.data?.data || []
        const source = {
          list: sourceListData.map(item => ({
            name: item?.name || '',
            value: item?.id || '',
          })),
        }
        pageDispatch({
          type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
          payload: source,
        })
      }
    }
    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderDateTime/>
        <OrderSource/>
        <Button
          appearance="secondary"
          size="md-"
          disabled={!canSubmitOtherFilter || !loading}
          onClick={() =>
            canSubmitOtherFilter && functions.applyOrderOriginOtherFilter()
          }
        >
          {t('general_apply')}
        </Button>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <OrderOriginTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
