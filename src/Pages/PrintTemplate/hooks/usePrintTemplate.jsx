import React, {useReducer, useState, useEffect} from 'react';
import {printTemplateActions, printTemplateInitialState, printTemplateReducer} from "../provider/~reducer";
import categories from "../~categories"
import {SCRIPT} from "../interfaces/~script"

const usePrintTemplate = () => {
  const [state, dispatch] = useReducer(printTemplateReducer, printTemplateInitialState)
  const [openModal, setOpenModal] = useState(false)
  const [animation, setAnimation] = useState(false)
  
  useEffect(() => {
    const category = categories.find(item => item.value === state?.filter?.type?.activeValue) ?? []
    dispatch({type: printTemplateActions.LIST_KEYWORD, payload: category})
  }, [state?.filter?.type?.activeValue])

  const modalKeyword = () => setOpenModal(true)
  const handleCloseModal = () => {
    setAnimation(true)
    setTimeout(() => {
      setOpenModal(false)
    }, 300)
  }
  const handleDismissModal = () => {
    setAnimation(true)
    setTimeout(() => {
      setOpenModal(false)
    }, 300)
  }
  const categoryTitle = (page, item) => {
    var html = ''
    switch (page) {
      case 'tts_order_detail':
        switch (item) {
          case '{customer_name}': {
            html = SCRIPT.CATEGORIES.INFO_ORDER
            break
          }
          default: return html
        }
        break
      case 'order_tts':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{order_id}': {
            html = SCRIPT.CATEGORIES.TTS
            break
          }
          default: return html
        }
        break
      case 'order_bill':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{receiver_name}': {
            html = SCRIPT.CATEGORIES.INFO_ORDER
            break
          }
          default: return html
        }
        break
      case 'payment_voucher':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{receipt_code}': {
            html = SCRIPT.CATEGORIES.INFO_VOUCHER
            break
          }
          default: return html
        }
        break
      case 'shipment':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{receiver_name}': {
            html = SCRIPT.CATEGORIES.INFO_ORDER
            break
          }
          default: return html
        }
        break
      case 'check_inventory':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{code}': {
            html = SCRIPT.CATEGORIES.INFO_INVENTORY
            break
          }
          default: return html
        }
        break
      case 'purchase_order':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{invoice_number}': {
            html = SCRIPT.CATEGORIES.INFO_PURCHASE_ORDER
            break
          }
          default: return html
        }
        break
      case 'receipt_voucher':
        switch (item) {
          case '{store_logo}': {
            html = SCRIPT.CATEGORIES.INFO_STORE
            break
          }
          case '{receipt_code}': {
            html = SCRIPT.CATEGORIES.INFO_ORDER
            break
          }
          default: return html
        }
        break
      default: return html
    }
    return html
  }

  return {
    provider: {state, dispatch},
    openModal,
    animation,
    functionsGlobal: {
      modalKeyword,
      handleCloseModal,
      handleDismissModal,
      categoryTitle,
    }
  }
};

export default usePrintTemplate;