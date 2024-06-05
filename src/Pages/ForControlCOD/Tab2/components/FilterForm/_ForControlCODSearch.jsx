import {Input} from 'common/form/input'
import useForControlCODFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab2/provider/_context'
import { orderActions } from 'Pages/ForControlCOD/Tab2/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import {useTranslation} from "react-i18next";

export const ForControlCODSearch = () => {
  const {pageState, pageDispatch} = useContext(ForControlCODContext)
  const {search, loading, queries} = useForControlCODFilterForm()
    const { t } = useTranslation()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t("search_payment_code")}
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
