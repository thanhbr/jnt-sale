import { Button } from 'common/button'
import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import useOrderTHead from 'Pages/deliveryManagement/hooks/useOrderTHead'
import {
  DELIVERY_TABLE_THEAD_PRINT_ACTIONS,
  DELIVERY_TABLE_THEAD_SELECTED_ACTIONS,
} from 'Pages/deliveryManagement/interfaces/_constants'
import { DELIVERY_ICONS } from 'Pages/deliveryManagement/interfaces/_icons'
import { useEffect, useState } from 'react'
import { DeliveryContext } from 'Pages/deliveryManagement/provider/_context'
import { useContext } from 'react'
import { Loading } from '../../../../common/loading'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import ConfirmModalDelivery from '../ConfirmModalDelivery'
import { Tooltip } from '../../../../common/tooltip'
import { ConfirmPrintModal } from '../../../refactorOrder/components/orderTable/_confirmPrintModal'
import { useTranslation } from 'react-i18next'

export const DeliveryTHead = ({ ...props }) => {
  const { t, i18n } = useTranslation()
  const { checkbox, selected, print, loading, notifications } = useOrderTHead()
  const [confirm, setConfirm] = useState({})
  const [confirmPrintModalData, setConfirmPrintModalData] = useState(null)
  const { pageState, pageDispatch } = useContext(DeliveryContext)
  const displayList = pageState.table.display.list

  const checkStatusOrderDelivery = i => {
    const findItem = selected.list.find(
      find => find.shipping_status_id != 1,
    )
    if(!findItem)
      selected.actionMenu.printAction[i]()
    else {
      setConfirmPrintModalData({
        content: t('check_status_text1'),
        title: t('check_status_text2'),
        onClose: () => setConfirmPrintModalData(null),
        onSubmit: selected.actionMenu.printAction[i]
      })
    }

  }

  const actions = DELIVERY_TABLE_THEAD_SELECTED_ACTIONS.map((item, i) => ({
    ...item,
    onClick: () => {
      notifications.delete()
      selected.actionMenu.actions[i]()
    },
  }))

  const printAction = DELIVERY_TABLE_THEAD_PRINT_ACTIONS.map((item, i) => ({
    ...item,
    // onClick: selected.actionMenu.printAction[i],
    onClick: () => {
      notifications.delete()
      checkStatusOrderDelivery(i)
    },
  }))

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
      <ConfirmModalDelivery confirm={confirm} setConfirm={setConfirm}/>
      <Th className="delivery-management-table__cell">
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
        <Th
          className="delivery-management-table__cell"
          data-selected="true"
          data-type="th"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={13}
            fontWeight={600}
            lineHeight={20}
          >
            {selected.list.length > 9
              ? selected.list.length
              : `0${selected.list.length}`}{' '}
            {t('selected_order')}
          </Text>
          <div className="delivery-management-table__selected-action-dropdown">
            <Button
              className="delivery-management-table__selected-action-toggle"
              size="xs"
              onClick={() => selected.actionMenu.onToggle[0](true)}
            >
              {t('operation')} {DELIVERY_ICONS.caretRight}
            </Button>
            {selected.actionMenu.open[0] && (
              <>
                <div
                  className="delivery-management-table__selected-action-backdrop"
                  onClick={() => selected.actionMenu.onToggle[0](false)}
                ></div>
                <ul className="delivery-management-table__selected-action-menu common-popover">
                  {actions.map(item => (
                    <li
                      key={item.id}
                      className="delivery-management-table__selected-action-menu-item"
                      onClick={() => {
                        setConfirm({
                          ...confirm,
                          active: true,
                          title: t('cancel_order_delivery'),
                          content:t('cancel_order_delivery_text'),
                          btnCancel: t('close'),
                          btnAccept: t('apply'),
                          acceptStyle: 'accept',
                          handleConfirm: () => {
                            if (item?.onClick) item.onClick()
                            selected.actionMenu.onToggle[0](false)
                            pageDispatch({
                              type: orderActions.TABLE_SELECTED_LIST_UPDATE,
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
          <div className="delivery-management-table__selected-action-dropdown">
            <Button
              className="delivery-management-table__selected-action-toggle-prints"
              size="xs"
              onClick={() => selected.actionMenu.onToggle[1](true)}
            >
              {t('print_shipping_order')} {DELIVERY_ICONS.caretRight}
            </Button>
            {selected.actionMenu.open[1] && (
              <>
                <div
                  className="delivery-management-table__selected-action-backdrop"
                  onClick={() => selected.actionMenu.onToggle[1](false)}
                ></div>
                <ul className="delivery-management-table__selected-action-menu common-popover">
                  {printAction.map(item => (
                    <li
                      key={item.id}
                      className="delivery-management-table__selected-action-menu-item"
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
          <Text style={{marginLeft: 12}}>
          {t('print_template_setup_text')} 
              <Text as={'a'}
                    target={'_blank'}
                    color={'#1A94FF'}
                    href={'/print-template?search=shipment'}
              > {t('print_template_setup')} </Text>
          </Text>
        </Th>
      ) : (
        <>
          <Th className="delivery-management-table__cell">{t('waybill_code')}</Th>
          {/* <Th className="delivery-management-table__cell">Ngày gửi đơn</Th> */}
          <Th className="delivery-management-table__cell">{t('receiver')}</Th>
          <Th className="delivery-management-table__cell">{t('shipping_fee')}</Th>
          <Th className="delivery-management-table__cell">{t('print_count')}</Th>
          <Th className="delivery-management-table__cell">{t('status')}</Th>
          <Th className="delivery-management-table__cell">
          {t('created_time')} {' '}
            <Tooltip
              placement={'bottom'}
              title={
                <Text color={'#ffffff'} fontSize={13}>
                  <Text as={'p'} fontSize={13} color={'#ffffff'}  style={{marginBottom: '8px'}}>{t('allocation_time_tooltip1')}</Text>
                  <Text as={'p'} color={'#ffffff'}  fontSize={13}>{t('example')}:</Text>
                  <Text as={'p'} color={'#ffffff'}  fontSize={13} style={{paddingLeft: '8px'}}> &bull;{t('allocation_time_tooltip2')} {' '} </Text>
                  <Text as={'p'} color={'#ffffff'}  fontSize={13} style={{paddingLeft: '8px'}}> &bull; {t('allocation_time_tooltip3')}{' '} </Text>
                  <Text as={'p'} fontSize={13} color={'#ffffff'}  style={{marginTop: '8px'}}>{t('allocation_time_tooltip4')}</Text>
                </Text>
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              {DELIVERY_ICONS.question}
            </Tooltip>
          </Th>
          <Th className="delivery-management-table__cell">{t('product_description')}</Th>
          {/* <Th className="delivery-management-table__cell" icon={DELIVERY_ICONS.gearSix} /> //tạm thời ẩn vì tính năng chưa làm */}
        </>
      )}
      {!!confirmPrintModalData && (
        <ConfirmPrintModal {...confirmPrintModalData} />
      )}
      <a
        ref={print.link}
        href={print.url}
        style={{ display: 'none' }}
        target={'_blank'}
      ></a>
      {loading && <Loading/>}
    </Tr>
  )
}
