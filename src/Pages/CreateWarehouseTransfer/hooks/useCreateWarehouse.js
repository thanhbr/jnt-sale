import { useContext } from "react"
import { actionTypes } from "../provider/_actions"
import { WarehouseTransferContext } from "../provider/_context"
import { createWarehouseTransferInitialState } from "../provider/_initialState"

const { postData } = require("api/api")
const { createWarehouseManager } = require("api/url")
const { default: useAlert } = require("hook/useAlert")

export const useCreateWarehouse = () => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {showAlert} = useAlert()
  const createUnitsManage = async data => {
    try {
      const res = await postData(createWarehouseManager(), data)
      if (res.data.success) {
        showAlert({ content: res.data?.message, type: 'success' })
        dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {...createWarehouseTransferInitialState.createModal} })
      } else {
        if (!Array.isArray(res.data?.errors?.details)) {
          if (res.data?.errors?.details?.field === 'warehouse_name')
            dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {errors: [{field: res.data?.errors?.details?.field, message: res.data?.errors?.details?.message}]} })
          else {
            showAlert({ content: res.data?.errors?.details?.message, type: 'danger' })
          }
        } else if (Array.isArray(res.data?.errors?.details)) {
          let errors = []
          res.data?.errors?.details.forEach(item => {
            if (item.field === 'warehouse_name') errors.push({field: item.field, message: item.message})
            else showAlert({ content: item.message, type: item.field === 'is_main' ? 'warning' : 'danger' })
          })

          if (errors.length > 0) dispatch({ type: actionTypes.SET_CREATE_MODAL, payload: {errors}})
        } else 
          showAlert({ content: res.data?.errors?.message, type: 'danger' })
      }
    } catch (er) {
      console.log(er)
    }
  }

  return {
    createUnitsManage
  }
}