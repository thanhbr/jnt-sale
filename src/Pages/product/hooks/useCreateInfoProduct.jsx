import React, {useCallback, useContext, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {CREATE_PRODUCT_TYPE_WEIGHT_CONSTANTS} from "../interfaces/~constants";
import {postData, sendRequestAuth} from "../../../api/api";
import {getUrlCreateUnit, uploadProductImage} from "../../../api/url";
import toast from "../../../Component/Toast";
import {debounce} from "@mui/material";
import config from "../../../config";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateInfoProduct = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const formInfoProduct = pageState?.formCreate?.product
  const formInfoProductValidate = formInfoProduct?.validate
  const modalUnitManage = formInfoProduct?.modal
  const zoomInImage = pageState?.formCreate?.zoomIn
  const [showDropdownWeight, setShowDropdownWeight] = useState(false)
  const [listWeight, setListWeight] = useState(CREATE_PRODUCT_TYPE_WEIGHT_CONSTANTS)
  const [animationClose, setAnimationClose] = useState(false)
  const [modalUnitManageConfirm, setModalUnitManageConfirm] = useState(false)
  const [isChangeModalUnitManage, setIsChangeModalUnitManage] = useState(false)

  const handleUpdateIMG = async val =>{
    let image = val.target.files[0]
    if(!!image) {
      const formData= new FormData()
      formData.append('image',image)
      formData.get('image')
      try{
        const res= await postData(uploadProductImage(), formData)
        if(res?.data?.success) {
          pageDispatch({type: productActions.FORM_CREATE_CHANGE_IMAGE_PRODUCT,
            payload: {name: res?.data?.image, link: res?.data?.url}})
        }
        pageDispatch({
          type: productActions.VALIDATE_FORM_CREATE_PRODUCT_IMAGE,
          payload: {
            status: !res?.data?.success,
            message: !res?.data?.success ? t(DISPLAY_NAME_MENU.GENERAL.MAX_IMG_3MB) : ''}
        })
      }catch (e) {
        console.log(e)
      }
    }
  }

  const removeProductImg = () => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_IMAGE_PRODUCT, payload: {name: '', link: ''}})
  }

  const handleChangeTypeUnit = (item, {onClose}) => {
    onClose()
    setListWeight(CREATE_PRODUCT_TYPE_WEIGHT_CONSTANTS.map(weight => {
      weight.active = item.id === weight.id
      return weight
    }))
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_UNIT_TYPE_PRODUCT, payload: item.name})
    pageDispatch({type: productActions.FORM_CREATE_INIT_WEIGHT_PRODUCT, payload: 0})

    pageState?.formCreate?.version?.valueVersion?.map(it => {
      it.type_weight = item.name
      return item
    })
  }

  const handleSelectTypeUnit = value => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_UNIT_VALUE_PRODUCT,  payload: value})
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_UNIT_PRODUCT, payload: { status: false, message: ''}})
  }

  const handleDropdownWeight = () => {
    setShowDropdownWeight(!showDropdownWeight)
  }

  const handleChangeWeight = value => {
    const re = /^[\d]*\.?[\d]{0,2}$/
    if (value === '' || re.test(value)) {
      pageDispatch({type: productActions.FORM_CREATE_INIT_WEIGHT_PRODUCT, payload: value})
      pageState?.formCreate?.version?.valueVersion?.map(item => {
        item.weight = value
        return item
      })
    }
  }

  const handleBlurWeight = _ => {
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_WEIGHT_PRODUCT, payload:
        { status: !!!formInfoProduct?.weight, message: !!!formInfoProduct?.weight ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INVALID_WEIGHT): ''}})
  }

  const handleShowNote = () => pageDispatch({type: productActions.FORM_CREATE_SHOW_NOTE_PRODUCT, payload: !pageState.formCreate.product.note.open})

  const handleChangeNote = value => {
    pageDispatch({type: productActions.FORM_CREATE_INIT_NOTE_PRODUCT, payload: value})
  }

  const handleZoomInImage = (bool, image) => {
    pageDispatch({type: productActions.FORM_CREATE_ZOOM_IN_IMAGE, payload: bool})
    pageDispatch({type: productActions.FORM_CREATE_ZOOM_IN_IMAGE_LINK_ACTIVE, payload: image})
  }

  const clearFormModalUnitManage = () => {
    pageDispatch({type: productActions.FORM_CREATE_MODAL_UNIT_PRODUCT, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_SYMBOL_PRODUCT, payload: {status: false, message: ''}})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_SYMBOL_PRODUCT, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT, payload: {status: false, message: ''}})
  }

  const handleToggleShowUnitManage = bool => {
    if(isChangeModalUnitManage) {
      setModalUnitManageConfirm(true)
    } else {
      setAnimationClose(true)
      setTimeout(() => {
        setAnimationClose(false)
        pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_PRODUCT, payload: bool})
        clearFormModalUnitManage()
      }, 300)
    }
  }


  const canSubmitUnitManage = [
    formInfoProduct?.modal?.validate?.unit?.status,
    formInfoProduct?.modal?.validate?.symbol?.status,
  ].includes(true)

  const handleChangeModalUnit = unit => {
    setIsChangeModalUnitManage(true)
    pageDispatch({type: productActions.FORM_CREATE_MODAL_UNIT_PRODUCT, payload: unit})
    if(!!unit) pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT, payload: {status: false, message: ''}})
  }

  const handleChangeModalSymbol = symbol => {
    setIsChangeModalUnitManage(true)
    pageDispatch({type: productActions.FORM_CREATE_MODAL_SYMBOL_PRODUCT, payload: symbol})
    if(!!symbol) pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_SYMBOL_PRODUCT, payload: {status: false, message: ''}})
  }

  const handleBlurModalUnit = _ => {
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT,
      payload: {status: !!!formInfoProduct?.modal?.form?.unit,
        message: !!!formInfoProduct?.modal?.form?.unit ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT) : ''}})
  }

  const handleBlurModalSymbol = _ => {
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_SYMBOL_PRODUCT,
      payload: {status: !!!formInfoProduct?.modal?.form?.symbol,
        message: !!!formInfoProduct?.modal?.form?.symbol ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT_SYMBOL) : ''}})
  }

  const closeModalUnitManageConfirm = _ => {
    setModalUnitManageConfirm(false)
  }

  const acceptanceModalUnitManageConfirm = _ => {
    setModalUnitManageConfirm(false)
    setIsChangeModalUnitManage(false)
    setAnimationClose(true)
    setTimeout(() => {
      setAnimationClose(false)
      pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_PRODUCT, payload: false})
      clearFormModalUnitManage()
    }, 300)
  }

  const validateUnitManage = () => {
    let countError = 0
    if(!!!modalUnitManage?.form?.unit) {
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT)}})
      countError++
    }
    if(!!!modalUnitManage?.form?.symbol) {
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_SYMBOL_PRODUCT, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT_SYMBOL)}})
      countError++
    }
    return countError === 0
  }

  const [debounceUnitManage, setDebounceUnitManage] = useState(true)
  const submitUnitManage = async _ => {
    if(!validateUnitManage()) return
    if(debounceUnitManage) {
      setDebounceUnitManage(false)
      const newUnitManage = {
        'unit_name': modalUnitManage?.form?.unit || '',
        'unit_short_name': modalUnitManage?.form?.symbol || '',
        'status': 1
      }
      const response = await postData(getUrlCreateUnit(), newUnitManage)
      if(response?.data?.success) {
        toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.UNIT_ADDED_SUCCESSFULLY))
        setTimeout(() => {
          setAnimationClose(false)
          pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_PRODUCT, payload: false})
          clearFormModalUnitManage()
        }, 300)

        newUnitManage.id = response?.data?.data?.insert_id
        pageDispatch({type: productActions.FORM_CREATE_CHANGE_UNIT_VALUE_PRODUCT,  payload: newUnitManage})
        pageDispatch({type: productActions.VALIDATE_FORM_CREATE_UNIT_PRODUCT, payload: { status: false, message: ''}})
      } else {
        if(response?.data?.errors?.code === 102) {
          pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_UNIT_PRODUCT, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.UNIT_NAME)}})
        }
        toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.UNIT_ADDED_FAILED))
      }
      setTimeout(() => setDebounceUnitManage(true), 2000)
    }
  }

  const handleFetchUnitList = async keyword => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/unit/list?keyword=${keyword}&per_page=100&start=0`,
    )
    if(response?.data?.success) {
      pageDispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN_UNIT, payload: {
          value: response?.data?.data?.find(item => +item?.is_main === 1),
          list: response?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
          listOrigin: response?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
        }})
    }
  }

  const debounceHandleSearchUnit = useCallback(
    debounce((data, page) => {
      handleFetchUnitList(data?.value, 0)
    }, 500),
    [],
  )

  const handleSearchUnit = data => {
    debounceHandleSearchUnit(data)
  }

  return {
    value: {
      formInfoProduct,
      showDropdownWeight,
      listWeight,
      modalUnitManage,
      modalUnitManageConfirm,
      zoomInImage,
    },
    functions: {
      onUploadIMG: handleUpdateIMG,
      onChangeTypeUnit: handleChangeTypeUnit,
      onSelectTypeUnit: handleSelectTypeUnit,
      onDropdownWeight: handleDropdownWeight,
      onChangeWeight: handleChangeWeight,
      removeProductImg,
      onShowNote: handleShowNote,
      onChangeNote: handleChangeNote,
      onZoomInImage: handleZoomInImage,

      animationClose,
      canSubmitUnitManage,
      onToggleShowUnitManage: handleToggleShowUnitManage,
      onChangeModalUnit: handleChangeModalUnit,
      onChangeModalSymbol: handleChangeModalSymbol,
      closeModalUnitManageConfirm,
      acceptanceModalUnitManageConfirm,
      submitUnitManage,

      handleSearchUnit,
    },
    validate: {
      onBlurWeight: handleBlurWeight,
      formInfoProductValidate,
      onBlurModalUnit: handleBlurModalUnit,
      onBlurModalSymbol: handleBlurModalSymbol,
    }
  }
}

export default useCreateInfoProduct;