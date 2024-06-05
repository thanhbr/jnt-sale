import React, {useContext, useEffect, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {productActions} from "../provider/~action";
import toast from "../../../Component/Toast";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";
import {useTranslation} from "react-i18next";

const useProductRow = data => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const {table} = pageState

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list
  const selectedList = table.selected.list

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    if (search && table.display.list?.length === 1) {
      handleToggleDetail()
    }
  }, [search])

  const shouldOpenDetail = data?.id && detailActiveId === data?.id
  const isSelected = !!selectedList.find(item => item?.id === data?.id)
  const rowCheckboxChange = () => {
    const newSelectedList = isSelected
                          ? selectedList.filter(item => item?.id !== data?.id)
                          : [...selectedList, data]
    pageDispatch({
      type: productActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: { list: newSelectedList },
      },
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

  const handleToggleDetail = async () => {
    if(!!!data?.id) return

    if (data.id === detailActiveId) {
      pageDispatch({
        type: productActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: {id: null},
      })
      pageDispatch({
        type: productActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })
      return
    }

    pageDispatch({
      type: productActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: {id: data.id},
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: productActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: findDetail},
      })
    }

    fetchRowDetail()
  }

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/detail/${data.id}`,
    )
    if (response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: productActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {id: data.id, active: newItem, list: [...detailList, newItem]},
      })

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
  const handleChangeProductStatus = async data => {
    if(table?.debounceProductStatus) {
      pageDispatch({type: productActions.TABLE_DEBOUNCE_CHANGE_PRODUCT_STATUS, payload: false})
      setTimeout(() => pageDispatch({type: productActions.TABLE_DEBOUNCE_CHANGE_PRODUCT_STATUS, payload: true}), 2000)

      if(data?.status === '1') {
        pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_STATUS, payload: true})
        pageDispatch({type: productActions.DATA_CHANGE_PRODUCT_STATUS, payload: data})
      } else {
        const dataChangeStatus = {
          id: [data?.id],
          product_id_details: [],
          status: data?.status === '2' ? '1' : '2'
        }

        const response = await sendRequestAuth(
          'post',
          `${config.API}/product/active`, JSON.stringify(dataChangeStatus),
        ).catch(() => toast.error('Lỗi API, thay đổi trạng thái sản phẩm thất bại'))
        if(response?.data?.success) {
          toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_SUCCESS))
          fetchProductByFilter(queries)
          if(data?.id === detailList[0]?.id) fetchRowDetailStatus(data?.id)
        } else {toast.error('Thay đổi sản phẩm thất bại')}
      }
    }
  }
  const handleChangeProductDetailStatus = async data => {
    if(table?.debounceProductStatus) {
      pageDispatch({type: productActions.TABLE_DEBOUNCE_CHANGE_PRODUCT_STATUS, payload: false})
      setTimeout(() => pageDispatch({type: productActions.TABLE_DEBOUNCE_CHANGE_PRODUCT_STATUS, payload: true}), 2000)

      if(data?.status === '1') {
        pageDispatch({type: productActions.MODAL_CONFIRM_PRODUCT_DETAIL_STATUS, payload: true})
        pageDispatch({type: productActions.DATA_CHANGE_PRODUCT__DETAIL_STATUS, payload: data})
      } else {
        const dataChangeStatus = {
          id: [],
          product_id_details: [data?.id],
          status: data?.status === '2' ? '1' : '2'
        }

        const response = await sendRequestAuth(
            'post',
            `${config.API}/product/active`, JSON.stringify(dataChangeStatus),
        ).catch(() => toast.error('Lỗi API, thay đổi trạng thái sản phẩm thất bại'))
        if(response?.data?.success) {
          toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ACTIVE_SUCCESS))
          fetchProductByFilter(queries)
          fetchRowDetailStatus(pageState?.table?.detail?.active?.id)
        } else {toast.error('Thay đổi sản phẩm thất bại')}
      }
    }
  }

  const navigate = useNavigate()
  const handlePrint = async _ => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/detail/${data?.id}`,
    )
    if(response?.data?.success) {
      const dataPrint = response?.data?.data?.arr_product_details?.map(item => item.id)?.join(',')
      navigate(`/product/print-barcode/${dataPrint}`)
    } else {
      toast?.error('In mã vạch thất bại')
    }
  }

  const filter = pageState?.filter
  const amount = pageState?.table.pagination?.amount
  const queries = {
    keyword: filter?.keyword || '',
    category_id: filter?.category_id?.id || '',
    status: filter?.status?.id || '',
    per_page: +amount || 20,
    start: +pageState.table?.pagination?.active * (+amount || 20),
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

  const handleRemoveProduct = async data => {
    pageDispatch({type: productActions.MODAL_CONFIRM_REMOVE_PRODUCT, payload: true})
    pageDispatch({type: productActions.DATA_REMOVE_PRODUCT_TBODY, payload: data})
  }
  const handleCheckBoxTabDetail = id => {
    const list = pageState?.tab?.list_id
    const isSelected = !!list?.find(item => item === id)
    pageDispatch({type:productActions.CHECK_LIST_TAB_ID,
                payload:isSelected ? list.filter(item=>item!==id) : [...list, id]})
  }
  return {
    row: {
      data,
      shouldOpenDetail,
      isSelected,
      onCheckboxChange: rowCheckboxChange,
      onToggleDetail: handleToggleDetail,
    },
    detail: {
      id: data?.id,
      active: detailActive,
      listID: pageState?.tab?.list_id
    },
    functions: {
      handleChangeProductStatus,
      handleRemoveProduct,
      handleChangeProductDetailStatus,
      handlePrint
    },
    handleCheckBoxTabDetail,
  }
}

export default useProductRow;