import React, {useContext} from 'react'
import {TableLayout} from "../../../../layouts/tableLayout";
import SupplierTableHeader from "./tableHeader/index";
import Skeleton from "../skeleton/index";
import Empty from "../empty/index"
import {SupplierManagement} from "../../provider/_context";
import SupplierTableBody from "./tableBody/index"
import {useTableSupplier} from "../../hook/useTableSupplier";
const Index = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const loading = pageState.loading
    const list = pageState.list
    const {handleTablePaginationAmountChange, handleTablePaginationPageChange} = useTableSupplier()
    const render_table=()=>{
        if(loading && list.length > 0){
            return (
                    <SupplierTableBody/>
            )
        }else if(!loading){
            return (
                <Skeleton numb={list ? list.length:20}/>
            )
        }else return <Empty/>
    }
    return(
        <TableLayout
            table={{
                tHead: <SupplierTableHeader />,
                tBody: render_table(),
            }}
            pagination={{
                ...pageState.pagination,
                onAmountChange: handleTablePaginationAmountChange,
                onPageChange: handleTablePaginationPageChange,
            }}
        />
    )
};

export default  Index;