import config from 'config'
import { useReducer } from 'react'
import { getData, sendRequestAuth } from 'api/api'
import { useProductAction, useProductInitialState, useProductReducer } from '../provider/_reducer'
import { useEffect } from 'react'
import { getListProductGroup } from 'api/url'
import { useState } from 'react'
const useProductGroup = () => {
    const [state, dispatch] = useReducer(useProductReducer, useProductInitialState)
    useEffect(() => {
        fetchData(state.search)
    }, [state.loading])
    const fetchData = async (q) => {
        try {
            const res = await getData(getListProductGroup(q))
            let arr = []
            if (res.data.success) {
                if(res.data.data){
                    res.data.data.map(item=>{
                        if(item.status == 1) arr.push({item:item.category_name,id:item.id})
                    })
                }
                dispatch({ type: useProductAction.GET_LIST_CATEGORY, payload: res.data.data })
                dispatch({ type: useProductAction.IS_LOADING, payload: true })
                dispatch({type:useProductAction.CATEGORY_LIST,payload:arr})
                dispatch({type:useProductAction.ARR_CATEGORY,payload:arr})
               
            }
        } catch (er) {
            console.log(er);
        }
    }
    return {
        provider: { state, dispatch },
    }
}
export default useProductGroup