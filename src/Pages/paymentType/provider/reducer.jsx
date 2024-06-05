import {PaymentTypeActions} from "./action";
import {PaymentTypeState} from "./inittialState";

export const PaymentTypeReducer = (state = PaymentTypeState, action) => {
    switch (action.type) {
        case PaymentTypeActions.GET_LIST_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    ...action.payload
                }
            }
        case PaymentTypeActions.TABLE_PAGINATE_DATA:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    pagination: {
                        ...state.paymentType.pagination,
                        total: Math.ceil(
                            action.payload.pagination.totalItems /
                            state.paymentType.pagination.amount,
                        ),
                        totalItems: action.payload.pagination.totalItems,
                    },
                },
            }
            //update pagination
        case PaymentTypeActions.TABLE_AMOUNT_UPDATE:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    list: action.payload?.paymentType?.list || [],
                    pagination: {
                        ...state.paymentType.pagination,
                        active: action.payload?.paymentType?.pagination?.active,
                        amount: action.payload?.paymentType?.pagination?.amount,
                        total: action.payload?.paymentType?.pagination?.total,
                        totalItems: action.payload?.paymentType?.pagination?.totalItems
                    },
                },
            }
        case PaymentTypeActions.TABLE_PAGINATION_UPDATE:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    list: action.payload?.paymentType?.list || [],
                    pagination: {
                        ...state.paymentType.pagination,
                        active: action.payload?.paymentType?.pagination?.active,
                    },
                },
            }

            //GET DETAIL
        case PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE:
            return{
                ...state,
                paymentType: {
                    ...state.paymentType,
                    detail: {
                        ...state?.paymentType?.detail,
                        ...action.payload
                    },
                }
            }
        case PaymentTypeActions.SET_DETAIL_EMPTY:
            return{
                ...state,
                paymentType: {
                    ...state.paymentType,
                    detail: {
                        code:'',
                        description:'',
                        dt_created:'',
                        is_default:0,
                        name:'',
                        status:1,
                    },
                },
                validate: {
                    name:{
                        status:false,
                        message:''
                    },
                    description:{
                        status:false,
                        message:''
                    } ,
                    code:{
                        status:false,
                        message:''
                    },
                    submit:false
                }
            }

            //validate
        case PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE:
            return{
                ...state,
                validate: {
                    ...state.validate,
                    ...action.payload
                }
            }


        case PaymentTypeActions.SET_LOADING_PAYMENT_TYPE:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    loading: action.payload
                }
            }
        case PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload
                }
            }

        case PaymentTypeActions.GET_ID:
            return{
                ...state,
                paymentType: {
                    ...state.paymentType,
                    id_delete:action.payload
                }
            }
        case PaymentTypeActions.SET_HAVE_EDIT:
        return {
            ...state,
            haveEdit: action.payload
        }
        case PaymentTypeActions.SET_SEARCH_PAYMENT_TYPE:
            return{
                ...state,
                paymentType: {
                    ...state.paymentType,
                    keyword: action.payload
                }
            }

            //
        case PaymentTypeActions.SET_IS_CHECK_BOX:
            return{
                ...state,
                paymentType:{
                    ...state.paymentType,
                    is_check: action.payload
                }
            }
        case PaymentTypeActions.SET_COUNT:
            return{
                ...state,
                paymentType:{
                    ...state.paymentType,
                    count: action.payload
                }
            }
        case PaymentTypeActions.SET_ACTIVE_CHECK_BOX:
            return{
                ...state,
                paymentType:{
                    ...state.paymentType,
                    is_active: action.payload
                }
            }

        case PaymentTypeActions.GET_LIST_AFTER_CONFIRM:
            return {
                ...state,
                paymentType: {
                    ...state.paymentType,
                    list: action.payload?.paymentType?.list,
                    listOrigin: action.payload?.paymentType?.listOrigin,
                    pagination: {
                        ...state.paymentType.pagination,
                        active: action.payload?.paymentType?.pagination?.active,
                        amount: action.payload?.paymentType?.pagination?.amount,
                        total: action.payload?.paymentType?.pagination?.total,
                    }
                }
            }
        default:
            throw new Error()
    }
}