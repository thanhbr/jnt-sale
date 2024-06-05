import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import {
  WAREHOUSE_TRANSFER_TABLE_THEAD_PRINT_ACTIONS,
  WAREHOUSE_TRANSFER_TABLE_THEAD_SELECTED_ACTIONS,
} from 'Pages/WareHouseTransfer/interfaces/_constants'
import {WAREHOUSE_TRANSFER_ICONS} from 'Pages/WareHouseTransfer/interfaces/_icons'
import {useEffect, useState} from 'react'
import {WareHouseTransferContext} from 'Pages/WareHouseTransfer/provider/_context'
import {useContext} from 'react'
import {Loading} from '../../../../common/loading'
import {warehouseTransferActions} from 'Pages/WareHouseTransfer/provider/_reducer'
import ConfirmModalWareHouseTransfer from '../ConfirmModalWareHouseTransfer'
import useOrderTHead from 'Pages/WareHouseTransfer/hooks/useTHead'

export const WareHouseTransferTHead = ({...props}) => {
  const {checkbox, selected, print, loading} = useOrderTHead()
  const [confirm, setConfirm] = useState({})
  const {pageState, pageDispatch} = useContext(WareHouseTransferContext)
  const displayList = pageState.table.display.list
  const actions = WAREHOUSE_TRANSFER_TABLE_THEAD_SELECTED_ACTIONS.map(
    (item, i) => ({
      ...item,
      onClick: selected.actionMenu.actions[i],
    }),
  )
  const printAction = WAREHOUSE_TRANSFER_TABLE_THEAD_PRINT_ACTIONS.map(
    (item, i) => ({
      ...item,
      onClick: selected.actionMenu.printAction[i],
    }),
  )

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(
        find => find.order_id === item.order_id,
      )
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  useEffect(() => {
    if (print?.url && print?.url !== '#') {
      if (print?.link?.current) print?.link.current.click()
    }
  }, [print.url])

  return (
    <Tr {...props} type="tHead">
      <ConfirmModalWareHouseTransfer
        confirm={confirm}
        setConfirm={setConfirm}
      />
      <Th className="warehouse-transfer-management-table__cell">
        Mã phiếu chuyển kho
      </Th>
      <Th className="warehouse-transfer-management-table__cell">
        Ngày chuyển kho
      </Th>
      <Th className="warehouse-transfer-management-table__cell">
        Kho xuất hàng
      </Th>
      <Th className="warehouse-transfer-management-table__cell">
        Kho nhập hàng
      </Th>
      <Th className="warehouse-transfer-management-table__cell">Ghi chú</Th>
      <a
        ref={print.link}
        href={print.url}
        style={{display: 'none'}}
        target={'_blank'}
      ></a>
      {loading && <Loading />}
    </Tr>
  )
}
