import {Button} from 'common/button'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import useOrderTHead from '../../hooks/useOrderTHead'

import {COD_ICONS} from '../../interfaces/_icons'
import {useEffect, useState} from 'react'
import ConfirmModal from '../../components/ConfirmModal'
import { CodContext } from '../../provider/_context'
import { useContext } from 'react'
import { Loading } from '../../../../common/loading'
import { Tooltip } from 'common/tooltip'
import {useTranslation} from "react-i18next";

export const CodTHead = ({...props}) => {
  const {checkbox, selected,loading} = useOrderTHead()
    const { t } = useTranslation()
  const [confirm, setConfirm] = useState({})
  const {pageState} = useContext(CodContext)
  const displayList = pageState.table.display.list

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selected.list.find(find => find.order_id === item.order_id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  return (
    <Tr {...props} type="tHead">
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <Th className="cod-management-table__cell">
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
          className="cod-management-table__cell"
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
              {t("selected_order")}
          </Text>
          <div className="cod-management-table__selected-action-dropdown">
            <Button
              className="cod-management-table__selected-action-toggle"
              size="xs"
              onClick={() => {
                setConfirm({
                  ...confirm,
                  active: true,
                  title: t("confirm_cod_checked"),
                  content:
                      t("confirm_change_status_cod_checked"),
                  btnCancel: t("general_cancel"),
                  btnAccept: t("general_confirm"),
                  acceptStyle: 'accept',
                  handleConfirm: selected.actions
                })
              }}
            >
                {t("confirm_cod_checked")}
            </Button>
          </div>
        </Th>
      ) : (
        <>
          <Th className="cod-management-table__cell">{t("billcode")}</Th>
          <Th className="cod-management-table__cell">{t("time_date_pickup")}</Th>
          <Th className="cod-management-table__cell">{t("geter_pay")}</Th>
          <Th className="cod-management-table__cell">{t("cod-number")}</Th>
          <Th className="cod-management-table__cell">{t("cod-signed")}</Th>
          <Th className="cod-management-table__cell">{t("shipping_fee")}</Th>
          <Th className="cod-management-table__cell">{t("status_billcode")}</Th>
          <Th className="cod-management-table__cell">
            <div className="cod-management-table__cell__dplay"><span style={{fontWeight: '600', float:'left'}}>{t("complete_cod_checked")}</span>
            <Tooltip  placement="top-start"
              title={t("condition_order_delivery_change_status_cod")} style={{float:'left'}}>
                <div style={{marginLeft: '3px', marginTop:'2px'}}>{COD_ICONS.question}</div>
            </Tooltip></div>
          </Th>
        </>
      )}
      {loading && <Loading/>}
    </Tr>
  )
}
