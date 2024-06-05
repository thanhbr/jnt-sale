import React, {useContext, useEffect} from "react";
import {useCapitalAdjustment} from "../../hooks/useCapitalAdjustment";
import {CapitalAdjustmentProvider} from "../../provider";
import {GridLayout} from "../../../../layouts/gridLayout";
import {PageHeader} from "../../../../layouts/pageHeader";
import {HEADER_CREATE_CAPITAL_ADJUSTMENT, HEADER_CREATE_CAPITAL_ADJUSTMENT_EDIT} from "../../interfaces/_const";
import CapitalProductInfo from "./productInfo/index"
import {useCreateCapitalAdjustment} from "../../hooks/useCreateCapitalAdjustment";
import {ActionFormBtnList} from "./actionFormBtnList"
import {CapitalAdjustmentExtraInfo} from "./extraInfo"
import {CapitalAdjustmentContext} from "../../provider/context";
import ConfirmCapitalAdjustment from "./modal/_confirmCapitalAdjustment";
const Index = ({props})=>{
    const {provider} = useCapitalAdjustment()
    const {state,dispatch} = provider

    return(
        <CapitalAdjustmentProvider value={{ pageState : state, pageDispatch : dispatch}}>
           <PageCreateCapital/>
        </CapitalAdjustmentProvider>
    )
}
export default Index;
const PageCreateCapital = ({props})=>{
    const {methods} = useCreateCapitalAdjustment()
    const {pageState} = useContext(CapitalAdjustmentContext)
    const idEdit = location.pathname.split('/')[4] || ''
    const queries = {
        keyword:'',
        category_id:'',
        product_id_details:'',
        status:'',
        warehouse_id:'',
        is_inventory:'',
        per_page:20,
        start:0,
    }
    useEffect(()=>{
        methods.fetchOrigin(queries)
        if(idEdit !== ''){
            methods.fetchDetail(idEdit)
        }
    },[idEdit])
    return(
        <>
            <GridLayout
                {...props}
                header={
                    <PageHeader
                        breadcrumbLinks={+idEdit?HEADER_CREATE_CAPITAL_ADJUSTMENT_EDIT  : HEADER_CREATE_CAPITAL_ADJUSTMENT}
                        breadcrumbTitle={+idEdit? "Chỉnh sửa phiếu điều chỉnh giá vốn" : "Tạo mới phiếu điều chỉnh giá vốn"}
                    />
                }
                grid={[
                    {
                        width: 70,
                        sections: [
                            {
                                title: 'Thông tin sản phẩm',
                                props: {
                                    style: {position: 'relative'},
                                    children: <CapitalProductInfo />,
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
                                    children: <CapitalAdjustmentExtraInfo />,
                                },
                            },
                        ],
                    },
                ]}
                data-model="container"
            />
            {pageState?.formCreate?.modal?.confirmCapital && <ConfirmCapitalAdjustment/>}
        </>

    )
}