import React from 'react';
import {PageHeader} from "../../../../layouts/pageHeader";
import {PAYMENT_MANAGEMENT_BREADCRUMB, PAYMENT_MANAGEMENT_HEADER_ACTIONS} from "../../interfaces/_const";
import usePaymentManagementFilter from "../../hooks/usePaymentManagementFilter";
import {useNavigate} from "react-router-dom";

const Index = _ =>{
    const {methods} = usePaymentManagementFilter()
    const nav = useNavigate()
    const actions = [
        methods?.refreshTable,
        () => nav('/accountant/payment/create')
    ]
    return(
        <PageHeader
            actions={PAYMENT_MANAGEMENT_HEADER_ACTIONS.map((item, i) => ({
                ...item,
                onClick: actions[i]
            }))}
            breadcrumbLinks={PAYMENT_MANAGEMENT_BREADCRUMB}
            breadcrumbTitle={'Quản lý phiếu chi'}
        />
    )
}

export default Index;
