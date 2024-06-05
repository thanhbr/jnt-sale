import { Skeleton } from '@mui/material'
import { sendRequestAuth } from 'api/api'
import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import useOrderRow from 'Pages/refactorOrder/hooks/useOrderRow'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {OrderContext} from 'Pages/refactorOrder/provider/_context'
import {useContext, useState} from 'react'
import {OrderEmpty} from '../orderEmpty'
import {CellCodeOrder} from './_cellCodeOrder'
import {CellCustomer} from './_cellCustomer'
import {CellPayment} from './_cellPayment'
import {CellStatusOrder} from './_cellStatusOrder'
import {ConfirmDeleteModal} from './_confirmDeleteModal'
import {ReportCustomerModal} from './_reportCustomerModal'
import {RowMenuPopover} from './_rowMenuPopover'
import {RowOrderExtra} from './_rowOrderExtra'
import {formatMoney} from '../../../../util/functionUtil'
import {useNavigate, useSearchParams} from 'react-router-dom'
import toast from '../../../../Component/Toast'
import {useEffect} from 'react'
import {Tooltip} from 'common/tooltipv2'
import { PrintOrderDetail } from '../printDetail'

export const OrderTBody = () => {
  const { pageState } = useContext(OrderContext)
  const { table } = pageState

  const displayList = table.display.list
  const displayLoading = table.display.loading
  const paginationAmount = table.pagination.amount
  const paginationTotalItems = table.pagination.totalItems

  return (
    <>
      {displayLoading ? (
        Array.from(Array(paginationAmount), (e, i) => (
          <OrderPlaceholder key={i}/>
        ))
      ) : paginationTotalItems > 0 ? (
        displayList.map(item => <OrderTr key={item.id} data={item}/>)
      ) : (
        <OrderEmpty/>
      )}
      <PrintOrderDetail/>
    </>
  )
}

const OrderPlaceholder = ({ ...props }) => {
  return (
    <Tr {...props} className="order-table__row">
      {Array.from(Array(9), (e, i) => (
        <Td key={i} className="order-table__cell" data-type="td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </Td>
      ))}
    </Tr>
  )
}

