import { RightSightPopup } from 'layouts/rightSightPopup';
import React from 'react';
import ModalContent from "./contentModal"
import { Text } from 'common/text';
import "./index.scss"
import { ConfirmModal } from '../../../../../../layouts/rightSightPopup/confirm'
import useFacebookConversationStickers from '../../hooks/useFacebookConversationStickers'
const Index = ({...props}) => {
   const { data , methods} = useFacebookConversationStickers()
   return (
      <>
         <ConfirmModal
            openModal={!!data.modal.status.delete}
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
            closeModal={methods?.onCancelConfirmDelete}
            acceptance={() => methods?.onSubmitDeletetag(data.modal.status?.delete?.id)}
         />
      </>

   )
}
export default Index;
const Confirm = () => {
   return (
      <div>
         <Text
            fontSize={19}
            fontWeight={600}
         >Xóa nhãn khách hàng</Text>
         <Text as='p' className='product-group-modal_txt'>Những khách hàng đang được gắn nhãn này sẽ bị xóa mất nhãn. Bạn có chắc chắn muốn xóa nhãn khách hàng đã chọn?</Text>
      </div>

   )
}