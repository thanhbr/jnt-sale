import {useContext} from 'react'
import {FacebookOrdersContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import {removeAcent} from '../../../../../common/fieldText/_functions'
import {transformQueryObjToString} from "../../../../purchases/utils/transform";

const useFacebookPost = () => {

    const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
    const {conversation} = pageState
    const {meta} = pageState
    const {filter} = pageState
    // ===== ===== ===== ===== ===== POST ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    const postActiveValue = filter.conversation.post.activeValue
    const postKeyword = filter.conversation.post.keyword
    const postList = filter.conversation.post.list
    const postListOrigin = filter.conversation.post.listOrigin
    const postTab = filter.conversation.post.tab
    const postValue = filter.conversation.post.value
    const postPagination = filter.conversation.post?.pagination
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
            : [...postValue, {name: data.value, value: data.id, avatar: data.avatar, time: data.time}]
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
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
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

    const queries = {
        keyword: postKeyword || '',
        page_id: pageState?.page?.active?.length > 0 ? pageState?.page?.active.toString() : '',
        post_id: '',
        start: filter.conversation?.post?.pagination?.active,
        per_page: filter.conversation?.post?.pagination?.amount,
        time: '',
    }
    const getListPost = async (k, page = 0) => {

        const q = transformQueryObjToString({
            ...queries,
            keyword: k.trim(),
            start: page * 20,
        })
        const response = await sendRequestAuth('get',
            `${config.API}/fb/post/list${q}`
        )

        if (!!response?.data?.success) {
            const list = response?.data?.data?.map(item => {
                return {
                    name: item.post_content,
                    value: item.post_id ? item.post_id.split('_')[1] :'',
                    avatar: item.post_image,
                    time : item.time,
                }
            })

            pageDispatch({
                type: 'SET_POST_CUSTOMER',
                payload: {
                    post: {
                        list: page === 0
                            ? list
                            : [...postList, ...list],
                        total: response?.data?.meta,
                        loading: false,
                        canLoadMore: [...postList, ...list].length >= response?.data?.meta?.totals ? false : true,
                    }
                },
            })
        }
    }
    const handlePostListLoadMore = () => {
        pageDispatch({
            type: 'UPDATE_POST_LOAD_MORE',
            payload: {canLoadMore: false},
        })
        const currentTotal = filter.conversation.post.list.length
        const total = +postPagination.totalItem
        if (currentTotal >= total) {
            return
        }
        const response = getListPost(
            postKeyword,
            +postPagination.active + 1,
        )
        return response
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
            // onSubmit: handlePostSubmit,
            clearFilterPost,
            onPostFetchMoreProductList: handlePostListLoadMore,
            canLoadMore: pageState?.filter?.conversation?.post?.canLoadMore
        },

    }
}

export default useFacebookPost
