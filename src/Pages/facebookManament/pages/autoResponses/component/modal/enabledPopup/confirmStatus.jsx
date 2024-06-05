import React from 'react'
import { Text } from 'common/text'
import '../index.scss'
import useFacebookAutoResponses from '../../../hooks/useFacebookAutoResponses'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'

const EnableConfirm = ({ ...props }) => {
  const { data, methods } = useFacebookAutoResponses()
  return (
    <>
      <ConfirmModal
        openModal={!!data.confirm?.enable.status}
        body={
          (
            <div>
              <Text
                fontSize={19}
                fontWeight={600}
              >
                Kích hoạt kịch bản
              </Text>
              <Text as='p' className='product-group-modal_txt'>
                {data.confirm?.enable?.data?.message}
                <Text as={'a'} href={`/facebook/auto-responses/edit/${data.confirm?.enable?.data?.idScript}`}
                      color={'#1A94FF'}
                      target={'_blank'}
                > {data.confirm?.enable?.data?.script}</Text>
                . Bạn có chắc chắc muốn thay đổi thành kịch bản <b>{data.confirm?.enable?.data?.activeScript}</b>?
              </Text>

              <Text as='p' className='product-group-modal_txt'>
                &bull;  Nếu bấm Xác nhận: Hệ thống tự động ngưng kích hoạt kịch bản
                <Text as={'a'} href={`/facebook/auto-responses/edit/${data.confirm?.enable?.data?.idScript}`}
                      color={'#1A94FF'}
                      target={'_blank'}> {data.confirm?.enable?.data?.script} </Text>
                và kích hoạt kịch bản <b>{data.confirm?.enable?.data?.activeScript}</b>.
              </Text>

            </div>
          )
        }
        stylePopup={'product-group-modal_confirm enable-confirm'}
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
        closeModal={() => methods?.onCloseEnableConfirm()}
        acceptance={() => methods?.onEnableAutoScript()}
      />
    </>

  )
}
export default EnableConfirm