import React from "react";
import {TableLayout} from "../../../../../layouts/tableLayout";
import TableDeliveryHeader from "./tableHeader"
import TableDeliveryBody from "./tableBody";
const Index = () =>{
    return(
        <TableLayout
            table={{
                tHead: <TableDeliveryHeader/>,
                tBody: <TableDeliveryBody/>,
            }}
        />
    )
}
export default Index;