import React, { useContext } from 'react'
import { Text } from 'common/text'
import '../index.scss'
import { ConfirmModal } from '../../../../../common/confirm/index'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { FacebookAutoResponsesContext } from '../../../provider/_context'

const ConfirmCreate = ({ ...props }) => {
  const { data, methods } = useCreateFacebookAutoResponses()
  const { dispatch } = useContext(FacebookAutoResponsesContext)
  return (
    <>
      <ConfirmModal
        openModal={!!data.confirm?.create.status}
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
                {data.confirm?.create?.data?.message}
                <Text as={'a'} href={`/facebook/auto-responses/edit/${data.confirm?.create?.data?.idScript}`}
                      color={'#1A94FF'}
                      target={'_blank'}
                > {data.confirm?.create?.data?.script}</Text>
                . Bạn có chắc chắc muốn thay đổi thành kịch bản <b>{data.confirm?.create?.data?.activeScript}</b>?
              </Text>

              <Text as='p' className='product-group-modal_txt'>
                &bull;  Nếu bấm Xác nhận: Hệ thống tự động ngưng kích hoạt kịch bản
                <Text as={'a'} color={'#1A94FF'}
                      href={`/facebook/auto-responses/edit/${data.confirm?.create?.data?.idScript}`}
                      target={'_blank'}
                > {data.confirm?.create?.data?.script} </Text>
                và kích hoạt kịch bản <b>{data.confirm?.create?.data?.activeScript}</b>.
              </Text>

              <Text as='p'>
                &bull;  Nếu bấm Lưu và chưa kích hoạt: Hệ thống sẽ lưu lại kịch bản <b>{data.confirm?.create?.data?.activeScript}</b> ở trạng thái “Ngưng kích hoạt”, bạn vẫn có thể Kích hoạt sử dụng khi cần.
              </Text>

            </div>
          )
        }
        stylePopup={'product-group-modal_confirm create-confirm'}
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
        button={[
          {
            onClick: () => methods?.onCloseCreateConfirm(),
            appearance: 'ghost',
            className: 'confirm-popup__dismiss',
            title: 'Hủy'
          },
          {
            onClick: () => {
              methods?.onConfirmCreate({
                status: true
              })
            },
            appearance: 'secondary',
            className: 'confirm-popup__save-draft',
            title: 'Lưu và chưa kích hoạt'
          },
          {
            onClick: () => methods?.onConfirmCreate(),
            appearance: 'primary',
            className: 'confirm-popup__save',
            title: 'Xác nhận'
          },
        ]}
      />
    </>

  )
}
export default ConfirmCreate