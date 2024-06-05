export const useProductAction = {
    IS_LOADING: 'IS_LOADING',
    GET_LIST_CATEGORY: 'GET_LIST_CATEGORY',
    GET_PAGINATION: 'GET_PAGINATION',
    CHECK_ALL: 'CHECK_ALL',
    IS_CHECK: 'IS_CHECK',
    COUNT: "COUNT",
    IS_ACTIVE: 'IS_ACTIVE',
    CHECK_CONFIRM_DELETE: 'CHECK_CONFIRM_DELETE',
    SET_SEARCH: 'SET_SEARCH',
    GET_ID: 'GET_ID',
    OPEN_MODAL: 'OPEN_MODAL',
    CATEGORY_LIST: 'CATEGORY_LIST',
    PICK_ITEM_CATEGORY: 'PICK_ITEM_CATEGORY',
    VALID_CODE_PRODUCT: 'VALID_CODE_PRODUCT',
    VALID_NAME_PRODUCT: 'VALID_NAME_PRODUCT',
    VALID_NOTE:'VALID_NOTE',
    GET_NAME_PRODUCT: 'GET_NAME_PRODUCT',
    GET_CODE_PRODUCT: 'GET_CODE_PRODUCT',
    GET_FATHER_NAME: 'GET_FATHER_NAME',
    GET_NOTE_PRODUCT: 'GET_NOTE_PRODUCT',
    GET_STATUS_PRODUCT: 'GET_STATUS_PRODUCT',
    MODAL_CONFIRM: 'MODAL_CONFIRM',
    CHANGE_MODAL: 'CHANGE_MODAL',
    GET_DETAIL_PRODUCT: "GET_DETAIL_PRODUCT",
    DISABLE_SELECT: 'DISABLE_SELECT',
    CONFIRM_EXPORT: 'CONFIRM_EXPORT',
    STATUS_EXPORT: 'STATUS_EXPORT',
    KEY_WORD: 'KEY_WORD',
    ARR_CATEGORY: 'ARR_CATEGORY',
    CHECK_PARENT: 'CHECK_PARENT'
}
export const useProductInitialState = {
    loading: false,
    listCategory: [],
    pagination: {
        active: 0,
        amount: 20,
        total: 0,
        totalItems: 0,
    },
    checkAll: false,
    is_check: [],
    count: 0,
    is_active: [],
    check_confirm_delete: false,
    search: '',
    id_product: '',
    open_modal: false,
    category_list: [],
    arr_category: [],
    keyword: '',
    item_category: {
        item: '',
        id: '',
    },
    valid: {
        filde_code: {
            status: false,
            message: '',
        },
        filde_name: {
            status: false,
            message: "",
        },
        filde_note:{
            status: false,
            message: "",
        }
    },
    name_product: '',
    code_product: '',
    father_product: '',
    note_product: '',
    status_product: 1,
    modal_confirm: false,
    change_modal: false,
    disabled: false,
    confirm_export: false,
    status_export: 0,
    check_parent: '',

}

export const useProductReducer = (state, action) => {
    switch (action.type) {
        case useProductAction.IS_LOADING:
            return {
                ...state,
                loading: action.payload
            }


        case useProductAction.GET_LIST_CATEGORY:
            return {
                ...state,
                listCategory: action.payload
            }
        case useProductAction.GET_PAGINATION:
            return {
                ...state.pagination,
                active: action.payload?.active,
                amount: action.payload?.amount,
                total: action.payload?.total,
                totalItems: action.payload?.totalItems,
            }
        case useProductAction.CHECK_ALL:
            return {
                ...state,
                checkAll: action.payload,
            }
        case useProductAction.IS_CHECK:
            return {
                ...state,
                is_check: action.payload
            }
        case useProductAction.COUNT:
            return {
                ...state,
                count: action.payload
            }
        case useProductAction.IS_ACTIVE:
            return {
                ...state,
                is_active: action.payload
            }
        case useProductAction.CHECK_CONFIRM_DELETE:
            return {
                ...state,
                check_confirm_delete: action.payload
            }
        case useProductAction.SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case useProductAction.GET_ID:
            return {
                ...state,
                id_product: action.payload
            }
        case useProductAction.OPEN_MODAL:
            return {
                ...state,
                open_modal: action.payload
            }
        case useProductAction.CATEGORY_LIST:
            return {
                ...state,
                category_list: action.payload
            }
        case useProductAction.PICK_ITEM_CATEGORY:
            return {
                ...state,
                item_category: {
                    ...state,
                    item: action.payload?.item,
                    id: action.payload?.id
                }
            }


        case useProductAction.VALID_NAME_PRODUCT:
            return {
                ...state,
                valid: {
                    ...state.valid,
                    filde_name: {
                        ...state.valid.filde_name,
                        status: action.payload?.status,
                        message: action.payload?.message,
                    },
                },
            }
        case useProductAction.VALID_CODE_PRODUCT:
            return {
                ...state,
                valid: {
                    ...state.valid,
                    filde_code: {
                        ...state.valid.filde_code,
                        status: action.payload?.status,
                        message: action.payload?.message,
                    },
                },
            }
            case useProductAction.VALID_NOTE:
            return {
                ...state,
                valid: {
                    ...state.valid,
                    filde_note: {
                        ...state.valid.filde_note,
                        status: action.payload?.status,
                        message: action.payload?.message,
                    },
                },
            }
        case useProductAction.GET_CODE_PRODUCT:
            return {
                ...state,
                code_product: action.payload,

            }
        case useProductAction.GET_NAME_PRODUCT:
            return {
                ...state,
                name_product: action.payload,
            }
        case useProductAction.GET_FATHER_NAME:
            return {
                ...state,
                father_product: action.payload,
            }
        case useProductAction.GET_NOTE_PRODUCT:
            return {
                ...state,
                note_product: action.payload,
            }
        case useProductAction.GET_STATUS_PRODUCT:
            return {
                ...state,
                status_product: action.payload,
            }
        case useProductAction.MODAL_CONFIRM:
            return {
                ...state,
                modal_confirm: action.payload,
            }
        case useProductAction.CHANGE_MODAL:
            return {
                ...state,
                change_modal: action.payload,
            }
        case useProductAction.GET_DETAIL_PRODUCT:
            return {
                ...state,
                detail_product: action.payload,
            }
        case useProductAction.DISABLE_SELECT:
            return {
                ...state,
                disabled: action.payload,
            }
        case useProductAction.CONFIRM_EXPORT:
            return {
                ...state,
                confirm_export: action.payload,
            }
        case useProductAction.STATUS_EXPORT:
            return {
                ...state,
                status_export: action.payload,
            }
        case useProductAction.KEY_WORD:
            return {
                ...state,
                keyword: action.payload,
            }
        case useProductAction.ARR_CATEGORY:
            return {
                ...state,
                arr_category: action.payload,
            }
        case useProductAction.CHECK_PARENT:
            return {
                ...state,
                check_parent: action.payload,
            }

        default:
            return {...state}
    }
}