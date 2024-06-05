import React, {memo, useEffect} from 'react';
import styled from "styled-components";
import {usePaymentType} from "./hooks/usePaymentType";
import {PaymentTypeProvider} from './provider/index';
import Header from "./component/header/index"
import {TableLayout} from "../../layouts/tableLayout";
import PaymentTypeFilter from "./component/filter/index"
import PaymentHead from "./component/table/_tableHeader"
import PaymentBody from "./component/table/_tableBody";
import ModalCreate from "./component/modal/index";
import ConfirmSameName from "./component/modal/_confirmPaymentSameName"
import ConfirmDeletePayment from "./component/modal/_confirmDelete"
import ConfirmLeavePage from "./component/modal/_confirmLeavePayment"
import ConfirmStatus from "./component/modal/_confirmDeactive"
export const PaymentType = memo(()=>{
    const {provider, fetch, pagination} = usePaymentType()
    const {state,dispatch} = provider
    const {paymentType} = state
    useEffect(()=>{
        fetch.origin()
    },[])
    return(
        <PaymentTypeProvider value={{ pageState : state, pageDispatch : dispatch}}>
            <StylePaymentManagement>
                <Header/>
                <TableLayout
                    header={
                        <>
                            <PaymentTypeFilter />
                        </>
                    }
                    table={{
                        tHead: <PaymentHead />,
                        tBody: <PaymentBody />,
                    }}
                    pagination={{
                        ...paymentType.pagination,
                        onAmountChange: pagination.onAmountChange,
                        onPageChange: pagination.onPageChange,
                    }}
                />
                {state?.modal?.create_payment && <ModalCreate/>}
                {state?.modal?.confirm_same_name && <ConfirmSameName/>}
                {state?.modal?.delete_payment && <ConfirmDeletePayment/>}
                {state?.modal?.confirm_leave_page && <ConfirmLeavePage/>}
                {state?.modal?.confirm_status && <ConfirmStatus/>}
            </StylePaymentManagement>
        </PaymentTypeProvider>

    )
})
const StylePaymentManagement = styled.div`
    
`