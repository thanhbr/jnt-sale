import {useCallback, useContext} from 'react'
import {FacebookConversationContext, FacebookLivestreamContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import {removeAcent} from '../../../../../common/fieldText/_functions'
import {debounce} from '@mui/material'
import { convertDateTimeToApiFormat } from '../../../../../common/form/datePicker/_functions'

const useFacebookPost = () => {

    const [GlobalState] = useGlobalContext()
    const {auth} = GlobalState.facebookAuth
    const {pageState, pageDispatch} = useContext(FacebookLivestreamContext)
    const {showAlert} = useAlert()
    const {conversation} = pageState
    const {meta} = pageState
    const {filter} = pageState
    const {page} = pageState
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // LIST FANPAGE



    // ===== ===== ===== ===== ===== POST ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    const postActiveValue = filter.conversation.post.activeValue
    const postKeyword = filter.conversation.post.keyword
    const postList = filter.conversation.post.list
    const postListOrigin = filter.conversation.post.listOrigin
    const postTab = filter.conversation.post.tab
    const postValue = filter.conversation.post.value
    const clearFilterPost = () => {
        pageDispatch({
            type: 'CLEAR_FILTER_POST',
        })
    }
    const handlePostChange = data => {
        const find = postValue.find(item => item.value === data.id)
        const postListData =
            postTab === 'checked'
                ? postValue.filter(item => item.value !== data.id)
                : postList
        const postValueData = find
            ? postValue.filter(item => item.value !== data.id)
            : [...postValue,  {name: data.value, value:data.id}]
        pageDispatch({
            type: 'FILTER_POST_UPDATE',
            payload: {
                list: postListData,
                value: postValueData,
            },
        })
    }

    const handlePostKeywordChange = data => {
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''

        const findList =
            postTab === 'checked'
                ? postValue
                : postListOrigin

        const postListData = findList.filter(item => {
            const formatNameItem = JSON.parse(item?.post_content)
                ? removeAcent(JSON.parse(item?.post_content).toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({
            type: 'FILTER_POST_KEYWORD_UPDATE',
            payload: {
                keyword: data?.value || '',
                list: postListData,
            },
        })
    }

    const handlePostResetInput = () => {
        pageDispatch({
            type: 'FILTER_POST_UPDATE',
            payload: {
                list: postListOrigin,
                value: [],
            },
        })
        // getListResponseScript()
        clearFilterPost()
    }

    const handlePostTabChange = tab => {
        const formatDataValue = postKeyword
            ? removeAcent(postKeyword?.toLowerCase())
            : ''

        const postListData = postListOrigin.filter(item => {
            const formatNameItem = item?.post_content
                ? removeAcent(item.post_content.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: 'FILTER_POST_TAB_UPDATE',
            payload: {
                list: tab === 'checked' ? postValue : postListData,
                tab,
            },
        })
    }

    const handlePostSubmit = _ => {
        const pageId = Array.isArray(postValue) ? postValue.map(item => item?.post_id).join(',') : ''
        // getListResponseScript({keyword: filter?.keyword,page_id: pageId})
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

    const queries = {
        keyword: filter.conversation?.keyword,
        page_id: pageState?.page?.active?.length > 0 ? pageState?.page?.active.toString() : '',
        type: filter.conversation?.type,
        post_id: !!postValue ? postValue.map(item => item.post_id).toString() : '',
        is_read: filter.conversation?.isRead?.id || '',
        is_phone: filter.conversation?.isPhone?.id || '',
        is_done: filter.conversation?.isStar?.id || '',
        start_date: '',
        end_date: '',
    }

    const approveFilter = () => {

        pageDispatch({
            type: 'SET_FILTER_ACTIVE'
        })
    }
    const closeFilter = () => {
        pageDispatch({
            type: 'SET_FILTER_SELECTED'
        })
    }
    return {
        data: {
            pageState,
            meta,
            conversation,
            filter
        },
        methods: {
            closeFilter,
            approveFilter
        },
        post: {
            activeValue: postActiveValue,
            keyword: postKeyword,
            list: postList,
            tab: postTab,
            value: postValue,
            onChange: handlePostChange,
            onInputReset: handlePostResetInput,
            onKeywordChange: handlePostKeywordChange,
            onTabChange: handlePostTabChange,
            onSubmit: handlePostSubmit,
            clearFilterPost,
        },

    }
}

export default useFacebookPost
