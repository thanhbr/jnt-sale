import React, {useContext} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {useCreatePaymentModal} from "../hooks/useCreatePaymentModal";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../../common/text";
const Index = _ =>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {contentModal} = formCreate;
    const {confirm} = contentModal
    const {confirmModal} = useCreatePaymentModal()
    return(
        <ConfirmModal
            openModal={confirm?.leavePage}
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
            closeModal={() => confirmModal.leavePage.dismiss()}
            acceptance={() => confirmModal.leavePage.accept()}
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