const OrderTr = ({data, ...props}) => {
  const {showAlert} = useAlert()
  const {pageState,pageDispatch} = useContext(OrderContext)
  const {functions} = useOrderFilterForm()
  const orderRow = useOrderRow(data)
  const { cell, detail, row } = orderRow
  const { codeOrder, payment } = cell

  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const [reportCustomerModalData, setReportCustomerModalData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handlePrint = _ => {
    // in
    let content = document.getElementById('order-detail-print').innerHTML

    setIsLoading(true)
    let frame = document.createElement('iframe')
    frame.name = 'frame'
    frame.style.position = 'absolute'
    frame.style.top = '-1000000px'
    document.body.appendChild(frame)
    const frameDoc = frame.contentWindow
      ? frame.contentWindow
      : frame.contentDocument.document
        ? frame.contentDocument.document
        : frame.contentDocument
    frameDoc.document.open()
    frameDoc.document.write(content)
    frameDoc.document.close()
    window.frames.frame.focus()
    setTimeout(function () {
      setIsLoading(false)
      window.frames.frame.print()
      document.body.removeChild(frame)
    }, 1500)
    return true
  }

  const handleEditOrder = _ => navigate(`/order/edit/${data.id}`)
  const handleCopyOrder = async _ => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/copy/${data.id}`,
    )
    if (response?.data?.success) {
      navigate(`/order/copy/${response?.data?.meta?.insert_id}`)
      toast.success(`Sao chép từ đơn hàng [${data.id}] thành công.`)
    } else toast.error(`Sao chép từ đơn hàng [${data.id}] thất bại!`)
  }

  const handleShippingStatusUpdate = async status => {
    if ([7, 15].includes(status)) setConfirmDeleteModalData(null)

    setIsLoading(true)

    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      JSON.stringify({
        order_ids: [data.id],
        status,
      }),
    )

    if (response?.data?.success) {
      showAlert({ content: 'Cập nhật trạng thái thành công', type: 'success' })
      functions.fetchUpdateData()
    } else {
      const errMessage = Array.isArray(response?.data?.errors?.details) ? 
        response?.data?.errors?.details[0]?.error_message ? response?.data?.errors?.details[0]?.error_message : response?.data?.errors?.details[0]?.message : response?.data?.errors?.details?.message

      showAlert({
        content: errMessage || response?.data?.errors?.message,
        type: 'danger',
      })
    }

    setIsLoading(false)
  }

  const handleActionApply = action => {
    switch (action) {
      case 'print':
        handlePrint()
        break
      case 'edit':
        handleEditOrder()
        break
      case 'shipping':
        handleShippingStatusUpdate(1)
        break
      case 'copy':
        handleCopyOrder()
        break
      case 'cancel-shipping':
        setConfirmDeleteModalData({
          content: 'Bạn có chắc chắn muốn hủy giao hàng đã chọn?',
          title: 'Hủy giao hàng',
          onClose: () => setConfirmDeleteModalData(null),
          onSubmit: () => handleShippingStatusUpdate(7),
        })
        break

      case 'cancel-order':
        setConfirmDeleteModalData({
          content: 'Bạn có chắc chắn muốn hủy đơn hàng đã chọn?',
          title: 'Hủy đơn hàng',
          onClose: () => setConfirmDeleteModalData(null),
          onSubmit: () => handleShippingStatusUpdate(15),
        })
        break

      case 'report':
        setReportCustomerModalData({
          customer: {
            name: data?.customer_name,
            phone: data?.customer_mobile,
            total: data?.total_reports,
          },
          onClose: () => setReportCustomerModalData(null),
        })
        break

      default:
        break
    }
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])

  return (
    <>
      {isLoading && (
        <div className="order-table__loading">
          <img src="/img/loading.gif"/>
        </div>
      )}
      <Tr
        {...props}
        className="order-table__row"
        extra={
          <RowOrderExtra
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={orderRow}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="order-table__cell" data-type="td">
          <Checkbox
            checked={row.isSelected}
            disabled={data?.shipping_status_id === '15'}
            onClick={e => {
              e.stopPropagation()
              if (data?.shipping_status_id === '15') return
              row.onCheckboxChange()
            }}
          />
        </Td>
        <Td className="order-table__cell" data-type="td">
          <CellCodeOrder
            id={data.id}
            inventory={codeOrder.haveInventory}
            time={codeOrder.dateTime}
          />
        </Td>
        <Td className="order-table__cell" data-type="td">
          <CellCustomer
            id={data?.customer_id}
            name={data.customer_name}
            phone={data.customer_mobile}
            report={data?.total_reports || 0}
            onReportClick={() =>
              setReportCustomerModalData({
                customer: {
                  name: data?.customer_name,
                  phone: data?.customer_mobile,
                  total: data?.total_reports,
                },
                mode: 'view',
                onClose: () => setReportCustomerModalData(null),
              })
            }
          />
        </Td>
        <Td className="order-table__cell" data-type="td">
          <Tooltip
            title={data.order_origin_name}
            className="order-table__tooltipV2"
          >
            <Text>{data.order_origin_name}</Text>
          </Tooltip>
        </Td>
        <Td className="order-table__cell" data-type="td">
          <CellPayment type={payment.status}/>
        </Td>
        <Td className="order-table__cell" data-type="td">
          <Text>{formatMoney(data?.total_amount)}</Text>
        </Td>
        <Td className="order-table__cell" data-type="td">
          <Text>{formatMoney(data?.ship_fee)}</Text>
        </Td>
        <Td className="order-table__cell" data-type="td">
          <CellStatusOrder id={data.shipping_status_id}>
            {data.shipping_status_name}
          </CellStatusOrder>
        </Td>
        <Td
          className="order-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="order-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ORDER_ICONS.up}
          </button>
          <RowMenuPopover
            id={data.id}
            inventory={codeOrder.haveInventory}
            shippingStatus={row.data.shipping_status_id}
            dataOrder={data}
            onActionClick={handleActionApply}
          />
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
      {!!reportCustomerModalData && (
        <ReportCustomerModal data={reportCustomerModalData}/>
      )}
    </>
  )
}
