import { getData } from "api/api"
import { getUrlDetailUserManagement } from "api/url"
import React, { useContext } from "react"
import { UserManagementContext } from "../provider/_context"
import { userManagementActions } from "../provider/_reducer"

export const useDetailRow = (id) => {
  const { pageState, pageDispatch } = useContext(UserManagementContext)
  const detailActive = pageState.detailActive
  const detailList = pageState.detailList
  const shouldOpenDetail = id && detailActive?.user_id === id
  const fetchRowDetail = async (id) => {
    const response = await getData(getUrlDetailUserManagement(id))
    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: userManagementActions.DETAIL_ACTIVE,
        payload: newItem,
      })
      pageDispatch({
        type: userManagementActions.DETAIL_LIST,
        payload: [...detailList, newItem],
      })
      pageDispatch({
        type: userManagementActions.LOADING_DETAIL,
        payload: true,
      })
    }
    
  }

  const rowDetailToggle = async (id) => {
    if (!id) return
    if (id === detailActive?.user_id) {
      pageDispatch({
        type: userManagementActions.DETAIL_ACTIVE,
        payload: null,
      })
      return
    }
    const findDetail = detailList.find(item => item?.user_id === id)

    if (findDetail) {
      pageDispatch({
        type: userManagementActions.DETAIL_ACTIVE,
        payload: findDetail,
      })
    }
    fetchRowDetail(id)
  }
  return {
    fetchRowDetail,
    rowDetailToggle,
    detailActive,
    id,
    shouldOpenDetail,
  }
}