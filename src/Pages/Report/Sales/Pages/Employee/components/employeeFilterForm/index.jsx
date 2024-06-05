import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import useEmployeeFilterForm from 'Pages/Report/Sales/Pages/Employee/hooks/useEmployeeFilterForm'
import { DELIVERY_ICONS } from 'Pages/deliveryManagement/interfaces/_icons'
import { EmployeeContext } from 'Pages/Report/Sales/Pages/Employee/provider/_context'
import { orderActions } from '../../provider/_reducer'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { EmployeeTags } from '../employeeTags'
import { EmployeeDateTime } from './_employeeDateTime'
import { EmployeeSearch } from './_employeeSearch'
import { StyledEmployeeFilterForm } from './_styled'
import { FilterEmployee } from './_filterEmployee'
import { OrderSource } from './_orderSource'
import { transformOriginData } from '../../../../Until/transfom'
import { useTranslation } from 'react-i18next'

export const EmployeeFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = useEmployeeFilterForm()

  const { pageState, pageDispatch } = useContext(EmployeeContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'shippingPartnerListData',
      'employeeGroupData',
      'employeeListData',
      'sourceListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
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
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/admin/users`),
        sendRequestAuth('get', `${config.API}/order/origins?per_page=9999999&start=0`),
      ])
      
      collectOriginData(response)
    }

    fetchData()
  }, [])
  const {t} = useTranslation()
  return (
    <StyledEmployeeFilterForm {...props}>
      <div className="order-filter-form__group">
        <EmployeeSearch/>
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
          {t('general_other_filters')}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyEmployeeOtherFilter()
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
        <EmployeeDateTime/>
        <FilterEmployee/>
        <OrderSource/>
        {/*<EmployeeShippingPartner/>*/}
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <EmployeeTags/>
      </div>
    </StyledEmployeeFilterForm>
  )
})
