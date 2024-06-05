import { getData, sendRequestAuth } from "api/api"
import { getListProductGroup } from "api/url"
import config from "config"
import { useEffect } from "react";
import { useProductAction } from "../provider/_reducer";

export const useProductSearch = (pageState, pageDispatch) => {
    useEffect(() => {
        const timeOutId = setTimeout(() => {
          const fetchData = async () => {
            const response = await await getData(getListProductGroup(pageState.search))
            if(response.data.success)
             pageDispatch({type:useProductAction.GET_LIST_CATEGORY,payload:response.data.data})
          }
          fetchData()
        }, 500)
        return () => clearTimeout(timeOutId)
      }, [pageState.search]);
    const handleSearch = (e) => {
        let { value } = e.target;
        pageDispatch({type:useProductAction.SET_SEARCH,payload:value.trim()})
    }
    return {
        handleSearch,
    }
}