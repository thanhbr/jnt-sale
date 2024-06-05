import { usePaymentTypeModal } from 'Pages/paymentType/hooks/usePaymentTypeModal';
import React, {useContext} from 'react';
import {PageHeader} from "../../../../layouts/pageHeader";
import {PAYMENT_TYPE_BREADCRUMB, PAYMENT_TYPE_HEADER_ACTIONS} from "../../interfaces/_const";
import {PaymentTypeContext} from "../../provider/context";

const Index = _ =>{
    const {functions, fetchOrderByFilter} = usePaymentTypeModal()
    const {pageState, pageDispatch} = useContext(PaymentTypeContext)
    const {paymentType} = pageState
    const queries = {
        keyword:paymentType?.keyword || '',
        status:'',
        per_page:paymentType?.pagination?.amount || 20,
        start: paymentType?.pagination?.amount * paymentType?.pagination?.active || 0,
    }

    const actions = [
        () =>fetchOrderByFilter(queries),
        () => functions.openModal(),
    ]
    return(
        <PageHeader
            actions={PAYMENT_TYPE_HEADER_ACTIONS.map((item, i) => ({
                ...item,
                onClick: actions[i]
            }))}
            breadcrumbLinks={PAYMENT_TYPE_BREADCRUMB}
            breadcrumbTitle={'Loại phiếu chi'}
        />
    )
}

export default Index;
