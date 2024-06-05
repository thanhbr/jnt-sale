import {useContext, useEffect, useState} from "react";
import {PaymentMethodContext} from "../provider/~context";
import {deleteData, postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {paymentMethodActions} from "../provider/~reducer";
import toast from "../../../Component/Toast";
import {UposLogFunc} from "../../../util/functionUtil";

const useTableBody = () => {
  const { pageState, pageDispatch } = useContext(PaymentMethodContext)
  const checkedPayment = pageState.list_pm_active
  const isCheckAll = pageState.toggleAllCheckbox
  const inputSearch = pageState.search
  const isCheckStatus = pageState.isCheckStatus
  const [debounceChangeStatus, setDebounceChangeStatus] = useState(true)

  const fetchDataPayment = async () => {
    pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: true })
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=${inputSearch}&per_page=20&start=0`),
    ])
    pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: false })
    if (response[0]?.data?.success) {
      const amount = pageState?.paginate?.amount || 20
      pageDispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
      pageDispatch({
        type: paymentMethodActions.SET_PAGINATION, payload: {
          active: 0,
          amount: amount,
          total: Math.ceil(response[0]?.data?.meta?.total / amount),
          totalItems: response[0]?.data?.meta?.total,
        }
      })
    }
  }

  const [isInit, setIsInit] = useState(true)
  useEffect(() => {
    if (isInit) return setIsInit(false)
    const timeOutId = setTimeout(() => {
      fetchDataPayment()
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [inputSearch])

  const [debounceRefresh, setDebounceRefresh] = useState(true)
  const refresh = () => {
    if(debounceRefresh) {
      setDebounceRefresh(false)
      const fetchPM = async () => {
        pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: true })

        const amount = pageState?.paginate?.amount || 20
        const page = pageState?.paginate?.active || 0
        const response = await Promise.all([
          sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=${inputSearch}&per_page=${amount}&start=${page*amount}`),
        ])
        pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: false })
        if (response[0]?.data?.success) {
          pageDispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
          pageDispatch({
            type: paymentMethodActions.SET_PAGINATION, payload: {
              active: page,
              amount: amount,
              total: Math.ceil(response[0]?.data?.meta?.total / amount),
              totalItems: response[0]?.data?.meta?.total,
            }
          })
        }
      }
      fetchPM()
      setTimeout(() => setDebounceRefresh(true), 1000)
    }
  }

  const handleOpenPopup = () => {
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CREATE, payload: true })
  }

  const toggleItem = id => {
    const isChecked = checkedPayment.includes(id)
    const rules = isChecked ? checkedPayment.filter(item => item !== id) : [...checkedPayment, id]
    pageDispatch({
      type: paymentMethodActions.LIST_PAYMENT_METHOD_ACTIVE,
      payload: { list_pm_active: rules}
    })
  }

  const displayList = pageState?.list_payment_method?.filter(item => item.is_active !== '1')
  const selectedList = pageState?.list_pm_active

  const [debounceCheckAll, setDebounceCheckAll] = useState(true)
  const toggleAll = () => {
    // if(!isCheckAll) {
    let result = selectedList
    displayList.map(item => {
      if(!!result?.find(it => it === item.id)) {
        result = result.filter(it => it !== item.id)
      } else {
        result = [...result, item.id]
      }
    })
    pageDispatch({ type: paymentMethodActions.LIST_PAYMENT_METHOD_ACTIVE, payload: { list_pm_active: result} })
    pageDispatch({ type: paymentMethodActions.TOGGLE_ALL_CHECKBOX, payload: result?.length > 0})

    if(debounceCheckAll) {
      setDebounceCheckAll(false)
      if(pageState?.list_payment_method?.find(item => item.is_active === '1')) toast.warning('Hệ thống sẽ không chọn phương thức thanh toán mặc định!')
      setTimeout(() => setDebounceCheckAll(true), 2000)
    }
  }

  const toggleActive = (id, isActive) => {
    if (id && isActive !== '1' && debounceChangeStatus) {
      const paymentMethodActive = pageState?.list_payment_method.find(item => +item.id === +id)
      const paymentMethodList = pageState?.list_payment_method
      const changeStatus = paymentMethodActive?.status === '1' ? '-1' : '1'
      pageDispatch({
        type: paymentMethodActions.IS_CHECKED_STATUS,
        payload: { ...isCheckStatus,  [id]: id in isCheckStatus ? isCheckStatus[id] === '1' ? '-1' : '1' : changeStatus}
      })
      pageDispatch({
        type: paymentMethodActions.LIST_PAYMENT_METHOD,
        payload: paymentMethodList?.map(item => {
          if(+item.id === +id) {
            item.status = +item?.status === 1 ? '-1' : '1'
          }
          return item
        })
      })
      setDebounceChangeStatus(false)
      const url = `${config.API}/payment/active`

      const data = {
        'id': [`${paymentMethodActive?.id}`] || '',
        'status': changeStatus
      }
      const dataPost = JSON.stringify(data)
      postData(url, dataPost)
        .then(response => {
          if (response.data && response.data.success) {
            toast.success({ title: (id in isCheckStatus ? isCheckStatus[id] === '1' ? '-1' : '1' : changeStatus) === '1' ? 'Kích hoạt phương thức thanh toán thành công.' : 'Ngưng kích hoạt phương thức thanh toán thành công.' })
          } else {
            toast.error({ title: 'Thay đổi trạng thái sử dụng thất bại!' })
          }
        })
        .catch(e => {
          UposLogFunc(`ERROR CREATE USER: ${e.message}`)
        })
      setTimeout(() =>  setDebounceChangeStatus(true), 2000)
    }
  }

  const handleToggleActive = active => {
    const url = `${config.API}/payment/active`
    const paymentMethodActive = pageState?.list_payment_method.filter(item => pageState?.list_pm_active.includes(item.id))
    // const listPayment = paymentMethodActive.map( item => item.id)
    const listPayment = pageState?.list_pm_active
    const data = {
      'id': listPayment || '',
      'status': active ? '1' : '-1'
    }

    let allActive = {}
    paymentMethodActive.map( item => {
      allActive[item.id] =  active ?  '1' : '-1'
    })
    pageDispatch({ type: paymentMethodActions.IS_CHECKED_STATUS, payload: allActive })

    const dataPost = JSON.stringify(data)
    postData(url, dataPost)
      .then(response => {
        if (response.data && response.data.success) {
          toast.success({ title: active ? 'Kích hoạt phương thức thanh toán thành công.' : 'Ngưng kích hoạt phương thức thanh toán thành công.' })
        } else {
          toast.error({ title: 'Thay đổi trạng thái thất bại!' })
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR CREATE USER: ${e.message}`)
      })
  }

  const editPaymentMethod = payment => {
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_EDIT, payload: true })
    pageDispatch({ type: paymentMethodActions.PM_ACTIVE, payload: { pm_active: payment} })

    pageDispatch({ type: paymentMethodActions.MODAL_FORM_EDIT, payload: {name: payment?.name , is_active: payment?.is_active, status: payment?.status} })
  }

  const deleteItem = payment => {
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM_DELETE, payload: true })
    pageDispatch({ type: paymentMethodActions.DATA_DELETE_ITEM, payload: payment })
  }
  const confirmDeleteItem = () => {
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM_DELETE, payload: false })
    const url = `${config.API}/payment/delete`
    const data = {
      'id': [`${pageState.dataDeleteItem?.id}`] || '',
    }
    const dataPost = JSON.stringify(data)
    deleteData(url, dataPost)
      .then(response => {
        if (response.data && response.data.success) {
          toast.success({ title: 'Xóa phương thức thanh toán thành công.' })

          // LOAD PAGE
          const fetch = async () => {
            pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: true })
            const response = await Promise.all([
              sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=&per_page=20&start=0`),
            ])
            pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: false })
            if (response[0]?.data?.success) {
              pageDispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
              pageDispatch({type: paymentMethodActions.SET_PAGINATION, payload: {
                  active: pageState.paginate.active,
                  amount: pageState.paginate.amount,
                  total: Math.ceil(response[0]?.data?.data.length / pageState.paginate.amount),
                  totalItems: response[0]?.data?.data.length,
                }})
            }
          }
          fetch()
        } else {
          toast.error({ title: 'Xóa phương thức thanh toán thất bại!' })
        }
      })
      .catch(e => {
        UposLogFunc(`ERROR DELETE PAYMENT METHOD: ${e.message}`)
      })
  }

  return {
    value: {
      checkedPayment,
      isCheckAll,
      isCheckStatus,
    },
    functions: {
      refresh,
      handleOpenPopup,
      toggleItem,
      toggleAll,
      toggleActive,
      handleToggleActive,
      editPaymentMethod,
      deleteItem,
      confirmDeleteItem,
    }
  }
}
export default useTableBody