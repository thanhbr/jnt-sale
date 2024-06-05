import { Text } from 'common/text'
import {Tooltip} from 'common/tooltipv2'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import useRow from 'Pages/ForControlCOD/Tab2/hooks/useRow'
import {ForControlCODContext} from 'Pages/ForControlCOD/Tab2/provider/_context'
import {useContext, useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {fDateTimeSuffix} from 'util/formatTime'
import {formatMoney} from 'util/functionUtil'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useAlert from '../../../../../hook/useAlert'
import {ConfirmDeleteModal} from '../../../../refactorOrder/components/orderTable/_confirmDeleteModal'
import UseForControlCODFilterForm from '../../hooks/useForControlCODFilterForm'
import {orderActions} from '../../provider/_reducer'
import {ForControlCODEmpty} from '../Empty'
import {OrderSkeleton} from '../skeleton/index'
import {RowOrderExtra} from './_rowForControlCODExtra'
import {useTranslation} from "react-i18next";

export const ForControlCODTBody = () => {
  const {pageState} = useContext(ForControlCODContext)
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
        <ForControlCODEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const ForControlCODRow = useRow(data)
  const {cell, detail, row, print} = ForControlCODRow
  const {codeOrder, payment} = cell
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const {showAlert} = useAlert()
  const {functions} = UseForControlCODFilterForm()
  const {pageState, pageDispatch} = useContext(ForControlCODContext)
  const [openEditCODModal, setOpenEditCODModal] = useState(false)
  const { t } = useTranslation()

  const cancleForControlCOD = order_id => {
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
      pageDispatch({type: 'SET_LOADING', payload: false})
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
  const navigate = useNavigate()

  const arrFunction = [
    () =>
      navigate(`/order/edit/${data.order_id}`, {
        state: {from: location.pathname},
      }),
    cancleForControlCOD,
    print.onClick[0],
    print.onClick[1],
    print.onClick[2],
    print.onClick[3],
    () => setOpenEditCODModal(true),
  ]
  const handleItemClick = (position, orderId) => {
    // @param position : position of function
    arrFunction[position - 1](orderId)
  }
  const isCancelOrder = data.shipping_status_id === '7'

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])

  return (
    <>
      <Tr
        {...props}
        className="for-controlCOD-table2__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={ForControlCODRow}
            arrDetail={arr_detail}
            status={data.shipping_status_id}
            onActionCancelForControlCOD={handleItemClick}
            setOpenEditCODModal={setOpenEditCODModal}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-width"
            title={data.logisticid}
            baseOn="height"
            placement="top-center"
          >
            {data.logisticid || '---'}
          </Tooltip>
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-width"
            title={data.billCode}
            baseOn="height"
            placement="top-center"
          >
            {data.billCode || '---'}
          </Tooltip>
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-width"
            title={data.goodsName}
            baseOn="height"
            placement="top-center"
          >
            {data.goodsName || '---'}
          </Tooltip>
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-width"
            title={data.receiverName}
            baseOn="height"
            placement="top-center"
          >
            {data.receiverName || '---'}
          </Tooltip>
          <Text color="#7C88A6" fontSize={13} fontWeight={400} lineHeight={18}>
            {data.receiverPhone || '---'}
          </Text>
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-height"
            title={data.receiverAddress}
            baseOn="height"
            placement="top-center"
          >
            {data.receiverAddress || '---'}
          </Tooltip>
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          {fDateTimeSuffix(data.sendingDate) || '---'}
        </Td>
        <Td className="for-controlCOD-table2__cell" data-type="td">
          <Tooltip
            className="tooltip-line"
            title={data.COD}
            baseOn="height"
            placement="top-center"
          >
            {formatMoney(data?.COD) || '---'}
          </Tooltip>
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
    </>
  )
}
