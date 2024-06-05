import { StyledOrderCreatePrintModal } from './_styled'
import * as React from 'react'
import { Popper } from '../../../../../../../common/popper'
import { sendRequestAuth } from '../../../../../../../api/api'
import config from '../../../../../../../config'
import { useContext, useState } from 'react'
import { SuccessfulOrder } from './index'
import useFacebookConversationOrder from '../../../hooks/useFacebookConversationOrder'
import { FacebookConversationContext } from '../../../provider/_context'
import { ORDER_SINGLE_ICONS } from '../../../../../../orderSingle/interface/_icons'
import { Text } from '../../../../../../../common/text'
import { Button } from '../../../../../../../common/button'
import { ORDER_SINGLE_CONSTANTS } from '../../../../../../orderSingle/interface/_constants'
import useAlert from '../../../../../../../hook/useAlert'

export const DeliveryOrderModal = ({ data, setModal, ...props }) => {
  const { state } = useContext(FacebookConversationContext)
  const { methods } = useFacebookConversationOrder()
  const [dataOrder, setDataOrder] = useState()
  const { showAlert } = useAlert()

  const createDraftOrder = opt => {
    const response = methods.handleSubmit(opt)
    response.then(res => {
      if (!!res?.data) setDataOrder({...res.data, ...opt})
      if (res.data.success) {
        if (!!opt?.is_draft)
          showAlert({
            content: 'Tạo đơn nháp thành công',
            type: 'success',
            duration: 2000
          })
      }
    })
    setModal(null)
  }
  return (
    <StyledOrderCreatePrintModal {...props}>
      <div
        className="order-create-print-modal__container"
        data-success={false}
        onClick={e => e.stopPropagation()}
      >
        <div className="order-create-print-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
            {state.detail.shippingInfo.isStorePickUp
              ? 'Tạo đơn nhận tại cửa hàng thất bại'
              : 'Gửi đơn giao hàng thất bại'}
          </Text>
        </div>
        <div className="order-create-print-modal__body">
          <div>
            {state.detail.shippingInfo.isStorePickUp ? (
              <Text as="p" style={{ marginBottom: '24px' }}>
                Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn cần kiểm
                tra và điều chỉnh để có thể tạo đơn hàng?
              </Text>
            ) : (
              <Text as="p" style={{ marginBottom: '24px' }}>
                Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn có muốn{' '}
                <Text as="span" fontWeight={600}>
                  Lưu đơn hàng nháp{' '}
                </Text>{' '}
                để điều chỉnh sau?
              </Text>
            )}
            {!!data?.errors?.details?.length ? (
              <div className="content-error">
                {(data?.errors?.details?.map((item, index) => {
                  if (item?.str_replace?.product_model)
                    item.message = item.message.replace(
                      '{product_model}',
                      item?.str_replace?.product_model,
                    )
                  return (
                    <Text
                      as="p"
                      style={{ display: 'flex', alignItems: 'center' }}
                      key={index}
                    >
                      {ORDER_SINGLE_ICONS.errorCircle} {item?.message}
                    </Text>
                  )
                }))}
              </div>
            ) : (
              <div className="content-error">
                <Text
                  as="p"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {ORDER_SINGLE_ICONS.errorCircle} {data?.errors?.details?.message}
                </Text>
              </div>
            )}
          </div>

        </div>
        <div className="order-create-print-modal__footer">
              <Button
                appearance="ghost"
                size="sm"
                style={{ minWidth: 110, marginRight: '8px' }}
                onClick={() => setModal(null)}
              >
                Đóng
              </Button>
              {!state.detail.shippingInfo.isStorePickUp && (
                <Button
                  size="sm"
                  style={{ minWidth: 110 }}
                  onClick={() => createDraftOrder({ is_draft: 1 })}
                >
                  Lưu đơn nháp
                </Button>
              )}
        </div>
      </div>
      {dataOrder && <SuccessfulOrder data={dataOrder}/>}
    </StyledOrderCreatePrintModal>
  )
}
