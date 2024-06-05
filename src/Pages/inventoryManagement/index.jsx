import React, {useEffect} from 'react';
import useInventoryManagement from "./hook/useInventoryManagement";
import {InventoryProvider} from "./provider/index"
import PageHeader from './component/header'
import {TableLayout} from "../../layouts/tableLayout";
import {InventoryFilterForm} from './component/filter'
import {OrderNotifications} from "./component/notification";
import {OrderTHead} from "./component/table/_orderTHead";
import {OrderTBody} from "./component/table/_orderTBody";
import ConfirmBalance from "./component/modal/_confirmBalance";
import ConfirmCancel from "./component/modal/_confirmCancel";
import {InventoryCreateImportFileModal} from "./component/import";
import {sendRequestAuth} from "../../api/api";
import config from "../../config";
import ArrayUtils from "./utils/array";
import {transformWarehouseData} from "./utils/transform";
import ConfirmImport from "./component/modal/_confirmImport";
const Index = ()=>{
    const {fetch, pagination, provider, methods} = useInventoryManagement()

    const {state, dispatch} = provider
    const {table,modal} = state
    const collectOriginData = data => {
        if(data.data.success){
            const warehouseListData = ArrayUtils.getQualifiedArray(
                data?.data?.data,
            ).map(transformWarehouseData)
            dispatch({
                type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
                payload: {
                    list: warehouseListData || [],
                    page: 1,
                    total: data?.data?.meta?.total || 0,
                    value: warehouseListData.find(item => item?.data?.is_main == 1)
                },
            })
        }

    }
    useEffect(() => {
        fetch.origin()
        const fetchData = async () => {
            const response = await  sendRequestAuth(
                'get',
                `${config.API}/warehouse/warehouses?status=1&per_page=5000&start=0`,
            );
            collectOriginData(response)
        }

        fetchData()
    }, [])
    return(
        <InventoryProvider value={{pageState: state, pageDispatch: dispatch}}>
            <PageHeader/>
            <OrderNotifications />
            {table?.properties?.canShowExport  && <InventoryCreateImportFileModal  onClose={methods.onCloseImportModal} />}
            <TableLayout
                header={
                    <>
                        <InventoryFilterForm/>
                    </>
                }
                table={{
                    tHead: <OrderTHead />,
                    tBody: <OrderTBody />,
                }}
                pagination={{
                    ...table.pagination,
                    onAmountChange: pagination.onAmountChange,
                    onPageChange: pagination.onPageChange,
                }}
            />
            {modal?.balance?.show && <ConfirmBalance/>}
            {modal?.cancel?.show && <ConfirmCancel/>}
            {modal?.import_excel?.show && <ConfirmImport/>}
        </InventoryProvider>
    )
}

export default  Index;