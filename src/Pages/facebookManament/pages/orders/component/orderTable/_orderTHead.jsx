import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import {ORDER_TABLE_THEAD_SELECTED_ACTIONS} from '../../interface/_const'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import {useContext} from 'react'
import styled from 'styled-components'
import {ConfirmDeleteModal} from './_confirmDeleteModal'
import {PaymentFilterPopover} from './_paymentFilterPopover'
import {FacebookOrdersContext} from "../../provider/_context";
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
import useOrderTHead from "../../hooks/useOrderTHead";
import "./index.scss"
export const OrderTHead = ({...props}) => {
  const {pageState} = useContext(FacebookOrdersContext)
  const displayList = pageState.table.display.list

  const {globalLoading, checkbox, selected} = useOrderTHead()

  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(false)
  const [canDelete, setCanDelete] = useState(true)
  const [submit, setSubmit] = useState(() => {})

  const actions = ORDER_TABLE_THEAD_SELECTED_ACTIONS.map((item, i) => ({
    ...item,
    onClick: () => {
      const onClickFunc = selected.actionMenu.actions[i]
      switch (item?.value) {
        case '7':
          setConfirmDeleteModalData({
            title: 'Hủy giao hàng',
            description: 'Bạn có chắc chắn muốn hủy giao hàng với đơn đã chọn?',
          })
          setSubmit(() => selected.actionMenu.actions[i])
          break

        case '15':
          setConfirmDeleteModalData({
            title: 'Hủy đơn hàng',
            description: 'Bạn có chắc chắn muốn hủy đơn hàng với đơn đã chọn?',
          })
          setSubmit(() => selected.actionMenu.actions[i])
          break

        default:
          onClickFunc()
          break
      }
    },
  }))

  const handeSubmitDelete = () => {
    setCanDelete(false)
    setConfirmDeleteModalData(null)
    if (!canDelete) return
    const response = submit()
    response.then(() => setCanDelete(true))
  }

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(find => find.id === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  const handleItemClick = data => {
    if (data?.onClick) data.onClick()
    selected.actionMenu.onToggle(false)
  }

  return (
    <>
      <Tr {...props} type="tHead" className={'order-table-facebook__header'}>
        <Th className="order-table-facebook__cell">
          <Checkbox
            checked={checkbox.checked}
            indeterminate={!checkFullPageChecked()}
            onClick={e => {
              e.stopPropagation()
              checkbox.onClick()
            }}
          />
        </Th>
        {checkbox.checked ? (
          <Th className="order-table-facebook__cell" data-selected="true" data-type="th">
            <Text as="b">
              {selected.list.length > 9
                ? selected.list.length
                : `0${selected.list.length}`}{' '}
              đơn hàng được chọn
            </Text>
            <div className="order-table-facebook__selected-action-dropdown">
              <Button
                className="order-table-facebook__selected-action-toggle"
                size="xs"
                onClick={() => selected.actionMenu.onToggle(true)}
              >
                Thao tác {ORDER_ICONS.caretRight}
              </Button>
              {selected.actionMenu.open && (
                <>
                  <div
                    className="order-table-facebook__selected-action-backdrop"
                    onClick={() => selected.actionMenu.onToggle(false)}
                  ></div>
                  <ul className="order-table-facebook__selected-action-menu common-popover">
                    {actions.map(item => (
                      <li
                        key={item.id}
                        className="order-table-facebook__selected-action-menu-item"
                        onClick={() => handleItemClick(item)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Th>
        ) : (
          <>
            <Th className="order-table-facebook__cell">Mã đơn hàng</Th>
            <Th className="order-table-facebook__cell">Khách hàng</Th>
            <Th className="order-table-facebook__cell">Trang</Th>
            <Th className="order-table-facebook__cell">
              Nhân viên chốt đơn
            </Th>
            <Th className="order-table-facebook__cell order-table-facebook__cell_payment"  icon={<PaymentFilterPopover />}>Thanh toán</Th>
            <Th className="order-table-facebook__cell">Giá trị đơn</Th>
            <Th className="order-table-facebook__cell">Tình trạng đơn hàng</Th>
            <Th
              className="order-table-facebook__cell"
              // icon={
              //   <div
              //     style={{position: 'relative', width: '100%', height: '100%'}}
              //   >
              //     <div
              //       style={{
              //         position: 'absolute',
              //         top: 0,
              //         right: 4,
              //         width: 20,
              //         height: 20,
              //       }}
              //     >
              //       {ORDER_ICONS.gearSix}
              //     </div>
              //   </div>
              // }
              style={{display: 'flex'}}
            />
          </>
        )}
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal
          content={confirmDeleteModalData?.description}
          isLoading={!canDelete}
          title={confirmDeleteModalData?.title}
          onClose={() => setConfirmDeleteModalData(null)}
          onSubmit={handeSubmitDelete}
        />
      )}
      {globalLoading.value && (
        <div className="order-table-facebook__loading">
          <img src="/img/loading.gif" />
        </div>
      )}
    </>
  )
}
