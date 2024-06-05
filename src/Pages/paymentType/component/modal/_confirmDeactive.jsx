import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {modal} = pageState
    const {confirm} = usePaymentTypeModal()
    const {deActive} = confirm
    return(
        <ConfirmModal
            openModal={modal.confirm_status}
            body={<Confirm />}
            stylePopup={'payment-type-modal_confirm payment-type-modal_confirm-status'}
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
            closeModal={() => deActive.dismiss()}
            acceptance={() => deActive.accept()}
        />
    )
}
export default Index
const Confirm=()=>{
    return (
        <div>
            <Text
                fontSize={20}
                fontWeight={600}
            >Ngưng sử dụng loại phiếu chi</Text>
            <Text as='p' className='payment-type-modal_txt'>
                Bạn có chắc chắn muốn ngưng sử dụng loại phiếu chi đã chọn?
            </Text>
        </div>

    )
}