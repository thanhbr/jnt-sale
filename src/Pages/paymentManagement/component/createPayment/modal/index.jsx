import { RightSightPopup } from "layouts/rightSightPopup";
import { usePaymentTypeModal } from "Pages/paymentType/hooks/usePaymentTypeModal";
import { PaymentTypeContext } from "Pages/paymentType/provider/context";
import React from "react";
import { useContext } from "react";
import CreatePaymentType from "./paymentType"
import {CreatePaymentMethods} from "./paymentMethods"
import {PaymentManagementContext} from "../../../provider/context";
import {PAYMENT_METHODS_MODAL_HEADER_TITLE, PAYMENT_TYPE_MODAL_HEADER_TITLE} from "../../../interfaces/_const";
import {useCreatePaymentModal} from "../hooks/useCreatePaymentModal";
const Index = _ =>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState
    const {functions, animate, canSubmitRule} = useCreatePaymentModal()
    const {closeModal} = useCreatePaymentModal()
    const content = ()=>{
        return(
            <>
            {formCreate?.contentModal?.type === 'payment type'? <CreatePaymentType/> : <CreatePaymentMethods/>}
            </>
        )
    }
    return(
        <RightSightPopup
            openModal={formCreate?.contentModal?.open}
            confirmBeforeClose={true}
            clickClose={closeModal}
            disableSubmit={canSubmitRule}
            animationClose={animate}
            header={formCreate?.contentModal?.type === 'payment type' ? PAYMENT_TYPE_MODAL_HEADER_TITLE : PAYMENT_METHODS_MODAL_HEADER_TITLE}
            body={[
                {
                    item: content(),
                }
            ]}
            footer={
                {
                    cancel: {
                        width: 74,
                        title: 'Huỷ'
                    },
                    save: {
                        width: 110,
                        title: 'Lưu'
                    },
                }
            }
            acceptance={() => functions.createPayment()}
        />
    )
}
export default Index;