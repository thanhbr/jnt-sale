import React, {useContext} from 'react';
import {ProductContext} from "../provider/~context";
import {productActions} from "../provider/~action";
import {fNumber} from "../../../util/formatNumber";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useCreateInfoPrice = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const formInfoPrice = pageState?.formCreate?.price
  const formInfoInventory = pageState?.formCreate?.inventory
  const formInfoPriceValidate = formInfoPrice?.validate
  const formCreate = pageState?.formCreate

  const handleChangeRetail = value => {
    const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
    pageDispatch({type: productActions.FORM_CREATE_INIT_PRICE_RETAIL, payload: currentValue})
    pageState?.formCreate?.version?.valueVersion?.map(item => {
      item.price = currentValue
      return item
    })
    if(!!currentValue) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_RETAIL, payload: { status: false, message: ''}})
  }

  const handleChangeWholesale = value => {
    const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
    pageDispatch({type: productActions.FORM_CREATE_INIT_PRICE_WHOLESALE, payload:  currentValue})
    pageState?.formCreate?.version?.valueVersion?.map(item => {
      item.wholesale_price = currentValue
      return item
    })
    if(!!currentValue) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_WHOLESALE, payload: { status: false, message: ''}})
  }

  const handleChangeLastEntry = value => {
    const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
    pageDispatch({type: productActions.FORM_CREATE_INIT_PRICE_LAST_ENTRY, payload:  currentValue})
    pageState?.formCreate?.version?.valueVersion?.map(item => {
      item.supplier_price = currentValue
      return item
    })
    if(!!currentValue) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_LAST_ENTRY, payload: { status: false, message: ''}})
  }

  const handleChangeCost = value => {
    const currentValue = fNumber(value.toString().replace(/[^0-9]/g, ''))
    pageDispatch({type: productActions.FORM_CREATE_INIT_PRICE_COST, payload:  currentValue})
    pageState?.formCreate?.version?.valueVersion?.map(item => {
      item.cost_price = currentValue
      return item
    })
    if(!!currentValue) pageDispatch({type: productActions.VALIDATE_FORM_CREATE_COST, payload: { status: false, message: ''}})
  }

  const handleBlurRetail = _ => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_RETAIL,
      payload: {
        status: +formInfoPrice?.retail === 0,
        message: +formInfoPrice?.retail === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.RETAIL_PRICE) : ''
      }
    })
  }

  const handleBlurWholesale = _ => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_WHOLESALE,
      payload: {
        status: +formInfoPrice?.wholesale === 0,
        message: +formInfoPrice?.wholesale === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.WHOLESALE_PRICE) : ''
      }
    })
  }

  const handleBlurLastEntry = _ => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_LAST_ENTRY,
      payload: {
        status: +formInfoPrice?.lastEntry === 0,
        message: +formInfoPrice?.lastEntry === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.LAST_ENTRY_PRICE) : ''
      }
    })
  }

  const handleBlurCost = _ => {
    pageDispatch({
      type: productActions.VALIDATE_FORM_CREATE_COST,
      payload: {
        status: +formInfoPrice?.cost === 0,
        message: +formInfoPrice?.cost === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.COST_PRICE) : ''
      }})
  }

  return {
    value: {
      formInfoInventory,
      formInfoPrice,
      formCreate,
    },
    functions: {
      onChangeRetail: handleChangeRetail,
      onChangeWholesale: handleChangeWholesale,
      onChangeLastEntry: handleChangeLastEntry,
      onChangeCost: handleChangeCost,
    },
    validate: {
      formInfoPriceValidate,
      onBlurRetail: handleBlurRetail,
      onBlurWholesale: handleBlurWholesale,
      onBlurLastEntry: handleBlurLastEntry,
      onBlurCost: handleBlurCost,
    }
  }
}

export default useCreateInfoPrice;