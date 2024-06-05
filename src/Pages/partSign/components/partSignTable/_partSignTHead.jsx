import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import useOrderTHead from 'Pages/partSign/hooks/useOrderTHead'
import {
  DELIVERY_TABLE_THEAD_PRINT_ACTIONS,
  DELIVERY_TABLE_THEAD_SELECTED_ACTIONS,
} from 'Pages/partSign/interfaces/_constants'
import {DELIVERY_ICONS} from 'Pages/partSign/interfaces/_icons'
import {useEffect, useState} from 'react'
import ConfirmModal from 'Pages/customer/components/ConfirmModal'
import {DeliveryContext} from 'Pages/partSign/provider/_context'
import {useContext} from 'react'
import {Loading} from '../../../../common/loading'
import {useTranslation} from "react-i18next";

export const PartSignTHead = ({...props}) => {
  const { t } = useTranslation()
  const {selected, print, loading} = useOrderTHead()
  const [confirm, setConfirm] = useState({})
  const {pageState} = useContext(DeliveryContext)
  const displayList = pageState.table.display.list
  const actions = DELIVERY_TABLE_THEAD_SELECTED_ACTIONS.map((item, i) => ({
    ...item,
    onClick: selected.actionMenu.actions[i],
  }))
  const printAction = DELIVERY_TABLE_THEAD_PRINT_ACTIONS.map((item, i) => ({
    ...item,
    onClick: selected.actionMenu.printAction[i],
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
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <Th className="partSign-management-table__cell">{t("billcode")}</Th>
      <Th className="partSign-management-table__cell">{t("code_refund")}</Th>
      <Th className="partSign-management-table__cell">{t("geter_pay")}</Th>
      <Th className="partSign-management-table__cell">COD</Th>
      <Th className="partSign-management-table__cell">{t("cod_delivery")}</Th>
      <Th className="partSign-management-table__cell">{t("product_info")}</Th>
      <Th className="partSign-management-table__cell"></Th>
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
