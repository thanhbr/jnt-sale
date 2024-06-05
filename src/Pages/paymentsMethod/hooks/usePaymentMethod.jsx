import {useReducer} from "react";
import {
  paymentMethodReducer,
  paymentMethodInitialState, paymentMethodActions
} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";

const usePaymentMethod = () => {
  const [state, dispatch] = useReducer(paymentMethodReducer, paymentMethodInitialState)

  const handleOriginFetch = async () => {
    dispatch({ type: paymentMethodActions.SET_LOADING, payload: true })
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=&per_page=20&start=0`),
    ])
    dispatch({ type: paymentMethodActions.SET_LOADING, payload: false })
    if (response[0]?.data?.success) {
      dispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
      dispatch({type: paymentMethodActions.SET_PAGINATION, payload: {
        active: 0,
        amount: 20,
        total: Math.ceil(response[0]?.data?.meta?.total / 20),
        totalItems: response[0]?.data?.meta?.total,
      }})
    }
  }

  const handlePaginationAmountChange = async amount => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=&per_page=${amount}&start=0`),
    ])
    if (response[0]?.data?.success) {
      dispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
      dispatch({type: paymentMethodActions.SET_PAGINATION, payload: {
          active: 0,
          amount: amount,
          total: Math.ceil(response[0]?.data?.meta?.total / amount),
          totalItems: response[0]?.data?.meta?.total,
        }})
    }
  }

  const handlePaginationPageChange = async page => {
    const amount = state?.paginate?.amount || 20
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/payment/payment-method?keyword=&per_page=${amount}&start=${page*amount}`),
    ])
    if (response[0]?.data?.success) {
      dispatch({type: paymentMethodActions.LIST_PAYMENT_METHOD, payload: response[0]?.data?.data})
      dispatch({
        type: paymentMethodActions.SET_PAGINATION, payload: {
          active: page,
          amount: amount,
          total: Math.ceil(response[0]?.data?.meta?.total / amount),
          totalItems: response[0]?.data?.meta?.total,
        }
      })
    }
  }

  return {
    provider: { state, dispatch },
    fetch: {
      origins: handleOriginFetch
    },
    handlePaginationAmountChange,
    handlePaginationPageChange,
  }
};

export default usePaymentMethod;