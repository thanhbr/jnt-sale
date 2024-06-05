import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {InventoryContext} from '../provider/_context'
import {debounce} from '@mui/material'
import ArrayUtils from "../utils/array";
import {transformPaymentMethodData, transformQueryObjToString, transformWarehouseData} from "../utils/transform";
import {InventoryAction} from "../provider/_action";

const useInventoryImport = () => {
    const {pageState, pageDispatch} = useContext(InventoryContext)
    const {generalInfo} = pageState.purchase

    const warehouseQueries = {
        keyword: '',
        status: 1,
        is_purchase: '',
        per_page: 50000,
        start: 0,
    }

    // ======================================================================================================
    // WAREHOUSE
    // ======================================================================================================
    const [isWarehouseLoading, setIsWarehouseLoading] = useState(false)

    const handleFetchWarehouse = async (k = '', opt = {}) => {
        if (isWarehouseLoading) return

        const page = opt?.page || 0

        if (page === 0) setIsWarehouseLoading(true)

        const q = transformQueryObjToString({
            ...warehouseQueries,
            keyword: k.trim(),
            start: page * 10,
        })

        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/warehouses${q}`,
        )

        if (!!response?.data?.success) {
            const methodListData = ArrayUtils.getQualifiedArray(
                response?.data?.data,
            ).map(transformWarehouseData)
            pageDispatch({
                type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
                payload: {
                    list:
                        page === 0
                            ? methodListData
                            : [...generalInfo.warehouse.list, ...methodListData],
                    page,
                    total: response?.data?.meta?.total || 0,
                },
            })
        }

        if (page === 0) setIsWarehouseLoading(false)

        return response
    }

    const handleWarehouseChange = data => {
        pageDispatch({
            type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
            payload: {value: data},
        })
        pageDispatch({
            type: 'FORM_GENERAL_INFO_VALIDATE',
            payload: {warehouse: ''}
        })
    }

    const debounceWarehouseKeywordChange = useCallback(
        debounce(data => {
            handleFetchWarehouse(data?.value)
        }, 500),
        [],
    )
    const handleWarehouseKeywordChange = data => {
        pageDispatch({
            type: 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE',
            payload: {keyword: data?.value || ''},
        })
        debounceWarehouseKeywordChange(data)
    }

    const handleWarehouseLoadMore = () => {
        const currentTotal = generalInfo.warehouse.list.length
        const total = generalInfo.warehouse.total

        if (currentTotal >= total) return null

        const response = handleFetchWarehouse(generalInfo.warehouse.keyword, {
            page: generalInfo.warehouse.page + 1,
        })

        return response
    }
    const handleUpdateValidate = _ => {
        pageDispatch({
            type: 'FORM_GENERAL_INFO_VALIDATE',
            payload: { warehouse: !generalInfo.warehouse.value ? 'Kho nhập hàng không được để trống' : '' }
        })
    }
    const handleUpdateNotification = (noti) => {
        pageDispatch({
            type: InventoryAction.NOTIFICATIONS_LIST_UPDATE,
            payload: {
                notifications: {
                    list: noti?.errors?.details,
                    total:noti?.meta?.total,
                },
            },
        })
    }
    return {
        data: generalInfo,
        methods: {
            //warehouse
            onFetchWarehouse: handleFetchWarehouse,
            onWarehouseChange: handleWarehouseChange,
            onWarehouseKeywordChange: handleWarehouseKeywordChange,
            onWarehouseLoadMore: handleWarehouseLoadMore,
            onUpdateValidate: handleUpdateValidate,
            onUpdateNotification: handleUpdateNotification,
        },
    }
}

export default useInventoryImport
