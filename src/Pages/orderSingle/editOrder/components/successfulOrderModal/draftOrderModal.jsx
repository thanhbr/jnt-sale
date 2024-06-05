import {Button} from 'common/button'
import {Text} from 'common/text'
import {StyledOrderCreatePrintModal} from './_styled'
import {ORDER_SINGLE_ICONS} from '../../../interface/_icons'
import * as React from 'react'
import {useContext} from 'react'
import {OrderSingleContext} from '../../../provider/_context'
import useOrderSingle from '../../../hooks/useOrderSingle'

export const DraftEditOrderModal = ({data, setModal, ...props}) => {
  const isAllFailed = !data?.success
  const {dispatch} = useContext(OrderSingleContext)
  const {methods} = useOrderSingle()
  return (
    <StyledOrderCreatePrintModal {...props}>
      <div
        className="order-create-print-modal__container"
        data-md={true}
        onClick={e => e.stopPropagation()}
      >
        <div className="order-create-print-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {isAllFailed ? 'Cập nhật đơn nháp thất bại' : ''}
          </Text>
        </div>

        <div className="order-create-print-modal__body">
          {isAllFailed ? (
            <div>
              <Text as="p" style={{marginBottom: '24px'}}>
                Đơn hàng của bạn đang gặp các vấn đề dưới đây, bạn cần kiểm tra
                và điều chỉnh để có thể tạo đơn hàng?
              </Text>
              {!!data?.errors?.details?.length ? (
                <div className="content-error">
                  {data?.errors?.details?.map((item, index) => {
                    if (item?.str_replace?.product_model)
                      item.message = item.message.replace(
                        '{product_model}',
                        item?.str_replace?.product_model,
                      )
                    return (
                      <Text
                        as="p"
                        style={{display: 'flex', alignItems: 'center'}}
                        key={index}
                      >
                        {ORDER_SINGLE_ICONS.alertTriangle} {item?.message}
                      </Text>
                    )
                  })}
                </div>
              ) : (
                <div className="content-error">
                  <Text
                    as="p"
                    style={{display: 'flex', alignItems: 'center'}}
                  >
                    {ORDER_SINGLE_ICONS.errorCircle} {data?.errors?.details?.message}
                  </Text>
                </div>
              )}
            </div>
          ) : (
            <div style={{textAlign: 'center'}}>
              <Text
                className="success-banner"
                as="p"
                style={{marginBottom: '24px', width: 'auto'}}
              >
                {ORDER_SINGLE_ICONS.success}
              </Text>
              <div className="content-success ">
                <Text
                  as="p"
                  fontSize={'20px'}
                  lineHeight={'140%'}
                  fontWeight={600}
                  style={{marginBottom: '16px', width: 'auto'}}
                >
                  Tạo đơn nháp thành công
                  {/*Tạo đơn nhận tại cửa hàng thành công*/}
                </Text>

                <Button
                  appearance="secondary"
                  size="md"
                  style={{minWidth: 110, marginRight: '8px'}}
                  onClick={() => {
                    methods.onResetCustomer()
                    methods.onFetchOrigin()
                    setModal(null)
                  }}
                >
                  Tạo đơn tương tự
                </Button>
                <Button
                  appearance="secondary"
                  size="md"
                  style={{minWidth: 110, marginRight: '8px'}}
                  onClick={() => {
                    methods.onResetFormData()
                    methods.onFetchOrigin()
                    setModal(null)
                  }}
                >
                  Tạo đơn mới
                </Button>
              </div>
              <Text
                as={'a'}
                href={'/orders'}
                color={'#1A94FF'}
                fontSize={'14px'}
                className={'back-to-orders'}
              >
                Trở lại danh sách
              </Text>
            </div>
          )}
        </div>
        <div className="order-create-print-modal__footer">
          {isAllFailed && (
            <>
              <Button
                appearance="ghost"
                size="sm"
                style={{minWidth: 110, marginRight: '8px'}}
                onClick={() => setModal(null)}
              >
                Đóng
              </Button>
            </>
          )}
        </div>
      </div>
    </StyledOrderCreatePrintModal>
  )
}
