import React, {useContext, useState} from "react";
import {receiptActions} from "../provider/~initState";
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {ReceiptManagementContext} from "../provider/context";

export const useCreatePaymentModal = () =>{
  const {pageState, pageDispatch} = useContext(ReceiptManagementContext)
  const [closeModal, setCloseModal] = useState(false)
  const [openConfirm, setOpenModal] = useState(false)
  const [openConfirmDuplicate, setOpenModalDuplicate] = useState(false)
  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const displayList = pageState?.table?.display?.list
  const openModalRemove = pageState?.modal?.removeReceipt?.open
  const [isChange, setIsChange] = useState(false)
  const [closeModalRole, setCloseModalRole] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [disableSubmitPayment, setDisableSubmitPayment] = useState(false)

  const modal = pageState?.formCreate?.modal?.createReceipt
  const modalPaymentMethod = pageState?.formCreate?.modal?.createPaymentMethod
  const boolSearch = pageState?.filter?.keyword
  const form = pageState?.formCreate?.form

  const handleToggleModal = _ => {
    if(modal?.changeForm) {
      setOpenModal(true)
    } else {
      setCloseModal(true)
      setTimeout(() => {
        setCloseModal(false)
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM, payload: {status: 1}})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN, payload: !modal?.open})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE, payload: ''})
      }, 300)
    }
  }

  const handleToggleModalEdit = data => {
    if(modal?.changeForm) {
      setOpenModal(true)
    } else {
      setCloseModal(true)
      setTimeout(() => {
        setCloseModal(false)

        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN, payload: !modal?.open})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM,
          payload: {id: data?.id || '',
            code: data?.code || '',
            name: data?.name || '',
            description: data?.description || '',
            is_default: data?.is_default || '',
            status: +data?.status}})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, name: {status: !!!data?.name || data?.name.length > 30,
              message: !!!data?.name ? 'Tên loại phiếu thu không được để trống' : (data?.name.length > 30 ? 'Tên loại phiếu thu chỉ được phép nhập tối đa 30 ký tự' : '')},
            code: {status: (data?.code?.length > 50 || (!data?.code.match(REGEX_CUSTOMER_CODE) && !!data?.code)),
              message: data?.code?.length > 50
                ? 'Mã loại phiếu thu chỉ được phép nhập tối đa 50 ký tự'
                : (!data?.code.match(REGEX_CUSTOMER_CODE) && !!data?.code) ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt!' : ''},
            description: {status: data?.description?.length > 255, message: data?.description?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}
          }})
      }, 300)
    }
  }

  const handleCloseConfirm = _ => setOpenModal(false)

  const acceptanceCloseConfirm = _ => {
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_CHANGE_FORM, payload: false})
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM, payload:  {status: 1}})
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE, payload: ''})

    setOpenModal(false)
    setCloseModal(true)
    setTimeout(() => {
      setCloseModal(false)
      pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN, payload: !modal?.open})
    }, 300)
  }

  const handleCloseConfirmDuplicate = _ => setOpenModalDuplicate(false)

  const acceptanceCloseConfirmDuplicate = _ => {
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_CHANGE_FORM, payload: false})
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM, payload:  {status: 1}})
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE, payload: ''})

    setOpenModal(false)
    setCloseModal(true)
    setOpenModalDuplicate(false)

    setTimeout(() => {
      handleSubmit()
      setCloseModal(false)
      pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN, payload: !modal?.open})
    }, 300)
  }

  const handleChangeForm = (type, value) => {
    pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_CHANGE_FORM, payload: true})
    switch (type) {
      case 'name':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM, payload: {...modal?.form, name: value}})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, name: {status: value?.length > 30, message: value?.length > 30 ? 'Tên loại phiếu thu chỉ được phép nhập tối đa 30 ký tự' : ''}}})
        break
      case 'code':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM, payload: {...modal?.form, code: value}})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, code: {status: (value?.length > 50 || (!value.match(REGEX_CUSTOMER_CODE) && !!value)),
              message: value?.length > 50
                ? 'Mã loại phiếu thu chỉ được phép nhập tối đa 50 ký tự'
                : (!value.match(REGEX_CUSTOMER_CODE) && !!value) ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt!' : ''}}})
        break
      case 'description':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM,  payload: {...modal?.form, description: value}})
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, description: {status: value?.length > 255, message: value?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}}})
        break
      case 'status':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM,  payload: {...modal?.form, status: !value ? 0 : 1}})
        break
      default: break
    }
  }

  const handleBlurForm = (type, value) => {
    switch (type) {
      case 'name':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, name: {status: !!!value || value.length > 30,
              message: !!!value ? 'Tên loại phiếu thu không được để trống' : (value.length > 30 ? 'Tên loại phiếu thu chỉ được phép nhập tối đa 30 ký tự' : '')}}})
        break
      case 'code':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, code: {status: (value?.length > 50 || (!value.match(REGEX_CUSTOMER_CODE) && !!value)),
              message: value?.length > 50
                ? 'Mã loại phiếu thu chỉ được phép nhập tối đa 50 ký tự'
                : (!value.match(REGEX_CUSTOMER_CODE) && !!value) ? 'Vui lòng không nhập dấu, khoảng cách và ký tự đặc biệt!' : ''}}})
        break
      case 'description':
        pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
          payload: {...modal?.validate, description: {status: value?.length > 255, message: value?.length > 255 ? 'Mô tả chỉ được phép nhập tối đa 255 ký tự' : ''}}})
        break
      default: break
    }
  }

  const validateBeforeSubmit = _ => {
    if(!!!modal?.form?.name) {
      pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE, payload: {...modal?.validate, name: {status: true, message: 'Tên loại phiếu thu không được để trống'}}})
      return true
    }
    if((!modal?.form?.code?.match(REGEX_CUSTOMER_CODE) && !!modal?.form?.code)) {
      return true
    }
    return false
  }
  const disableSubmit = [
    !!!modal?.form?.name?.trim(),
    !!modal?.form?.name && modal?.form?.name?.length > 30,
    !!modal?.form?.name?.code && modal?.form?.name?.code?.length > 50,
    !!modal?.form?.name?.description && modal?.form?.name?.description?.length > 255,
    (!modal?.form?.code?.match(REGEX_CUSTOMER_CODE) && !!modal?.form?.code)
  ].includes(true)


  const handleValidateForm = async _ => {
    if( !validateBeforeSubmit()) {
      // Kiểm tra xem tên có trùng hay không?
      const hasId = pageState?.modal?.createReceipt?.form?.id || ''
      const resCheckName = await sendRequestAuth('get', `${config.API}/cashbook/receipts-type/check?id=${hasId}&name=${modal?.form?.name?.trim()}`)
      if(!resCheckName?.data?.success) {
        handleSubmit()
      } else {
        setOpenModalDuplicate(true)
      }

    }
  }

  const handleSubmit = async _ => {
    if(debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      // Thêm mới
      if(!!!pageState?.modal?.createReceipt?.form?.id) {
        const response = await sendRequestAuth(
          'post',
          `${config.API}/cashbook/receipts-type/create`,
          JSON.stringify(modal?.form),
        ).catch(() => toast.error('Thêm mới loại phiếu thu thất bại'))
        if(response?.data?.success) {
          toast.success('Thêm mới loại phiếu thu thành công')
          const newItem = {...modal?.form, id: response?.data?.data?.insert_id}
          const oldItems = pageState?.formCreate?.fetch?.typeReceipt?.list
          const newList = [newItem, ...oldItems]

          pageDispatch({
            type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
            payload: {...form, receipt_type_id: newItem?.id || ''}
          })
          pageDispatch({
            type: receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_LIST,
            payload: { list: newList, listOrigin: newList, value: newItem }
          })
          acceptanceCloseConfirm()
        } else {
          response?.data?.errors?.details?.map(item => {
            if(item.code === 5104) {
              pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
                payload: {...modal?.validate, code: {status: true, message: item?.message || ' '}}})
            }
          })
        }
      } else {
        const response = await sendRequestAuth(
          'post',
          `${config.API}/cashbook/receipts-type/update/${modal?.form?.id}`,
          JSON.stringify(modal?.form),
        ).catch(() => toast.error('Cập nhật loại phiếu thu thất bại'))
        if(response?.data?.success) {
          const newItem = displayList?.map(item => {
            if(item?.id === modal?.form?.id) {
              item.code = response?.data?.data?.code || ''
              item.name = modal?.form?.name || ''
              item.description = modal?.form?.description || ''
              item.status = modal?.form?.status
            }
            return item
          })
          pageDispatch({type: receiptActions.TABLE_UPDATE_DISPLAY_LIST, payload: {list: newItem, loading: false}})
          toast.success('Cập nhật loại phiếu thu thành công')
          acceptanceCloseConfirm()
        } else {
          response?.data?.errors?.details?.map(item => {
            if(item.code === 5104) {
              pageDispatch({type: receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE,
                payload: {...modal?.validate, code: {status: true, message: item?.message || ' '}}})
            }
          })
        }
      }
    }
  }

  const handleRemoveReceipt = data => {
    pageDispatch({type: receiptActions.MODAL_REMOVE_RECEIPT_TOGGLE_OPEN, payload: true})
    pageDispatch({type: receiptActions.MODAL_REMOVE_RECEIPT_UPDATE_DATA, payload: data})
  }

  const handleCloseConfirmRemove = _ => pageDispatch({type: receiptActions.MODAL_REMOVE_RECEIPT_TOGGLE_OPEN, payload: false})

  const acceptanceCloseConfirmRemove = async _ => {
    pageDispatch({type: receiptActions.MODAL_REMOVE_RECEIPT_TOGGLE_OPEN, payload: false})
    const idRemove = pageState?.modal?.removeReceipt?.data?.id
    const response = await sendRequestAuth('delete',
      `${config.API}/cashbook/receipts-type/delete/${idRemove}`
    )
    if(response?.data?.success) {
      pageDispatch({type: receiptActions.TABLE_UPDATE_DISPLAY_LIST,
        payload: {list: displayList?.filter(item => item?.id !== (pageState?.modal?.removeReceipt?.data?.id))}, loading: false})
      toast.success('Xóa loại phiếu thu thành công')
      pageDispatch({type: receiptActions.TABLE_UPDATE_PAGINATION,
        payload: {active: pageState?.table?.pagination?.active,
          amount: pageState?.table?.pagination?.amount,
          total: Math.ceil((+pageState?.table?.pagination?.totalItems - 1) / pageState?.table?.pagination?.amount),
          totalItems: +pageState?.table?.pagination?.totalItems - 1,
        }})
    } else {
      toast.error('Xóa thất bại do loại phiếu thu này đã được sử dụng')
    }
  }

  const handleChangeNamePayment = data => {
    pageDispatch({
      type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM,
      payload: {...modalPaymentMethod?.form, name: data}
    })
    if(modalPaymentMethod?.form?.name?.length <= 50 && !!modalPaymentMethod?.form?.name) {
      pageDispatch({
        type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_VALIDATE,
        payload: {name: { status: false, message: '' }}
      })
      setDisableSubmitPayment(false)
    }
    setIsChange(true)
  }

  const handleBlurFormPaymentMethod = type => {
    if(type === 'name') {
      pageDispatch({
        type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_VALIDATE,
        payload: { name: {
            status: modalPaymentMethod?.form?.name?.length > 50 || !!!modalPaymentMethod?.form?.name,
            message: modalPaymentMethod?.form?.name?.length > 50
                      ? 'Phương thức thanh toán lớn hơn 50 ký tự'
                      : !!!modalPaymentMethod?.form?.name
                        ? 'Phương thức thanh toán không được bỏ trống' : ''
          }
        }
      })
      setDisableSubmitPayment(modalPaymentMethod?.form?.name?.length > 50 || !!!modalPaymentMethod?.form?.name)
    }
  }

  const handleToggleActivePayment = _ => {
    pageDispatch({
      type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM,
      payload: {
        ...modalPaymentMethod?.form,
        is_active: !modalPaymentMethod?.form?.is_active
      }
    })
  }

  const handleCloseModalPaymentMethod = _ => {
    if(isChange) {
      setOpenModalConfirm(true)
    } else {
      //CLOSE MODAL ROLE
      setCloseModalRole(true)
      setTimeout(() => {
        pageDispatch({ type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN, payload: false })
        setCloseModalRole(false)
      }, 300)
    }
  }

  const handleSubmitPaymentMethod = async _ => {
    const url = `${config.API}/payment/create`
    const data = {
      'name': modalPaymentMethod?.form?.name?.trim() || '',
      'is_active': modalPaymentMethod?.form?.is_active ? '1' : '0',
      'status': modalPaymentMethod?.form?.status ? '1' : '-1'
    }
    const response = await sendRequestAuth('post', url, JSON.stringify(data))
    if(response?.data?.success) {
      toast.success('Thêm mới phương thức thanh toán thành công')
      const newItem = {...modalPaymentMethod?.form, id: response?.data?.meta?.insert_id}
      const oldItems = pageState?.formCreate?.fetch?.paymentMethod?.list
      const newList = [newItem, ...oldItems]

      pageDispatch({
        type: receiptActions.FORM_CREATE_RECEIPT_UPDATE,
        payload: {...form, payment_method_id: newItem?.id || ''}
      })
      pageDispatch({
        type: receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_LIST,
        payload: { list: newList, listOrigin: newList, value: newItem }
      })

      setCloseModalRole(true)
      setTimeout(() => {
        setIsChange(false)
        pageDispatch({type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM, payload: ''})
        pageDispatch({ type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN, payload: false })
        setCloseModalRole(false)
      }, 300)
    } else {
      toast.error('Thêm mới phương thức thanh toán thất bại')
    }
  }

  const handleToggleModalPayment = _ => {
    pageDispatch({ type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN, payload: true })
  }

  const closeModalPaymentMethodConfirm = _ => setOpenModalConfirm(false)

  const acceptanceModalPaymentMethodConfirm = _ => {
    setOpenModalConfirm(false)
    setCloseModalRole(true)

    setTimeout(() => {
      setIsChange(false)
      pageDispatch({type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM, payload: ''})
      pageDispatch({ type: receiptActions.MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN, payload: false })
      setCloseModalRole(false)
    }, 300)
  }


  return {
    modal,
    modalPaymentMethod,
    boolSearch,
    displayList,
    disableSubmit,
    disableSubmitPayment,
    method: {
      handleToggleModal,
      handleChangeForm,
      submit: handleValidateForm,
      handleCloseConfirm,
      acceptanceCloseConfirm,
      handleCloseConfirmDuplicate,
      acceptanceCloseConfirmDuplicate,
      closeModal,
      openConfirm,
      openConfirmDuplicate,
      openModalRemove,
      handleToggleModalEdit,
      handleRemoveReceipt,
      handleCloseConfirmRemove,
      acceptanceCloseConfirmRemove,

      handleBlurForm,
      validateBeforeSubmit,

      handleChangeNamePayment,
      handleBlurFormPaymentMethod,
      handleToggleActivePayment,
      handleCloseModalPaymentMethod,
      handleSubmitPaymentMethod,
      handleToggleModalPayment,

      openModalConfirm,
      closeModalRole,
      closeModalPaymentMethodConfirm,
      acceptanceModalPaymentMethodConfirm
    }
  }
}