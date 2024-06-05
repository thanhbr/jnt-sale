import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useRow from '../../hooks/useRow'
import { CodContext } from '../../provider/_context'
import { useContext, useEffect, useState } from 'react'
import { CellCodeOrder } from './_cellCodeCodManagement'
import { CellCustomer } from './_cellCustomer'
import { CellStatusOrder } from './_cellStatusCodManagement'
import { RowOrderExtra } from './_rowCodManagementExtra'
import { OrderSkeleton } from '../skeleton/index'
import { Tooltip } from 'common/tooltipv2'
import { CodEmpty } from '../codEmpty'
import { formatMoney } from '../../../../util/functionUtil'
import { SwitchCustomCod } from '../../components/switch'
import useOrderTHead from '../../hooks/useOrderTHead'
import {COD_STATUS_COMPARING} from '../../interfaces/_constants'
import ConfirmModal from '../../components/ConfirmModal'
import {useTranslation} from "react-i18next";

export const CodTBody = () => {
  const { pageState } = useContext(CodContext)
  const displayList = pageState.table.display.list
  

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item}/>)
      ) : (
        loading ? <CodEmpty/> : <OrderSkeleton rows={displayList.length == 0 ? 15: displayList.length}/>
      )}
    </>
  )
}

const OrderTr = ({ data, ...props }) => {
  const {checkbox} = useOrderTHead()
  const codRow = useRow(data)
  const { t } = useTranslation()
  const { cell, detail, row } = codRow
  const { codeOrder } = cell
  const [confirm, setConfirm] = useState({})
  const [prevent, setPrevent] = useState(false)
 
  return (
    <>
      <ConfirmModal confirm={confirm} setConfirm={setConfirm} />
      <Tr
        {...props}
        className="cod-management-table__row"
        extra={
          <RowOrderExtra 
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={data}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="cod-management-table__cell">
          <Checkbox
            checked={row.isSelected}
            disabled={COD_STATUS_COMPARING.includes(data.shipping_status_id) == true  && data.comparing_check != 1 ? false : true}
            onClick={e => {
              e.stopPropagation()
              COD_STATUS_COMPARING.includes(data.shipping_status_id) == true  && data.comparing_check != 1 && (row.onCheckboxChange())
            }}
          />
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <CellCodeOrder
            id={data.billcode}
            time={codeOrder.dateSended}
          />
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {data?.date_got_products? codeOrder.dateGotProducts : '---'}
          </Text>
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <CellCustomer
            name={data.customer_name}
            phone={data.customer_mobile}
            report={data?.total_reports || 0}
          />
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <Text
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
            {formatMoney(data?.cod)}
          </Text>
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <Text
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
            {['4','19','20'].includes(data.shipping_status_id) == true ? formatMoney(data?.cod_delivered) : 0}
          </Text>
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.ship_fee)}
          </Text>
        </Td>
        <Td className="cod-management-table__cell" data-type="td">
          <CellStatusOrder id={data.shipping_status_id}>
            {data.shipping_status_name}
          </CellStatusOrder>
        </Td>
        <Td className="cod-management-table__cell" data-type="td" onClick={e => e.stopPropagation()}> 
            {
              COD_STATUS_COMPARING.includes(data.shipping_status_id) == true && (
              <SwitchCustomCod
                defaultChecked={  data.comparing_check == 1 ? true: false} key={data.comparing_check}
                disabled={data.comparing_check == 1 ? true: false}
                offOnchange={true}
                onChange={(e) => {
                  setPrevent(true)
                  if(e== true){
                    setConfirm({
                      ...confirm,
                      active: true,
                      title: t("confirm_cod_checked"),
                      content:
                        t("confirm_change_status_cod_checked"),
                      btnCancel: 'Hủy',
                      btnAccept: 'Xác nhận',
                      acceptStyle: 'accept',
                      handleConfirm: () => {checkbox.onChange(data.order_id)}
                    })
                  }
                }}
              />)
            }
        </Td>
        <Td
          className="cod-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="cod-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            <img src={'/img/cod-manager/down.svg'} alt={'arrow'}/>
          </div>
        </Td>
      </Tr>
    </>
  )
}
