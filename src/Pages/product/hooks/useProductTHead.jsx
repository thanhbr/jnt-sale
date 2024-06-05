import React, {useContext, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useProductTHead = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const {table} = pageState

  const displayList = table.display.list
  const selectedList = table.selected.list
  const filter = pageState?.filter

  const shouldActiveCheckbox = selectedList.length > 0
  const isActive =
    displayList.length <= 0
      ? false
      : selectedList.length < displayList.length
      ? false
      : !!!displayList.find(
        item => !!!selectedList.find(find => find?.id === item?.id),
      )

  const handleCheckboxChange = async _ => {
    let newSelectedList = []
    if (isActive)
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.id === item?.id),
      )
    else {
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.id === item?.id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }
    pageDispatch({
      type: productActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: newSelectedList}},
    })

    let result = []
    newSelectedList?.map(async (item, index) => {
      const responseIdDefault = await sendRequestAuth('get', `${config.API}/product/detail/${item?.id}`)
      if (responseIdDefault?.data?.success) {
        responseIdDefault?.data?.data?.arr_product_details?.map(it => {
          result.push(it?.id)
        })
      }
      if(index === newSelectedList?.length - 1) {
        const listDefault = pageState?.tab?.list_id
        pageDispatch({
          type: productActions.CHECK_LIST_TAB_ID,
          payload: [...new Set([...listDefault, ...result])]
        })
      }
      return item
    })
  }

  const checkFullPageChecked = () => {
    let checkFullPage = true
    displayList.forEach(item => {
      const findItem = selectedList?.find(find => find.id === item.id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }

  // SELECTED ACTION DROPDOWN
  const [shouldOpenSelectedActionMenu, setShouldOpenSelectedActionMenu] = useState(false)

  const navigate = useNavigate()
  const handleItemClick = type => {
    const dataChangeStatus = pageState?.table?.selected?.list?.map(item => {return item?.id})
    const dataPrint = pageState?.tab?.list_id?.join(',')
    let data = {}

    switch (type) {
      case 'print':
        navigate(`/product/print-barcode/${dataPrint}`)
        break
      case 'active':
        data = {
          id: dataChangeStatus,
          product_id_details: '',
          status: '1'
        }
        handleSubmitChangeProductStatus(data)
        break
      case 'deActive':
        data = {
          id: dataChangeStatus,
          product_id_details: '',
          status: '2'
        }
        pageDispatch({type: productActions.DATA_CHANGE_PRODUCT_STATUS, payload: data})
        handleSubmitChangeProductStatus(data)
        break
      default: break
    }
  }

  const [debounceSubmitProductStatus, setDebounceSubmitProductStatus] = useState(true)
  const handleSubmitChangeProductStatus = async data => {
    if(debounceSubmitProductStatus) {
      setDebounceSubmitProductStatus(false)
      setTimeout(() => setDebounceSubmitProductStatus(true), 2000)

      if(data?.status === '2') {
        pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_STATUS, payload: true})
        pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_GROUP_STATUS, payload: true})
        pageDispatch({type: productActions.DATA_CHANGE_PRODUCT_STATUS, payload: data})
      } else {
        const response = await sendRequestAuth(
          'post',
          `${config.API}/product/active`, JSON.stringify(data),
        ).catch(() => toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_FAILED)))
        if(response?.data?.success) {
          toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_SUCCESS))
          fetchProductByFilter(queries)
          pageDispatch({
            type: productActions.TABLE_SELECTED_LIST_UPDATE,
            payload: {selected: {list: []}},
          })
        } else {
          toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_FAILED))
        }
      }
    }
  }
  const queries = {
    keyword: filter?.keyword || '',
    category_id: filter?.category_id?.id || '',
    status: filter?.status?.id || '',
    per_page: '',
    start: 0,
  }
  const [debounceFetch, setDebounceFetch] = useState(true)
  const fetchProductByFilter = async (qs) => {
    if(debounceFetch) {
      setDebounceFetch(false)
      setTimeout(() => setDebounceFetch(true), 2000)
      let queryString = '?'
      let i = 0
      for (const [key, value] of Object.entries(qs)) {
        queryString += `${i > 0 ? '&' : ''}${key}=${value}`
        i++
      }

      const response = await sendRequestAuth(
        'get',
        `${config.API}/product/list${queryString}`,
      )
      if(response?.data?.success) {
        pageDispatch({
          type: productActions.TABLE_AMOUNT_UPDATE,
          payload: {
            display: {
              list: response?.data?.data,
            },
            pagination: {
              active: response?.data?.meta?.start || 0,
              amount: response?.data?.meta?.per_page || 20,
              total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
              totalItems: response?.data?.meta?.total,
            }
          },
        })
      }
    }
  }

  return {
    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
      checkFullPageChecked
    },
    selected: {
      actionMenu: {
        open: shouldOpenSelectedActionMenu,
        onToggle: setShouldOpenSelectedActionMenu,
      },
      list: selectedList,
    },
    functions: {
      handleItemClick
    }
  }
}

export default useProductTHead;