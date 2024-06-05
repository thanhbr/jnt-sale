import { Checkbox } from 'common/form/checkbox'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import useRow from '../../hooks/useRow'
import { ShippingTrackingContext } from '../../provider/_context'
import React, { useContext, useEffect, useState } from 'react'
import { CellCodeOrder } from './_cellCodeDeliveryManagement'
import { CellCustomer } from './_cellCustomer'
import { CellStatusOrder } from './_cellStatusDeliveryManagement'
import { RowOrderExtra } from './_rowDeliveryManagementExtra'
import { OrderSkeleton } from '../skeleton/index'
import { ShippingTrackEmpty } from '../shippingTrackingEmpty'
import { UpdateRequestRefund } from './_requestRefund'
import { Tooltip } from '../../../../common/tooltipv2'
import { Tooltip as TooltipDefault } from '../../../../common/tooltip'
import { ORDER_ICONS } from '../../../refactorOrder/interfaces/_icons'
import useSolvingProblem from '../../hooks/useSolvingProblem'
import { Switch } from '../../../customer/components/switch'
import { DELIVERY_ICONS } from '../../interfaces/_icons'
import ConfirmRequest from '../modal/confirm'
import { useSearchParams } from 'react-router-dom'

export const ShippingTrackingTBody = () => {
  const { pageState } = useContext(ShippingTrackingContext)
  const displayList = pageState.table.display.list
  const arr_details = pageState.table.display.arr_details

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item} arr_detail={arr_details[item.order_id]}/>)
      ) : (
        loading ? <ShippingTrackEmpty/> : <OrderSkeleton rows={15}/>
      )}
    </>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const trackingRow = useRow(data)
  const { funcs, pageData } = useSolvingProblem()
  const { cell, detail, row } = trackingRow
  const { codeOrder } = cell
  const [confirmRequestRefundModalData, setConfirmRequestRefundModalData] = useState(null)
  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('keyword') || ''

  const handleItemClick = status => {
    funcs.setDataform({ ...data, status: status == 0 ? true : false })
    funcs.handleShowSolvingForm(true)

    setConfirmRequestRefundModalData({
      data: data,
      onClose: () => {
        funcs.setDataform({ ...data, status: false })
        setConfirmRequestRefundModalData(null)
      },
    })
  }
  useEffect(() => {
    if(!!querySearch && data?.billcode == querySearch){
      row.onToggleDetail()
      row.shouldOpenDetail = true
    }
  }, [querySearch])
  return (
    <>
      <Tr
        {...props}
        className="shippingTracking-management-table__row"
        extra={
          <RowOrderExtra
            active={row.shouldOpenDetail}
            data={detail.active}
            rowData={trackingRow}
            arrDetail={arr_detail}
            onActionCancelDelivery={handleItemClick}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="shippingTracking-management-table__cell">
          <Checkbox
            checked={row.isSelected}
            onClick={e => {
              e.stopPropagation()
              row.onCheckboxChange()
            }}
          />
        </Td>
        <Td className="shippingTracking-management-table__cell" data-type="td">
          <CellCodeOrder
            id={data.billcode}
            inventory={data?.has_inventory}
            time={codeOrder.dateTime}
          />
        </Td>
        <Td className="shippingTracking-management-table__cell" data-type="td">
          <CellCustomer
            name={data.customer_name}
            phone={data.customer_mobile}
            report={data?.total_reports || 0}
          />
        </Td>

        <Td className="shippingTracking-management-table__cell" data-type="td">
          <CellStatusOrder id={data.status}>
            {data.status_name}
          </CellStatusOrder>
        </Td>
        <Td className="shippingTracking-management-table__cell" data-type="td">
          <div style={{ width: '95%' }}>
            <Tooltip placement="bottom-center" title={data?.problem_reason} baseOn='height'
                     className='shippingTracking-management-table__tooltipV2-reason'>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={400}
                lineHeight={20}
                as={'p'}
              >
                {data.problem_reason}
              </Text>
            </Tooltip>
            {!!data?.problem_reason_lv2 &&
            <Text as={'p'}
                  color={'#FF7542'}
                  style={{
                    border: '1px solid rgba(255, 117, 66, 0.4)',
                    borderRadius: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1px 8px',
                    marginTop: '4px',
                    // height: '24px'
                  }}
            >{DELIVERY_ICONS.warning} &nbsp;
              <Tooltip placement="bottom-center" title={data?.problem_reason_lv2} baseOn='height'
                       className='shippingTracking-management-table__tooltipV2-reason'>
                {data?.problem_reason_lv2}
              </Tooltip>
            </Text>
            }
          </div>
        </Td>
        <Td
          className="shippingTracking-management-table__cell" data-type="td"
        >
          {data.problem_solving_status == 1 ?
            <TooltipDefault placement="bottom-center" title={'Đã ghi nhận thông tin xử lý'}
                            onChange={e => e.stopPropagation()}>
              <Switch disabled={true}
                      onChange={e => {
                        e.stopPropagation()
                      }
                      }
                      checked={true}
              />
            </TooltipDefault>
            :
            <TooltipDefault className={'common-tooltip'} placement="bottom-center"
                            title={'Chưa xử lý, hãy bấm vào để ghi nhận thông tin xử lý'}>
              <Switch disabled={false}
                      onChange={e => {
                        e.stopPropagation()
                        handleItemClick(data.problem_solving_status)
                      }
                      }
                      checked={false}
              />
            </TooltipDefault>
          }
        </Td>
        <Td className="shippingTracking-management-table__cell" data-type="td"
        >
          <div style={{ width: '100%' }}>
            {
              data.problem_solving_status == 1 &&
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip style={{ width: '90%' }} placement="bottom-center" title={data?.problem_note} baseOn='height'
                         className='shippingTracking-management-table__tooltipV2'>
                  <Text
                    color={THEME_COLORS.secondary_100}
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    as={'p'}
                  >
                    <span style={{ marginRight: '4px' }}>{data?.problem_note || 'Chưa có ghi chú'}</span>
                  </Text>
                </Tooltip>
                <TooltipDefault style={{ width: '20px' }} placement="bottom-center" title={'Chỉnh sửa nội dung xử lý'}>
                  <div className={'edit-solving'}
                       onClick={e => {
                         e.stopPropagation()
                         data.problem_solving_status == 1 ? handleItemClick() : ''
                       }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.36744 3.26512H4.86264C3.86062 3.26512 3.35961 3.26512 2.97689 3.46012C2.64024 3.63166 2.36654 3.90536 2.19501 4.24201C2 4.62473 2 5.12574 2 6.12775V11.1374C2 12.1394 2 12.6404 2.19501 13.0231C2.36654 13.3598 2.64024 13.6335 2.97689 13.805C3.35961 14 3.86062 14 4.86263 14H9.87225C10.8743 14 11.3753 14 11.758 13.805C12.0946 13.6335 12.3683 13.3598 12.5399 13.0231C12.7349 12.6404 12.7349 12.1394 12.7349 11.1374V8.63256M5.57828 10.4217H6.57695C6.86869 10.4217 7.01455 10.4217 7.15183 10.3888C7.27353 10.3595 7.38988 10.3113 7.4966 10.2459C7.61697 10.1722 7.72011 10.069 7.9264 9.86274L13.6295 4.15969C14.1235 3.66563 14.1235 2.8646 13.6295 2.37054C13.1354 1.87649 12.3344 1.87648 11.8403 2.37054L6.13724 8.0736C5.93095 8.27989 5.82781 8.38303 5.75404 8.5034C5.68865 8.61012 5.64045 8.72647 5.61123 8.84817C5.57828 8.98545 5.57828 9.13132 5.57828 9.42306V10.4217Z"
                        stroke="#1A94FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </TooltipDefault>
              </div>
            }
            {+data?.problem_solving_action !== 0 && !!data?.problem_solving_action &&
            <Text color={'#040711'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '4px'
                  }}>
              {DELIVERY_ICONS.circle} &nbsp; Đã đề nghị giao lại
            </Text>
            }
          </div>
        </Td>
        <Td
          className="shippingTracking-management-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="shippingTracking-management-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            <img src={'/svg/arrow.svg'} alt={'arrow'}/>
          </div>
          <div
            className="shippingTracking-management-table__search-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            <Tooltip placement="bottom-center" title={'Xem hành trình vận đơn'}>{ORDER_ICONS.searchMd} </Tooltip>
          </div>
        </Td>
      </Tr>
      {!!confirmRequestRefundModalData && !!pageData.showForm && (
        <UpdateRequestRefund {...confirmRequestRefundModalData} />
      )}
      {!!confirmRequestRefundModalData && (
        <ConfirmRequest onClose={() => {
          funcs.setDataform({ ...data, status: false })
          setConfirmRequestRefundModalData(null)
        }}/>
      )}
    </>
  )
}
