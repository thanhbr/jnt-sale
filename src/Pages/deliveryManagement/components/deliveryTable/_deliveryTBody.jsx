import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import useRow from 'Pages/deliveryManagement/hooks/useRow'
import {DeliveryContext} from 'Pages/deliveryManagement/provider/_context'
import {useContext, useState} from 'react'
import {CellCodeOrder} from './_cellCodeDeliveryManagement'
import {CellCustomer} from './_cellCustomer'
import {CellStatusOrder} from './_cellStatusDeliveryManagement'
import {RowMenuPopover} from './_rowMenuPopover'
import {RowOrderExtra} from './_rowDeliveryManagementExtra'
import {OrderSkeleton} from '../skeleton/index'
import {Tooltip} from 'common/tooltipv2'
import {DeliveryEmpty} from '../deliveryEmpty'
import {formatMoney} from '../../../../util/functionUtil'
import {ConfirmDeleteModal} from '../../../refactorOrder/components/orderTable/_confirmDeleteModal'
import useAlert from '../../../../hook/useAlert'
import UseDeliveryFilterForm from '../../hooks/useDeliveryFilterForm'
import {sendRequestAuth} from '../../../../api/api'
import config from '../../../../config'
import {orderActions} from '../../provider/_reducer'
import {DeliveryDownCOD} from '../deliveryDownCOD'
import { useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { CellAllocation } from './_cellAllocation'
import { useTranslation } from 'react-i18next'

export const DeliveryTBody = () => {
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
        <DeliveryEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const { t } = useTranslation()
  const deliveryRow = useRow(data)
  const {cell, detail, row, print} = deliveryRow
  const {codeOrder, payment} = cell
  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const {showAlert} = useAlert()
  const {functions} = UseDeliveryFilterForm()
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const [openEditCODModal, setOpenEditCODModal] = useState(false)

  const cancleDelivery = order_id => {
    setConfirmDeleteModalData({
      content: t('cancel_confirm'),
      title: t('cancel_order"'),
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
      showAlert({content: t('update_success'), type: 'success'})
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
    () => navigate(`/order/edit/${data.order_id}`),
    cancleDelivery,
    print.onClick[0],
    print.onClick[1],
    print.onClick[2],
    print.onClick[3],
    () => setOpenEditCODModal(true),
  ]
  const handleItemClick = (position, orderId) => {
    // @param position : position of function
    arrFunction[position-1](orderId)
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
        className="delivery-management-table__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={deliveryRow}
            arrDetail={arr_detail}
            status={data.shipping_status_id}
            onActionCancelDelivery={handleItemClick}
            setOpenEditCODModal={setOpenEditCODModal}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="delivery-management-table__cell">
          <Checkbox
            checked={row.isSelected}
            disabled={isCancelOrder}
            onClick={e => {
              e.stopPropagation()
              !isCancelOrder && row.onCheckboxChange()
            }}
          />
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <CellCodeOrder
            id={data.billcode}
            inventory={arr_detail?.has_detail}
            time={codeOrder.dateTime}
          />
        </Td>
        {/* <Td className="delivery-management-table__cell" data-type="td">
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
        >
          {fDateTimeSuffix(data.dt_delivered)}
        </Text>
      </Td> */}
        <Td className="delivery-management-table__cell" data-type="td">
          <CellCustomer
            name={data.customer_name}
            phone={data.customer_mobile}
            report={
              pageState.table.display.report?.find(
                find => find?.phone === data?.customer_mobile,
              )?.totals || 0
            }
          />
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {formatMoney(data?.ship_fee)}
          </Text>
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {t(data.number_of_prints)}
          </Text>
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <CellStatusOrder id={data.shipping_status_id}>
            {t(data.shipping_status_name)}
          </CellStatusOrder>
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <CellAllocation data={data}/>
        </Td>
        <Td className="delivery-management-table__cell" data-type="td">
          <Tooltip
            className="delivery-management-table__tooltipV2"
            placement="top-center"
            title={
              arr_detail?.has_detail
                ? arr_detail?.order_details?.join(' | ')
                : data.item_details
            }
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
          className="delivery-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => !isCancelOrder && e.stopPropagation()}
        >
          <div
            className="delivery-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            <img src={'/svg/arrow.svg'} alt={'arrow'} />
          </div>
           {!isCancelOrder && (
            <>
              <RowMenuPopover dataDetail={detail.active && detail.active.order_id == data.order_id ? detail.active :data} onActionClick={handleItemClick} item={data} />
            </>
          )}
        </Td>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
      {openEditCODModal && (
        <DeliveryDownCOD
          onClose={() => setOpenEditCODModal(false)}
          curValue={data?.cod}
          billCode={data?.billcode}
          refreshOrderDetails={row?.refreshOrderDetails}
        />
      )}
    </>
  )
}
