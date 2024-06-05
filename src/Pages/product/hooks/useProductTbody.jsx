import React, {useContext, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useProductTbody = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const displayList = pageState?.table?.display
  const confirmProductStatus = pageState?.modal?.confirmProductStatus
  const confirmRemoveProduct = pageState?.modal?.confirmRemoveProduct
  const confirmProductDetail = pageState?.modal?.confirmProductDetailStatus
  const confirmProductGroupStatus = pageState?.modal?.confirmProductGroupStatus
  const [debounceFetch, setDebounceFetch] = useState(true)
  const detailList = pageState?.table?.detail.list
  const hasProduct = pageState?.table?.listDefault?.length === 0 && pageState?.filter?.keyword?.length === 0

  const filter = pageState?.filter
  const amount = pageState?.table.pagination?.amount
  const queries = {
    keyword: filter?.keyword || '',
    category_id: filter?.category_id?.id || '',
    status: filter?.status?.id || '',
    per_page: +amount || 20,
    start: +pageState.table?.pagination?.active * (+amount || 20),
  }
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
              active: (+response?.data?.meta?.start / (response?.data?.meta?.per_page || 20)) || 0,
              amount: response?.data?.meta?.per_page || 20,
              total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
              totalItems: response?.data?.meta?.total,
            }
          },
        })
      }
    }
  }
  const fetchRowDetailStatus= async (id) => {
    const response = await sendRequestAuth(
        'get',
        `${config.API}/product/detail/${id}`,
    )
    if (response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: productActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {id: id, active: newItem, list: [...detailList, newItem]},
      })
    }
  }
  const handleCloseConfirmProductStatus = _ =>{
    pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_STATUS, payload: false})
    pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_DETAIL_STATUS, payload: false})
  }

  const handleCloseRemoveProduct = _ => pageDispatch({type: productActions.MODAL_CONFIRM_REMOVE_PRODUCT, payload: false})

  const [debounceSubmitProductStatus, setDebounceSubmitProductStatus] = useState(true)
  const handleSubmitChangeProductStatus = async _ => {
    if(debounceSubmitProductStatus) {
      setDebounceSubmitProductStatus(false)
      setTimeout(() => setDebounceSubmitProductStatus(true), 1000)

      pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_STATUS, payload: false})
      const data = pageState?.modal?.dataChangeProductStatus
      let dataChangeStatus = {
        id: [data?.id],
        product_id_details: [],
        status: data?.status === '2' ? '1' : '2'
      }
      const response = await sendRequestAuth(
        'post',
        `${config.API}/product/active`, JSON.stringify(dataChangeStatus),
      ).catch(() => toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INACTIVE_FAILED)))
      if(response?.data?.success) {

        toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INACTIVE_SUCCESS))
        if(detailList.length > 0 && detailList[0].id === data?.id){
          fetchProductByFilter(queries)
          fetchRowDetailStatus(data?.id)
        }else{
          fetchProductByFilter(queries)
        }
      } else {toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INACTIVE_FAILED))}
    }
  }
  const [debounceSubmitProductDetailStatus, setDebounceSubmitProductDetailStatus] = useState(true)
  const handleSubmitChangeProductDetailtatus = async _ => {
    if(debounceSubmitProductDetailStatus) {
      setDebounceSubmitProductDetailStatus(false)
      setTimeout(() => setDebounceSubmitProductDetailStatus(true), 1000)

      pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_DETAIL_STATUS, payload: false})
      const data = pageState?.modal?.dataChangeProductDetailStatus
      let dataChangeStatus = {
        id: [],
        product_id_details: [data?.id],
        status: data?.status === '2' ? '1' : '2'
      }
      const response = await sendRequestAuth(
        'post',
        `${config.API}/product/active`, JSON.stringify(dataChangeStatus),
      ).catch(() => toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INACTIVE_FAILED)))
      if(response?.data?.success) {
        toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.INACTIVE_SUCCESS))
      }

      fetchProductByFilter(queries)
      fetchRowDetailStatus(pageState?.table?.detail?.active?.id)
    }
  }
  const [debounceRemoveProduct, setDebounceRemoveProduct] = useState(true)
  const handleSubmitRemoveProduct = async _ => {
    if(debounceRemoveProduct) {
      setDebounceRemoveProduct(false)
      setTimeout(() => setDebounceRemoveProduct(true), 2000)

      const data = pageState?.modal?.dataRemoveProduct
      const response = await sendRequestAuth( 'delete', `${config.API}/product/delete/${data?.id}`
      ).catch(() => toast.error(t(DISPLAY_NAME_MENU.GENERAL.API_ERROR)))
      if(response?.data?.success) {
        toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.DELETE_PRODUCT_SUCCESS))
        fetchProductByFilter(queries)
      } else {toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.DELETE_PRODUCT_FAILED))}

      pageDispatch({type: productActions.MODAL_CONFIRM_REMOVE_PRODUCT, payload: false})
    }
  }

  const handleSubmitChangeProductGroupStatus = async _ => {
    pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_STATUS, payload: false})
    const data = pageState?.modal?.dataChangeProductStatus
    const response = await sendRequestAuth(
      'post',
      `${config.API}/product/active`, JSON.stringify(data),
    ).catch(() => toast.error('Lỗi API, thay đổi trạng thái sản phẩm thất bại'))
    if(response?.data?.success) {
      pageDispatch({
        type: productActions.TABLE_SELECTED_LIST_UPDATE,
        payload: {selected: {list: []}},
      })
      toast.success(response?.data?.message)
      fetchProductByFilter(queries)
    }
  }

  return {
    displayList,
    hasProduct,
    value: {

    },
    functions: {
      handleCloseConfirmProductStatus,
      handleSubmitChangeProductStatus,
      handleCloseRemoveProduct,
      handleSubmitRemoveProduct,
      handleSubmitChangeProductDetailtatus,
      handleSubmitChangeProductGroupStatus,
    },
    modal: {
      confirmProductStatus,
      confirmRemoveProduct,
      confirmProductDetail,
      confirmProductGroupStatus
    }
  }
}

export default useProductTbody;