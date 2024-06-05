import { useCallback, useContext, useState } from 'react'
import { PosOrderContext } from '../provider/_context'
import { posOrderActions, posOrderActions as actions } from '../provider/_actions'
import { debounce } from '@mui/material'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import useAlert from '../../../hook/useAlert'
import { highlightGroupProduct } from '../until/transform'
import ArrayUtils from '../../purchases/utils/array'
import { transformProductData } from '../../purchases/utils/transform'

export const usePosQuickProduct = () => {

  const { state, dispatch } = useContext(PosOrderContext)
  const { showAlert } = useAlert()
  const [groupParent, setGroupParent] = useState('')
  const { products } = state
  const { filter } = products
  const { shortcut } = products

  const { warehouse } = state.orders
  const activeOrder = state.orders.active

  const warehouseActive = warehouse?.length > 0 ? warehouse.find(item => item.id == activeOrder) : {}

  const handleShowQuickProduct = _ => {
    dispatch({
      type: actions.QUICK_PRODUCT_TOGGLE_UPDATE,
      payload: !products.show
    })
  }

  // ===== ===== ===== GROUP PRODUCT ===== ===== =====
  const groupProductID = filter?.groupProduct?.id
  const groupProductActiveValue = filter?.groupProduct?.activeValue
  const groupProductSearch = filter?.groupProduct?.search
  const groupProductValue = filter?.groupProduct?.value
  const groupProductList = filter?.groupProduct?.list
  const groupProductListChildTwo = filter?.groupProduct?.listChildTwo

  const handleGroupProductKeywordChange = data => {
    debounceGroupProductKeywordChange(data?.value)
  }

  const debounceGroupProductKeywordChange = useCallback(
    debounce((keyword) => {
      handleGroupProductSearch(keyword?.trim())
    }, 500),
    [],
  )

  const handleGroupProductSearch = async keyword => {
    const response = await sendRequestAuth('get', `${config.API}/product/category/list?keyword=${keyword}&status&per_page=200&start=0`)
    if (response?.data?.success) {
      dispatch({
        type: actions.FILTER_GROUP_PRODUCT_CHANGE_KEYWORD,
        payload: {
          keyword: keyword,
          list: highlightGroupProduct(keyword, response?.data?.data)
        }
      })
    }
  }

  const handleSelectParent = (target, value) => {
    dispatch({
      type: actions.FILTER_GROUP_PRODUCT_UPDATE_LIST_CHILDREN_TWO,
      payload: value?.category_childs
    })

    if (value?.category_childs?.length !== 0) {
      target.stopPropagation()
      setGroupParent(value?.category_name)
    } else {
      dispatch({
        type: actions.FILTER_GROUP_PRODUCT_UPDATE_VALUE,
        payload: value?.category_name
      })
      dispatch({
        type: actions.FILTER_GROUP_PRODUCT_CHANGE_ID,
        payload: value?.id
      })
      handleFetchProduct(value?.id)
    }
  }

  const handleSelectChild = value => {
    dispatch({
      type: actions.FILTER_GROUP_PRODUCT_CHANGE_ID,
      payload: !!value ? value?.id : ''
    })
    dispatch({
      type: actions.FILTER_GROUP_PRODUCT_UPDATE_VALUE,
      payload: !!value ? `${groupParent} - ${value?.category_name}` : ''
    })
    handleFetchProduct(value?.id)
  }

  const handleSelectSearchParent = value => {
    dispatch({
      type: actions.FILTER_GROUP_PRODUCT_CHANGE_ID,
      payload: value?.id
    })
    dispatch({
      type: actions.FILTER_GROUP_PRODUCT_UPDATE_VALUE,
      payload: value?.parent_code ? `${value?.parent_name} - ${value?.category_name}` : value?.category_name
    })
    handleFetchProduct(value?.id)
  }

  const handleFetchProduct = async (categoryId = '', opt = { perPage: 20, start: 0 }) => {
    dispatch({
      type: actions.SET_LOADING,
      payload: true
    })
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId}&is_inventory=1&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=${opt.perPage}&start=${opt.start}`,
    )
    const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)

    dispatch({
      type: actions.QUICK_PRODUCT_UPDATE,
      payload: {
        list: formatProductList,
        meta: productResponse.data?.meta
      }
    })

    dispatch({
      type: actions.SET_LOADING,
      payload: false
    })

  }

  const [loadingMore, setLoadingMore] = useState(false)
  const onLoadMore = async () => {
    if (loadingMore) return
    const currentTotal = state.products.list.length
    const total = state.products.meta.total
    if (currentTotal >= total) return
    setLoadingMore(true)
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${groupProductID}&is_inventory=1&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=20&start=${state.products.list.length}`,
    )
    if (!!productResponse.data.success) {
      const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)
      //
      dispatch({
        type: actions.QUICK_PRODUCT_UPDATE,
        payload: {
          list: [...state.products.list, ...formatProductList],
          meta: productResponse.data?.meta
        }
      })
      setLoadingMore(false)
    }
  }

  // ===== ===== ===== END GROUP PRODUCT ===== ===== =====

  const sort = filter.sort

  const handleSortChange = data => {
    console.log(data)
  }

  const handleTypeViewChange = data => {
    dispatch({
      type: actions.UPDATE_TYPE_VIEW_PRODUCT,
      payload: data
    })
  }

  const handleDisplayModalShortcut = boo => {
    dispatch({
      type: actions.UPDATE_STATUS_MODAL_SHORTCUT,
      payload: boo
    })
  }
  return {
    data: {
      products
    },
    func: {
      handleShowQuickProduct,
      onLoadMore
    },
    groupProduct: {
      id: groupProductID,
      active: groupProductActiveValue,
      search: groupProductSearch,
      value: groupProductValue,
      list: groupProductList,
      listChildTwo: groupProductListChildTwo,
      onSelectParent: handleSelectParent,
      onSelectChild: handleSelectChild,
      onSelectSearchParent: handleSelectSearchParent,
      onGroupProductKeywordChange: handleGroupProductKeywordChange
    },
    sort: {
      ...sort,
      onChange: handleSortChange
    },
    typeView: {
      value: products.typeView,
      onChange: handleTypeViewChange
    },
    modalShortcut: {
      shortcut: shortcut,
      onClickShortcut: handleDisplayModalShortcut
    }
  }

}