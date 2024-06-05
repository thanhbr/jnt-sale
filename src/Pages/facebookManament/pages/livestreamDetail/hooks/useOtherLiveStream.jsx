import { useCallback, useContext, useState } from 'react'
import {FacebookLivestreamContext} from "../provider/_context";
import {facebookLiveStreamDetailActions, facebookLiveStreamDetailActions as actions} from '../provider/_actions'
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {facebookConversationActions} from "../../livestream/provider/_actions";
import {useNavigate, useParams} from "react-router-dom";
import { debounce } from '@mui/material'

export const useOtherLiveStream = () => {
    const {state, dispatch} = useContext(FacebookLivestreamContext)
    const navigate = useNavigate()
    const other = state.otherLiveStream
    let { pageId, liveStreamId } = useParams()
    const [loadingMore, setLoadingMore] = useState(false)
    const filterQueries = {
        keyword:'',
        page_id:pageId,
        start_date:'',
        end_date:'',
        status:1,
        per_page:20,
        start:0,
    }
    const convertQuery = query => {
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(query)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        return queryString
    }
    const fetchListLivestream = async (keyword = '') =>{
        dispatch({
            type: actions.SET_OTHER_LIVE_STREAM,
            payload:{
                    display: {
                        list: [other.display.list],
                        loading:false
                    },
                    pagination:{
                        totalItems:0,
                    }
                },
        })
        // const amount = table.pagination?.amount || 20
        const query = {
            ...filterQueries,
            keyword: keyword,
            per_page:  20,
            start: 0,
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

            dispatch({
                type: actions.SET_OTHER_LIVE_STREAM,
                payload: {
                    display: {
                        list: displayListData.filter(item => item?.video_id != liveStreamId),
                        loading:true
                    },
                    pagination:{
                        totalItems:response?.data?.meta.totals
                    }
                },
            })

        }
    }
    const handleCloseModalOtherLiveStream = () => {
        dispatch({
            type: actions.SET_OPEN_MODAL, payload: {
                show: false,
                data: {},
                media: [],
                value: '',
                display: {
                    list: [],
                    loading: true,
                },
                pagination: {
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
            }
        })
    }
    const handleOpenModalOtherLiveStream = () => {
        dispatch({
            type: actions.SET_OPEN_MODAL, payload: {
                show: true,
                data: {},
                media: [],
                value: '',
                display: {
                    list: [],
                    loading: true,
                },
                pagination: {
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
            }
        })
    }
    const handleSubmitOthder = async ()=>{
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                listSelected: [],
                list: []
            },
        })
        const {data} = other
        navigate(`/facebook/${data.page_id}/livestream/${data.video_id}`)
        dispatch({
            type: actions.SET_OPEN_MODAL, payload: {
                show: false,
                data: {},
                media: [],
                value: '',
                display: {
                    list: [],
                    loading: true,
                },
                pagination: {
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
            }
        })

    }
    const handleCheckLiveStream = (item)=>{
        dispatch({type:actions.SET_CHECK_OTHER_LIVE_STREAM,payload:{
            data:item
            }})
    }
    const debounceFetchLiveStream = useCallback(debounce((keyword) => {
        fetchListLivestream(keyword)
    },500), [])
    const handleSearch = (e)=>{
        dispatch({type:actions.SET_SEARCH_OTHER_LIVE_STREAM,payload:{
                search:e.target.value
            }})
        debounceFetchLiveStream(e.target.value)
    }
    const handelRefesh = ()=>{
        dispatch({type:actions.SET_SEARCH_OTHER_LIVE_STREAM,payload:{
            search:''
        }})
        debounceFetchLiveStream()
    }
    const loadMoreConversation = async (qs, opt = {}) => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/livestream/list${convertQuery({ ...qs, ...opt })}`
        )
        if (!!response.data.success) {

            dispatch({
                type:  actions.SET_OTHER_LIVE_STREAM,
                payload: {
                    display:{
                        list:[...other.display.list, ...response.data.data],
                        loading:true
                    },
                    pagination:{
                        totalItems:response?.data?.meta.totals
                    }
                },
            })


            setLoadingMore(false)
            // if(+response.data.meta?.unread?.all > 0){
            //   document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
            // }
        }
    }
    const onLoadMore = async () => {
        if (loadingMore) return
        // const currentTotal = state.other.page
        // const total = state.meta.total
        // if (currentTotal >= total) return
        // setLoadingMore(true)
        const response = loadMoreConversation(filterQueries, {
            start: state.meta.start + state.meta.per_page || 0,
        })
    }
    return {
        other,
        func: {
            handleOpen: handleOpenModalOtherLiveStream,
            handleClose: handleCloseModalOtherLiveStream,
            fetchList :fetchListLivestream,
            submit:handleSubmitOthder,
            check:handleCheckLiveStream,
            search:handleSearch,
            refesh:handelRefesh,
            load:onLoadMore,
        }
    }
}
