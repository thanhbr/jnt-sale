import React, {useEffect} from "react";
import {GridLayout} from "../../../../layouts/gridLayout";
import {PageHeader} from "../../../../layouts/pageHeader";
import {ReceiptManagementProvider} from "../../provider";
import {RECEIPT_TYPE_CREATE_BREAD_CRUMB} from "../../interfaces/contant";
import {ActionFormBtnList} from "./actionFormBtnList";
import ReceiptGeneralCreate from "./general";
import ReceiptPaymentCreate from "./payment";
import ReceiptAdditionalCreate from "./additional";
import useCreateReceipt from "../../hooks/useCreateReceipt";
import CreateTypeReceipt from "../modal/createTypeReceipt";
import {CreatePaymentMethod} from "../modal/createPaymentMethod";

const ReceiptCreate = _ =>{
    const {provider, fetch} = useCreateReceipt()
    const {state,dispatch} = provider

    useEffect(() => {
      fetch.origin()
    }, [])

    return(
      <ReceiptManagementProvider value={{ pageState : state, pageDispatch : dispatch}}>
        <PageContainer  />
        <CreateTypeReceipt />
        <CreatePaymentMethod />
      </ReceiptManagementProvider>
    )
}

export default ReceiptCreate

const PageContainer = ({...props}) => {
    return (
        <>
        <GridLayout
            {...props}
            header={
              <PageHeader
                breadcrumbLinks={RECEIPT_TYPE_CREATE_BREAD_CRUMB}
                breadcrumbTitle="Tạo mới phiếu thu"
              />
            }
            grid={[
                {
                    width: 70,
                    sections: [
                        {
                            title: 'Thông tin chung',
                            props: {
                                style: {position: 'relative', padding: 24},
                                children: <ReceiptGeneralCreate /> ,
                            },
                        },
                        {
                            title: 'Thông tin thanh toán',
                            props: {
                                style: {position: 'relative', padding: 24},
                                children: <ReceiptPaymentCreate />,
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
                              style: {position: 'relative', padding: 24},
                              children: <ReceiptAdditionalCreate />,
                            },
                        },
                    ],
                },
            ]}
            data-model="container"
        />
    </>
    )
}