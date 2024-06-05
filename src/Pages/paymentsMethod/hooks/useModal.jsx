import {useContext, useState} from "react";
import {paymentMethodActions} from "../provider/~reducer";
import {PaymentMethodContext} from "../provider/~context";
import config from "../../../config";
import {postData, sendRequestAuth} from "../../../api/api";
import toast from "../../../Component/Toast";

const useModal = () => {
  const { pageState, pageDispatch } = useContext(PaymentMethodContext)
  const [closeModalRole, setCloseModalRole] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [isChangeEdit, setIsChangeEdit] = useState(false)
  const openModalCreate = pageState.openModalCreate
  const openModalConfirm = pageState.openModalConfirm
  const openModalEdit = pageState.openModalEdit
  const paymentMethodName = pageState.formCreate.name
  const paymentMethodIsActive = pageState.formCreate.is_active
  const paymentMethodStatus = pageState.formCreate.status
  const editPaymentMethodName = pageState.formEdit.name
  const editPaymentMethodIsActive = pageState.formEdit.is_active
  const editPaymentMethodStatus = pageState.formEdit.status === '1' || pageState.formEdit.status === true
  const paymentMethodActive = pageState.pm_active
  const isCheckStatus = pageState.isCheckStatus

  const onCloseModalPaymentMethod = () => {
    if(isChange) {
      pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM, payload: true })
    } else {
      //CLOSE MODAL ROLE
      setCloseModalRole(true)
      pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: '' , is_active: false, status: true} })
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: false, message: '' } })
      setTimeout(() => {
        pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CREATE, payload: false })
        setCloseModalRole(false)
      }, 300)
    }
  }

  const onCloseEditModalPaymentMethod = () => {
    if(isChangeEdit) {
      pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM, payload: true })
    } else {
      //CLOSE MODAL ROLE
      setCloseModalRole(true)
      pageDispatch({ type: paymentMethodActions.MODAL_FORM_EDIT, payload: {name: '' , is_active: false, status: true} })
      setTimeout(() => {
        pageDispatch({type: paymentMethodActions.OPEN_MODAL_EDIT, payload: false})
        setCloseModalRole(false)
      }, 300)
    }
  }

  const onSubmitPaymentMethod = () => {
    if(!!!pageState?.formCreate?.name) {
      if (!!!pageState?.formCreate?.name) {
        pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: true, message: 'Phương thức thanh toán không được bỏ trống!' } })
      }
      return
    }
    const url = `${config.API}/payment/create`
    const data = {
      'name': pageState.formCreate?.name?.trim() || '',
      'is_active': pageState.formCreate?.is_active ? '1' : '0',
      'status': pageState.formCreate?.status ? '1' : '-1'
    }
    const dataPost = JSON.stringify(data)
    postData(url, dataPost)
      .then(response => {
        if (response.data && response.data.success) {
          toast.success('Thêm mới phương thức thanh toán thành công.')
          //CLOSE MODAL ROLE
          setCloseModalRole(true)
          setTimeout(() => {
            pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CREATE, payload: false })
            setCloseModalRole(false)
          }, 300)

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

          // CLEAN FORM
          pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: '' , is_active: false, status: true} })
        } else {
          toast.error('Thêm mới phương thức thanh toán thất bại!')
        }
      })
      .catch(() => { toast.error('Thêm mới phương thức thanh toán thất bại!')
      })
  }

  const [debounceSubmitEdit, setDebounceSubmitEdit] = useState(true)

  const onSubmitPaymentMethodEdit = id => {
    if(!!!pageState?.formEdit?.name) {
      if (!!!pageState?.formEdit?.name) {
        pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME, payload:{ status: true, message: 'Phương thức thanh toán không được bỏ trống!' } })
      }
      return
    }
    const url = `${config.API}/payment/update/${id}`
    const data = {
      'name': pageState.formEdit?.name?.trim() || '',
      'is_active': editActiveModal,
      'status': pageState.formEdit?.status ? '1' : '-1'
    }
    const dataPost = JSON.stringify(data)
    if(debounceSubmitEdit) {
      setDebounceSubmitEdit(false)
      postData(url, dataPost)
        .then(response => {
          if (response.data && response.data.success) {
            toast.success('Cập nhật phương thức thanh toán thành công.')
            //CLOSE MODAL ROLE
            setCloseModalRole(true)
            setTimeout(() => {
              pageDispatch({ type: paymentMethodActions.OPEN_MODAL_EDIT, payload: false })
              setCloseModalRole(false)
              setDebounceSubmitEdit(true)
            }, 300)

            // LOAD PAGE
            const fetch = async () => {
              pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: true })
              const response = await Promise.all([
                sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=&per_page=${pageState.paginate.amount}&start=${pageState.paginate.active}`),
              ])
              pageDispatch({ type: paymentMethodActions.SET_LOADING, payload: false })
              if (response[0]?.data?.success) {
                pageDispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
                pageDispatch({type: paymentMethodActions.SET_PAGINATION, payload: {
                    active: pageState.paginate.active,
                    amount: pageState.paginate.amount,
                    total: Math.ceil(pageState.paginate.totalItems / pageState.paginate.amount),
                    totalItems: pageState.paginate.totalItems,
                  }})
              }
            }
            fetch()
          } else if (response.data.code === 105) {
            toast.error(response.data.message)
            setTimeout(() => {
              setDebounceSubmitEdit(true)
            }, 2000)
          }
          else {
            toast.error('Cập nhật phương thức thanh toán thất bại!')
            setTimeout(() => {
              setDebounceSubmitEdit(true)
            }, 2000)
          }
        })
        .catch(() => { toast.error('Cập nhật phương thức thanh toán thất bại!')
        })
    }
  }

  const closeModalPaymentMethodConfirm = () => {
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM, payload: false })
  }

  const acceptanceModalPaymentMethodConfirm = () => {
    //CLOSE MODAL ROLE
    setCloseModalRole(true)
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM, payload: false })
    pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: false, message: '' } })
    setTimeout(() => {
      pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CREATE, payload: false })
      setCloseModalRole(false)
      pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: '' , is_active: false, status: true} })
    }, 300)
  }

  const acceptanceModalEditPaymentMethodConfirm = () => {
    //CLOSE MODAL ROLE
    setCloseModalRole(true)
    pageDispatch({ type: paymentMethodActions.OPEN_MODAL_CONFIRM, payload: false })
    setTimeout(() => {
      pageDispatch({ type: paymentMethodActions.OPEN_MODAL_EDIT, payload: false })
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME, payload:{ status: false, message: '' } })
      setCloseModalRole(false)
    }, 300)
  }

  const onChangeName = value => {
    setIsChange(true)
    pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: value} })
    if(!!value) {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: false, message: '' } })
    }
  }

  const onChangeEditName = value => {
    setIsChangeEdit(true)
    pageDispatch({ type: paymentMethodActions.MODAL_FORM_EDIT, payload: {name: value} })
    if(!!value) {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME, payload:{ status: false, message: '' } })
    }
  }

  const onBlurName = () => {
    if(!!!paymentMethodName) {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: true, message: 'Phương thức thanh toán không được bỏ trống!' } })
    } else {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME, payload:{ status: false, message: '' } })
    }
  }

  const onBlurEditName = () => {
    if(!!!editPaymentMethodName) {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME, payload:{ status: true, message: 'Phương thức thanh toán không được bỏ trống!' } })
    } else {
      pageDispatch({ type: paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME, payload:{ status: false, message: '' } })
    }
  }

  const toggleStatusPayment = () => pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: paymentMethodName , is_active: paymentMethodIsActive, status: !paymentMethodStatus} })
  const toggleActivePayment = () => pageDispatch({ type: paymentMethodActions.MODAL_FORM_CREATE, payload: {name: paymentMethodName , is_active: !paymentMethodIsActive, status: paymentMethodStatus} })

  const [editActiveModal, setEditActiveModal] = useState(editPaymentMethodIsActive)
  const toggleStatusEditPayment = () => pageDispatch({ type: paymentMethodActions.MODAL_FORM_EDIT, payload: {name: editPaymentMethodName , is_active: editPaymentMethodIsActive, status: !editPaymentMethodStatus}})
  const toggleActivePaymentEdit = () => {
    pageDispatch({
      type: paymentMethodActions.MODAL_FORM_EDIT,
      payload: {name: editPaymentMethodName, is_active: editActiveModal === '1' ? '0' : '1', status: editPaymentMethodStatus}
    })
    setEditActiveModal(editActiveModal === '1' ? '0' : '1')
  }
  return {
    valueForm: {
      openModalCreate,
      openModalConfirm,
      openModalEdit,

      paymentMethodName,
      paymentMethodIsActive,
      paymentMethodStatus,

      editPaymentMethodName,
      editPaymentMethodIsActive,
      editPaymentMethodStatus,
      editActiveModal,

      paymentMethodActive,
      isCheckStatus
    },
    validate: {
      onBlurName,
      onBlurEditName,
      errorName: pageState.validateFormCreate.name,
      errorEditName: pageState.validateFormEdit.name
    },
    functions: {
      onChangeName,
      onChangeEditName,

      onCloseModalPaymentMethod,
      onCloseEditModalPaymentMethod,
      closeModalRole,
      onSubmitPaymentMethod,
      onSubmitPaymentMethodEdit,
      closeModalPaymentMethodConfirm,
      acceptanceModalPaymentMethodConfirm,
      acceptanceModalEditPaymentMethodConfirm,
      toggleActivePayment,
      toggleStatusPayment,
      toggleStatusEditPayment,
      toggleActivePaymentEdit,
    },
  }
}
export default useModal