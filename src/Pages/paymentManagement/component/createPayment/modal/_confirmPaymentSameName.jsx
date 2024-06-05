import React, {useContext} from "react";
import "./index.scss"
import {useCreatePaymentModal} from "../hooks/useCreatePaymentModal";
import {Text} from "../../../../../common/text";
import {ConfirmModal} from "../../../../../layouts/rightSightPopup/confirm";
const Index = _ =>{
    const {formCreate, confirmModal} = useCreatePaymentModal()
    return(
            <ConfirmModal
                openModal={formCreate.contentModal.confirm.sameName}
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
                closeModal={() => confirmModal.sameName.dismiss()}
                acceptance={() => confirmModal.sameName.accept()}
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