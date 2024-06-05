import {Input} from 'common/form/input'
import { WareHouseTransferContext } from 'Pages/WareHouseTransfer/provider/_context'
import { warehouseTransferActions } from 'Pages/WareHouseTransfer/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import useWareHouseTransferFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'

export const OrderSearch = () => {
  const {pageState, pageDispatch} = useContext(WareHouseTransferContext)
  const {search, loading, queries} = useWareHouseTransferFilterForm()

  return (
    <Input
      className="warehouse-ts-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo mã phiếu chuyển kho"
      disabled={!loading}
      focus={pageState.focusInputOnSuccess}
      onFocus={() => {
        pageDispatch({
          type: warehouseTransferActions.FOCUS_INPUT,
          payload: false,
        })
      }}
      value={search.value}
      onChange={(e) => search.onChange(e, queries)}
    />
  )
}
