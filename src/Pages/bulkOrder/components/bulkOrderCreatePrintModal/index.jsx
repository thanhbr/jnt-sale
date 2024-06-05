import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Select} from 'common/form/select'
import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import config from 'config'
import {BULK_ORDER_CREATE_CONSTANTS} from 'Pages/bulkOrder/interface/_constants'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import { useContext, useEffect, useState } from 'react'
import {BulkOrderSingleOption} from '../bulkOrderSingleOption'
import {StyledBulkOrderCreatePrintModal} from './_styled'
import { Loading } from '../../../../common/loading'
import { BulkOrderCreateContext } from '../../provider/_context'
import { quickSort } from '../../utils/helper'
import useGlobalContext from "../../../../containerContext/storeContext";

const pageSizeList = BULK_ORDER_CREATE_CONSTANTS.printModal.pageSize.list

export const BulkOrderCreatePrintOrder = ({data, ...props}) => {

  const {state, dispatch} = useContext(BulkOrderCreateContext)
  const [GlobalState] = useGlobalContext()
  const {shopInfo} = GlobalState
  const successList = getArrayFromValue(data?.data?.success)
  const isAllFailed = getArrayFromValue(data?.data?.success).length <= 0
  const list = quickSort(successList)

  const [pageSize, setPageSize] = useState(state?.form?.activePrint)

  useEffect(() => {
    // call api update position order
    sendRequestAuth('post',
      `${config.API}/tool/bulks/update-sort`,
      {
        'order_ids': list.map(item => item?.order_id).toString()
      }
    )
  }, [])
  useEffect(()=>{
    switch (shopInfo.setting_print) {
      case 1:
        setPageSize(pageSizeList[3])
        break;
      case 2:
        setPageSize(pageSizeList[1])
        break;
      case 3:
        setPageSize(pageSizeList[2])
        break;
      case 4:
        setPageSize(pageSizeList[0])
        break
      default:
        break
    }

  },[shopInfo.setting_print])
  const handlePrint = async (start, end) => {
    dispatch({type: 'SET_LOADING', payload: true})
    const filterList = list.filter((item, i) => i >= start && i <= end)
    const filterIdList = filterList.map(item => item?.order_id)
    const response = await sendRequestAuth(
      'post',
      pageSize?.value === 'others'
        ? `${config.API}/order/print-partner`
        : `${config.API}/order/print-upos`,
      JSON.stringify(
        pageSize?.value === 'others'
          ? {
              order_id: filterIdList,
              print_type: data?.data?.shippingPartner?.code,
            }
          : {
              order_id: filterIdList,
              print_type: 'shipment',
              print_size: pageSize?.value,
            },
      ),
    )

    if (response?.data?.success) {
      if (pageSize?.value === 'others') {
        dispatch({type: 'SET_LOADING', payload: false})
        window.open(response?.data?.data?.url)
      } else {
        const content = getTemplatePrint(
          getArrayFromValue(response?.data?.data).join('') || '',
        )

        const frame = document.createElement('iframe')
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
          window.frames.frame.print()
          document.body.removeChild(frame)
          dispatch({type: 'SET_LOADING', payload: false})
        }, 1500)

        return true
      }
    }else{
      dispatch({type: 'SET_LOADING', payload: false})
    }
  }

  const getTemplatePrint = content => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>${content}</body>
    </html>
  `

  return (
    <StyledBulkOrderCreatePrintModal {...props}>
      <div
        className="bulk-order-create-print-modal__container"
        data-sm={isAllFailed}
        onClick={e => e.stopPropagation()}
      >
        <div className="bulk-order-create-print-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {isAllFailed ? 'Gửi đơn giao hàng thất bại' : 'In vận đơn'}
          </Text>
        </div>
        <div className="bulk-order-create-print-modal__body">
          {isAllFailed ? (
            <Text as="p">
              Không có đơn nào được gửi giao hàng thành công, Quý khách vui lòng
              kiểm tra, chỉnh sửa lại thông tin bên dưới và gửi lại lần nữa. Nếu
              gặp khó khăn hãy liên hệ trực tiếp với evoshop để được hỗ trợ. Xin
              cảm ơn!
            </Text>
          ) : (
            <>
              <div className="bulk-order-create-print-modal__figures">
                <div className="bulk-order-create-print-modal__figure-item">
                  <div className="bulk-order-create-print-modal__figure-banner">
                    {BULK_ORDER_ICONS.success}
                  </div>
                  <div className="bulk-order-create-print-modal__figure-info">
                    <Text
                      as="h5"
                      fontSize={18}
                      fontWeight={700}
                      lineHeight={22}
                    >
                      {getArrayFromValue(data?.data?.success).length} đơn
                    </Text>
                    <Text color="#7D9AC0" lineHeight={18}>
                      Tạo thành công
                    </Text>
                  </div>
                </div>
                <div className="bulk-order-create-print-modal__figure-item">
                  <div className="bulk-order-create-print-modal__figure-banner">
                    {BULK_ORDER_ICONS.failed}
                  </div>
                  <div className="bulk-order-create-print-modal__figure-info">
                    <Text
                      as="h5"
                      fontSize={18}
                      fontWeight={700}
                      lineHeight={22}
                    >
                      {getArrayFromValue(data?.data?.failed).length} đơn
                    </Text>
                    <Text color="#7D9AC0" lineHeight={18}>
                      Không thành công
                    </Text>
                  </div>
                </div>
              </div>
              {getArrayFromValue(data?.data?.failed).length > 0 && (
                <NotificationBar type="warning" style={{marginBottom: 32}}>
                  Đối với các đơn gửi thất bại, hãy di chuột vào từng dòng để
                  biết lý do không thành công. Sau đó chỉnh sửa theo yêu cầu và
                  gửi lại lần nữa.
                </NotificationBar>
              )}

              <Text as="p" lineHeight={18} style={{marginBottom: 16}}>
                Bạn muốn in vận đơn? Hãy{' '}
                <Text as="b" lineHeight={18}>
                  chọn khổ in
                </Text>{' '}
                và bấm vào từng nút để in 100 đơn mỗi lần.
              </Text>
              <div className="bulk-order-create-print-modal__page-size">
                <Select value={pageSize?.name}>
                  {pageSizeList.map(
                    item =>
                      (item.value !== 'others' ||
                        !!data?.data?.shippingPartner?.code) && (
                        <BulkOrderSingleOption
                          key={item.value}
                          data-active={item?.value === pageSize?.value}
                          onClick={() => setPageSize(item)}
                        >
                          {item.name}
                        </BulkOrderSingleOption>
                      ),
                  )}
                </Select>
              </div>
              {successList.length > 0 && (
                <div className="bulk-order-create-print-modal__btn-list">
                  {Array.from(
                    Array(Math.ceil(successList.length / 100)),
                    (e, i) => (
                      <Button
                        key={i}
                        style={{margin: '0 8px 8px 8px'}}
                        onClick={() =>
                          handlePrint(
                            i * 100,
                            Math.min((i + 1) * 100, successList.length) - 1,
                          )
                        }
                      >
                        {i * 100 + 1} -{' '}
                        {Math.min((i + 1) * 100, successList.length)}
                      </Button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="bulk-order-create-print-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={data?.onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
      {state?.loading && <Loading />}
    </StyledBulkOrderCreatePrintModal>
  )
}
