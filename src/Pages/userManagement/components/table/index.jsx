import React from "react";
import { StyledUserManagementTable } from "../~styled";
import { TableLayout } from "layouts/tableLayout";
import TableHeader from "./tableHeader/index"
import TableBody from "./tableBody/index"
const Index = () => {
    return(
        <StyledUserManagementTable>
            <div className={'user-managment-table'}>
                <TableLayout
                    table={{
                        tHead: <TableHeader/>,
                        tBody: <TableBody/>,
                    }}
                />
            </div>
        </StyledUserManagementTable>
    )
}
export default Index;