import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useLocationFilterForm from 'Pages/Report/Sales/Pages/Location/hooks/useLocationFilterForm'
import { LocationContext } from 'Pages/Report/Sales/Pages/Location/provider/_context'
import { orderActions } from '../../provider/_reducer'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { LocationTags } from '../locationTags'
import { OrderDateTime } from './_orderDateTime'
import { StyledOrderFilterForm } from './_styled'
import { Location } from './_location'
import { useTranslation } from 'react-i18next'

export const LocationFilterForm = memo(({ ...props }) => {
  const {t} = useTranslation()
  const { badge,canSubmitOtherFilter, functions } = useLocationFilterForm()

  const { pageState, pageDispatch } = useContext(LocationContext)
  const { loading } = pageState.table

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
            canSubmitOtherFilter && functions.applyLocationOtherFilter()
          }
        >
          {t('general_apply')}
        </Button>
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <LocationTags/>
      </div>
    </StyledOrderFilterForm>
  )
})
