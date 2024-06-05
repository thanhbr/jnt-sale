import React, {useCallback, useContext} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {debounce} from "@mui/material";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateInfoInventory = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const formInfoInventory = pageState.formCreate.inventory
  const groupWarehouse = formInfoInventory?.warehouse?.list
  const formInfoInventoryValidate = formInfoInventory?.validate

  const handleChangeInitInventory = () => {
    pageDispatch({type: productActions.FORM_CREATE_INIT_INVENTORY_PRODUCT, payload: !formInfoInventory?.statusInit})
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY, payload: {status: false, message: ''}})
    pageDispatch({type: productActions.VALIDATE_FORM_CREATE_COST, payload: { status: false, message: ''}})
  }

  const handleSelectWarehouse = value => {
    pageDispatch({type: productActions.FORM_CREATE_CHANGE_INVENTORY_VALUE_PRODUCT, payload: value})
  }

  const handleChangeInitValue = value => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      pageState?.formCreate?.version?.valueVersion?.map(item => {
        item.inventory = value
        return item
      })
      pageDispatch({type: productActions.FORM_CREATE_INIT_INVENTORY, payload: value})
      if(!!value) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY, payload: {status: false, message: ''}})
    }
  }

  const handleBlurInitValue = _ => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_INIT_INVENTORY,
      payload: {
        status: !!!formInfoInventory?.init || +formInfoInventory?.init === 0,
        message: !!!formInfoInventory?.init ? t(DISPLAY_NAME_MENU.VALIDATE.EMPTY.INIT_INVENTORY) :
                  (+formInfoInventory?.init === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.INIT_INVENTORY) : '')
      }
    })
  }

  const handleFetchWarehouseList = async keyword => {
    const response = await sendRequestAuth(
      'get', `${config.API}/warehouse/warehouses?keyword=${keyword}&is_purchase&status&per_page=100&start=0`,
    )
    if(response?.data?.success) {
      pageDispatch({type: productActions.FORM_CREATE_UPDATE_LIST_WAREHOUSE, payload: {
          list: response?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
          listOrigin: response?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
        }})
    }
  }

  const debounceHandleWareSearchUnit = useCallback(
    debounce((data) => {
      handleFetchWarehouseList(data?.value)
    }, 500),
    [],
  )

  const handleSearchWarehouse = data => {
    debounceHandleWareSearchUnit(data)
  }

  return {
    value: {
      formInfoInventory,
      groupWarehouse,
    },
    functions: {
      onChangeInitInventory: handleChangeInitInventory,
      onChangeInitValue: handleChangeInitValue,
      onSelectWarehouse: handleSelectWarehouse,

      handleSearchWarehouse,
    },
    validate: {
      onBlurInitValue: handleBlurInitValue,
      formInfoInventoryValidate
    }
  }
}

export default useCreateInfoInventory;