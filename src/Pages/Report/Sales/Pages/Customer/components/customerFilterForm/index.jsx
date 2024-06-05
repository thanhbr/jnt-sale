import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useCustomerFilterForm from 'Pages/Report/Sales/Pages/Customer/hooks/useCustomerFilterForm'
import { CustomerContext } from 'Pages/Report/Sales/Pages/Customer/provider/_context'
import { orderActions } from '../../provider/_reducer'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { CustomerTags } from '../customerTags'
import { OrderDateTime } from './_orderDateTime'
import { StyledOrderFilterForm } from './_styled'
import { Location } from './_location'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CustomerFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = useCustomerFilterForm()
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(CustomerContext)
  const { loading } = pageState.table
  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('city_id') || ''
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequestAuth('get', `${config.API}/area/provinces?per_page=9999999&start=0`)
      if(!!response?.data?.success){
        const locationListData = response.data?.data || []
        const location = {
          list: locationListData.map(item => ({
            name: item?.city_name || '',
            value: item?.city_id || '',
          })),
        }
        pageDispatch({
          type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
          payload: {
            location: location
          },
        })
        if(!!querySearch){
          const valueLocation = location.list.find(item => item.value == querySearch)
          pageDispatch({
            type: orderActions.FILTER_LOCATION_HYPER_LINK_UPDATE,
            payload: {
              list: location,
              value: [valueLocation],
            },
          })
        }
      }
    }
    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderDateTime/>
        <Location/>
        <Button
          appearance="secondary"
          size="md-"
          disabled={!canSubmitOtherFilter || !loading}
          onClick={() =>
            canSubmitOtherFilter && functions.applyCustomerOtherFilter()
          }
        >
          {t('general_apply')}
        </Button>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <CustomerTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
