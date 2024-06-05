import React from "react";
import ReceiptEmpty from "./empty";
import PaymentTr from "./paymentTr";
import EditDescriptionPayment from "../modal/editDescriptionPayment";
import usePaymentManagementTable from "../../hooks/usePaymentManagementTable";
import CancelPayment from "../modal/cancelPayment";
import SkelentonPayment from "./skelenton";
const Index = _ =>{
    const {displayList, modalDesc, methods, modalCancel} = usePaymentManagementTable()

    return (
        <>
            {displayList?.loading ? (
                <SkelentonPayment />
            ) : displayList?.list?.length > 0 ? (
                <>
                    {displayList?.list?.map(item => <PaymentTr key={item.id} data={item}/> )}
                </>
            ) : <ReceiptEmpty />}

            <EditDescriptionPayment data={modalDesc}
                                    onClose={methods?.handleToggleEditModal}
                                    onNoteChange={methods?.handleChangeNote}
                                    onUpdateDesc={methods?.handleUpdateNote}
            />
            <CancelPayment modal={modalCancel}
                           onClose={methods?.handleToggleCancelModal}
                           submit={methods?.submitCancelModal}
            />
        </>
    )
}

export default Index;