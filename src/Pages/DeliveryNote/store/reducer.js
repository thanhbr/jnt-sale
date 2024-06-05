import {ActionType} from "./action";

const reducerDelivery = (state, action) => {
    switch (action.type) {
        case ActionType.IS_LOADING:
            return {
                ...state,
                isloading: action.payload,
            }
        case ActionType.OPEN_MODAL:
            return {
                ...state,
                openModal: action.payload,
            }
        case ActionType.LIST_NOTE:
            return {
                ...state,
                listNote: action.payload,
            }
        case ActionType.META:
            return {
                ...state,
                meta: action.payload,
            }
        case ActionType.META_PER_PAGE:
            return {
                ...state,
                meta: {...state.meta, per_page: action.payload},
            }
        case ActionType.META_START:
            return {
                ...state,
                meta: {...state.meta, start: action.payload},
            }
        case ActionType.META_TOTAL:
            return {
                ...state,
                meta: {...state.meta, total: action.payload},
            }
        case ActionType.EMPTY_TITLE:
            return {
                ...state,
                emptyTitle: action.payload,
            }
        case ActionType.INFO_NOTE:
            return {
                ...state,
                infoNote: action.payload,
            }
        case ActionType.IS_CHECK_DEFAULT:
            return {
                ...state,
                is_check_default: action.payload,
            }
        case ActionType.IS_SWITCH_ACTIVE:
            return {
                ...state,
                is_switch_active: action.payload,
            }
        case ActionType.CONTENT:
            return {
                ...state,
                content: action.payload,
            }
        case ActionType.POSITION:

            return {
                ...state,
                position: action.payload,
            }
        case ActionType.IS_DEFAULT:
            return {
                ...state,
                is_default: action.payload,
            }
        case ActionType.STATUS:
            return {
                ...state,
                status: action.payload,
            }
        case ActionType.IS_CHECK_ALL:
            return {
                ...state,
                isCheckAll: action.payload,
            }
        case ActionType.ID_CHECK:
            return {
                ...state,
                idCheck: action.payload,
            }
        case ActionType.ERROR_NOTE:
            return {
                ...state,
                valid_note: action.payload,
            }
        case ActionType.ERROR_POSITION:
            return {
                ...state,
                valid_position: action.payload,
            }
        case ActionType.DISABLE_SAVE:
            return {
                ...state,
                disable_save: action.payload,
            }
        case ActionType.IS_CHECK:
            return {
                ...state,
                isCheck: action.payload,
            }
        case ActionType.COUNT:
            return {
                ...state,
                count: action.payload,
            }
        case ActionType.LIST_DROP:
            return {
                ...state,
                item_drop: action.payload,
            }
        case ActionType.IS_ACTIVE:
            return {
                ...state,
                is_active: action.payload,
            }
        case ActionType.CHECK_SEARCH:
            return {
                ...state,
                check_search: action.payload,
            }
        case ActionType.OPEN_CONFIRM:
            return {
                ...state,
                openConfirm: action.payload,
            }
        case ActionType.CHECK_CONFIRM:
            return {
                ...state,
                checkConfirm: action.payload,
            }
        case ActionType.CHECK_EMPTY:
            return {
                ...state,
                checkEmpty: action.payload,
            }
        case ActionType.CHECK_EMPTY_PROSITION:
            return {
                ...state,
                checkErrorPosition: action.payload,
            }
        case ActionType.GET_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    active: action.payload?.active,
                    amount: action.payload?.amount,
                    total: action.payload?.total,
                    totalItems: action.payload?.totalItems,
                },

            }
        case ActionType.SET_VALUE_SEARCH:
            return {
                ...state,
                valueSearch: action.payload

            }
        case ActionType.CHANGE_MODAL:
            return {
                ...state,
                change_modal: action.payload

            }
            case ActionType.ID_DEAFAULT:
            return {
                ...state,
                id_default: action.payload

            }
        case ActionType.CHECK_BEFORE_UPDATE:
            return {
                ...state,
                check_before_update:action.payload
            }
        default:
            return state
    }
}
export default reducerDelivery;