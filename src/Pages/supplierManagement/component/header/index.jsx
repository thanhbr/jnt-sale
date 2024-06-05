import React from "react";
import {PageHeader} from "../../../../layouts/pageHeader";
import {SUPPLIER_BUTTON_ACTION, SUPPLIER_HEADER} from "../../interfaces/_const";
import {useModal} from "../../hook/useModal";

 const Index = ()=>{
     const {function_supplier} = useModal()
     const action = [function_supplier.refesh, function_supplier.open_modal]
    return(
        <PageHeader
            actions={SUPPLIER_BUTTON_ACTION.map((item,i)=> ({
                ...item,onClick: action[i]
            }))}
            breadcrumbLinks={SUPPLIER_HEADER}
            breadcrumbTitle="Quản lý nhà cung cấp"
        />
    )
}
export default Index