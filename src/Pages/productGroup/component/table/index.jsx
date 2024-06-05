import { TableLayout } from "layouts/tableLayout";
import { StyledProductGroupTable } from "./_styled";
import ProductGroupHeader from "./tableHeader/index";
import ProductGroupBody from "./tableBody/index";
import { ProductGroup } from "Pages/productGroup/provider/_context";
import React, { useContext } from "react";
import { useReducer } from "react";
import { useProductInitialState, useProductReducer } from "Pages/productGroup/provider/_reducer";
import useProductGroup from "Pages/productGroup/hook/useProductGroup";
const Index = () => {
    const [state, dispatch] = useReducer(useProductReducer, useProductInitialState)
    return (
        <TableLayout
            table={{
                tHead: <ProductGroupHeader />,
                tBody: <ProductGroupBody />,
            }}
        />
    )
}
export default Index;