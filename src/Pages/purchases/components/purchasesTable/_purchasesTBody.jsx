import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import useRow from 'Pages/purchases/hooks/useRow'
import {PurchasesContext} from 'Pages/purchases/provider/_context'
import {useContext, useState} from 'react'
import {CellCodePurchases} from './_cellCodePurchasesManagement'
import {CellCustomer} from './_cellCustomer'
import {RowMenuPopover} from './_rowMenuPopover'
import {RowOrderExtra} from './_rowPurchasesManagementExtra'
import {OrderSkeleton} from '../skeleton/index'
import {PurchasesEmpty} from '../purchasesEmpty'
import {formatMoney} from '../../../../util/functionUtil'
import {ConfirmDeleteModal} from './_confirmDeleteModal'
import {useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {fDateTimeSuffix} from 'util/formatTime'
import {StatusPaymentLabel, StatusWarehouseLabel} from '../section/_statusInfo'
import {PURCHASES_ICONS} from 'Pages/purchases/interfaces/_icons'
import {Tooltip} from 'common/tooltipv2'
import { ConfirmModal } from './_confirmModal'

export const PurchasesTBody = () => {
  const {pageState} = useContext(PurchasesContext)
  const displayList = pageState.table.display.list

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item} />)
      ) : loading ? (
        <PurchasesEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, ...props}) => {
  const purchasesRow = useRow(data)
  const {cell, detail, row, print} = purchasesRow
  const {codeOrder, payment} = cell
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const [confirmModalData, setConfirmModalData] = useState(null)
  const {pageState, pageDispatch} = useContext(PurchasesContext)

  const cancelPurchases = id => {
    setConfirmDeleteModalData({
      content: 'Phiếu nhập hàng được xoá sẽ không thể khôi phục, bạn có chắc chắn muốn xóa không?',
      title: 'Xóa phiếu nhập hàng',
      onClose: () => setConfirmDeleteModalData(null),
      onSubmit: () => {
        row.deletePurchase(id)
        setConfirmDeleteModalData(null)
      }
    })
  }

  const changeProductPurchases = id => {
    setConfirmModalData({
      content: 'Thao tác này sẽ xác nhận rằng toàn bộ hàng hóa trên phiếu đã được nhập vào kho hàng. Bạn có chắc muốn thực hiện?',
      title: 'Xác nhận nhập kho',
      onClose: () => setConfirmModalData(null),
      onSubmit: () => {
        row.importProductPurchase(id)
        setConfirmModalData(null)
      },
    })
  }
  const navigate = useNavigate()
  const arrFunction = [
    () => navigate(`/purchase/edit/${data.id}`),
    () => print.onClick(data.id),
    () => navigate(`/purchase/refund/${data.id}`),
    () => changeProductPurchases(data.id),
    () => cancelPurchases(data.id),
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
        className="purchases-management-table__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={purchasesRow}
            status={data.shipping_status_id}
            onActionCancelPurchases={handleItemClick}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="purchases-management-table__cell" data-type="td">
          <CellCodePurchases id={data.invoice_no} time={codeOrder.dateTime} />
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <CellCustomer supplierCode={data?.supplier_code} id={data?.id} name={data.supplier_name} />
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <Tooltip
            className="tooltipv2"
            title={data?.warehouse_name}
            baseOn="width"
          >
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={14}
              fontWeight={400}
              lineHeight={20}
            >
              {data.warehouse_name}
            </Text>
          </Tooltip>
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {fDateTimeSuffix(data?.purchase_date)}
          </Text>
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.total_amount)}
          </Text>
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.total_payment)}
          </Text>
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.total_return||0)}
          </Text>
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <StatusPaymentLabel status={data.payment_status} />
        </Td>
        <Td className="purchases-management-table__cell" data-type="td">
          <StatusWarehouseLabel status={data.warehouse_status} />
        </Td>
        <Td
          className="purchases-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => !isCancelOrder && e.stopPropagation()}
        >
          <div
            className="purchases-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {PURCHASES_ICONS.up}
          </div>
          {!isCancelOrder && (
            <>
              <RowMenuPopover item={data} onActionClick={handleItemClick} />
            </>
          )}
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
      {!!confirmModalData && (
        <ConfirmModal {...confirmModalData} />
      )}
    </>
  )
}
