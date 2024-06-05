import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import useOrderTHead from 'Pages/purchases/hooks/useOrderTHead'
import {
  PURCHASES_TABLE_THEAD_PAYMENT_FILTER_LIST,
  PURCHASES_TABLE_THEAD_PRINT_ACTIONS,
  PURCHASES_TABLE_THEAD_SELECTED_ACTIONS,
  PURCHASES_TABLE_THEAD_WAREHOUSE_FILTER_LIST,
} from 'Pages/purchases/interfaces/_constants'
import {PURCHASES_ICONS} from 'Pages/purchases/interfaces/_icons'
import {useEffect, useState} from 'react'
import { PurchasesContext } from 'Pages/purchases/provider/_context'
import { useContext } from 'react'
import { Loading } from '../../../../common/loading'
import { actionTypes } from 'Pages/purchases/provider/_reducer'
import ConfirmModalPurchases from '../ConfirmModalPurchases'
import { TableHeaderFilter } from './_tableHeaderFilter'
import { useTranslation } from 'react-i18next'

export const PurchasesTHead = ({...props}) => {
  const {t} = useTranslation()
  const {checkbox, selected, print,loading} = useOrderTHead()
  const [confirm, setConfirm] = useState({})
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const displayList = pageState.table.display.list
  const actions = PURCHASES_TABLE_THEAD_SELECTED_ACTIONS.map((item, i) => ({
    ...item,
    onClick: selected.actionMenu.actions[i],
  }))
  const printAction = PURCHASES_TABLE_THEAD_PRINT_ACTIONS.map((item, i) => ({
    ...item,
    onClick: selected.actionMenu.printAction[i],
  }))

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(find => find.order_id === item.order_id)
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
      <ConfirmModalPurchases confirm={confirm} setConfirm={setConfirm} />
      {checkbox.checked ? (
        <Th
          className="purchases-management-table__cell"
          data-selected="true"
          data-type="th"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={600}
            lineHeight={20}
          >
            {selected.list.length > 9
              ? selected.list.length
              : `0${selected.list.length}`}{' '}
            đơn hàng được chọn
          </Text>
          <div className="purchases-management-table__selected-action-dropdown">
            <Button
              className="purchases-management-table__selected-action-toggle"
              size="xs"
              onClick={() => selected.actionMenu.onToggle[0](true)}
            >
              Thao tác {PURCHASES_ICONS.caretRight}
            </Button>
            {selected.actionMenu.open[0] && (
              <>
                <div
                  className="purchases-management-table__selected-action-backdrop"
                  onClick={() => selected.actionMenu.onToggle[0](false)}
                ></div>
                <ul className="purchases-management-table__selected-action-menu common-popover">
                  {actions.map(item => (
                    <li
                      key={item.id}
                      className="purchases-management-table__selected-action-menu-item"
                      onClick={() => {
                        setConfirm({
                          ...confirm,
                          active: true,
                          title: t('cancel_order_delivery'),
                          content: t('cancel_order_delivery_text'),
                          btnCancel: t('general_cancel'),
                          btnAccept: t('confirm'),
                          acceptStyle: 'accept',
                          handleConfirm: () => {
                            if (item?.onClick) item.onClick()
                            selected.actionMenu.onToggle[0](false)
                            pageDispatch({
                              type: actionTypes.TABLE_SELECTED_LIST_UPDATE,
                              payload: {
                                selected: {
                                  list: [],
                                },
                              },
                            })
                          },
                        })
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="purchases-management-table__selected-action-dropdown">
            <Button
              className="purchases-management-table__selected-action-toggle-prints"
              size="xs"
              onClick={() => selected.actionMenu.onToggle[1](true)}
            >
              {t('print_delivery_note')} {PURCHASES_ICONS.caretRight}
            </Button>
            {selected.actionMenu.open[1] && (
              <>
                <div
                  className="purchases-management-table__selected-action-backdrop"
                  onClick={() => selected.actionMenu.onToggle[1](false)}
                ></div>
                <ul className="purchases-management-table__selected-action-menu common-popover">
                  {printAction.map(item => (
                    <li
                      key={item.id}
                      className="purchases-management-table__selected-action-menu-item"
                      onClick={() => {
                        if (item?.onClick) item.onClick()
                        selected.actionMenu.onToggle[1](false)
                      }}
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
          <Th className="purchases-management-table__cell">{t('inventory_receipt_code')}</Th>
          <Th className="purchases-management-table__cell">{t('supplier')}</Th>
          <Th className="purchases-management-table__cell">{t('init_warehouse')}</Th>
          <Th className="purchases-management-table__cell">{t('purchase_date')}</Th>
          <Th className="purchases-management-table__cell">{t('value_goods_received')}</Th>
          <Th className="purchases-management-table__cell">{t('Đã thanh toán')}</Th>
          <Th className="purchases-management-table__cell">{t('general_refunds')}</Th>
          <Th className="purchases-management-table__cell" icon={<TableHeaderFilter context={PurchasesContext} name='payment_status' list={PURCHASES_TABLE_THEAD_PAYMENT_FILTER_LIST} />}>{t('payment_status')}</Th>
          <Th className="purchases-management-table__cell" icon={<TableHeaderFilter context={PurchasesContext} name='warehouse_status' list={PURCHASES_TABLE_THEAD_WAREHOUSE_FILTER_LIST} />}>{t('warehouse_status')}</Th>
          <Th className="purchases-management-table__cell"></Th>
          {/* <Th className="purchases-management-table__cell" icon={PURCHASES_ICONS.gearSix} /> //tạm thời ẩn vì tính năng chưa làm */}
        </>
      )}
      <a
        ref={print.link}
        href={print.url}
        style={{display: 'none'}}
        target={'_blank'}
      ></a>
      {loading && <Loading/>}
    </Tr>
  )
}
