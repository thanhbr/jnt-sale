import React, {memo, useEffect} from 'react';
import styled from "styled-components";
import {usePaymentManagement} from "./hooks/usePaymentManagement";
import {PaymentManagementProvider} from './provider/index';
import Header from "./component/header/index"
import {TableLayout} from "../../layouts/tableLayout";
import PaymentManagementFilterForm from "./component/filter/index";
import PaymentManagementTHead from "./component/table/_tableHeader";
import PaymentManagementTBody from "./component/table/_tableBody"
export const PaymentManagement = memo(()=>{
    const {fetch, provider, pagination} = usePaymentManagement()
    const {state, dispatch} = provider
    const {table} = state


    useEffect(() => {
        fetch.origin()
    }, [])
    return(
        <PaymentManagementProvider value={{ pageState : state, pageDispatch : dispatch}}>
            <StylePaymentManagement>
                <Header/>
                <TableLayout
                    header={
                        <>
                            <PaymentManagementFilterForm />
                        </>
                    }
                    table={{
                        tHead: <PaymentManagementTHead />,
                        tBody: <PaymentManagementTBody />,
                    }}
                    pagination={{
                        ...table.pagination,
                        onAmountChange: pagination.onAmountChange,
                        onPageChange: pagination.onPageChange,
                    }}
                />
            </StylePaymentManagement>
        </PaymentManagementProvider>

    )
})
const StylePaymentManagement = styled.div`
    
`