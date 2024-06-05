import React ,{ memo } from "react";
import useProductGroup from "./hook/useProductGroup";
import { ProductGroupProvider } from "./provider";
import PageHeader from "./component/header/index";
import SearchProduct from "./component/search/index";
import TableProduct from "./component/table/index";
import { TableLayout } from "layouts/tableLayout";
import ProductGroupHeader from "./component/table/tableHeader/index";
import ProductGroupBody from "./component/table/tableBody/index";
import ModalDelete from "./component/delete/index"
import ModalCreate from "./component/modal/index"
const Index= memo(() =>{
    const {provider} = useProductGroup()
    const {state, dispatch} = provider
    return (
        <ProductGroupProvider  value={{ pageState: state, pageDispatch: dispatch }}>
            <PageHeader/>
            <SearchProduct/>
            <TableLayout
                table={{
                    tHead: <ProductGroupHeader />,
                    tBody: <ProductGroupBody />,
                }}
            />
            {state.check_confirm_delete && <ModalDelete/>}
            {state.open_modal && <ModalCreate/>}
        </ProductGroupProvider>

    )
})
export default Index