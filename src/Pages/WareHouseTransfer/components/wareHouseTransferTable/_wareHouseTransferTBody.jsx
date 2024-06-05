import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import {WareHouseTransferContext} from 'Pages/WareHouseTransfer/provider/_context'
import {useContext, useState} from 'react'
import {CellCustomer} from './_cellCustomer'
import {RowMenuPopover} from './_rowMenuPopover'
import {OrderSkeleton} from '../skeleton/index'
import {Tooltip} from 'common/tooltipv2'
import {formatMoney} from '../../../../util/functionUtil'
import {ConfirmDeleteModal} from '../../../refactorOrder/components/orderTable/_confirmDeleteModal'
import useAlert from '../../../../hook/useAlert'
import UseWareHouseTransferFilterForm from '../../hooks/useWareHouseTransferFilterForm'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import {warehouseTransferActions} from '../../provider/_reducer'
import {useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CellCodeOrder} from './_cellCodeWareHouseTransfer'
import {CellStatusOrder} from './_cellStatusWareHouseTransfer'
import {RowOrderExtra} from './_rowWareHouseTransferExtra'
import useOrderRow from 'Pages/WareHouseTransfer/hooks/useRow'
import {WareHouseTransferEmpty} from '../wareHouseTransferEmpty'
import {fDateTimeCustom} from 'util/formatTime'

export const WareHouseTransferTBody = () => {
  const {pageState} = useContext(WareHouseTransferContext)
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
        <WareHouseTransferEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const WareHouseTransferRow = useOrderRow(data)
  const {cell, detail, row, print} = WareHouseTransferRow
  const {codeOrder, payment} = cell
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const {showAlert} = useAlert()
  const {functions} = UseWareHouseTransferFilterForm()
  const {pageState, pageDispatch} = useContext(WareHouseTransferContext)
  const [openEditCODModal, setOpenEditCODModal] = useState(false)

  const cancleWareHouseTransfer = order_id => {
    setConfirmDeleteModalData({
      content: 'Bạn có chắc chắn muốn hủy giao hàng đã chọn?',
      title: 'Hủy giao hàng',
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
      showAlert({content: 'Cập nhật trạng thái thành công', type: 'success'})
      pageDispatch({type: 'SET_LOADING', payload: false})
      functions.fetchUpdateData()
      setConfirmDeleteModalData(null)
    } else {
      pageDispatch({
        type: warehouseTransferActions.NOTIFICATIONS_LIST_UPDATE,
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
      type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: [],
        },
      },
    })
  }
  const navigate = useNavigate()

  const arrFunction = [
    () => navigate(`/order/edit/${data.order_id}`),
    cancleWareHouseTransfer,
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
        className="warehouse-transfer-management-table__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={WareHouseTransferRow}
            arrDetail={arr_detail}
            status={data.shipping_status_id}
            onActionCancelWareHouseTransfer={handleItemClick}
            setOpenEditCODModal={setOpenEditCODModal}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td
          className="warehouse-transfer-management-table__cell"
          data-type="td"
        >
          <CellCodeOrder
            id={data.code}
            inventory={arr_detail?.has_detail}
            time={codeOrder.dateTime}
          />
        </Td>
        <Td
          className="warehouse-transfer-management-table__cell"
          data-type="td"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {/* {fDateTimeCustom(data?.date_time, {format: 'yyyy-MM-dd HH:mm'})} */}
            {fDateTimeCustom(data?.date_time)}
          </Text>
        </Td>
        <Td
          className="warehouse-transfer-management-table__cell"
          data-type="td"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {data?.warehouse_import|| '---'}
          </Text>
        </Td>
        <Td
          className="warehouse-transfer-management-table__cell"
          data-type="td"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {data?.warehouse_export  || '---'}
          </Text>
        </Td>
        <Td
          className="warehouse-transfer-management-table__cell"
          data-type="td"
        >
          <Tooltip
            className="warehouse-transfer-management-table__tooltipV2"
            placement="top-center"
            title={data?.note}
            baseOn="height"
          >
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
              {data?.note || '---'}
            </Text>
          </Tooltip>
        </Td>
        <Td
          className="warehouse-transfer-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => !isCancelOrder && e.stopPropagation()}
        >
          <div
            className="warehouse-transfer-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            <img src={'/svg/arrow.svg'} alt={'arrow'} />
          </div>
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
    </>
  )
}
