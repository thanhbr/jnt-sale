import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import useRow from 'Pages/partSign/hooks/useRow'
import {DeliveryContext} from 'Pages/partSign/provider/_context'
import {useContext, useEffect, useState} from 'react'
import {CellCodeOrder} from './_cellCodePartSign'
import {CellCustomer} from './_cellCustomer'
import {CellStatusOrder} from './_cellStatusPartSignt'
import {RowMenuPopover} from './_rowMenuPopover'
import {RowOrderExtra} from './_rowPartSignExtra'
import {OrderSkeleton} from '../skeleton/index'
import {Tooltip} from 'common/tooltipv2'
import {PartSignEmpty} from '../partSignEmpty'
import {formatMoney} from '../../../../util/functionUtil'
import {ConfirmDeleteModal} from '../../../refactorOrder/components/orderTable/_confirmDeleteModal'
import useAlert from '../../../../hook/useAlert'
import UsePartSignFilterForm from '../../hooks/usePartSignFilterForm'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import {orderActions} from '../../provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useTranslation} from "react-i18next";

export const PartSignTBody = () => {
  const {pageState} = useContext(DeliveryContext)
  const displayList = pageState.table.display.list
  const arr_details = pageState.table.display.arr_details

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => (
          <OrderTr
            key={index}
            data={item}
            arr_detail={arr_details[item.order_id]}
          />
        ))
      ) : loading ? (
        <PartSignEmpty />
      ) : (
        <OrderSkeleton rows={displayList.length || 15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const deliveryRow = useRow(data)
  const {cell, detail, row, print} = deliveryRow
  const {codeOrder, payment} = cell
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const {showAlert} = useAlert()
  const {functions} = UsePartSignFilterForm()
  const {pageDispatch} = useContext(DeliveryContext)
  const { t } = useTranslation()

  const cancleDelivery = order_id => {
    setConfirmDeleteModalData({
      content: t("confirm_cancel_order_delivery"),
      title: t("cancel-tranport"),
      onClose: () => setConfirmDeleteModalData(null),
      onSubmit: () => fetchUpdateOrderStatus([order_id], 7),
    })
  }
  const fetchUpdateOrderStatus = async (idList, status) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      JSON.stringify({
        order_ids: idList,
        status: status,
      }),
    )
    if (response?.data?.success) {
      showAlert({content: t("status_update"), type: 'success'})
      functions.fetchUpdateData()
      setConfirmDeleteModalData(null)
    } else {
      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE,
        payload: {
          notifications: {
            list: Array.isArray(response?.data?.errors?.details)
              ? response.data.errors.details.filter(item => !!!item?.success)
              : [],
          },
        },
      })
    }

    pageDispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: [],
        },
      },
    })
  }
  const arrFunction = [
    null,
    cancleDelivery,
    print.onClick[0],
    print.onClick[1],
    print.onClick[2],
    print.onClick[3],
  ]
  const handleItemClick = (key, orderId) => {
    arrFunction[key](orderId)
  }
  return (
    <>
      <Tr
        {...props}
        className="partSign-management-table__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={deliveryRow}
            arrDetail={arr_detail}
            onActionCancelDelivery={handleItemClick}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        {/* <Td className="partSign-management-table__cell">
          <Checkbox
            checked={row.isSelected}
            onClick={e => {
              e.stopPropagation()
              row.onCheckboxChange()
            }}
          />
        </Td> */}
        <Td className="partSign-management-table__cell" data-type="td">
          <CellCodeOrder
            id={data.billcode}
            inventory={arr_detail?.has_detail}
            time={codeOrder.dateTime}
          />
        </Td>
        {/* <Td className="partSign-management-table__cell" data-type="td">
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
        >
          {fDateTimeSuffix(data.dt_delivered)}
        </Text>
      </Td> */}
        <Td className="partSign-management-table__cell" data-type="td">
          <Tooltip
            className="partSign-management-table__tooltipV2-width"
            placement="top"
            title={data.billcode_return}
            baseOn="width"
          >
            <Text
              color={'#7C88A6'}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
              {data.billcode_return}
            </Text>
          </Tooltip>
        </Td>
        <Td className="partSign-management-table__cell" data-type="td">
          <CellCustomer
            name={data.customer_name}
            phone={data.customer_mobile}
            report={data?.total_reports || 0}
          />
        </Td>
        <Td className="partSign-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.cod)}
          </Text>
        </Td>
        <Td className="partSign-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data.cod_partsign)}
          </Text>
        </Td>
        <Td className="partSign-management-table__cell" data-type="td">
          <Tooltip
            className="partSign-management-table__tooltipV2"
            PopperPropsClassName="popup-tooltipV2"
            placement="top-center"
            title={arr_detail?.order_details?.map(x => (
              <p>
                {/* <Text
                  color={THEME_COLORS.secondary_900}
                  fontSize={14}
                  fontWeight={400}
                  lineHeight={20}
                > */}
                  {x}
                {/* </Text> */}
              </p>
            ))}
            baseOn="height"
          >
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
              {arr_detail?.has_detail &&
                arr_detail?.order_details?.map(x => (
                  <p>
                    <Text
                      color={THEME_COLORS.secondary_100}
                      fontSize={14}
                      fontWeight={400}
                      lineHeight={20}
                    >
                      {x}
                    </Text>
                  </p>
                ))}
              {data?.item_details}
            </Text>
          </Tooltip>
        </Td>
        <Td
          className="partSign-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="partSign-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ORDER_ICONS.up}
          </div>
          {/* <RowMenuPopover item={data} onActionClick={handleItemClick}/> */}
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
    </>
  )
}
