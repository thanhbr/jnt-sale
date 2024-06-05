import React from 'react';
import { Text } from 'common/text';
import "./index.scss"
import { ConfirmModal } from '../../../../../../layouts/rightSightPopup/confirm'
import useFacebookAutoResponses from '../../hooks/useFacebookAutoResponses'
const DeleteModal = ({...props}) => {
   const { data , methods} = useFacebookAutoResponses()
   return (
      <>
         <ConfirmModal
            openModal={!!data.confirm.delete}
            body={<Confirm />}
            stylePopup={'product-group-modal_confirm'}
            footer={
               {
                  cancel: {
                     width: 110,
                     title: 'Huỷ',

                  },
                  acceptance: {
                     width: 110,
                     title: 'Xóa'
                  },
               }
            }
            submitProps={
               {
                  appearance : 'danger'
               }
               }
            footerProps={
               {className:'product-group-modal_dismiss'}
            }
            closeModal={() => methods?.onClickDeleteConfirm()}
            acceptance={() => methods?.onDeleteAutoResponse(data.confirm.delete)}
         />
      </>

   )
}
export default DeleteModal;
const Confirm = () => {
   return (
      <div>
         <Text
            fontSize={19}
            fontWeight={600}
         >Xóa kịch bản phản hồi tự động</Text>
         <Text as='p' className='product-group-modal_txt'>
           Hệ thống sẽ ngừng gửi các mẫu nội dung phản hồi tự động đến các trang đã cấu hình trong kịch bản này. Bạn có chắc chắn muốn xóa kịch bản phản hồi tự động đã chọn?
         </Text>
      </div>

   )
}