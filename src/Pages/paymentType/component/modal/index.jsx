import { RightSightPopup } from "layouts/rightSightPopup";
import { usePaymentTypeModal } from "Pages/paymentType/hooks/usePaymentTypeModal";
import { PaymentTypeContext } from "Pages/paymentType/provider/context";
import React from "react";
import { useContext } from "react";
import CreatePaymentType from "../createPayment/index"
import {PAYMENT_TYPE_MODAL_HEADER_TITLE} from "../../interfaces/_const";
const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {modal} = pageState
    const {functions, animate, canSubmitRule} = usePaymentTypeModal()
    return(
        <RightSightPopup
            openModal={modal?.create_payment}
            confirmBeforeClose={true}
            clickClose={functions.cancelConfirm}
            disableSubmit={canSubmitRule}
            animationClose={animate}
            header={PAYMENT_TYPE_MODAL_HEADER_TITLE}
            body={[
                {
                    item:<CreatePaymentType/>,
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