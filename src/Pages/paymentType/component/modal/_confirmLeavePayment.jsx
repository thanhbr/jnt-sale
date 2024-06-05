import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {modal} = pageState
    const {confirm} = usePaymentTypeModal()
    const {leavePage} = confirm
    return(
        <ConfirmModal
            openModal={modal.confirm_leave_page}
            body={<Confirm />}
            stylePopup={'payment-type-modal_confirm'}
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
                {className:'payment-type-modal_dismiss'}
            }
            closeModal={() => leavePage.dismiss()}
            acceptance={() => leavePage.accept()}
        />
    )
}
export default Index
const Confirm=()=>{
    return (
        <div className='payment-type-modal_group'>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận rời khỏi trang</Text>
            <Text as='p' className='payment-type-modal_txt'>
                Một số thông tin đã thay đổi, bạn có chắc chắn muốn rời khỏi trang khi thay đổi chưa được lưu?
            </Text>
        </div>

    )
}