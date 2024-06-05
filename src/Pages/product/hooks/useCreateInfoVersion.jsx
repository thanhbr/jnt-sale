import React, {useContext, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {
  CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS,
  CREATE_PRODUCT_COLUMN_ATTR_CONSTANTS,
} from "../interfaces/~constants";
import {productActions} from "../provider/~action";
import {postData, sendRequestAuth} from "../../../api/api";
import {fNumber} from "../../../util/formatNumber";
import toast from "../../../Component/Toast";
import config from "../../../config";
import {replaceAllCustom} from "../../../util/functionUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {removeVietnameseTones} from "../../../util/checkPasswordVN";
import {uploadProductImage} from "../../../api/url";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateInfoVersion = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const formCreate = pageState?.formCreate
  const formInfoPrice = pageState?.formCreate?.version
  const listAttr = formInfoPrice?.arrAttr
  const attrVersion = formInfoPrice?.attrVersion
  const dataVersion = formInfoPrice?.valueVersion
  const dataEditVersion = formCreate?.version?.valueEditVersion
  const modalPrice = formInfoPrice?.modalPrice
  const zoomInImage = pageState?.formCreate?.zoomIn
  const modalConfirm = pageState?.modal
  const location = useLocation()?.pathname?.split('/')
  const validateSku = formInfoPrice?.validateSKU
  const validateBarcode = formInfoPrice?.validateBarcode

  const handleAddAttrInit = () => {
    CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[0].name = t(DISPLAY_NAME_MENU.GENERAL.SIZE)
    pageDispatch({
      type: productActions.FORM_CREATE_CHANGE_INIT_ATTRIBUTES_PRODUCT,
      payload: +formInfoPrice?.initAttr + 1
    })
    pageDispatch({
      type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT,
      payload:[CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[0]]
    })
  }


  const handleAddAttr = () => {
    let indexAdd = 1
    if(!![...listAttr].find(item => item.code === 'size') && !![...listAttr].find(item => item.code === 'color')) {
      indexAdd = 2
      CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[2].name = t(DISPLAY_NAME_MENU.GENERAL.TYPE)
    } else if (!![...listAttr].find(item => item.code === 'size') && !![...listAttr].find(item => item.code === 'type')) {
      indexAdd = 1
      CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[1].name = t(DISPLAY_NAME_MENU.GENERAL.COLOR)
    } else if ((!![...listAttr].find(item => item.code === 'color') || !![...listAttr].find(item => item.code === 'type'))) {
      indexAdd = 0
      CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[0].name = t(DISPLAY_NAME_MENU.GENERAL.SIZE)
    } else {
      indexAdd = 1
      CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[1].name = t(DISPLAY_NAME_MENU.GENERAL.COLOR)
    }

    pageDispatch({type: productActions.FORM_CREATE_CHANGE_INIT_ATTRIBUTES_PRODUCT, payload: +formInfoPrice?.initAttr + 1})
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT,
      payload: [...listAttr, CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS[indexAdd]]})
  }

  const handleRemoveAttr = value => {
    const arrProductAttr = listAttr.filter(item => removeVietnameseTones(item.code) !== removeVietnameseTones(value.code))
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_INIT_ATTRIBUTES_PRODUCT, payload: +formInfoPrice?.initAttr - 1})
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT,
      payload: arrProductAttr})

    const attrValues = attrVersion.filter(item => removeVietnameseTones(item.code) !== removeVietnameseTones(value.code))
    renderArrayDetailProduct(attrValues)
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_VALUE_PRODUCT, payload: attrValues})
  }

  const uniqueArray = arr => {
    return arr.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === arr.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      })
    })
  }

  const renderArrayDetailProduct = arrProductAttr => {
    let result = []
    let attrColumn = CREATE_PRODUCT_COLUMN_ATTR_CONSTANTS
    attrColumn.name = pageState?.formCreate?.basic?.name || ''
    attrColumn.price = pageState?.formCreate?.price?.retail || ''
    attrColumn.wholesale_price = pageState?.formCreate?.price?.wholesale || ''
    attrColumn.supplier_price = pageState?.formCreate?.price?.lastEntry || ''
    attrColumn.cost_price = pageState?.formCreate?.price?.cost || ''
    attrColumn.inventory = pageState?.formCreate?.inventory?.init || ''
    attrColumn.weight = pageState?.formCreate?.product?.weight || ''
    attrColumn.type_weight = pageState?.formCreate?.product?.unit?.type
    attrColumn.list_type = [
      {id: 'g', name: 'g', active: pageState?.formCreate?.product?.unit?.type === 'g'},
      {id: 'kg', name: 'kg', active:  pageState?.formCreate?.product?.unit?.type === 'kg'},
    ]

    let array = []
    let arraySize = []
    const codeInput = !!!pageState?.formCreate?.basic?.code ? '' :  `${pageState?.formCreate?.basic?.code}-`
    let attrSizeCurrent = []

    switch (arrProductAttr.length) {
      case 1:
        result = arrProductAttr[0].value.map(size => {
          size = size?.value
          for(let i = 1; i <= size?.length; i++) {
            const sizeChild = removeVietnameseTones(size).slice(0, i).replace(/[^-.\w\s]/gi, '').replaceAll('  ', ' ')
            if(!array.includes(`${codeInput}${sizeChild}`)) {
              attrColumn.id = `${codeInput}${sizeChild}`
              attrColumn.sku = `${codeInput}${sizeChild}`
              attrColumn.attr_size = size || ''
              attrColumn.attr_type = ''
              attrColumn.attr_color = ''
              break
            }
          }
          array.push(attrColumn.id)
          return {...attrColumn}
        })
        break
      case 2:
        arrProductAttr[0].value.map(size => {
          size = size?.value
          attrSizeCurrent.push(size)
          for(let i = 1; i <= size.length; i++) {
            if(!array.includes(removeVietnameseTones(size).slice(0, i))) {
              attrColumn.id = removeVietnameseTones(size).slice(0, i)
              attrColumn.sku = ` - ${removeVietnameseTones(size).slice(0, i)}`
              break
            }
          }
          array.push(attrColumn.id)
          return arraySize.push(attrColumn.id)
        })
        arraySize.map((size, index) => {
          attrColumn.attr_size = attrSizeCurrent[index] || ''
          arrProductAttr[1].value.map(color => {
            color = color?.value
            for(let i = 1; i <= color.length; i++) {
              const sizeChild = removeVietnameseTones(size).replace(/[^-.\w\s]/gi, '').replaceAll('  ', ' ')
              const colorChild = removeVietnameseTones(color).slice(0, i).replace(/[^-.\w\s]/gi, '').replaceAll('  ', ' ')
              if(!array.includes(`${codeInput}${!!!sizeChild ? '' : sizeChild+'-'}${colorChild}`)) {
                attrColumn.id = `${codeInput}${!!!sizeChild ? '' : sizeChild+'-'}${colorChild}`
                attrColumn.sku = `${codeInput}${!!!sizeChild ? '' : sizeChild+'-'}${colorChild}`
                attrColumn.attr_color = color || ''
                attrColumn.attr_type = ''
                break
              }
            }
            array.push(attrColumn.id)
            result.push({...attrColumn})
          })
        })
        break
      case 3:
        arrProductAttr[0].value.map(size => {
          size = size?.value
          arrProductAttr[1].value.map(color => {
            color = color?.value
            arrProductAttr[2].value.map(type => {
              type = type?.value
              for(let i = 1; i <= type.length; i++) {
                const sizeChild = replaceAllCustom(removeVietnameseTones(size).slice(0, i).replace(/[^-.\w\s]/gi, ''), '  ', ' ')
                const colorChild = replaceAllCustom(removeVietnameseTones(color).slice(0, i).replace(/[^-.\w\s]/gi, ''), '  ', ' ')
                const typeChild = replaceAllCustom(removeVietnameseTones(type).slice(0, i).replace(/[^-.\w\s]/gi, ''), '  ', ' ')
                const str = `${codeInput}${!!!sizeChild ? '' : sizeChild+'-'}${!!!colorChild ? '' : colorChild+'-'}${typeChild || ''}`
                if(!array.includes(str)) {
                  attrColumn.id = str
                  attrColumn.sku = str
                  attrColumn.attr_size = size || ''
                  attrColumn.attr_color = color || ''
                  attrColumn.attr_type = type || ''
                  break
                }
              }

              array.push(attrColumn.id)
              result.push({...attrColumn})
            })
          })
        })

        break
      default:
        break
    }

    // Giữ nguyên giá trị cữ khi trùng SKU
    const abb = result.map(item => {
      const hadVersion = dataVersion?.find(da => da.sku === item.sku)
      if(!!hadVersion)
        return hadVersion
      return item
    }).filter(item => !!item.idEdit)
      .sort((a, b) => +a.idEdit - +b.idEdit)
    const cbb = result.map(item => {
      const hadVersion = dataVersion?.find(da => da.sku === item.sku)
      if(!!hadVersion)
        return hadVersion
      return item
    }).filter(item => !!!item.idEdit)

    const formatVersion = [...abb, ...cbb].reverse()

    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: formatVersion})
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_SKU_CHILD, payload: []})
  }

  const handleAddVersionProduct = (val, version) => {
    const attrValues =  uniqueArray([...attrVersion, {code: version.code, value: val, name: version.name}].map(item => {
      if(item.code === version.code) item.value = val
      return item
    })).filter(item => item.value.length > 0)
    const formatAttr = attrValues.filter((a, i) => attrValues.findIndex((s) => a.code === s.code) === i)

    renderArrayDetailProduct(formatAttr)
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_VALUE_PRODUCT, payload: formatAttr})
  }

  const handleTogglePopupPrice = bool => pageDispatch({type: productActions.FORM_CREATE_TOGGLE_MODAL_PRODUCT_PRICE_MANAGER, payload: bool})

  const handleChangeAttrVersion = (value, attr) => {
    const listFormat = [...listAttr]
    listFormat.map(item => {
      if(item.id === attr.id) {
        item.name = value
      }
    })
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT, payload: listFormat})
  }

  const submitQueries = {
    "product_name": pageState?.formCreate?.basic?.name || '',
    "product_model": pageState?.formCreate?.basic?.code || '',
    "barcode": pageState?.formCreate?.basic?.barCode || '',
    "category_id": pageState?.formCreate?.basic?.groupProduct?.id || '',
    "status": (pageState?.formCreate?.basic?.active ? '1' : '2') || "1",
    "product_info": {
      // "image": pageState?.formCreate?.product?.image?.name || '',
      "image": pageState?.formCreate?.product?.image?.link || '',
      "unit_id": pageState?.formCreate?.product?.unit?.value?.id || '',
      "weight": pageState?.formCreate?.product?.weight || '1',
      "weight_unit": !!!pageState?.formCreate?.product?.weight ? 'kg' : pageState?.formCreate?.product?.unit?.type || 'g',
      "note": pageState?.formCreate?.product?.note?.content || '',
    },
    "product_warehouse": {
      "warehouse_id": pageState?.formCreate?.inventory?.statusInit ? pageState?.formCreate?.inventory?.warehouse?.value?.id || '' : '',
      "warehouse_quantity": pageState?.formCreate?.inventory?.statusInit ? pageState?.formCreate?.inventory?.init || '' : '',
    },
    "product_price": {
      "price": replaceAllCustom(pageState?.formCreate?.price?.retail, ',', '') || '',
      "wholesale_price": replaceAllCustom(pageState?.formCreate?.price?.wholesale, ',', '') || '',
      "supplier_price": replaceAllCustom(pageState?.formCreate?.price?.lastEntry, ',', '') || '',
      "cost_price": replaceAllCustom(pageState?.formCreate?.price?.cost, ',', '') || '',
    },
    "product_attr": attrVersion?.map(item => {
      return {
        title: item?.name,
        value: item?.value?.map(it => it.value)?.join(','),
      }
    }),
    "product_version": dataVersion.map((item, index) => {
      return {
        product_id_details: (dataEditVersion?.length === 1 && (index + 1 === dataVersion?.length))
          ? dataEditVersion[0]?.id
          : item?.idEdit || '',
        // : (!!!dataEditVersion[index]?.id ? item?.idEdit || '' : dataEditVersion[index]?.id),
        product_name_version: `${item?.name}${!!!item?.attr_size ? '' : ' - '+item?.attr_size}${!!!item?.attr_color ? '' : ' - '+item?.attr_color}${!!!item?.attr_type ? '' : ' - '+item?.attr_type}`,
        sku: item?.sku || '',
        barcode: dataVersion?.length === 1
          ? pageState?.formCreate?.basic?.barCode || ''
          : item?.barcode || '',
        price: replaceAllCustom(item?.price, ',', ''),
        wholesale_price: replaceAllCustom(item?.wholesale_price, ',', ''),
        supplier_price: replaceAllCustom(item?.supplier_price, ',', ''),
        cost_price: replaceAllCustom(item?.cost_price, ',', ''),
        weight: item?.weight,
        weight_unit: item?.type_weight,
        // image: item?.image_name,
        image: item?.image_name,
        warehouse_quantity: item?.inventory,
        attr_value: `${!!!item?.attr_size ? '' : item?.attr_size}${!!!item?.attr_color ? '' : ','+item?.attr_color}${!!!item?.attr_type ? '' : ','+item?.attr_type}`,
        status: item?.status,
      }
    }).reverse()
  }

  const arrayUniqueByKey = [...new Map(dataVersion.map(item => [item.sku, item])).values()]
  const arrayUniqueByBarcode = [...new Map(dataVersion.map(item => [item.barcode, item])).values()]
  const validateBeforeSubmit = [
    arrayUniqueByKey?.length === dataVersion?.length,
    arrayUniqueByBarcode?.length === dataVersion?.length,
  ]?.includes(true)

  const validateFormBeforeSubmit = _ => {
    let success = true
    let location = 70
    if(!!!pageState?.formCreate?.price?.retail) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_RETAIL, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.RETAIL_PRICE)}})
      success = false
      location = 1000
    }
    if(!!!pageState?.formCreate?.price?.lastEntry) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_LAST_ENTRY, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.LAST_ENTRY)}})
      success = false
      location = 1000
    }
    if(pageState?.formCreate?.inventory?.statusInit && !!!pageState?.formCreate?.price?.cost) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_COST, payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.COST_PRICE)}})
      success = false
      location = 1000
    }
    if(!!!pageState?.formCreate?.price?.wholesale) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_WHOLESALE, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.WHOLESALE_PRICE)}})
      success = false
      location = 1000
    }
    if(validateSku?.length > 0) {
      success = false
      location = 1000
    }
    if(pageState?.formCreate?.inventory?.statusInit && !!!pageState?.formCreate?.inventory?.init) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY, payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INIT_INVENTORY)}})
      success = false
      location = 800
    }
    if(!!!pageState?.formCreate?.product?.unit?.value) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_UNIT_PRODUCT, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT)}})
      success = false
      location = 420
    }
    if(!!!pageState?.formCreate?.basic?.name) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_NAME, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_NAME)}})
      success = false
      location = 70
    }
    // if(!!!pageState?.formCreate?.basic?.code) {
    if(!!!pageState?.formCreate?.basic?.code && pageState?.formCreate?.version?.valueVersion?.length === 0) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_CODE, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_CODE)}})
      success = false
      location = 70
    }
    if(!!!pageState?.formCreate?.basic?.groupProduct?.value) {
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT)}})
      success = false
      location = 70
    }

    setTimeout(() => {
      scrollToItem(location)
      if(!success) toast.error(t(DISPLAY_NAME_MENU.GENERAL.CHECK_INFO_BEFORE_SUBMIT))
    }, 100)
    return success
  }

  const navigate = useNavigate()
  const [debounceSubmitCreate, setDebounceSubmitCreate] = useState(true)
  const scrollToItem = (location) => {
    const wrapper = document.querySelector('#content-wrap')
    wrapper.scrollTo({
      top: location,
      behavior: "smooth"
    })
  }
  const submitCreate = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/product/create`, JSON.stringify(submitQueries),
    ).catch(() => toast.error(t(DISPLAY_NAME_MENU.GENERAL.API_ERROR)))

    if(response?.data?.success) {
      toast.success(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.ADDED_SUCCESSFULLY))
      navigate('/products')
    } else {
      let location = 70
      errorResponse(response?.data?.errors?.details)
      if(!!response?.data?.errors?.details?.find(res => +res.code === 1003)) location = 1000
      if(!!response?.data?.errors?.details?.find(res => +res.code === 1002)) location = 70
      setTimeout(() => {
        scrollToItem(location)
        toast.error(t(DISPLAY_NAME_MENU.GENERAL.CHECK_INFO_BEFORE_SUBMIT))
      }, 100)
    }
  }
  const handleSubmit = () => {
    if(debounceSubmitCreate && validateBeforeSubmit && validateFormBeforeSubmit()) {
      pageDispatch({
        type: productActions.VALIDATE_FORM_CREATE_WEIGHT_PRODUCT,
        payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INVALID_WEIGHT)}
      })
      setDebounceSubmitCreate(false)
      setTimeout(() => setDebounceSubmitCreate(true), 2000)
      const statusForm = pageState?.formCreate?.statusForm
      if(statusForm === 'create') {
        submitCreate()
      }
      // EDIT PRODUCT
      else {
        const statusConfirm = pageState?.modal?.statusConfirmEdit
        if(statusConfirm?.order === 0 && statusConfirm?.warehouse_quantity === 0 && dataEditVersion?.length === dataVersion?.length) {
          handleAcceptModalConfirmEdit()
        } else if (statusConfirm?.order === 0 && statusConfirm?.warehouse_quantity > 0 && dataEditVersion?.length !== dataVersion?.length) {
          pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_3, payload: true})
        } else if (statusConfirm?.order > 0 && statusConfirm?.warehouse_quantity === 0 && dataEditVersion?.length !== dataVersion?.length) {
          pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_2, payload: true})
        } else if (statusConfirm?.order > 0 && statusConfirm?.warehouse_quantity === 0 && dataEditVersion?.length === dataVersion?.length) {
          pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_1, payload: true})
        } else if (statusConfirm?.order > 0 && statusConfirm?.warehouse_quantity > 0 && dataEditVersion?.length === dataVersion?.length) {
          pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_1, payload: true})
        } else if (statusConfirm?.order > 0 && statusConfirm?.warehouse_quantity > 0 && dataEditVersion?.length !== dataVersion?.length) {
          pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_2, payload: true})
        } else {
          handleAcceptModalConfirmEdit()
        }
      }
    }
  }

  const errorResponse = response => {
    let rowError = []
    response?.map(res => {
      switch (+res.code) {
        case 1001:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_NAME, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_NAME)}})
          break
        case 1002:
          rowError = [...rowError, res?.row]
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_SKU_CHILD, payload: rowError})
          if(!!!res?.row) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_CODE, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.PRODUCT_CODE)}})
          break
        case 1003:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_BAR_CODE_CHILD, payload: res?.row || ''})
          if(!!!res?.row) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_BARCODE, payload: {status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EXISTS.PRODUCT_BARCODE)}})
          break
        case 1011:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_CODE, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.PRODUCT_CODE)}})
          break
        case 1012:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_GROUP_PRODUCT, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.GROUP_PRODUCT)}})
          break
        case 1013:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_UNIT_PRODUCT, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.UNIT)}})
          break
        // case 1014:
        //   pageDispatch({type: productActions.VALIDATE_FORM_CREATE_RETAIL, payload: { status:true, message: res.message}})
        //   break
        // case 1015:
        //   pageDispatch({type: productActions.VALIDATE_FORM_CREATE_WHOLESALE, payload: { status:true, message: res.message}})
        //   break
        // case 1016:
        //   pageDispatch({type: productActions.VALIDATE_FORM_CREATE_LAST_ENTRY, payload: { status:true, message: res.message}})
        //   break
        case 1017:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_WEIGHT_PRODUCT, payload: { status:true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INVALID_WEIGHT)}})
          break
        case 1085:
          pageDispatch({type: productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY, payload: { status: true, message: t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INVENTORY_GREATER_THAN_0)}})
          break
        // case 1086:
        //   pageDispatch({type: productActions.VALIDATE_FORM_CREATE_COST, payload: { status: true, message: 'Giá sản phẩm (giá vốn) là bắt buộc'}})
        //   break
        default:
          break
      }
    })
  }


  const handleChangeRowDetail = (value, type, rawData, index) => {
    let result = []
    if(type === 'barcode') {
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value)) {
        result = dataVersion.map(item => {
          if(item.id === rawData.id) {
            item.barcode = value
          }
          return item
        })
      }
    } else if (type === 'inventory') {
      const re = /^[0-9\b]+$/;
      if (value === '' || re.test(value)) {
        result = dataVersion.map(item => {
          if(item.id === rawData.id) {
            item.inventory = +value
          }
          return item
        })
      }
    } else if (type === 'weight') {
      const re = /^[\d]*\.?[\d]{0,2}$/
      if (value === '' || re.test(value)) {
        result = dataVersion.map(item => {
          if(item.id === rawData.id) {
            item.weight = value
          }
          return item
        })
      }
    } else if (type === 'statusVersion') {
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.status = value === 1 ? 2 : 1
        }
        return item
      })
    } else if (type === 'image') {
      const handleUpdateIMG = async _ =>{
        const image = value.target.files[0]
        if(!!image) {
          const formData= new FormData()
          formData.append('image',image)
          formData.get('image')
          try {
            const res = await postData(uploadProductImage(), formData)
            if(res?.data?.success) {
              result = dataVersion.map(item => {
                if(item.id === rawData.id) {
                  item.image = res?.data?.url
                  item.image_name = res?.data?.image
                }
                return item
              })
              if(result.length > 0) pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: result})
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
      handleUpdateIMG()
    } else if (type === 'removeProductImg') {
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.image = ''
        }
        return item
      })
    } else if (type === 'changeTypeWeight') {
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.type_weight = value.name === 'kg' ? 'kg' : 'g'
          item.list_type =  [
            {id: 'g', name: 'g', active: value.name === 'g'},
            {id: 'kg', name: 'kg', active: value.name === 'kg'},
          ]
        }
        return item
      })
    } else if (type === 'price') {
      const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.price = currentValue
        }
        return item
      })
    } else if (type === 'wholesalePrice') {
      const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.wholesale_price = currentValue
        }
        return item
      })
    } else if (type === 'supplierPrice') {
      const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.supplier_price = currentValue
        }
        return item
      })
    } else if (type === 'costPrice') {
      const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.cost_price = currentValue
        }
        return item
      })
    } else if (type === 'sku') {
      const currentValue = removeVietnameseTones(value)
      result = dataVersion.map(item => {
        if(item.id === rawData.id) {
          item.sku = currentValue
        }
        return item
      })
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_CODE, payload: { status: false, message: ''}})
      pageDispatch({type: productActions.VALIDATE_FORM_CREATE_SKU_CHILD, payload: validateSku.filter(it => +it !== index+1)})
    }

    if(result.length > 0) pageDispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: result})
  }

  const canSaveProduct = [
    pageState?.formCreate?.basic?.validate?.name?.status,
    pageState?.formCreate?.basic?.validate?.code?.status,
    pageState?.formCreate?.basic?.validate?.barCode?.status,
    pageState?.formCreate?.basic?.validate?.group?.status,
    pageState?.formCreate?.product?.validate?.unit?.status,
    pageState?.formCreate?.price?.validate?.retail?.status,
    pageState?.formCreate?.price?.validate?.wholesale?.status,
    pageState?.formCreate?.price?.validate?.lastEntry?.status,
    pageState?.formCreate?.price?.validate?.cost?.status,
  ].includes(true)


  const handleZoomInImage = (bool, image) => {
    pageDispatch({type: productActions.FORM_CREATE_ZOOM_IN_IMAGE, payload: bool})
    pageDispatch({type: productActions.FORM_CREATE_ZOOM_IN_IMAGE_LINK_ACTIVE, payload: image})
  }

  const validatePrice = [
    !!dataVersion?.find(item => item.price === '' || +item.price === 0),
    !!dataVersion?.find(item => item.supplier_price === '' || +item.supplier_price === 0),
    !!dataVersion?.find(item => item.wholesale_price === '' || +item.wholesale_price === 0),
    formCreate?.inventory?.statusInit && !!dataVersion?.find(item => item.cost_price === '' || +item.cost_price === 0),
  ].includes(true)

  const handleCloseModalConfirmEdit = _ => {
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_1, payload: false})
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_2, payload: false})
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_3, payload: false})
  }

  const handleAcceptModalConfirmEdit = async _ => {
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_1, payload: false})
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_2, payload: false})
    pageDispatch({type: productActions.EDIT_PRODUCT_CONFIRM_POPUP_3, payload: false})

    delete submitQueries?.product_model
    delete submitQueries?.barcode
    const response = await sendRequestAuth(
      'post',
      `${config.API}/product/update/${location[3]}`, JSON.stringify(submitQueries),
    ).catch(() => toast.error('Lỗi API, chỉnh sửa sản phẩm thất bại'))

    if(response?.data?.success) {
      toast.success('Cập nhật sản phẩm thành công')
      navigate('/products')
    } else {
      errorResponse(response?.data?.errors?.details)
      // toast.error('Sản phẩm lỗi! Không cập nhật được.')
    }
  }

  return {
    value: {
      formCreate,
      formInfoPrice,
      listAttr,
      attrVersion,
      dataVersion,
      modalPrice,
      canSaveProduct,
      zoomInImage,
      validatePrice,
      modalConfirm,
      validateSku,
      validateBarcode
    },
    functions: {
      onAddAttrInit: handleAddAttrInit,
      onAddAttr: handleAddAttr,
      onRemoveAttr: handleRemoveAttr,
      onAddVersionProduct: handleAddVersionProduct,
      onTogglePopupPrice: handleTogglePopupPrice,
      onChangeAttrVersion: handleChangeAttrVersion,
      onChangeRowDetail: handleChangeRowDetail,
      submit: handleSubmit,

      onZoomInImage: handleZoomInImage,

      onCloseModalConfirmEdit: handleCloseModalConfirmEdit,
      onAcceptModalConfirmEdit: handleAcceptModalConfirmEdit,
    }
  }
}


export default useCreateInfoVersion;