import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {modal} = pageState
    const {confirm} = usePaymentTypeModal()
    const {deletePayment} = confirm
    return(
        <ConfirmModal
            openModal={modal.delete_payment}
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
                        title: 'Xóa'
                    },
                }
            }
            footerProps={
                {className:'payment-type-modal_dismiss payment-type-modal_delete'}
            }
            closeModal={() => deletePayment.dismiss()}
            acceptance={() => deletePayment.accept()}
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
            >Xóa loại phiếu chi</Text>
            <Text as='p' className='payment-type-modal_txt'>Loại phiếu chi sau khi xoá sẽ không thể khôi phục. Bạn vẫn chắn chắn muốn xoá loại phiếu chi đã chọn?</Text>
        </div>

    )
}