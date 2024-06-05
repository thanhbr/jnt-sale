import { StyledOrderCreatePrintModal } from './_styled'
import * as React from 'react'
import { ORDER_SINGLE_ICONS } from '../../../../../../orderSingle/interface/_icons'
import { Text } from '../../../../../../../common/text'
import { Button } from '../../../../../../../common/button'

export const DraftOrderModal = ({ data, setModal, ...props }) => {
  return (
    <StyledOrderCreatePrintModal {...props}>
      <div
        className="order-create-print-modal__container"
        data-md={true}
        onClick={e => e.stopPropagation()}
      >
        <div className="order-create-print-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
            Tạo đơn nháp thất bại
          </Text>
        </div>

        <div className="order-create-print-modal__body">
          <div>
            <Text as="p" style={{ marginBottom: '24px' }}>
              Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn cần kiểm tra
              và điều chỉnh để có thể tạo đơn hàng?
            </Text>
            <div className="content-error">
              {data?.errors?.details.map((item, index) => {
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
              })}
            </div>
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
        </div>
      </div>
    </StyledOrderCreatePrintModal>
  )
}
