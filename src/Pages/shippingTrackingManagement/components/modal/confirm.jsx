import React from 'react';
import "./index.scss"
import { ConfirmModal } from '../../../../layouts/rightSightPopup/confirm'
import { Text } from '../../../../common/text'
import useSolvingProblem from '../../hooks/useSolvingProblem'
const ConfirmRequest = ({onClose,...props}) => {
   const { dataForm , funcs,pageData} = useSolvingProblem()
   return (
      <>
         <ConfirmModal
            openModal={!!pageData?.showConfirm}
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
                     title: 'Xác nhận'
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
            closeModal={() => {
              funcs?.handleShowConfirm(false)
              funcs?.handleShowSolvingForm(true)
            }}
            acceptance={() => funcs?.solvingOrder(onClose)}
         />
      </>

   )
}
export default ConfirmRequest;
const Confirm = () => {
   return (
      <div>
         <Text
            fontSize={20}
            fontWeight={600}
         >Xác nhận đề nghị giao lại</Text>
         <Text as='p' className='product-group-modal_txt'>
           Hệ thống sẽ chuyển yêu cầu đề nghị giao lại này đến đơn vị vận chuyển để bắt đầu giao lại. Bạn có chắc chắn muốn thực hiện?</Text>
      </div>

   )
}