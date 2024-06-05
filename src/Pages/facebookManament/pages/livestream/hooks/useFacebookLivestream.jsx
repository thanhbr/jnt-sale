import {useContext, useReducer, useState} from 'react'
import {FacebookLivestreamContext} from '../provider/_context'
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

const useFacebookLivestream = () => {

    const {pageState, pageDispatch} = useContext(FacebookLivestreamContext)
    const [searchParams] = useSearchParams()
    const {filter, table, page} = pageState

    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    const filterQueries = {
        keyword: filter.search?.value || '',
        start_date: filter.dateTime.activeValue?.value ? convertDateTimeToApiFormat(filter.dateTime.activeValue?.value?.split(' - ')[0]) : '',
        end_date: filter.dateTime.activeValue?.value ? convertDateTimeToApiFormat(filter.dateTime.activeValue?.value?.split(' - ')[1]) : '',
        per_page: 20,
        start:  0,
        status: filter.status.activeValue ? filter.status.activeValue?.value : '',
        page_id: page.active
    }
    const pageIds = !!searchParams.get('page_id') ? searchParams.get('page_id').split(',') : []
    // LIST FANPAGE
    const getListFanpage = async (id) => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/pages/${id}/connected?keyword&per_page=&start=`
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
                fetchListLivestream(pageActive)
            } else {
                const pageActive = response?.data?.data.map(item => item.page_id)
                pageDispatch({
                    type: 'SET_PAGE',
                    payload: {
                        list: response?.data?.data,
                        active: pageActive,
                    }
                })
                fetchListLivestream(pageActive)
            }
        }
    }


    const fetchListLivestream = async (pageIdList) =>{
        const amount = table.pagination?.amount || 20
        const query = {
            ...filterQueries,
            page_id: pageIdList,
            per_page: pageState.table?.pagination?.amount || 20,
            start: pageState.table?.pagination?.active * amount,
        }
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries(query)) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/livestream/list${queryStr}`,
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
                    pagination:{
                        totalItems:response?.data?.meta.totals
                    }
                },
            })
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

    const handleOriginFetch = async () => {
        const query = {
            ...filterQueries,
            per_page: pageState.table?.pagination?.amount || 20,
            start: pageState.table?.pagination?.active || 0,
        }
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries(query)) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/livestream/list${queryStr}`,
        )

        if (!!response?.data?.success) {
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []
            // update display list
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                        display: {
                            list: displayListData,
                        },
                    pagination:{
                            totalItems:response?.data?.meta.totals
                    }
                },
            })
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
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }

        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/livestream/list${queryStr}`,
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
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/livestream/list${queryStr}`,
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
            pageDispatch({
                type: facebookConversationActions.SET_LIST_PAGE,
                payload: {
                    pageSelected: response?.data?.data
                },
            })
            let id = response?.data?.data.map(item=>item.page_id)
        }
    }

    const handlePageChange = (page_id) => {
        const listPage = page.active.includes(page_id) ? page.active.filter(item => +item != +page_id) : [...page.active, page_id] 
        if(listPage.length >= 1){
            pageDispatch({
                type: facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: true}}},
            })
            pageDispatch({
                type: 'SET_FILTER_PAGE',
                payload: listPage
            })
            fetchListLivestream(listPage)
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
        page: pageState.page
    }
}

export default useFacebookLivestream
