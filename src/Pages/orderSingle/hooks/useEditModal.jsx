import React, {useContext, useState} from "react";
import {OrderSingleContext} from "../provider/_context";
import {orderSingleAction} from "../provider/_actions";
import config from "../../../config";
import {postData, sendRequestAuth} from "../../../api/api";
import toast from "../../../Component/Toast";
import {provinceData} from "../provider/_initialState";
import StringUtils from "../../../Component/surveyLogin/utils/string";


const useEditModal = () => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const [animateCloseModal, setAnimateCloseModal] = useState(false)
  const [isChangeEdit, setIsChangeEdit] = useState(false)
  const paymentMethodName = state?.editModalPayment?.form?.name || ''
  const paymentMethodIsActive = state?.editModalPayment?.form?.is_active
  const paymentMethodStatus = state?.editModalPayment?.form?.status
  const deliveryNote = state?.editModalDeliveryNote?.form?.note
  const deliveryNotePosition = state?.editModalDeliveryNote?.form?.position
  const deliveryNoteIsActive = state?.editModalDeliveryNote?.form?.is_active
  const deliveryNoteStatus = state?.editModalDeliveryNote?.form?.status
  const deliveryNoteLength = state?.validateEdit?.deliveryNote

  const formatProvinceData = provinceData.map(province => ({
    ...province,
    list: province.list.map(district => ({
      name: district.name,
      value: district.id,
      list: district.list.map(ward => ({
        name: ward.name,
        value: ward.id,
      })),
    })),
  }))
  const shippingPointName = state?.editModalShippingPoint?.form?.name
  const shippingPointPhone = state?.editModalShippingPoint?.form?.phone
  const shippingPointEmail = state?.editModalShippingPoint?.form?.email
  const shippingPointAddress = state?.editModalShippingPoint?.form?.address
  const addressSelectedOptions = state?.editModalShippingPoint?.form?.selectedOptions
  const [provinceList, setProvinceList] = useState(formatProvinceData)
  const [provinceKeyword, setProvinceKeyword] = useState('')
  const provinceValue = state?.editModalShippingPoint?.form?.city
  const [districtList, setDistrictList] = useState([])
  const [districtKeyword, setDistrictKeyword] = useState('')
  const districtValue = state?.editModalShippingPoint?.form?.district
  const [wardList, setWardList] = useState([])
  const [wardKeyword, setWardKeyword] = useState('')
  const wardValue = state?.editModalShippingPoint?.form?.ward
  const sourceOrderName = state?.editModalSourceOrder?.form?.name
  const sourceOrderPosition = state?.editModalSourceOrder?.form?.position

  const handleToggleModalPaymentMethod = _ => dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT, payload: true })
  const handleCloseModalPaymentMethod = () => {
    if(isChangeEdit) {
      dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_PAYMENT_FORM, payload: true })
    } else {
      setAnimateCloseModal(true)
      setTimeout(() => {
        setAnimateCloseModal(false)
        dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT, payload: false, })
      }, 300)
    }
  }

  const handleChangeName = val => {
    dispatch({ type: orderSingleAction.EDIT_MODAL_PAYMENT_CHANGE_NAME, payload: val })
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_FORM_NAME, payload:{ status: !!!val, message: !!!val ? 'Phương thức thanh toán không được bỏ trống!' : '' } })
  }

  const handleBlurName = _ => dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_FORM_NAME, payload:{ status: !!!paymentMethodName, message: !!!paymentMethodName ? 'Phương thức thanh toán không được bỏ trống!': '' } })


  const toggleActivePayment = _ => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_PAYMENT_IS_ACTIVE, payload: !paymentMethodIsActive })
  }
  const toggleStatusPayment = _ => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_PAYMENT_STATUS, payload: !paymentMethodStatus })
  }

  const handleSubmitPaymentMethod = _ => {
    if(!!!state?.editModalPayment?.form?.name) {
      if (!!!state?.editModalPayment?.form?.name) {
        dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_FORM_NAME, payload:{ status: true, message: 'Phương thức thanh toán không được bỏ trống!' } })
      }
      return
    }
    const url = `${config.API}/payment/create`
    const data = {
      'name': state.editModalPayment?.form?.name?.trim() || '',
      'is_active': state.editModalPayment?.form?.is_active ? '1' : '0',
      'status': state.editModalPayment?.form?.status ? '1' : '-1'
    }
    const dataPost = JSON.stringify(data)
    postData(url, dataPost)
      .then(response => {
        if (response.data && response.data.success) {
          toast.success('Thêm mới phương thức thanh toán thành công.')
          //CLOSE MODAL ROLE
          setAnimateCloseModal(true)
          setTimeout(() => {
            dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT, payload: false })
            setAnimateCloseModal(false)
          }, 300)

          // CLEAN FORM
          dispatch({ type: orderSingleAction.EDIT_MODAL_PAYMENT_FORM, payload: {name: '' , is_active: false, status: true} })

          const paymentMethod = {
            data: data,
            name: paymentMethodName,
            value: response?.data?.meta?.insert_id
          }
          dispatch({
            type: orderSingleAction.FORM_PAYMENT_METHOD_UPDATE,
            payload: {value: paymentMethod},
          })
        } else {
          toast.error('Thêm mới phương thức thanh toán thất bại!')
        }
      })
      .catch(() => {
        toast.error('Thêm mới phương thức thanh toán thất bại!')
        //CLOSE MODAL ROLE
        setAnimateCloseModal(true)
        setTimeout(() => {
          dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT, payload: false })
          setAnimateCloseModal(false)
        }, 300)
      })
  }

  const closeModalPaymentMethodConfirm = _ => dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_PAYMENT_FORM, payload: false })
  const acceptanceModalPaymentMethodConfirm = _ => {
    //CLOSE MODAL ROLE
    setAnimateCloseModal(true)
    dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_PAYMENT_FORM, payload: false })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_FORM_NAME, payload:{ status: false, message: '' } })
    setTimeout(() => {
      dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT, payload: false })
      setAnimateCloseModal(false)
      dispatch({ type: orderSingleAction.EDIT_MODAL_PAYMENT_FORM, payload: {name: '' , is_active: false, status: true} })
    }, 300)
  }


  // Delivery Note
  const handleCloseModalDeliveryNote = _ => {
    if(isChangeEdit) {
      dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE, payload: true })
    } else {
      setAnimateCloseModal(true)
      setTimeout(() => {
        setAnimateCloseModal(false)
        dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE, payload: false, })
      }, 300)
    }
  }

  const handleChangeDeliveryNote = val => {
    dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE, payload: val })
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: !!!val, message: !!!val ? 'Nội dung ghi chú không được bỏ trống!' : '' } })
  }
  const handleBlurDeliveryNote = () => {
    dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE, payload: deliveryNote.trim() })
    if(!!!deliveryNote.trim()) {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: true, message: 'Nội dung ghi chú không được bỏ trống!' } })
    } else if (deliveryNote.length > 255) {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: true, message: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!' } })
    } else {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: false, message: '' } })
    }
  }

  const handleChangeDeliveryPosition = value => {
    const re = /^[0-9\b]+$/
    if (value === '' || re.test(value)) {
      setIsChangeEdit(true)
      dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_POSITION, payload: value, })
    }
  }

  const handleBlurDeliveryPosition = _ => {
    setIsChangeEdit(true)
    dispatch({
      type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION,
      payload: {
        status: +deliveryNotePosition > 127,
        message: +deliveryNotePosition > 127 ? 'Vị trí không được lớn hơn 127!' : ''
      }
    })
  }

  const handleChangeDeliveryActive = _ => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_IS_ACTIVE, payload: !deliveryNoteIsActive })
    dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_STATUS, payload: true })
  }

  const handleChangeDeliveryStatus = _ => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_STATUS, payload: !deliveryNoteStatus })
  }

  const closeModalDeliveryNoteConfirm = _ => dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE, payload: false })

  const acceptanceModalDeliveryNoteConfirm = _ => {
    //CLOSE MODAL ROLE
    setAnimateCloseModal(true)
    dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE, payload: false })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: false, message: '' } })
    dispatch({type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION, payload: { status: false, message: '' } })
    setTimeout(() => {
      dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE, payload: false })
      setAnimateCloseModal(false)
      // CLEAN FORM
      dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_FORM, payload: {note: '', positon: '' , is_active: false, status: true} })
    }, 300)
  }

  const [debounceDeliveryNote, setDebounceDeliveryNote] = useState(true)
  const handleSubmitDeliveryNote = _ => {
    if(debounceDeliveryNote) {
      setDebounceDeliveryNote(false)
      setTimeout(() => setDebounceDeliveryNote(true), 2000)

      if (!!!deliveryNote) {
        dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: true, message: 'Nội dung ghi chú không được bỏ trống!' } })
        return
      }
      if (deliveryNote.length > 255) {
        dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE, payload:{ status: true, message: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!' } })
        return
      }
      if(+deliveryNotePosition > 127) {
        dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION, payload: { status: true, message: 'Vị trí không được lớn hơn 127!'}})
        return
      }
      const url = `${config.API}/setting/delivery-note/create`
      const data = {
        'content': state.editModalDeliveryNote?.form?.note?.trim() || '',
        'position': +state.editModalDeliveryNote?.form?.position || '',
        'is_default': state.editModalDeliveryNote?.form?.is_active ? 1 : 0,
        'status': state.editModalDeliveryNote?.form?.status ? 1 : -1
      }
      const dataPost = JSON.stringify(data)
      postData(url, dataPost)
        .then(response => {
          if (response.data && response.data.success) {
            toast.success('Thêm mới mẫu ghi chú giao hàng thành công.')
            //CLOSE MODAL ROLE
            setAnimateCloseModal(true)
            setTimeout(() => {
              dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE, payload: false })
              setAnimateCloseModal(false)
            }, 300)
            // CLEAN FORM
            dispatch({ type: orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_FORM, payload: {note: '', positon: '' , is_active: false, status: true} })

            // Cập nhật mẫu ghi chú giao hàng
            dispatch({
              type: orderSingleAction.UPDATE_SHIPPING_INFO,
              payload: {
                deliveryNote: {
                  selected: 0,
                  content: state.editModalDeliveryNote?.form?.note.replace('/', '')?.trim(),
                },
              },
            })
            dispatch({
              type: orderSingleAction.UPDATE_LIST_DELIVERY_NOTE,
              payload: [{id: response?.data?.meta?.insert_id, content: state.editModalDeliveryNote?.form?.note.replace('/', '')?.trim()}, ...state.deliveryNote],
            })

            dispatch({
              type: orderSingleAction.VALIDATE_EDIT_FORM_DELIVERY_NOTE,
              payload: {status: data?.content?.length > 255, message: ''},
            })
          } else {
            toast.error('Thêm mới ghi chú giao hàng thất bại!')
          }
        })
        .catch(() => {
          toast.error('Thêm mới ghi chú giao hàng thất bại!')
          //CLOSE MODAL ROLE
          setAnimateCloseModal(true)
          setTimeout(() => {
            dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE, payload: false })
            setAnimateCloseModal(false)
          }, 300)
        })
    }
  }

  const handleToggleModalShippingPoint = _ => dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SHIPPING_POINT, payload: true })
  const handleCloseModalShippingPoint = _ => {
    if(isChangeEdit) {
      dispatch({ type: orderSingleAction.EDIT_MODAL_CONFIRM_SHIPPING_POINT, payload: true })
    } else {
      // CLEAN FORM
      dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_FORM, payload: {name: '', phone: '', email: '', city: [], district: [], ward: [], address: '', selectedOptions: []} })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME, payload: { status: false, message: '' } })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE, payload: { status: false, message: '' } })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS, payload: { status: false, message: '' } })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY, payload: { status: false, message: '' } })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT, payload: { status: false, message: '' } })
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD, payload: { status: false, message: '' } })

      setAnimateCloseModal(true)
      setTimeout(() => {
        setAnimateCloseModal(false)
        dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SHIPPING_POINT, payload: false })
      })
    }
  }

  const handleChangeShippingPointName = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_NAME, payload: value })
    if(!!value) dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME, payload: { status: false, message: '' } })
  }

  const handleBlurShippingPointName = _ => dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME, payload: { status: !!!shippingPointName, message: !!!shippingPointName ? 'Điểm gửi hàng không được bỏ trống!' : '' } })

  const handleChangeShippingPointPhone = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_PHONE,  payload: value.toString().replace(/[^0-9]/g, '').substring(0, 11) })
  }

  const handleBlurShippingPointPhone = _ => {
    if(!!!shippingPointPhone) {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE, payload: { status: true, message: 'Số điện thoại không được bỏ trống!' } })
    } else {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE, payload: { status: false, message: '' } })
    }
  }

  const handleChangeShippingPointEmail = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_EMAIL,  payload: value})
  }

  const handleBlurShippingPointEmail = _ => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const checkedValidEmail = shippingPointEmail.trim() && !regex.test(shippingPointEmail)
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_EMAIL, payload: { status: checkedValidEmail, message: checkedValidEmail ? 'Vui lòng nhập đúng định dạng email (ví dụ: abc@gmail.com)!' : '' } })
  }

  const handleSelectShippingPointCity = data => {
    setIsChangeEdit(true)
    // update province
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_CITY,  payload: data})
    // update district
    setDistrictList(data.list)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_DISTRICT,  payload: null})
    // update ward
    setWardList([])
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_WARD,  payload: null})
    // validate
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY, payload: { status: false, message: '' } })
  }


  const handleChangeShippingPointCity = data => {
    setProvinceKeyword(data)
    if (data.trim()) {
      const makeshiftListCity = [...formatProvinceData]
      const filterList = makeshiftListCity.filter(item =>
        StringUtils.removeAcent(item?.name).includes(
          StringUtils.removeAcent(data).trim(),
        ),
      )
      setProvinceList(filterList)
    } else setProvinceList([...formatProvinceData])
  }

  const handleSelectShippingPointDistrict = data => {
    setIsChangeEdit(true)
    // update district
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_DISTRICT,  payload: data})
    // update ward
    setWardList(data.list)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_WARD,  payload: null})
    // validate
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT, payload: { status: false, message: '' } })
  }

  const handleChangeShippingPointDistrict = value => {
    setDistrictKeyword(value)
    if (value.trim()) {
      const makeshiftListCity = [...provinceValue.list]
      const filterList = makeshiftListCity?.filter(item =>
        StringUtils.removeAcent(item?.name).includes(
          StringUtils.removeAcent(value).trim(),
        ),
      )
      setDistrictList(filterList)
    } else setDistrictList([...provinceValue.list])
  }

  const handleSelectShippingPointWard = data => {
    setIsChangeEdit(true)
    // update ward
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_WARD,  payload: data})
    // validate
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD, payload: { status: false, message: '' } })
  }


  const handleChangeShippingPointWard = value => {
    setWardKeyword(value)
    if (value.trim()) {
      const makeshiftListCity = [...districtValue.list]
      const filterList = makeshiftListCity?.filter(item =>
        StringUtils.removeAcent(item?.name).includes(
          StringUtils.removeAcent(value).trim(),
        ),
      )
      setWardList(filterList)
    } else setWardList([...districtValue.list])
  }

  const handleChangeShippingPointAddress = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_ADDRESS,  payload: value})
    if(!!value) dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS, payload: { status: false, message: '' } })
  }

  const handleBlurShippingPointAddress = _ => {
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS,
              payload: { status: !!!shippingPointAddress, message: !!!shippingPointAddress ? 'Địa chỉ không được bỏ trống!' : '' } })
  }

  const handleChangeAddressSelectedOptions = item => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_SELECT_OPTION,
                payload: addressSelectedOptions.includes(item?.value)
                          ? addressSelectedOptions.filter( opt => opt !== item?.value)
                          : [...addressSelectedOptions, item?.value]})
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const handleSubmitShippingPoint = async _ => {
    const valid = checkValidationShippingPoint()
    if (valid && debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => {
        setDebounceSubmit(true)
      }, 2000)

      const dataPost = {
        name: shippingPointName,
        phone: shippingPointPhone,
        email: shippingPointEmail,
        address: shippingPointAddress,
        city_id: provinceValue?.value,
        district_id: districtValue?.value,
        ward_id: wardValue?.value,
        is_default: addressSelectedOptions.includes('is_default') ? 1 : 0,
        is_hidden_phone: addressSelectedOptions.includes('is_hidden_phone') ? 1 : 0,
        is_hidden_address: addressSelectedOptions.includes('is_hidden_address') ? 1 : 0,
        is_hidden_province: addressSelectedOptions.includes('is_hidden_province') ? 1 : 0,
      }

      const response = await sendRequestAuth('post', `${config.API}/setting/address/create`, JSON.stringify(dataPost))
                            .catch(() => toast.error('Thêm mới điểm gửi hàng thất bại!'))
      if (response?.data?.success) {
        const shippingPoint = {
          data: dataPost,
          name: shippingPointName,
          value: response?.data?.meta?.insert_id
        }
        dispatch({
          type: orderSingleAction.FORM_SHIPPING_POINT_UPDATE,
          payload: {value: shippingPoint},
        })

        // CLOSE MODAL
        setAnimateCloseModal(true)
        setTimeout(() => {
          setAnimateCloseModal(false)
          dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SHIPPING_POINT, payload: false })
        })

        // CLEAN FORM
        dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_FORM, payload: {name: '', phone: '', email: '', city: [], district: [], ward: [], address: '', selectedOptions: []} })
        toast.success('Thêm mới điểm gửi hàng thành công.')
      } else {
        toast.error('Thêm mới điểm gửi hàng thất bại!')
      }
    }
  }

  const checkValidationShippingPoint = _ => {
    let valueValid = 0
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const checkedValidEmail = shippingPointEmail.trim() && !regex.test(shippingPointEmail)

    if(checkedValidEmail) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_EMAIL, payload: { status: true, message: 'Vui lòng nhập đúng định dạng email (ví dụ: abc@gmail.com)!'} })
    }
    if(!!!shippingPointName) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME, payload: { status: true, message: 'Điểm gửi hàng không được bỏ trống!' } })
    }
    if(!!!shippingPointPhone) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE, payload: { status: true, message: 'Số điện thoại không được bỏ trống!' } })
    }
    if(!!!shippingPointAddress) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS, payload: { status: true, message: 'Địa chỉ không được bỏ trống!' } })
    }
    if(provinceValue.length === 0) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY, payload: { status: true, message: ' ' } })
    }
    if(districtValue.length === 0) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT, payload: { status: true, message: ' ' } })
    }
    if(wardValue.length === 0) {
      valueValid++
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD, payload: { status: true, message: ' ' } })
    }
    return valueValid === 0
  }

  const closeModalShippingPointConfirm = _ =>  {
    dispatch({ type: orderSingleAction.EDIT_MODAL_CONFIRM_SHIPPING_POINT, payload: false })
  }

  const acceptanceModalShippingPointConfirm = _ => {
    dispatch({ type: orderSingleAction.EDIT_MODAL_CONFIRM_SHIPPING_POINT, payload: false })
    // CLEAN FORM
    dispatch({ type: orderSingleAction.EDIT_MODAL_SHIPPING_POINT_FORM, payload: {name: '', phone: '', email: '', city: [], district: [], ward: [], address: '', selectedOptions: []} })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME, payload: { status: false, message: '' } })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE, payload: { status: false, message: '' } })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS, payload: { status: false, message: '' } })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY, payload: { status: false, message: '' } })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT, payload: { status: false, message: '' } })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD, payload: { status: false, message: '' } })

    setAnimateCloseModal(true)
    setTimeout(() => {
      setAnimateCloseModal(false)
      dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SHIPPING_POINT, payload: false })
    })
  }

  const canSubmitShippingPoint = [
    state?.editModalShippingPoint?.validate?.name?.status,
    state?.editModalShippingPoint?.validate?.phone?.status,
    state?.editModalShippingPoint?.validate?.email?.status,
    state?.editModalShippingPoint?.validate?.address?.status,
    state?.editModalShippingPoint?.validate?.city?.status,
    state?.editModalShippingPoint?.validate?.district?.status,
    state?.editModalShippingPoint?.validate?.ward?.status,
  ].includes(true)

  // SOURCE ORDER
  const handleOpenModalSourceOrder = _ => dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER, payload: true })
  const handleCloseModalSourceOrder = _ => {
    if(isChangeEdit) {
      dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM, payload: true })
    } else {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME, payload: {status: false, message: 'Tên nguồn đơn hàng không được bỏ trống!'} })
      setAnimateCloseModal(true)
      setTimeout(() => {
        setAnimateCloseModal(false)
        dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER, payload: false })
      }, 300)
    }
  }

  const handleChangeSourceOrderName = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER_NAME, payload: value })
    if(!!value) dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME, payload: {status: false, message: ''} })
  }

  const handleBlurSourceOrderName = _ => {
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME, payload: {status: !!!sourceOrderName, message: !!!sourceOrderName ? 'Tên nguồn đơn hàng không được bỏ trống!' : ''} })
  }

  const handleSourceOrderPosition = value => {
    setIsChangeEdit(true)
    dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER_POSITION, payload: value.toString().replace(/[^0-9]/g, '') })
  }

  const [debounceSourceOrder, setDebounceSourceOrder] = useState(true)
  const handleSubmitSourceOrder = async _ => {
    if(debounceSourceOrder && !!sourceOrderName) {
      setDebounceSourceOrder(false)
      setTimeout(() => setDebounceSourceOrder(true), 2000)

      const data = {name: state?.editModalSourceOrder?.form?.name,
                    nb_order: state?.editModalSourceOrder?.form?.position,
                    status: 1
                  }

      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/origin/create`,
        JSON.stringify(data),
      ).catch(() => toast.error('Thêm mới nguồn đơn hàng thất bại!'))

      if(response?.data?.success) {
        dispatch({ type: orderSingleAction.EDIT_MODAL_SOURCE_ORDER_FORM, payload: {name: '', position: ''} })
        toast.success('Thêm mới nguồn đơn hàng thành công!')

        dispatch({
          type: orderSingleAction.FORM_SOURCE_UPDATE,
          payload: {value: {data: data, name: state?.editModalSourceOrder?.form?.name, value: response?.data?.meta?.insert_id}},
        })

        // CLOSE MODAL
        setAnimateCloseModal(true)
        setTimeout(() => {
          setAnimateCloseModal(false)
          dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER, payload: false })
        }, 300)
      } else {
        toast.error('Thêm mới nguồn đơn hàng thất bại!')
      }
    } else if (!!!sourceOrderName) {
      dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME, payload: {status: true, message: 'Tên nguồn đơn hàng không được bỏ trống!'} })
    }
  }

  const closeModalSourceOrderConfirm = _ => dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM, payload: false })

  const acceptanceModalSourceOrderConfirm = _ => {
    dispatch({ type: orderSingleAction.TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM, payload: false })
    dispatch({ type: orderSingleAction.EDIT_MODAL_SOURCE_ORDER_FORM, payload: {name: '', position: ''} })
    dispatch({ type: orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME, payload: {status: false, message: 'Tên nguồn đơn hàng không được bỏ trống!'} })

    setAnimateCloseModal(true)
    setTimeout(() => {
      setAnimateCloseModal(false)
      dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER, payload: false })
    }, 300)
  }

  return {
    valueForm: {
      // Payment Method
      openModalCreate: state.editModalPayment.open,
      paymentMethodName,
      paymentMethodIsActive,
      paymentMethodStatus,
      openModalConfirmPayment: state.editModalPayment.modalConfirm,

      // Delivery Note
      openModalDeliveryNote: state.editModalDeliveryNote.open,
      deliveryNote,
      deliveryNotePosition,
      deliveryNoteIsActive,
      deliveryNoteStatus,
      openModalConfirmDeliveryNote: state.editModalDeliveryNote.modalConfirm,

      // Shipping point
      openModalShippingPoint: state.editModalShippingPoint.open,
      formatProvinceData,
      provinceList,
      provinceKeyword,
      provinceValue,
      districtList,
      districtKeyword,
      districtValue,
      wardList,
      wardKeyword,
      wardValue,
      shippingPointName,
      shippingPointPhone,
      shippingPointEmail,
      shippingPointAddress,
      addressSelectedOptions,
      openModalConfirmShippingPoint: state.editModalShippingPoint.modalConfirm,


      // Source Order
      openModalSourceOrder: state.editModalSourceOrder.open,
      sourceOrderName,
      sourceOrderPosition,
      openModalConfirmSourceOrder: state.editModalSourceOrder.modalConfirm,
    },
    functions: {
      // Payment Method
      onCloseModalPaymentMethod: handleCloseModalPaymentMethod,
      animateCloseModal,
      onChangeName: handleChangeName,
      toggleActivePayment,
      toggleStatusPayment,
      onSubmitPaymentMethod: handleSubmitPaymentMethod,
      closeModalPaymentMethodConfirm,
      acceptanceModalPaymentMethodConfirm,
      handleToggleModalPaymentMethod,

      // Delivery Note
      onCloseModalDeliveryNote: handleCloseModalDeliveryNote,
      onChangeDeliveryNote: handleChangeDeliveryNote,
      onChangeDeliveryPosition: handleChangeDeliveryPosition,
      onChangeDeliveryActive: handleChangeDeliveryActive,
      onChangeDeliveryStatus: handleChangeDeliveryStatus,
      onSubmitDeliveryNote: handleSubmitDeliveryNote,
      closeModalDeliveryNoteConfirm,
      acceptanceModalDeliveryNoteConfirm,

      // Shipping point
      onCloseModalShippingPoint: handleCloseModalShippingPoint,
      handleToggleModalShippingPoint,
      onChangeShippingPointName: handleChangeShippingPointName,
      onChangeShippingPointPhone: handleChangeShippingPointPhone,
      onChangeShippingPointEmail: handleChangeShippingPointEmail,
      onSelectShippingPointCity: handleSelectShippingPointCity,
      onChangeShippingPointCity: handleChangeShippingPointCity,
      onSelectShippingPointDistrict: handleSelectShippingPointDistrict,
      onChangeShippingPointDistrict: handleChangeShippingPointDistrict,
      onSelectShippingPointWard: handleSelectShippingPointWard,
      onChangeShippingPointWard: handleChangeShippingPointWard,
      onChangeShippingPointAddress: handleChangeShippingPointAddress,
      onChangeAddressSelectedOptions: handleChangeAddressSelectedOptions,
      onSubmitShippingPoint: handleSubmitShippingPoint,
      closeModalShippingPointConfirm,
      acceptanceModalShippingPointConfirm,

      // Source Order
      onCloseModalSourceOrder: handleCloseModalSourceOrder,
      onOpenModalSourceOrder: handleOpenModalSourceOrder,
      onChangeSourceOrderName: handleChangeSourceOrderName,
      onSourceOrderPosition: handleSourceOrderPosition,
      onSubmitSourceOrder: handleSubmitSourceOrder,
      closeModalSourceOrderConfirm,
      acceptanceModalSourceOrderConfirm,
    },
    validate: {
      // Payment Method
      errorName: state?.editModalPayment?.validate?.name || '',
      onBlurName: handleBlurName,

      // Delivery Note
      errorDeliveryNote: state?.editModalDeliveryNote?.validate?.note || '',
      errorDeliveryNotePosition: state?.editModalDeliveryNote?.validate?.position || '',
      onBlurDeliveryNote: handleBlurDeliveryNote,
      onBlurDeliveryPosition: handleBlurDeliveryPosition,
      deliveryNoteLength,

      // Shipping point
      errorShippingPointName: state?.editModalShippingPoint?.validate?.name || '',
      errorShippingPointPhone: state?.editModalShippingPoint?.validate?.phone || '',
      errorShippingPointEmail: state?.editModalShippingPoint?.validate?.email || '',
      errorShippingPointAddress: state?.editModalShippingPoint?.validate?.address || '',
      errorShippingPointCity: state?.editModalShippingPoint?.validate?.city || '',
      errorShippingPointDistrict: state?.editModalShippingPoint?.validate?.district || '',
      errorShippingPointWard: state?.editModalShippingPoint?.validate?.ward || '',
      onBlurShippingPointName: handleBlurShippingPointName,
      onBlurShippingPointPhone: handleBlurShippingPointPhone,
      onBlurShippingPointEmail: handleBlurShippingPointEmail,
      onBlurShippingPointAddress: handleBlurShippingPointAddress,
      canSubmitShippingPoint,

      // Source Order
      errorSourceOrderName: state?.editModalSourceOrder?.validate?.name || '',
      onBlurSourceOrderName: handleBlurSourceOrderName,
    }
  }
}

export default useEditModal