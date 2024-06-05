import React, {useContext} from "react";
import {PageHeader} from "../../../../layouts/pageHeader";
import {INVENTORY_BREADCRUMB, INVENTORY_PAGE_HEADER_ACTIONS} from "../../interfaces/_const";
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";
import {InventoryContext} from "../../provider/_context";
import {IMPORT} from "../../interfaces/_const"
import {InventoryAction} from "../../provider/_action";
import {ImportAddressSeparatorFileModal} from "../import";
const Index = () =>{
    const {functions} = useInventoryFilterForm()
    const {pageState,pageDispatch} = useContext(InventoryContext)
    const {import_file} = pageState
    const actions=[functions.refresh,()=>functions?.handleOpenImportExcel(),]
    return(
        <PageHeader
            actions={INVENTORY_PAGE_HEADER_ACTIONS.map((item, i) => ({
                ...item,
                onClick: actions[i],
            }))}
            breadcrumbLinks={INVENTORY_BREADCRUMB}
            breadcrumbTitle="Quản lý thông tin kiểm kho"
        />

    )
}

export default Index;
