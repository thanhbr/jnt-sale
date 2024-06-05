import {sendRequestAuth} from 'api/api'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useReducer} from 'react'
import {useSearchParams} from 'react-router-dom'
import {
    InventoryReducer,
} from '../provider/_reducer'
import {InventoryState} from "../provider/_infiniteState";
import {InventoryAction} from "../provider/_action";

const useInventoryManagement = () => {
    const [searchParams] = useSearchParams()

    const [state, dispatch] = useReducer(InventoryReducer, InventoryState)
    const {filter, table} = state

    const filterQueries = {
        keyword: filter.search?.value || '',
        start_date: '',
        end_date: '',
        user_id: filter.employee.activeValue?.value?.value || '',
        warehouse_id: filter.warehouse.activeValue?.value || '',
        status: filter.shippingStatus.activeValue?.value || '',
        per_page:20,
        start:0,
    }
    const fetchRowDetail = async data => {
        if (!!!data?.id) {
            dispatch({
                type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })
            return
        }

        const response = await sendRequestAuth(
            'get',
            `${config.API}/order/detail/${data?.id}`,
        )

        if (!!response?.data?.success) {
            const newItem = response?.data?.data
            dispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: newItem, list: [newItem]},
            })
        }

        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }

    const handleOriginFetch = async () => {

        const querySearch = searchParams.get('search') || ''
        if (querySearch)
            dispatch({
                type: InventoryAction.FILTER_ACTIVE_DATE_TIME_UPDATE,
                payload: {
                    end:'',
                    start: '',
                    type: filter.dateTime.type,
                    value: '',
                },
            })

        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list?keyword=${querySearch}&start_date&end_date&warehouse_id&status&user_id&per_page=20&start=0`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            // set default value for input filter
            dispatch({
                type: InventoryAction.FILTER_SEARCH_UPDATE,
                payload: {value: querySearch},
            })
            // update display list
            dispatch({
                type: InventoryAction.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                    table: {
                        display: {
                            list: displayListData,
                        },
                    },
                },
            })
            //update paginate
            dispatch({type:InventoryAction.TABLE_PAGINATE_DATA, payload: {
                    pagination:{
                        totalItems:response?.data?.meta.total
                    }
                },})
            // fetch report list

            // auto fetch detail order id and open
            if (querySearch) {
                dispatch({
                    type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                    payload: {active: displayListData[0]},
                })
                fetchRowDetail({id: querySearch})
            }
        }
        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
        if (!querySearch) {
            dispatch({
                type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })
        }
    }
    const handlePaginationAmountChange = async n => {
        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: true}}},
        })

        const currentPage = table.pagination.active || 0
        const totalPages = Math.ceil(table.pagination.totalItems / n)
        const page =
            table.pagination.totalItems < currentPage * n
                ? totalPages - 1
                : currentPage

        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...filterQueries,
            per_page: n,
            start: page * n,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }

        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            dispatch({
                type: InventoryAction.TABLE_AMOUNT_UPDATE,
                payload: {
                    display: {
                        list: displayListData,
                    },
                    pagination: {active: page, amount: n, total: totalPages},
                },
            })
        }

        dispatch({
            type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
            payload: {active: null},
        })

        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }

    const handlePaginationPageChange = async page => {
        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: true}}},
        })

        const amount = table.pagination?.amount || 20

        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...filterQueries,
            per_page: amount,
            start: page * amount,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            dispatch({
                type: InventoryAction.TABLE_PAGINATION_UPDATE,
                payload: {
                    display: {
                        list: displayListData,
                    },
                    pagination: {active: page},
                },
            })
        }

        dispatch({
            type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
            payload: {active: null},
        })

        dispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }
    //import
    const handleCloseImportExcel = () => {
        dispatch({type: 'UPDATE_SHOW_EXPORT', payload: false})
    }
    const handleOpenImportExcel = () => {
        dispatch({type: 'UPDATE_SHOW_EXPORT', payload: true})
    }
    return {
        fetch: {
            origin: handleOriginFetch,
        },
        pagination: {
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange,
        },
        provider: {state, dispatch},
        methods: {
            onCloseImportModal: handleCloseImportExcel,
            onOpenImportModal: handleOpenImportExcel,
        },
    }
}

export default useInventoryManagement

