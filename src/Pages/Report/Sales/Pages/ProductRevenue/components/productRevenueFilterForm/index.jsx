import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useProductRevenueFilterForm from 'Pages/Report/Sales/Pages/ProductRevenue/hooks/useProductRevenueFilterForm'
import { ProductRevenueContext } from 'Pages/Report/Sales/Pages/ProductRevenue/provider/_context'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { ProductRevenueTags } from '../productRevenueTags'
import { OrderDateTime } from './_orderDateTime'
import { StyledOrderFilterForm } from './_styled'
import { ProductSearch } from './_productSearch'
import { useTranslation } from 'react-i18next'

export const ProductRevenueFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = useProductRevenueFilterForm()

  const { pageState, pageDispatch } = useContext(ProductRevenueContext)
  const { loading } = pageState.table
  const {t} = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/order/origins?per_page=9999999&start=0`)
      if(!!response?.data?.success){
        const productRevenueListData = response.data?.data || []
        const productRevenue = {
          list: productRevenueListData.map(item => ({
            name: item?.name || '',
            value: item?.id || '',
          })),
        }
        productRevenue?.list?.unshift({
          value: 'unknown',
          name: t('report__unknown'),
        })
        pageDispatch({
          type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
          payload: productRevenue,
        })
      }
    }
    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <ProductSearch/>
        <OrderDateTime/>
        <Button
          appearance="secondary"
          size="md-"
          disabled={!canSubmitOtherFilter || !loading}
          onClick={() =>
            canSubmitOtherFilter && functions.applyProductRevenueOtherFilter()
          }
        >
          {t('general_apply')}
        </Button>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <ProductRevenueTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
