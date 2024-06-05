import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {InventoryContext} from '../provider/_context'
import {formatDateTimeDefaultValue} from '../provider/_reducer'
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import {InventoryAction} from "../provider/_action";
import {InventoryState} from "../provider/_infiniteState";
import {IMPORT, INVENTORY_FILTER_TAG_FIELDS} from "../interfaces/_const";
import {orderActions} from "../../refactorOrder/provider/_reducer";

const useInventoryFilterForm = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {pageState, pageDispatch} = useContext(InventoryContext)
    const {filter, table} = pageState

    // ===== ===== ===== ===== =====
    // SEARCH
    // ===== ===== ===== ===== =====
    const searchValue = filter.search.value

    const debounceOrderByFilter = useCallback(debounce((keyword) => {
        fetchOrderByFilter(
            {...queries, keyword: keyword.trim()},
            {forceLoading: true},
        )
    }, 500), [])

    const handleSearchChange = e => {
        if (e.target.value === ' ') e.target.value = ''
        const keyword = e.target.value.replace(/\s+/g, ',') || ''
        pageDispatch({
            type: InventoryAction.FILTER_SEARCH_UPDATE,
            payload: {value: keyword},
        })
        debounceOrderByFilter(keyword.trim().split(' ').join(','))
    }




    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // DATE TIME
    // ===== ===== ===== ===== =====
    const {afterToday} = DateRangePicker
    const dateTimeActiveValue = filter.dateTime.activeValue
    const dateTimeDefaultValue = [
        searchParams ? '' : getDateFromNow(-7, {type: 'start'}),
        searchParams ? '' : getDateFromNow(0, {type: 'end'}),
    ]
    const dateTimeEnd = filter.dateTime.end
    const dateTimeStart = filter.dateTime.start
    const dateTimeType = filter.dateTime.type
    const dateTimeValue = filter.dateTime.value
    const dateTimeTrigger = filter.dateTime.trigger

    const handleDateTimeChange = data =>
        pageDispatch({
            type: InventoryAction.FILTER_DATE_TIME_UPDATE,
            payload: {
                end: data.value[1],
                start: data.value[0],
                type: data.category,
                value: data.formatValue,
            },
        })

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // EMPLOYEE
    // ===== ===== ===== ===== =====
    const employeeActiveValue = filter.employee.activeValue
    const employeeCategoryList = filter.employee.type.list
    const employeeCategoryValue = filter.employee.type.value
    const employeeKeyword = filter.employee.keyword
    const employeeList = filter.employee.list
    const employeeListOrigin = filter.employee.listOrigin
    const employeeTab = filter.employee.tab
    const employeeValue = filter.employee.value

    const handleEmployeeChange = data => {
        const find = employeeValue.find(item => item.value === data.id)
        const employeeListData =
            employeeTab === 'checked'
                ? employeeValue.filter(item => item.value !== data.id)
                : employeeList
        const employeeValueData = find
            ? employeeValue.filter(item => item.value !== data.id)
            : [...employeeValue, {name: data.value, value: data.id}]

        pageDispatch({
            type: InventoryAction.FILTER_EMPLOYEE_UPDATE,
            payload: {
                list: employeeListData,
                value: employeeValueData,
            },
        })
    }

    const handleEmployeeKeywordChange = data => {
        let foundEmployeeId = data?.id
        if (!foundEmployeeId) {
            const foundEmployee = employeeListOrigin.find(
                item => item.name === data?.value.trim(),
            )
            foundEmployeeId = foundEmployee?.value || ''
        }

        const formatDataValue = data?.value
            ? removeAcent(data?.value?.trim()?.toLowerCase())
            : ''
        const employeeListData = employeeListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (
                formatNameItem.includes(formatDataValue) &&
                (data.category.value !== ''
                    ? item.groups.includes(data.category.value)
                    : true)
            )
                return true
            return false
        })

        if (data?.category?.value !== employeeCategoryValue?.value) {
            pageDispatch({
                type: InventoryAction.FILTER_EMPLOYEE_CATEGORY_UPDATE,
                payload: {
                    list: employeeListData,
                    type: {value: data?.category},
                },
            })
            return
        }

        pageDispatch({
            type: InventoryAction.FILTER_EMPLOYEE_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value,
                list: employeeListData,
                type: {
                    value: data?.category || filter.employee.type.value,
                },
            },
        })
    }

    const handleEmployeeResetInput = () => {
        pageDispatch({
            type: InventoryAction.FILTER_EMPLOYEE_UPDATE,
            payload: {
                list: employeeListOrigin,
                value: [],
            },
        })
    }

    const handleEmployeeTabChange = tab => {
        const formatDataValue = employeeKeyword
            ? removeAcent(employeeKeyword?.toLowerCase())
            : ''

        const employeeListData = employeeListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: InventoryAction.FILTER_EMPLOYEE_TAB_UPDATE,
            payload: {
                list: tab === 'checked' ? employeeValue : employeeListData,
                tab,
            },
        })
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // SHIPPING STATUS
    // ===== ===== ===== ===== =====
    const shippingStatusActiveValue = filter.shippingStatus.activeValue
    const shippingStatusKeyword = filter.shippingStatus.keyword
    const shippingStatusList = filter.shippingStatus.list
    const shippingStatusListOrigin = filter.shippingStatus.listOrigin
    const shippingStatusTab = filter.shippingStatus.tab
    const shippingStatusValue = filter.shippingStatus.value
    const handleShippingStatusChange = data => {
        pageDispatch({
            type: InventoryAction.FILTER_SHIPPING_STATUS_UPDATE,
            payload: {value: data},
        })
    }

    const handleShippingStatusKeywordChange = data => {
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''

        const findList =
            shippingStatusTab === 'checked'
                ? shippingStatusValue
                : shippingStatusListOrigin

        const shippingStatusListData = findList.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: InventoryAction.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value || '',
                list: shippingStatusListData,
            },
        })
    }

    const handleShippingStatusResetInput = () => {
        pageDispatch({
            type: InventoryAction.FILTER_SHIPPING_STATUS_UPDATE,
            payload: {
                list: shippingStatusListOrigin,
                value: [],
            },
        })
    }

    const handleShippingStatusTabChange = tab => {
        const formatDataValue = shippingStatusKeyword
            ? removeAcent(shippingStatusKeyword?.toLowerCase())
            : ''

        const shippingStatusListData = shippingStatusListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: InventoryAction.FILTER_SHIPPING_STATUS_TAB_UPDATE,
            payload: {
                list: tab === 'checked' ? shippingStatusValue : shippingStatusListData,
                tab,
            },
        })
    }

    // ===== ===== ===== ===== =====
    // WAREHOUSE
    // ===== ===== ===== ===== =====
    const warehouseActiveValue = filter.warehouse.activeValue
    const warehouseKeyword = filter.warehouse.keyword
    const warehouseList = filter.warehouse.list
    const warehouseListOrigin = filter.warehouse.listOrigin
    const warehouseValue = filter.warehouse.value

    const handleWarehouseChange = data =>{
        pageDispatch({
            type: InventoryAction.FILTER_WAREHOUSE_UPDATE,
            payload: {value: data},
        })
    }



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
            type: InventoryAction.FILTER_WAREHOUSE_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value || '',
                list: warehouseListData,
            },
        })
    }


    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    const canSubmitOtherFilter = [
        dateTimeActiveValue.value !== dateTimeValue ||
        JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
        JSON.stringify(employeeActiveValue.value) !==
        JSON.stringify(employeeValue) ||
        JSON.stringify(employeeActiveValue.type) !==
        JSON.stringify(employeeCategoryValue),
        JSON.stringify(shippingStatusActiveValue) !==
        JSON.stringify(shippingStatusValue),
        JSON.stringify(warehouseActiveValue) !== JSON.stringify(warehouseValue),
    ].includes(true)

    const otherFilterBadge = [
        !!dateTimeActiveValue?.value,
        Array.isArray(employeeActiveValue?.value) &&
        employeeActiveValue?.value.length > 0,
        !!shippingStatusActiveValue?.value,
        !!warehouseActiveValue?.value,
    ].filter(item => item === true).length

    const queries = {
        keyword: searchValue.trim() || '',
        start_date:
            dateTimeActiveValue?.start && dateTimeActiveValue.value
                ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[0])
                : '',
        end_date:
            dateTimeActiveValue?.end && dateTimeActiveValue.value
                ? convertDateTimeToApiFormat(dateTimeActiveValue.value.split(' - ')[1])
                : '',
        user_id: Array.isArray(employeeActiveValue?.value)
            ? employeeActiveValue.value.map(item => item?.value).join(',')
            : '',
        warehouse_id: warehouseActiveValue?.value || '',
        status: Array.isArray(shippingStatusActiveValue)
            ? shippingStatusActiveValue.map(item => item?.value).join(',')
            : '',
        per_page: table.pagination.amount,
        start: 0,
    }

    const applyOrderOtherFilter = async () => {
        const collection = {
            ...queries,
            start_date:
                dateTimeStart && dateTimeValue
                    ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
                    : '',
            end_date:
                dateTimeEnd && dateTimeValue
                    ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
                    : '',
            user_id: Array.isArray(employeeValue)
                ? employeeValue.map(item => item?.value).join(',')
                : '',
            warehouse_id: warehouseValue?.value || '',
            status: shippingStatusValue?.value  ||'',
        }
        fetchOrderByFilter(collection, {forceLoading: true})
    }

    const fetchOrderByFilter = async (qs, opt) => {
        setSearchParams('')
        if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: true}}},
            })

        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }

        const response = await Promise.all([
            sendRequestAuth('get', `${config.API}/warehouse/inventory/list${queryString}`),
        ])

        if (response[0]?.status === 200 ) {
            pageDispatch({
                type: InventoryAction.OTHER_FILTER_APPLY,
                payload: {
                    display: {
                        list: Array.isArray(response[0]?.data?.data)
                            ? response[0].data.data
                            : [],
                    },
                    pagination: {
                        active: opt?.activePage || 0,
                        amount: table.pagination.amount,
                        total: response[0]?.data?.meta?.total
                            ? Math.ceil(
                                response[0].data.meta?.total / table.pagination.amount,
                            )
                            : 0,
                        totalItems: response[0]?.data?.meta?.total || 0,
                    },
                },
            })
        }

        if (!!!opt?.notClearDetail)
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: null},
            })

        if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })

        pageDispatch({
            type: InventoryAction.TABLE_DISPLAY_DETAIL_ID_UPDATE,
            payload: {id: null},
        })
    }

    const filterTagDelete = t => {
        pageDispatch({
            type: InventoryAction.TAG_FILTER_DELETE,
            payload: {type: t, isSingle: true},
        })

        let tmpCollection = {}
        switch (t) {
            case 'dateTime.current':
                tmpCollection = {
                    ...tmpCollection,
                    date_type: '',
                    start_date: '',
                    end_date: '',
                }
                break

            case INVENTORY_FILTER_TAG_FIELDS[0]:
                tmpCollection = {
                    ...tmpCollection,
                }
                break

            case INVENTORY_FILTER_TAG_FIELDS[1]:
                tmpCollection = {...tmpCollection, user_id: ''}
                break

            case INVENTORY_FILTER_TAG_FIELDS[2]:
                tmpCollection = {...tmpCollection, shippingStatus: ''}
                break

            case INVENTORY_FILTER_TAG_FIELDS[3]:
                tmpCollection = {...tmpCollection, warehouse_id: ''}
                break

            default:
                break
        }

        const collection = {...queries, ...tmpCollection}

        fetchOrderByFilter(collection, {forceLoading: true})
    }

    const filterTagDeleteAll = isSoft => {
        INVENTORY_FILTER_TAG_FIELDS.forEach(item =>
            pageDispatch({
                type: InventoryAction.TAG_FILTER_DELETE,
                payload: {type: item},
            }),
        )

        pageDispatch({
            type: InventoryAction.FILTER_DATE_TIME_TRIGGER_UPDATE,
            payload: {
                trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
            },
        })

        if (isSoft) return
        const collection = {
            ...queries,
            start_date: '',
            end_date:'',
            user_id: '',
            status: '',
            warehouse_id: '',
            per_page:20,
            start:0
        }

        fetchOrderByFilter(collection, {forceLoading: true})
    }

    //import
    const handleOpenImportExcel = () => {
        pageDispatch({type: 'UPDATE_SHOW_EXPORT', payload: true})
    }
    return {
        badge: {
            others: otherFilterBadge,
        },
        dateTime: {
            activeValue: dateTimeActiveValue,
            defaultValue: dateTimeDefaultValue,
            disabledDate: afterToday(),
            triggerDefault: dateTimeTrigger,
            value: dateTimeValue,
            onChange: handleDateTimeChange,
        },
        employee: {
            activeValue: employeeActiveValue,
            categoryList: employeeCategoryList,
            categoryValue: employeeCategoryValue,
            keyword: employeeKeyword,
            list: employeeList,
            tab: employeeTab,
            value: employeeValue,
            onChange: handleEmployeeChange,
            onInputReset: handleEmployeeResetInput,
            onKeywordChange: handleEmployeeKeywordChange,
            onTabChange: handleEmployeeTabChange,
        },
        search: {
            value: searchValue,
            onChange: handleSearchChange,
        },
        shippingStatus: {
            activeValue: shippingStatusActiveValue,
            keyword: shippingStatusKeyword,
            list: shippingStatusList,
            tab: shippingStatusTab,
            value: shippingStatusValue,
            onChange: handleShippingStatusChange,
            onInputReset: handleShippingStatusResetInput,
            onKeywordChange: handleShippingStatusKeywordChange,
            onTabChange: handleShippingStatusTabChange,
        },

        warehouse: {
            activeValue: warehouseActiveValue,
            keyword: warehouseKeyword,
            list: warehouseList,
            value: warehouseValue,
            onChange: handleWarehouseChange,
            onKeywordChange: handleWarehouseKeywordChange,
        },
        canSubmitOtherFilter,
        queries,
        functions: {
            hasFilter: () => [
                JSON.stringify(dateTimeActiveValue) !==
                JSON.stringify(InventoryState.filter.dateTime.activeValue),
                Array.isArray(employeeActiveValue?.value) &&
                employeeActiveValue.value.length > 0 &&
                !!employeeActiveValue?.type?.name,
                !!warehouseActiveValue,
                !!shippingStatusActiveValue
            ].includes(true),
            applyOrderOtherFilter,
            refresh: () =>
                fetchOrderByFilter(
                    {
                        ...queries,
                        start: table.pagination.active * table.pagination.amount,
                    },
                    {activePage: table.pagination.active, forceLoading: true},
                ),
            fetchOrderWithCurrentFilter: () =>
                fetchOrderByFilter(
                    {
                        ...queries,
                        start: table.pagination.active * table.pagination.amount,
                    },
                    {activePage: table.pagination.active},
                ),
            fetchUpdateData: () =>
                fetchOrderByFilter(
                    {
                        ...queries,
                        start: table.pagination.active * table.pagination.amount,
                    },
                    {activePage: table.pagination.active, notClearDetail: true},
                ),
            filterTagDelete,
            filterTagDeleteAll,
            handleOpenImportExcel,
        },
    }
}

export default useInventoryFilterForm
