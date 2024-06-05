import {Input} from 'common/form/input'
import useEmployeeFilterForm from 'Pages/Report/Sales/Pages/Employee/hooks/useEmployeeFilterForm'
import { EmployeeContext } from 'Pages/Report/Sales/Pages/Employee/provider/_context'
import { orderActions } from '../../provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export const EmployeeSearch = () => {
  const {pageState, pageDispatch} = useContext(EmployeeContext)
  const {search, loading, queries} = useEmployeeFilterForm()
  const {t} = useTranslation()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('search_employee_placeholder')}
      disabled={loading}
      focus={pageState.focusInputOnSuccess}
      onFocus={() => {
        pageDispatch({
          type: orderActions.FOCUS_INPUT,
          payload: false,
        })
      }}
      value={search.value}
      onChange={(e) => search.onChange(e, queries)}
    />
  )
}
