import {orderActions} from "../../refactorOrder/provider/_reducer";
import {removeAcent} from "../../../common/fieldText/_functions";
import {useContext} from "react";
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";

export const useWareHouse = ()=>{
    const {pageState,pageDispatch} = useContext(ProductContext)
    const {filter} = pageState
    const warehouseActiveValue = filter.warehouse.activeValue
    const warehouseKeyword = filter.warehouse.keyword
    const warehouseList = filter.warehouse.list
    const warehouseListOrigin = filter.warehouse.listOrigin
    const warehouseValue = filter.warehouse.value


    const handleWarehouseChange = data =>
        pageDispatch({
            type: productActions.FILTER_WAREHOUSE_UPDATE,
            payload: {value: data},
        })

    const handleWarehouseKeywordChange = data => {
        const formatDataValue = data?.value
            ? removeAcent(data?.value?.toLowerCase())
            : ''

        const warehouseListData = warehouseListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: productActions.FILTER_WAREHOUSE_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value || '',
                list: warehouseListData,
            },
        })
    }
    return{
        warehouse: {
            activeValue: warehouseActiveValue,
            keyword: warehouseKeyword,
            list: warehouseList,
            value: warehouseValue,
            onChange: handleWarehouseChange,
            onKeywordChange: handleWarehouseKeywordChange,
        },
    }

}