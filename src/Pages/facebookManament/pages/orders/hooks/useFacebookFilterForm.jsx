import {sendRequestAuth} from 'api/api'
import {removeAcent} from 'common/fieldText/_functions'
import {convertDateTimeToApiFormat} from 'common/form/datePicker/_functions'
import config from 'config'
import {useCallback, useContext} from 'react'
import {DateRangePicker} from 'rsuite'
import {
    ORDER_FILTER_FACE_BOOK,
    ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST,
} from '../interface/_const';
import {FacebookOrdersContext} from '../provider/_context'
import {formatDateTimeDefaultValue, facebookOrdersInitialState} from '../provider/_initstate'
import {facebookConversationActions} from "../provider/_actions"
import {getDateFromNow} from '../utils/date'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const useFacebookFilterForm = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
    const {filter, table} = pageState
    const {page} = pageState
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
        const keyword = e.target.value.replace(/\s+/g, '') || ''
        pageDispatch({
            type: facebookConversationActions.FILTER_SEARCH_UPDATE,
            payload: {value: keyword},
        })
        // if(keyword.trim().length > 0) debounceOrderByFilter(keyword.trim().split(' ').join(','))
        debounceOrderByFilter(keyword)
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // ADVANCED SEARCH
    // ===== ===== ===== ===== =====
    const advancedSearchCustomer = filter.advancedSearch.customer
    const advancedSearchLiveVideoId = filter.advancedSearch.liveVideoId

    const advanedSearchBadge =
        !!advancedSearchCustomer.keyword || !!advancedSearchLiveVideoId


    const handleAdvancedSearchChange = (val, id) => {
        pageDispatch({
            type: facebookConversationActions.FILTER_ADVANCED_SEARCH_UPDATE,
            payload: {
                customer: {keyword: val, value: val ? null : ''},
                liveVideoId: id,
            },
        })

        // if val exist -> search cumstomer id then fetch order
        // if (val.trim()) fetchCustomer(val.trim(), id)
        // else fecth order with empty value
        // else
        fetchOrderByFilter(
            {
                ...queries,
                keyword_customer: val.trim(),
                customer_id: '',
                livestream_id: id || '',
            },
            {forceLoading: true},
        )
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ===== ===== ===== ===== =====
    // DATE TIME
    // ===== ===== ===== ===== =====
    const {afterToday} = DateRangePicker
    const dateTimeActiveValue = filter.dateTime.activeValue
    const dateTimeDefaultValue = [
         getDateFromNow(-7, {type: 'start'}),
         getDateFromNow(0, {type: 'end'}),
    ]
    const dateTimeEnd = filter.dateTime.end
    const dateTimeStart = filter.dateTime.start
    const dateTimeType = filter.dateTime.type
    const dateTimeValue = filter.dateTime.value
    const dateTimeTrigger = filter.dateTime.trigger

    const handleDateTimeChange = data =>
        pageDispatch({
            type: facebookConversationActions.FILTER_DATE_TIME_UPDATE,
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
            type: facebookConversationActions.FILTER_EMPLOYEE_UPDATE,
            payload: {
                list: employeeListData,
                value: employeeValueData,
            },
        })
        pageDispatch({type:'SET_GROUP_USER',payload:data?.category?.value})
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
                type: facebookConversationActions.FILTER_EMPLOYEE_CATEGORY_UPDATE,
                payload: {
                    list: employeeListData,
                    type: {value: data?.category},
                },
            })
            return
        }

        pageDispatch({
            type: facebookConversationActions.FILTER_EMPLOYEE_KEYWORD_UPDATE,
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
            type: facebookConversationActions.FILTER_EMPLOYEE_UPDATE,
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
            type: facebookConversationActions.FILTER_EMPLOYEE_TAB_UPDATE,
            payload: {
                list: tab === 'checked' ? employeeValue : employeeListData,
                tab,
            },
        })
    }


    // ===== ===== ===== ===== =====
    // PAYMENT
    // ===== ===== ===== ===== =====
    const paymentValue = filter.payment.value

    const handlePaymentChange = data => {
        const paymentValueData = Array.isArray(data) ? data : []

        pageDispatch({
            type: facebookConversationActions.FILTER_PAYMENT_UPDATE,
            payload: {payment: {value: paymentValueData}},
        })
        fetchOrderByFilter({
            ...queries,
            payment:
                paymentValueData.length < ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST.length
                    ? paymentValueData.join(',')
                    : '',
        })
    }
    // ===== ===== ===== ===== ===== ===== ===== post ===== ===== ===== ===== ===== ===== =====
    const postActiveValue = filter.conversation.post.activeValue
    const postValue = filter.conversation.post.value
    // ===== ===== ===== ===== ===== ===== ===== page ===== ===== ===== ===== ===== ===== =====
    const pageActiveValue = filter.pageSelected.activeValue;
    const pageValue = filter.pageSelected.value;

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    //status order
    //======shipping status
    const orderStatusActiveValue = filter.orderStatus.activeValue
    const orderStatusKeyword = filter.orderStatus.keyword
    const orderStatusList = filter.orderStatus.list
    const orderStatusListOrigin = filter.orderStatus.listOrigin
    const orderStatusTab = filter.orderStatus.tab
    const orderStatusValue = filter.orderStatus.value
    const handleOrderStatusChange = data => {
        const find = orderStatusValue.find(item => item.value === data.value)
        const orderStatusListData =
            orderStatusTab === 'checked'
                ? orderStatusValue.filter(item => item.value !== data.value)
                : orderStatusList
        const orderStatusValueData = find
            ? orderStatusValue.filter(item => item.value !== data.value)
            : [...orderStatusValue, data]

        pageDispatch({
            type: facebookConversationActions.FILTER_SHIPPING_STATUS_UPDATE,
            payload: {
                list: orderStatusListData,
                value: orderStatusValueData,
            },
        })
    }

    const handleOrderStatusKeywordChange = data => {
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''

        const findList =
            orderStatusTab === 'checked'
                ? orderStatusValue
                : orderStatusListOrigin

        const orderStatusListData = findList.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: facebookConversationActions.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value || '',
                list: orderStatusListData,
            },
        })
    }

    const handleOrderStatusResetInput = () => {
        pageDispatch({
            type: facebookConversationActions.FILTER_SHIPPING_STATUS_UPDATE,
            payload: {
                list: orderStatusListOrigin,
                value: [],
            },
        })
    }

    const handleOrderStatusTabChange = tab => {
        const formatDataValue = orderStatusKeyword
            ? removeAcent(orderStatusKeyword?.toLowerCase())
            : ''

        const orderStatusListData = orderStatusListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: facebookConversationActions.FILTER_SHIPPING_STATUS_TAB_UPDATE,
            payload: {
                list: tab === 'checked' ? orderStatusValue : orderStatusListData,
                tab,
            },
        })
    }
    const canSubmitOtherFilter = [
        dateTimeActiveValue.value !== dateTimeValue ||
        JSON.stringify(dateTimeActiveValue.type) !== JSON.stringify(dateTimeType),
        JSON.stringify(employeeActiveValue.value) !==
        JSON.stringify(employeeValue) ||
        JSON.stringify(employeeActiveValue.type) !==
        JSON.stringify(employeeCategoryValue),
        JSON.stringify(postActiveValue.value) !==
        JSON.stringify(postValue) ,
        JSON.stringify(pageActiveValue.value) !== JSON.stringify(pageValue),
        JSON.stringify(orderStatusActiveValue) !==
        JSON.stringify(orderStatusValue),
    ].includes(true)
    const otherFilterBadge = [
        !!dateTimeActiveValue?.value,
        Array.isArray(employeeActiveValue?.value) &&
        employeeActiveValue.value.length > 0,
        Array.isArray(postActiveValue?.value) &&
        postActiveValue.value.length > 0,
        Array.isArray(pageActiveValue?.value) &&
        pageActiveValue.value.length > 0,
        Array.isArray(orderStatusActiveValue) &&
        orderStatusActiveValue.length > 0,
    ].filter(item => item === true).length

    const queries = {
        keyword: filter.search?.value || '',
        date_type: filter.dateTime?.activeValue?.type?.value || '',
        start_date:
            filter.dateTime.activeValue?.start && filter.dateTime.activeValue.value
                ? convertDateTimeToApiFormat(
                filter.dateTime.activeValue.value.split(' - ')[0],
                )
                : '',
        end_date:
            filter.dateTime.activeValue?.end && filter.dateTime.activeValue.value
                ? convertDateTimeToApiFormat(
                filter.dateTime.activeValue.value.split(' - ')[1],
                )
                : '',
        group_user: "",
        user_id: filter.employee.activeValue?.value?.value || '',
        page_id: page.active || '',
        post_id: '',
        payment: paymentValue || '',
        per_page:table.pagination.amount || 20,
        start: table.pagination.active || 0,
    }
    const applyOrderOtherFilter = async () => {
        const collection = {
            ...queries,
            date_type: dateTimeType?.value || '',
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
            post_id:Array.isArray(postValue) ? postValue.map(item => item?.value).join(',')  : '',
            page_id:pageValue.length > 0 ? pageValue.map(item => item?.value).join(',')  : page?.active?.map(item => item).join(','),
            shipping_status: Array.isArray(orderStatusValue)
                ? orderStatusValue.map(item => item?.value).join(',')
                : '',
        }
        fetchOrderByFilter(collection, {forceLoading: true})
    }

    const fetchReportStatus = async (phoneList, displayListData) => {
        const response = await sendRequestAuth(
            'post',
            `${config.API}/order/customer/report`,
            JSON.stringify({phone: phoneList}),
        )

        if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                    display: {
                        list: displayListData.map(item => ({
                            ...item,
                            total_reports: item?.customer_mobile
                                ? response.data.data.find(
                                find => find?.phone === item?.customer_mobile,
                            )?.totals || 0
                                : 0,
                        })),
                    },
                },
            })
        }
    }

    const fetchOrderByFilter = async (qs, opt) => {
        if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: true}}},
            })

        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get', `${config.API}/fb/order/list${queryString}`)
        if (response?.status === 200) {
            pageDispatch({
                type: facebookConversationActions.OTHER_FILTER_APPLY,
                payload: {
                    display: {
                        list: Array.isArray(response?.data?.data)
                            ? response?.data?.data
                            : [],
                    },
                    pagination: {
                        active: opt?.activePage || 0,
                        amount: table.pagination.amount,
                        total: response?.data?.meta?.totals
                            ? Math.ceil(
                                response.data.meta.totals / table.pagination.amount,
                            )
                            : 0,
                        totalItems: response?.data?.meta?.totals || 0,
                    },
                },
            })
        }

        if (!!!opt?.notClearDetail)
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: null},
            })

        if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
            payload: {id: null},
        })
    }

    const filterTagDelete = t => {
        pageDispatch({
            type: facebookConversationActions.TAG_FILTER_DELETE,
            payload: {type: t, isSingle: true},
        })
        let tmpCollection = {}
        switch (t) {
            case 'dateTime.current':
                tmpCollection = {
                    ...tmpCollection,
                    start_date: '',
                    end_date: '',
                }

                pageDispatch({
                    type: facebookConversationActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
                    payload: {trigger: null},
                })

                break

            case ORDER_FILTER_FACE_BOOK[0]:
                tmpCollection = {
                    ...tmpCollection,
                }
                break

            case ORDER_FILTER_FACE_BOOK[1]:
                tmpCollection = {...tmpCollection, user_id: ''}
                break

            case ORDER_FILTER_FACE_BOOK[3]:
                tmpCollection = {...tmpCollection, post_id: ''}
                break

            case ORDER_FILTER_FACE_BOOK[2]:
                tmpCollection = {...tmpCollection, page_id: page?.active?.map(item=>item).join(',')}
                break
            case ORDER_FILTER_FACE_BOOK[4]:
                tmpCollection = {...tmpCollection, shipping_status: ''}
                break
            default:
                break
        }

        const collection = {...queries, ...tmpCollection}

        fetchOrderByFilter(collection, {forceLoading: true})
    }

    const filterTagDeleteAll = isSoft => {
        ORDER_FILTER_FACE_BOOK.forEach(item =>
            pageDispatch({
                type: facebookConversationActions.TAG_FILTER_DELETE,
                payload: {type: item},
            }),
        )

        pageDispatch({
            type: facebookConversationActions.FILTER_DATE_TIME_TRIGGER_UPDATE,
            payload: {
                trigger: dateTimeTrigger === null ? true : !dateTimeTrigger,
            },
        })

        if (isSoft) return
        const date = formatDateTimeDefaultValue.split(' - ')
        const collection = {
            ...queries,
            date_type: 'created',
            start_date: convertDateTimeToApiFormat(date[0]),
            end_date: convertDateTimeToApiFormat(date[1]),
            user_id: '',
            page_id:page?.list?.map(item => item?.page_id).join(','),
            post_id:'',
            payment: pageState.filter?.payment?.value,
            shipping_status:''
        }
        fetchOrderByFilter(collection, {forceLoading: true})

    }

    return {
        advancedSearch: {
            customer: {keyword: advancedSearchCustomer.keyword},
            liveVideoId: advancedSearchLiveVideoId,
            onChange: handleAdvancedSearchChange,
        },
        badge: {
            advanced: advanedSearchBadge,
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
        payment: {
            value: paymentValue,
            onChange: handlePaymentChange,
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
        orderStatus: {
            activeValue: orderStatusActiveValue,
            keyword: orderStatusKeyword,
            list: orderStatusList,
            tab: orderStatusTab,
            value: orderStatusValue,
            onChange: handleOrderStatusChange,
            onInputReset: handleOrderStatusResetInput,
            onKeywordChange: handleOrderStatusKeywordChange,
            onTabChange: handleOrderStatusTabChange,
        },
        search: {
            value: searchValue,
            onChange: handleSearchChange,
        },

        canSubmitOtherFilter,
        queries,
        functions: {
            hasFilter: () => [
                JSON.stringify(dateTimeActiveValue) !==
                JSON.stringify(facebookOrdersInitialState.filter.dateTime.activeValue),
                Array.isArray(employeeActiveValue?.value) &&
                employeeActiveValue.value.length > 0 &&
                !!employeeActiveValue?.type?.name,
                Array.isArray(postActiveValue?.value) &&
                postActiveValue.value.length > 0 &&
                !!postActiveValue?.type?.name,
                Array.isArray(pageActiveValue?.value) &&
                pageActiveValue.value.length > 0 &&
                !!pageActiveValue?.type?.name,
                Array.isArray(orderStatusActiveValue) &&
                orderStatusActiveValue.length > 0,
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
        },
    }
}

export default useFacebookFilterForm
