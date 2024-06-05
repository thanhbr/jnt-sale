import { useCallback, useContext } from 'react'
import {FacebookAutoResponsesContext, FacebookLivestreamContext, FacebookOrdersContext} from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { debounce } from '@mui/material'
import { orderActions } from '../../../../refactorOrder/provider/_reducer'
import { removeAcent } from '../../../../../common/fieldText/_functions'
import {facebookConversationActions} from "../provider/_actions";

const useFacebookAutoResponses = () => {

    const [GlobalState] = useGlobalContext()
    const { auth } = GlobalState.facebookAuth
    const { pageState, pageDispatch } = useContext(FacebookLivestreamContext)
    const { showAlert } = useAlert()
    const {filter} = pageState
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    const debounceListResponse = useCallback(debounce((data) => {
        getListResponseScript({keyword: data})
    }, 1000), [])
    const getListResponseScript = async (data) => {
        pageDispatch({
            type: 'SET_LOADING',
            payload: true,
        })
        const response = await sendRequestAuth('get',
            `${config.API}/fb/setting/reply-script/${auth.userId}/list?keyword=${data?.keyword||''}&page_id=${data?.page_id || ''}&status&per_page=20&start=0`
        )
        if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
            pageDispatch({
                type: 'UPDATE_TABLE',
                payload: {
                    display: {
                        updateList: response.data.data,
                        list: response.data.data,
                    },
                    pagination: {
                        totalItems: response?.data?.data?.totals || 0
                    },
                    loading: false
                },
            })

            pageDispatch({
                type: 'SET_LOADING',
                payload: false,
            })
        }
    }


    // ===== ===== ===== ===== ===== PAGE SELECTED ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    const pageSelectedActiveValue = filter.pageSelected.activeValue
    const pageSelectedKeyword = filter.pageSelected.keyword
    const pageSelectedList = filter.pageSelected.list
    const pageSelectedListOrigin = filter.pageSelected.listOrigin
    const pageSelectedTab = filter.pageSelected.tab
    const pageSelectedValue = filter.pageSelected.value
    const getListPost = async (page_id) => {
        const response = await sendRequestAuth('get',
            `${config.API}/fb/post/list?page_id=${!!page_id && page_id.toString()}&keyword=a&time`
        )
        if (!!response?.data?.success) {
            pageDispatch({
                type: 'SET_POST_CUSTOMER',
                payload: {
                    post: response?.data?.data
                },
            })
        }
    }
    const handlePageSelectedChange = data => {
        const find = pageSelectedValue.find(item => item.page_id === data.id)
        const pageSelectedListData =
            pageSelectedTab === 'checked'
                ? pageSelectedValue.filter(item => item.page_id !== data.id)
                : pageSelectedList
        const pageSelectedValueData = find
            ? pageSelectedValue.filter(item => item.page_id !== data.id)
            : [...pageSelectedValue, {name: data.value, value:data.id,page_id:data.id}]
        pageDispatch({
            type: facebookConversationActions.FILTER_PAGE_SELECTED_UPDATE,
            payload: {
                list: pageSelectedListData,
                value: pageSelectedValueData,
            },
        })

        if(pageSelectedValueData.length > 0){
            const id = pageSelectedValueData?.map(item=>item.value)
            getListPost(id)
        }else {
            const id = pageState.filter.pageSelected?.listOrigin?.map(item=>item.page_id)
            getListPost(id)
        }

    }

    const handlePageSelectedKeywordChange = data => {
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''

        const findList =
            pageSelectedTab === 'checked'
                ? pageSelectedValue
                : pageSelectedListOrigin

        const pageSelectedListData = findList.filter(item => {
            const formatNameItem = item?.page_name
                ? removeAcent(item.page_name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: facebookConversationActions.FILTER_PAGE_SELECTED_KEYWORD_UPDATE,
            payload: {
                keyword: data?.value || '',
                list: pageSelectedListData,
            },
        })
    }

    const handlePageSelectedResetInput = () => {
        pageDispatch({
            type: facebookConversationActions.FILTER_PAGE_SELECTED_UPDATE,
            payload: {
                list: pageSelectedListOrigin,
                value: [],
            },
        })
        getListResponseScript()
    }

    const handlePageSelectedTabChange = tab => {
        const formatDataValue = pageSelectedKeyword
            ? removeAcent(pageSelectedKeyword?.toLowerCase())
            : ''
        const pageSelectedListData = pageSelectedListOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })

        pageDispatch({
            type: facebookConversationActions.FILTER_PAGE_SELECTED_TAB_UPDATE,
            payload: {
                list: tab === 'checked' ? pageSelectedValue : pageSelectedListData,
                tab,
            },
        })
    }

    const handlePageSelectedSubmit = _ => {
        const pageId = Array.isArray(pageSelectedValue)? pageSelectedValue.map(item => item?.page_id).join(','): ''
        getListResponseScript({keyword: filter?.keyword,page_id: pageId})
    }

    return {
        data: pageState,
        pageSelected: {
            activeValue: pageSelectedActiveValue,
            keyword: pageSelectedKeyword,
            list: pageSelectedList,
            tab: pageSelectedTab,
            value: pageSelectedValue,
            onChange: handlePageSelectedChange,
            onInputReset: handlePageSelectedResetInput,
            onKeywordChange: handlePageSelectedKeywordChange,
            onTabChange: handlePageSelectedTabChange,
            onSubmit: handlePageSelectedSubmit,
        },
    }
}

export default useFacebookAutoResponses
