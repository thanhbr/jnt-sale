import {useContext, useReducer, useState} from 'react'
import {FacebookOrdersContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import {getFbMessage} from '../../../services'
import {useSearchParams} from "react-router-dom";
import {facebookConversationActions} from "../provider/_actions";
import {convertDateTimeToApiFormat} from "common/form/datePicker/_functions";
import {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../interface/_const";
import {orderActions} from "../../../../refactorOrder/provider/_reducer";

const useFacebookOrders = () => {

    const [GlobalState] = useGlobalContext()
    const {auth} = GlobalState.facebookAuth
    const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
    const {showAlert} = useAlert()
    const {conversation} = pageState
    const {page} = pageState
    const [searchParams] = useSearchParams()
    const {filter, table} = pageState
    const orderStatusActiveValue = filter.orderStatus.activeValue
    const employeeActiveValue = filter.employee.activeValue
    const pageActiveValue = filter.pageSelected.activeValue;
    const postActiveValue = filter.conversation.post.activeValue
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    const filterQueries = {
        keyword: filter.search?.value || '',
        date_type: filter.dateTime?.activeValue?.type?.value || '',
        start_date:
        searchParams.get('start_date') == '' ? '' :filter.dateTime.activeValue?.start && filter.dateTime.activeValue.value
                ? convertDateTimeToApiFormat(
                filter.dateTime.activeValue.value.split(' - ')[0],
                )
                : '',
        end_date:
        searchParams.get('end_date') == '' ? '' : filter.dateTime.activeValue?.end && filter.dateTime.activeValue.value
                ? convertDateTimeToApiFormat(
                filter.dateTime.activeValue.value.split(' - ')[1],
                )
                : '',
        group_user: "",
        user_id: Array.isArray(employeeActiveValue?.value)
            ? employeeActiveValue?.value.map(item => item?.value).join(',')
            : '',
        page_id: Array.isArray(pageActiveValue?.value)
            ? pageActiveValue?.value.map(item => item?.value).join(',')
            :  searchParams.get('page_id'),
        post_id: Array.isArray(postActiveValue?.value)
            ? postActiveValue?.value.map(item => item?.value).join(',') : !!searchParams.get('post_id') ? searchParams.get('post_id') :'' ,
        payment: '',
        per_page:'',
        start: '',
        shipping_status: Array.isArray(orderStatusActiveValue)
            ? orderStatusActiveValue.map(item => item?.value).join(',')
            : '',

    }
    const pageIds = !!searchParams.get('page_id') ? searchParams.get('page_id').split(',') : []
    // LIST FANPAGE
    const getListFanpage = async (id) => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/pages/${id}/connected?keyword&per_page=20&start=0`
        )
        if (!!response.data.success) {
            if (pageIds.length > 0) {
                let listPage = []
                pageIds.map(item => {
                    let page = response?.data?.data.find(data => data.page_id == item)
                    if(!!page)
                        listPage = [...listPage,page]
                })

                const pageActive = listPage.map(item => item.page_id)
                pageDispatch({
                    type: 'SET_PAGE',
                    payload: {
                        list: listPage,
                        active: pageActive,
                    }
                })
                getListPost(pageActive)
                fetchListOrder(pageActive)
            } else {
                const pageActive = response?.data?.data.map(item => item.page_id)
                pageDispatch({
                    type: 'SET_PAGE',
                    payload: {
                        list: response?.data?.data,
                        active: pageActive,
                    }
                })
                getListPost(pageActive)
                fetchListOrder(pageActive)
            }
        }
    }


    const fetchListOrder =async (pageId) =>{
        const amount = table.pagination?.amount || 20
        const query = {
            ...filterQueries,
            per_page: pageState.table?.pagination?.amount || 20,
            start: pageState.table?.pagination?.active * amount,
            page_id:pageId,
        }
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries(query)) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/order/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                    display: {
                        list: displayListData,
                    },
                },
            })
            pageDispatch({type:'TABLE_PAGINATE_DATA', payload: {
                    pagination:{
                        totalItems:response?.data?.meta.totals
                    }
                },})
            const phoneList = Array.isArray(response?.data?.data)
                ? response.data.data.map(item => item?.customer_mobile || '')
                : []

            if (phoneList.length > 0)
                handleGetReportStatus(phoneList, displayListData)
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })
        }
    }

    const fetchRowDetail = async data => {
        if (!!!data?.id) {
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
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
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: newItem, list: [newItem]},
            })
        }

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }
    const handleGetReportStatus = async (phoneList, displayListData) => {
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
    const handleOriginFetch = async () => {
        const dateTimeValue = filter?.dateTime?.activeValue?.value

        const querySearch = searchParams.get('search') || ''
        if (querySearch)
            pageDispatch({
                type: facebookConversationActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
                payload: {
                    end: '',
                    start: '',
                    type: filter.dateTime.type,
                    value: '',
                },
            })

        const splitDate = dateTimeValue.split(' - ')
        const startDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[0])
        const endDate = querySearch ? '' : convertDateTimeToApiFormat(splitDate[1])
        const query = {
            ...filterQueries,
            per_page: pageState.table?.pagination?.amount || '',
            start: pageState.table?.pagination?.active || '',
            keyword: querySearch,
            start_date: startDate,
            end_date: endDate
        }
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries(query)) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/order/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []
            // set default value for input filter
            pageDispatch({
                type: facebookConversationActions.FILTER_SEARCH_UPDATE,
                payload: {value: querySearch},
            })
            // update display list
            pageDispatch({type:'TABLE_PAGINATE_DATA', payload: {
                    pagination:{
                        totalItems:response?.data?.meta.totals
                    }
                },})
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                        display: {
                            list: displayListData,
                        },
                },
            })
            const phoneList = Array.isArray(response?.data?.data)
                ? response.data.data.map(item => item?.customer_mobile || '')
                : []

            if (phoneList.length > 0)
                handleGetReportStatus(phoneList, displayListData)
            if (querySearch) {
                pageDispatch({
                    type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
                    payload: {active: displayListData[0]},
                })
                fetchRowDetail({id: querySearch})
            }
        }

        if (!querySearch) {
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })
        }
    }
    const [canFetch, setCanFetch] = useState(true)


    const handlePaymentMethodFetch = async () => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/payment/payment-method`,
        )

        if (response?.data?.success)
            pageDispatch({
                type: facebookConversationActions.PAYMENT_METHOD_UPDATE,
                payload: {
                    paymentMethod: {
                        list: Array.isArray(response?.data?.data) ? response.data.data : [],
                    },
                },
            })
    }

    const handlePaginationAmountChange = async n => {
        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
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
            payment: pageState?.filter?.payment?.value || '' ,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }

        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/order/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            pageDispatch({
                type: facebookConversationActions.TABLE_AMOUNT_UPDATE,
                payload: {
                    display: {
                        list: displayListData,
                    },
                    pagination: {active: page, amount: n, total: totalPages},
                },
            })
            const phoneList = Array.isArray(response?.data?.data)
                ? response.data.data.map(item => item?.customer_mobile || '')
                : []

            if (phoneList.length > 0)
                handleGetReportStatus(phoneList, displayListData)

        }

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
            payload: {active: null},
        })

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }

    const handlePaginationPageChange = async page => {
        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: true}}},
        })

        const amount = table.pagination?.amount || 20
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...filterQueries,
            per_page: amount,
            start: page * amount,
            payment: pageState?.filter?.payment?.value || '' ,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/order/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            pageDispatch({
                type: facebookConversationActions.TABLE_PAGINATION_UPDATE,
                payload: {
                    display: {
                        list: displayListData,
                    },
                    pagination: {active: page},
                },
            })
            const phoneList = Array.isArray(response?.data?.data)
                ? response.data.data.map(item => item?.customer_mobile || '')
                : []

            if (phoneList.length > 0)
                handleGetReportStatus(phoneList, displayListData)

        }

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
            payload: {active: null},
        })

        pageDispatch({
            type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: false}}},
        })
    }
    const getListPage = async (page_id) => {
        const response = await sendRequestAuth('get',
            `${config.API}/fb/pages/${page_id}/connected`
        )
        if (!!response?.data?.success) {
            const list = response?.data?.data?.map(item=>{
                return{
                    name: item.page_name,
                    value:item.page_id,
                    avatar : item.page_avatar,
                }
            })
            pageDispatch({
                type: facebookConversationActions.SET_LIST_PAGE,
                payload: {
                    pageSelected: list
                },
            })
            let id = response?.data?.data.map(item=>item.page_id)
            getListPost(id)
        }
    }
    const getListPost = async (page_id) => {
        const response = await sendRequestAuth('get',
            `${config.API}/fb/post/list?page_id=${!!page_id && page_id.toString()}&keyword&time`
        )
        if (!!response?.data?.success) {
            const list = response?.data?.data?.map(item=>{
                return {
                    name:item.post_content,
                    value:item.post_id ? item.post_id.split('_')[1] :'',
                    avatar : item.post_image,
                    time : item.time,
                }
            })
            pageDispatch({
                type: 'SET_POST_CUSTOMER',
                payload: {
                    post: {
                        list:list,
                        total: response?.data?.meta,
                        canLoadMore:true,
                        loading:false
                    }
                },
            })
            if(searchParams.get('post_id')) {
                pageDispatch({type: 'SET_SHOULD_COLLAPSE',payload: true})
                getDetailPost(list)
            }
            if(searchParams.get('start_date') == '') {
                pageDispatch({
                    type: facebookConversationActions.FILTER_DATE_TIME_UPDATE,
                    payload: {
                        end: '',
                        start: '',
                        type: '',
                        value: '',
                    },
                })
                pageDispatch({
                    type: facebookConversationActions.FILTER_ACTIVE_DATE_TIME_UPDATE,
                    payload: {
                        end: '',
                        start: '',
                        type: '',
                        value: '',
                    },
                })
            }
            
        }
    }
    const getDetailPost = async (list) => {
        const response = await sendRequestAuth('get',
          `${config.API}/fb/post/detail?page_id=${searchParams.get('page_id')}&post_id=${searchParams.get('post_id')}`
        )
        if (!!response.data?.success) {
            pageDispatch({
                type: 'FILTER_POST_UPDATE',
                payload: {
                    list: list,
                    value: [{
                        name: response.data?.data.text,
                        avatar: response.data?.data.image,
                        time: response.data?.data.time, 
                        value: response.data?.data.post_id ? response.data?.data.post_id.split('_')[1] :'',
                    }],
                },
            })
            pageDispatch({
                type: facebookConversationActions.OTHER_ACTIVE_VALUE_POST,
                payload: {
                    type: {name: 'Bài viết', value: ''},
                    value :[ {
                        name: response.data?.data.text,
                        avatar: response.data?.data.image,
                        time: response.data?.data.time, 
                        value: response.data?.data.post_id ? response.data?.data.post_id.split('_')[1] :'',
                    }],
                },
            })
        }
      }

    const handlePageChange = (page_id) => {
        const listPage = page.active.includes(page_id) ? page.active.filter(item => +item != +page_id) : [...page.active, page_id]
        if(listPage.length !== 0){
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: true}}},
            })
            pageDispatch({
                type: 'SET_FILTER_PAGE',
                payload: {
                    active: listPage,
                    status:true,
                }
            })
            fetchListOrder(listPage)
        }

    }
    // FB action subscribed app
    const getActionSubscribe = async () => {
        
        if(pageState.page.list.length > 0){
        let addingList = []
        pageState.page.list.forEach(item => {
            addingList = [...addingList, {page_id:item.page_id,access_token: item.access_token}]
        })
        const response = await sendRequestAuth(
            'post',
            `${config.API}/fb/action/subscribed-app`,
            addingList
        )
        if (!!response.data.success) {
            // console.log(response)
        }
        }
    }
    return {
        data: pageState,
        methods: {
            getListPage,
            handlePageChange
        },
        fetch: {
            origin: handleOriginFetch,
            paymentMethod: handlePaymentMethodFetch,
            listPage:getListFanpage,
            getActionSubscribeApp: getActionSubscribe
        },
        pagination: {
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange,
        },
        page: {
            list: page.list,
            active: page.active
        }
    }
}

export default useFacebookOrders
