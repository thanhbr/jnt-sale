import React, {useContext, useEffect} from "react";
import {GridLayout} from "../../../../layouts/gridLayout";
import {PageHeader} from "../../../../layouts/pageHeader";
import {usePaymentManagement} from "../../hooks/usePaymentManagement";
import {PaymentManagementProvider} from "../../provider";
import {PAYMENT_TYPE_CREATE_BREAD_CRUMB} from "../../interfaces/_const";
import {ActionFormBtnList} from "./actionFormBtnList";
import {GeneralInformation} from "./generalInfo";
import {useCreatePayment} from "./hooks/useCreatePayment";
import {PaymentMethodGroup} from "./paymentMethod";
import {useCreatePaymentMethod} from "./hooks/useCreatePaymentMethod";
import {PaymentManagementExtraInfo} from './extraInfo/index'
import ModalCreatePayment from "./modal/index"
import {PaymentManagementContext} from "../../provider/context";
import {sendRequestAuth} from "../../../../api/api";
import config from "../../../../config";
import {PaymentManagementActions} from "../../provider/action";
import ConfirmModalLeavePage from "../createPayment/modal/_confirmLeavePayment";
import ConfirmModalSameName from "../createPayment/modal/_confirmPaymentSameName";
const Index = _ =>{
    const {provider} = usePaymentManagement()
    const {state,dispatch} = provider
    return(
        <PaymentManagementProvider value={{ pageState : state, pageDispatch : dispatch}}>
            <PageContainer  />

        </PaymentManagementProvider>
    )
}

export default Index;
const PageContainer = ({...props}) => {
    const {pageState, pageDispatch} = useContext(PaymentManagementContext)
    const {methods} = useCreatePayment()
    const {functions} = useCreatePaymentMethod()
    const idEdit = location.pathname.split('/')[4] || ''
    const typeEdit = location.pathname.split('/')[3] || ''
    useEffect(  () => {
        methods?.paymentMethods?.fetchOrigin()
        functions?.fetchOrigin()
        const callApi = async ()=>{
            const response = await sendRequestAuth('get',`${config.API}/cashbook/payments/detail/${idEdit}`)
            if(response?.data?.success) {
                pageDispatch({type:PaymentManagementActions.GET_DETAIL_EDIT_PAYMENT,payload:response?.data?.data})
                methods.onRecipientGroupChange({
                    name:response?.data?.data?.object_type_name,
                    value:response?.data?.data?.object_type
                },response?.data?.data?.object_type_name)
            }
        }
        if(!!idEdit && typeEdit === 'edit') {
            callApi()
        }
    }, [idEdit])
    return (
        <>
        <GridLayout
            {...props}
            header={
                <PageHeader
                    breadcrumbLinks={PAYMENT_TYPE_CREATE_BREAD_CRUMB}
                    breadcrumbTitle="Tạo mới phiếu chi"
                />
            }
            grid={[
                {
                    width: 70,
                    sections: [
                        {
                            title: 'Thông tin chung',
                            props: {
                                style: {position: 'relative'},
                                children: <GeneralInformation />,
                            },
                        },
                        {
                            title: 'Thông tin thanh toán',
                            props: {
                                style: {position: 'relative'},
                                children: <PaymentMethodGroup />,
                            },
                        },
                        {
                            type: 'sticky-bottom-transparent',
                            props: {
                                style: {
                                    position: 'sticky',
                                    bottom: -44,
                                    zIndex: 10,
                                    marginBottom: 0,
                                    padding: '12px 24px',
                                    background: 'none'
                                },
                                children: <ActionFormBtnList />,
                            },
                        },
                    ],
                    props: {style: {position: 'relative'}},
                },
                {
                    width: 30,
                    sections: [
                        {
                            title: 'Thông tin bổ sung',
                            props: {
                                children: <PaymentManagementExtraInfo />,
                            },
                        },
                    ],
                },
            ]}
            data-model="container"
        />
    {pageState.formCreate?.contentModal?.open && <ModalCreatePayment/>}
    {pageState.formCreate?.contentModal?.confirm?.leavePage && <ConfirmModalLeavePage/>}
    {pageState.formCreate?.contentModal?.confirm?.sameName && <ConfirmModalSameName/>}
    </>
    )
}