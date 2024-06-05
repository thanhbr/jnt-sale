import React, {useContext} from "react";
import {ConfirmModal} from "../../../../layouts/rightSightPopup/confirm";
import {Text} from "../../../../common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
import "./index.scss"
const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {modal} = pageState
    const {confirm} = usePaymentTypeModal()
    const {sameName} = confirm
    return(
            <ConfirmModal
                openModal={modal.confirm_same_name}
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
                closeModal={() => sameName.dismiss()}
                acceptance={() => sameName.accept()}
            />
    )
}
export default Index
const Confirm=()=>{
    return (
        <div  className='payment-type-modal_group'>
            <Text
                fontSize={20}
                fontWeight={600}
            >Xác nhận lưu loại phiếu chi trùng tên</Text>
            <Text as='p' className='payment-type-modal_txt'>
                Hệ thống đang tồn tại loại phiếu chi có tên trùng với loại phiếu chi mà bạn đang thao tác. Bạn vẫn muốn lưu lại loại phiếu chi này?
            </Text>
        </div>

    )
}