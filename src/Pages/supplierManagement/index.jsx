import React from 'react';
import {SupplierManagementProvider} from "./provider"
import {useSupplierManagement} from "./hook/useSupplierManagement";
import PageSupplier from "./component/header/index";
import Search from "./component/search/index";
import TableSupplier from "./component/table/index";
import ModalSupplier from "./component/modal/index"
import ConfirmDelete from "./component/deleteCancelStatus/_deleteConfirm"
import ConfirmDeActive from "./component/deleteCancelStatus/_deactivation"
const Index = ()=>{
    const {provider} = useSupplierManagement()
    const {state, dispatch} = provider

    return(
        <SupplierManagementProvider  value={{ pageState: state, pageDispatch: dispatch }}>
            <PageSupplier/>
            <Search/>
            <TableSupplier/>
            {state.open_modal && <ModalSupplier/>}
            <ConfirmDelete/>
            <ConfirmDeActive/>
        </SupplierManagementProvider>

    )
}

export default Index;