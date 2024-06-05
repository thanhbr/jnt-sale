import { PageHeader } from "layouts/pageHeader";
import { PRODUCT_BREADCUM, PRODUCT_BUTTON_ACTION } from "Pages/productGroup/interface";
import { ProductGroup } from "Pages/productGroup/provider/_context";
import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {ProductGroupExport} from "../exportExcel";

const Index = () => {
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const { PRODUCT_ACTION_BUTTON ,exportModalData, exportLink, exportUrl} = PRODUCT_BUTTON_ACTION(pageState, pageDispatch)
    const data = pageState.listCategory

    return (
        <StyledProductGroupHeader>
            <div className={"product-group-header"} >
                <PageHeader
                    actions={PRODUCT_ACTION_BUTTON}
                    breadcrumbLinks={PRODUCT_BREADCUM}
                    breadcrumbTitle="Quản lý nhóm sản phẩm"
                />
            </div>
            <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>
            {!!exportModalData && <ProductGroupExport data={exportModalData} title={'nhóm sản phẩm'} api={'/product/category/export-xlsx'}/>}
        </StyledProductGroupHeader>
    )
}
export default Index;
const StyledProductGroupHeader = styled.div`
    .product-group-header{

    }
`