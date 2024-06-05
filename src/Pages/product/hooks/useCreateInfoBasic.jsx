import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import StringUtils from "../../productGroup/util/string";
import {createProductGroup} from "../../../api/url";
import toast from "../../../Component/Toast";
import {debounce} from "@mui/material";
import {Text} from "../../../common/text";
import {removeVietnameseTones} from "../../../util/checkPasswordVN";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateInfoBasic = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const [groupParent, setGroupParent] = useState('')
  const [animationClose, setAnimationClose] = useState(false)
  const [modalGroupParent, setModalGroupParent] = useState('')
  const [modalGroupParentConfirm, setModalGroupParentConfirm] = useState(false)
  const [isChangeModalGroupParent, setIsChangeModalGroupParent] = useState(false)
  const formCreate = pageState?.formCreate
  const formInfoBasic = pageState?.formCreate?.basic
  const formInfoBasicValidate = pageState?.formCreate?.basic?.validate
  const formVersion = pageState?.formCreate?.version?.valueVersion
  const modalGroupProduct = pageState?.formCreate?.basic?.modal

  const handleOriginFetch = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/product/category/list?keyword=&status`),
      sendRequestAuth('get', `${config.API}/product/unit/list?keyword=&per_page=100&start=0`),
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword&is_purchase&status&per_page=100&start=0`),
    ])
    if(response[0]?.data?.success) {
      pageDispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN, payload: {
        list: response[0]?.data?.data?.filter(item => +item?.status === 1),
        listOrigin: response[0]?.data?.data?.filter(item => +item?.status === 1),
      }})
      setModalGroupParent({
        list: response[0]?.data?.data?.filter(item => +item?.status === 1),
        listOrigin: response[0]?.data?.data?.filter(item => +item?.status === 1),
        // list: response[0]?.data?.data?.filter(item => item.category_childs.length > 0),
        // listOrigin: response[0]?.data?.data?.filter(item => item.category_childs.length > 0),
      })
    }
    if(response[1]?.data?.success) {
      pageDispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN_UNIT, payload: {
          list: response[1]?.data?.data?.filter(item => +item?.status !== -1),
          listOrigin: response[1]?.data?.data?.filter(item => +item?.status !== -1),
        }})
    }
    if(response[2]?.data?.success) {
      pageDispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN_WAREHOUSE, payload: {
          // id: response[2]?.data?.data?.find(item => +item?.is_main === 1)?.id,
          value: response[2]?.data?.data?.find(item => +item?.is_main === 1),
          list: response[2]?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
          listOrigin: response[2]?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
        }})
    }
  }

  useEffect(() => {
    handleOriginFetch()
  }, [])


  const handleChangeStatus = () => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ACTIVE_INFO_BASIC, payload: !formInfoBasic.active})
  }

  const handleChangeName = value => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_NAME_INFO_BASIC, payload: value})

    const replaceNameVersion = formVersion.map(item => {
      item.name = value
      return item
    })
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: replaceNameVersion})

    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_NAME,
      payload: {
        status: (!!value && value?.length >= 255),
        message: (!!value && value?.length >= 255) ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_NAME) : ''
      }
    })
  }


  const handleBlurName = () => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_NAME,
      payload: {
        status: (!!!formInfoBasic?.name || formInfoBasic?.name?.length >= 255),
        message: !!!formInfoBasic?.name
          ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_NAME) :
          (formInfoBasic?.name?.length >= 255) ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_NAME) : ''
      }
    })
  }

  const handleChangeCode = value => {
    const productCodeFormat = removeVietnameseTones(value).replaceAll('  ', ' ')
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_CODE_INFO_BASIC, payload: productCodeFormat})

    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_CODE,
      payload: {
        status: (!!value && value?.length >= 50),
        message: (!!value && value?.length >= 50) ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_CODE) : ''
      }
    })
  }

  const handleBlurCode = () => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_CODE_INFO_BASIC, payload:  formInfoBasic?.code?.trim()})

    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_CODE,
      payload: {
        status: (!!!formInfoBasic?.code || formInfoBasic?.code?.length >= 50),
        message: !!!formInfoBasic?.code
          ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_CODE) :
          (formInfoBasic?.code?.length >= 50) ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_CODE) : ''
      }
    })
  }

  const handleChangeBarCode = value => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_BARCODE_INFO_BASIC, payload: value})
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_BARCODE,
        payload: {status: value?.length > 13,
          message: value?.length > 13 ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_BARCODE) : ''}})
    }
  }

  const handleBlurBarCode = () => {
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_BARCODE,
      payload: {status: formInfoBasic?.barCode?.length > 13,
        message: formInfoBasic?.barCode?.length > 13 ? t(DISPLAY_NAME_MENU.VALIDATE.MAX.PRODUCT_BARCODE) : ''}})
  }

  const handleSelectParent = (target, value) => {
    pageDispatch({type: productActions.FORM_CREATE_UPDATE_LIST_CHILDREN_TWO, payload: value?.category_childs})

    if(value?.category_childs?.length !== 0) {
      target.stopPropagation()
      setGroupParent(value?.category_name)
    } else {
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: value?.category_name})
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: value?.id})
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status: false, message: ''}})

      // Filter product
      value.name = !!value?.parent_name
        ? `${value?.parent_name} - ${value?.category_name}`
        : value?.category_name
      pageDispatch({
        type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE,
        payload: {
          id: value?.id,
          name: value?.name,
          active: pageState?.filter?.category_id?.active
        }
      })
    }
  }

  const handleSelectChild = value => {
    if(!!value) {
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: value?.id})
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: `${groupParent} - ${value?.category_name}`})
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status: false, message: ''}})
      // Filter product
      pageDispatch({type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE,
        payload: {id: value?.id, name: `${groupParent} - ${value?.category_name}`, active: pageState?.filter?.category_id?.active}})
    } else {
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: ''})
      pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: ''})
      // Filter product
      pageDispatch({
        type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE,
        payload: {id: '', name: '', active: pageState?.filter?.category_id?.active}
      })
    }
  }

  const handleSelectSearchParent = value => {
    pageDispatch({
      type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC,
      payload: value?.id
    })
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT,
      payload: { status: false, message: ''}
    })
    pageDispatch({
      type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC,
      payload: !!value?.parent_name ? `${value?.parent_name} - ${value?.category_name}` : value?.category_name
    })
    value.name = !!value?.parent_name
                    ? `${value?.parent_name} - ${value?.category_name}`
                    : value?.category_name
    pageDispatch({
      type: productActions.FILTER_ADVANCED_CATEGORY_UPDATE,
      payload: {
        id: value?.id,
        active: pageState?.filter?.category_id?.active,
        name: !!value?.parent_name
                ? `${value?.parent_name} - ${value?.category_name}`
                : value?.category_name,
      }
    })
  }

  const location = useLocation()?.pathname?.split('/')
  const navigate = useNavigate()
  const handlePrintBarcode = async _ => {
    if(!!location[3]) {
      const responseIdDefault = await sendRequestAuth('get', `${config.API}/product/detail/${location[3]}`)
      if (responseIdDefault?.data?.success) {
        navigate(`/product/print-barcode/${responseIdDefault?.data?.data?.arr_product_details[0]?.id}`)
      }
    }
  }


  const debounceGroupProductKeywordChange = useCallback(
    debounce((keyword) => {
      handleGroupProductSearch(keyword?.trim())
    }, 500),
    [],
  )

  const handleGroupProductSearch = async keyword => {
    const response = await sendRequestAuth( 'get', `${config.API}/product/category/list?keyword=${keyword}&status`)
    if(response?.data?.success) {
      pageDispatch({
        type: productActions.FORM_CREATE_SEARCH_LIST_ORIGIN,
        payload: {
          keyword: keyword,
          list: highlightGroupProduct(keyword, response?.data?.data)
          // list: highlightGroupProduct(keyword, response?.data?.data?.filter(item => +item.status === 1))
        }
      })
    }
  }

  const getStartEnd = (str, sub) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1]

  const highlightGroupProduct = (keyword, data) => {
    const keywordEng = removeVietnameseTones(keyword)?.toLowerCase()

    let result = []
    data.map(item => {
      if(item?.category_childs?.length !== 0 && !!item?.category_childs) {
        item?.category_childs?.map(it => {
          // const cateEng = removeVietnameseTones(it?.category_name)?.toLowerCase()
          const text = !!it.parent_id
            ? `${item.category_name} - ${it.category_name}`
            : `${it.category_name}`
          // if(cateEng?.includes(keyword)) {
            const convertEng = removeVietnameseTones(text)?.toLowerCase()
            const abc = getStartEnd(convertEng, keywordEng)
            const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
            const fm = text?.split(subText)
            it.parent_name = item.category_name
            it.display = <div style={{fontSize: 14}}>
                          {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
                        </div>
            if(!!fm[2]) {
              it.display = <div style={{fontSize: 14}}>
                {fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}
                <Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[2]}
              </div>
            }
          // } else {
          //   it.display = <Text style={{color: '#1E9A98'}}>{text}</Text>
          // }
          result.push(it)
        })
      } else {
        const cateEng = removeVietnameseTones(item?.category_name)?.toLowerCase()
        const text = item.parent_code
          ? `${item.parent_name} - ${item.category_name}`
          : `${item.category_name}`
        if(cateEng?.includes(keyword)) {
          const convertEng = removeVietnameseTones(text)?.toLowerCase()
          const abc = getStartEnd(convertEng, keywordEng)
          const subText = text.substring(abc[0], abc[0] === -1 ? abc[1]+2 : abc[1]+1)
          const fm = text?.split(subText)
          item.display = <div style={{fontSize: 14}}>{fm[0]}<Text style={{color: '#1E9A98'}}>{subText}</Text>{fm[1]}</div>
        } else {
          item.display = <Text style={{color: '#1E9A98'}}>{text}</Text>
        }
        result.push(item)
      }
    })
    return result
  }

  const handleGroupProductKeywordChange = data => {
    debounceGroupProductKeywordChange(data?.value)
  }

  const handleToggleShowGroupProduct = bool => {
    if(isChangeModalGroupParent) {
      setModalGroupParentConfirm(true)
    } else {
      setAnimationClose(true)
      setTimeout(() => {
        setAnimationClose(false)
        pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_INFO_BASIC, payload: bool})

        clearFormModalGroupProduct()
      }, 300)
    }
  }

  const closeModalGroupProductConfirm = _ =>  setModalGroupParentConfirm(false)
  const acceptanceModalGroupProductConfirm = _ => {
    setModalGroupParentConfirm(false)
    setAnimationClose(true)
    setTimeout(() => {
      setAnimationClose(false)
      pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_INFO_BASIC, payload: false})

      clearFormModalGroupProduct()
    }, 300)
  }

  const handleChangeModalCode = value => {
    const productCodeFormat = removeVietnameseTones(value)?.replaceAll(' ', '')
    pageDispatch({type: productActions.FORM_CREATE_MODAL_CODE_INFO_BASIC, payload: productCodeFormat})

    if(!!value) {
      setIsChangeModalGroupParent(true)
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC, payload: {status: false, message: ''}})
    }
  }

  const handleChangeModalName = value => {
    setIsChangeModalGroupParent(true)
    pageDispatch({type: productActions.FORM_CREATE_MODAL_NAME_INFO_BASIC, payload: value})
    if(!!value) {
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_NAME_INFO_BASIC, payload: {status: false, message: ''}})
    }
  }

  const handleChangeModalNote = value => {
    setIsChangeModalGroupParent(true)
    pageDispatch({type: productActions.FORM_CREATE_MODAL_NOTE_INFO_BASIC, payload: value})
  }

  const handleSearchModalGroupProduct = data => {
    const formatDataValue = data?.value
      ? StringUtils.removeAcent(data?.value?.toLowerCase())
      : ''
    const listData = modalGroupParent?.listOrigin?.filter(item => {
      const formatNameItem = item?.category_name
        ? StringUtils.removeAcent(item?.category_name.toLowerCase())
        : ''
      return formatNameItem.includes(formatDataValue.trim())
    })
    setModalGroupParent({list: listData, listOrigin: modalGroupParent?.listOrigin})
  }

  const handleSelectChildGroupProduct = data => {
    setIsChangeModalGroupParent(true)
    pageDispatch({type: productActions.FORM_CREATE_MODAL_GROUP_PRODUCT_INFO_BASIC, payload: data})
  }

  const clearFormModalGroupProduct = _ => {
    pageDispatch({type: productActions.FORM_CREATE_MODAL_CODE_INFO_BASIC, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_NAME_INFO_BASIC, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_NOTE_INFO_BASIC, payload: ''})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_GROUP_PRODUCT_INFO_BASIC, payload: []})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC, payload: {status: false, message: ''}})
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_NAME_INFO_BASIC, payload: {status: false, message: ''}})
  }

  const validateGroupProduct = _ => {
    let countError = 0
    if(!!!modalGroupProduct?.form?.code) {
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC,
        payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT_CODE)}})
      countError++
    }
    if(!!!modalGroupProduct?.form?.name) {
      pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_NAME_INFO_BASIC,
        payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT_NAME) }})
      countError++
    }
    return countError === 0
  }

  const [debounceGroupProduct, setDebounceGroupProduct] = useState(true)
  const submitGroupProduct = async _ => {
    if(!validateGroupProduct()) return

    if(debounceGroupProduct) {
      setDebounceGroupProduct(false)
      const new_product = {
        'category_code': modalGroupProduct?.form?.code || '',
        'category_name': modalGroupProduct?.form?.name || '',
        'parent_id': modalGroupProduct?.form?.group?.id || '',
        'note': modalGroupProduct?.form?.note,
        'status': 1
      }
      const response = await postData(createProductGroup(), new_product)
      if(response?.data?.success) {
        toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADDED_SUCCESSFULLY))
        setTimeout(() => {
          setAnimationClose(false)
          pageDispatch({type: productActions.FORM_CREATE_OPEN_MODAL_INFO_BASIC, payload: false})
          clearFormModalGroupProduct()
        }, 300)


        pageDispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: new_product.category_name})
        pageDispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: response?.data?.data?.insert_id})

        let updateData = formInfoBasic?.groupProduct?.list
        if(!!modalGroupProduct?.form?.group?.id) {
          updateData.map(item => {
            if(item.id === modalGroupProduct?.form?.group?.id) {
              item?.category_childs.push({
                id: response?.data?.data?.insert_id,
                parent_id: '0',
                category_code: modalGroupProduct?.form?.code || '',
                category_name: modalGroupProduct?.form?.name || '',
                category_note: modalGroupProduct?.form?.note,
                status: '1',
              })
            }
          })
        } else {
          updateData.push({
            id: response?.data?.data?.insert_id,
            parent_id: '0',
            category_code: modalGroupProduct?.form?.code || '',
            category_name: modalGroupProduct?.form?.name || '',
            category_note: modalGroupProduct?.form?.note,
            status: '1',
            category_childs: []
          })
        }
        pageDispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN, payload: {
            list: updateData?.filter(item => +item?.status === 1),
            listOrigin: updateData?.filter(item => +item?.status === 1),
          }})
        setModalGroupParent({
          list: updateData?.filter(item => +item?.status === 1),
          listOrigin:updateData?.filter(item => +item?.status === 1),
          // list: response[0]?.data?.data?.filter(item => item.category_childs.length > 0),
          // listOrigin: response[0]?.data?.data?.filter(item => item.category_childs.length > 0),
        })
      } else {
        if(response?.data?.errors?.code === 101) {
          pageDispatch({
            type: productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC,
            payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.GROUP_PRODUCT_CODE)}
          })
        } else toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADDED_FAILED))
      }
      setTimeout(() => setDebounceGroupProduct(true), 2000)
    }
  }

  const handleBlurModalCode = _ => {
    pageDispatch({type: productActions.FORM_CREATE_MODAL_VALIDATE_CODE_INFO_BASIC,
                  payload: {status: !!!modalGroupProduct?.form?.code,
                    message: !!!modalGroupProduct?.form?.code ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT_CODE) : ''}})
  }

  const handleBlurModalName = _ => {
    pageDispatch({
      type: productActions.FORM_CREATE_MODAL_VALIDATE_NAME_INFO_BASIC,
      payload: {
        status: !!!modalGroupProduct?.form?.name,
        message: !!!modalGroupProduct?.form?.name ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT_NAME) : ''
      }
    })
  }

  const canSubmitGroupProduct = [
    modalGroupProduct?.validate?.code?.status,
    modalGroupProduct?.validate?.name?.status,
  ].includes(true)

  return {
    value: {
      formInfoBasic,
      formVersion,
      formCreate,
      modalGroupProduct,
      modalGroupParent,
      modalGroupParentConfirm,
    },
    functions: {
      onChangeStatus: handleChangeStatus,
      onChangeName: handleChangeName,
      onChangeCode: handleChangeCode,
      onChangeBarCode: handleChangeBarCode,
      onSelectParent: handleSelectParent,
      onSelectChild: handleSelectChild,
      onGroupProductKeywordChange: handleGroupProductKeywordChange,
      onSelectSearchParent: handleSelectSearchParent,
      onPrintBarcode: handlePrintBarcode,

      animationClose,
      canSubmitGroupProduct,
      closeModalGroupProductConfirm,
      acceptanceModalGroupProductConfirm,
      onToggleShowGroupProduct: handleToggleShowGroupProduct,
      onChangeModalCode: handleChangeModalCode,
      onChangeModalName: handleChangeModalName,
      onChangeModalNote: handleChangeModalNote,
      onSearchModalGroupProduct: handleSearchModalGroupProduct,
      onSelectChildGroupProduct: handleSelectChildGroupProduct,
      submitGroupProduct,
    },
    validate: {
      formInfoBasicValidate,
      onBlurName: handleBlurName,
      onBlurCode: handleBlurCode,
      onBlurBarCode: handleBlurBarCode,
      onBlurModalCode: handleBlurModalCode,
      onBlurModalName: handleBlurModalName,
    }
  }
}

export default useCreateInfoBasic;