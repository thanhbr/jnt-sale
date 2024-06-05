import React from 'react'
import { Text } from 'common/text'
import '../index.scss'
import useFacebookAutoResponses from '../../../hooks/useFacebookAutoResponses'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'

const DisableConfirm = ({ ...props }) => {
  const { data, methods } = useFacebookAutoResponses()
  return (
    <>
      <ConfirmModal
        openModal={!!data.confirm?.disable}
        body={
          (
            <div>
              <Text
                fontSize={19}
                fontWeight={600}
              >
               Ngưng sử dụng kịch bản
              </Text>
              <Text as='p' className='product-group-modal_txt'>
                Kịch bản bị ngưng sử dụng sẽ không thể tự động áp dụng ở các Fanpage mà bạn đã thiết lập. Bạn có chắc chắn muốn ngưng sử dụng kịch bản phản hồi tự động đã chọn?
              </Text>
            </div>
          )
        }
        stylePopup={'product-group-modal_confirm'}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Huỷ',

            },
            acceptance: {
              width: 110,
              title: 'Xác nhận'
            },
          }
        }
        footerProps={
          { className: 'product-group-modal_dismiss' }
        }
        closeModal={() => methods?.onCloseDisableConfirm()}
        acceptance={() => methods?.onDisableAutoScript()}
      />
    </>

  )
}
export default DisableConfirm