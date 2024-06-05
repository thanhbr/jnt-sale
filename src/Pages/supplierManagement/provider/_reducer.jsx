export const useSupplierManagementAction = {
    GET_LIST_SUPPLIER: 'GET_LIST_SUPPLIER',
    GET_LIST_DETAIL: 'GET_LIST_DETAIL',
    SET_LOADING: 'SET_LOADING',
    OPEN_MODAL: 'OPEN_MODAL',
    OPEN_MODAL_CONFIRM: 'OPEN_MODAL_CONFIRM',
    CHANGE_MODAL: 'CHANGE_MODAL',
    CHANGE_MODAL_CONFIRM: 'CHANGE_MODAL_CONFIRM',
    CHECK_SUBMIT_CODE: 'CHECK_SUBMIT_CODE',
    CHECK_SUBMIT_NAME: 'CHECK_SUBMIT_NAME',
    CHECK_SUBMIT_ADDRESS: 'CHECK_SUBMIT_ADDRESS',
    CHECK_SUBMIT_PHONE: 'CHECK_SUBMIT_PHONE',
    CHECK_SUBMIT_SHORT_NAME: 'CHECK_SUBMIT_SHORT_NAME',
    CHECK_SUBMIT_CONTRACT: 'CHECK_SUBMIT_CONTRACT',
    CHECK_SUBMIT_NOTE: 'CHECK_SUBMIT_NOTE',
    CHECK_SUBMIT_EMAIL: 'CHECK_SUBMIT_EMAIL',
    CHANGE_SUPPLIER_CODE: 'CHANGE_SUPPLIER_CODE',
    CHANGE_SUPPLIER_NAME: 'CHANGE_SUPPLIER_NAME',
    CHANGE_SUPPLIER_ADDRESS: 'CHANGE_SUPPLIER_ADDRESS',
    CHANGE_SUPPLIER_PHONE: 'CHANGE_SUPPLIER_PHONE',
    CHANGE_SUPPLIER_SHORT_NAME: 'CHANGE_SUPPLIER_SHORT_NAME',
    CHANGE_SUPPLIER_CONTRACT_NAME: 'CHANGE_SUPPLIER_CONTRACT_NAME',
    CHANGE_SUPPLIER_EMAIL: 'CHANGE_SUPPLIER_EMAIL',
    CHANGE_SUPPLIER_NOTE: 'CHANGE_SUPPLIER_NOTE',
    CHANGE_SUPPLIER_STATUS: 'CHANGE_SUPPLIER_STATUS',
    GET_PAGINATION: 'GET_PAGINATION',
    GET_ID_SUPPLIER: 'GET_ID_SUPPLIER',
    OPEN_CONFIRM_DELETE: 'OPEN_CONFIRM_DELETE',
    SET_LOADING_DETAIL: 'SET_LOADNG_DETAIL',
    DETAIL_ACTIVE: 'DETAIL_ACTIVE',
    PURCHASE_LIST: "PURCHASE_LIST",
    PURCHASE_TOTAL: 'PURCHASE_TOTAL',
    PURCHASE_META: 'PURCHASE_META',
    EMPTY_SUPPLIER: 'EMPTY_SUPPLIER',
    FALSE_CHECK_SUBMIT: 'FALSE_CHECK_SUBMIT',
    SET_DETAIL_SUPPLIER: 'SET_DETAIL_SUPPLIER',
    SET_ACTIVE_CHECK_BOX: 'SET_ACTIVE_CHECK_BOX',
    SET_IS_CHECK_BOX: 'SET_IS_CHECK_BOX',
    SET_COUNT: "SET_COUNT",
    OPEN_CONFIRM_CANCEL: 'OPEN_CONFIRM_CANCEL',
    KEY_WORD_SUPPLIER : 'KEY_WORD_SUPPLIER',
    GET_ORIGIN_LIST:'GET_ORIGIN_LIST',
}
export const useSupplierManagementState = {
    loading: false,
    loading_detail: false,
    list: [],
    pagination: {
        active: 0,
        amount: 20,
        total: 0,
        totalItems: 0,
    },
    open_modal: false,
    open_modal_confirm: false,
    modal_confirm: false,
    open_confirm_delete: false,
    open_confirm_cancel: {
        open:false,
        array_id:[],
    },
    supplier: {
        code: "",
        name: "",
        alias: "",
        contact_name: "",
        mobile: "",
        address: "",
        email: "",
        details: "",
        status: 1
    },
    detailActive: null,
    detailList: [],
    id_supplier: '',
    change_modal: false,
    check_submit: {
        code_check: {
            status: false,
            message: '',
        },
        name_check: {
            status: false,
            message: '',
        },
        address_check: {
            status: false,
            message: '',
        },
        phone_check: {
            status: false,
            message: '',
        },
        short_name_check: {
            status: false,
            message: '',
        },
        contract_name_check: {
            status: false,
            message: '',
        },
        email_check: {
            status: false,
            message: '',
        },
        note_check: {
            status: false,
            message: '',
        },
    },
    origin_list:[],
    purchase_list: '',
    purchase_total: '',
    purchase_meta: '',
    is_active: [],
    is_check: [],
    count: 0,
    key_word:'',
    filter:{
        payment_status:null,
    }
}
export const useSupplierManagementReducer = (state = useSupplierManagementState, action) => {
    switch (action.type) {
        case useSupplierManagementAction.GET_LIST_SUPPLIER:
            return {
                ...state,
                list: action.payload
            };
        case useSupplierManagementAction.GET_LIST_DETAIL:
            return {
                ...state,
                detailList: action.payload
            };
        case useSupplierManagementAction.DETAIL_ACTIVE:
            return {
                ...state,
                detailActive: action.payload
            };
        case useSupplierManagementAction.PURCHASE_LIST:
            return {
                ...state,
                purchase_list: action.payload
            };
        case useSupplierManagementAction.PURCHASE_TOTAL:
            return {
                ...state,
                purchase_total: action.payload
            };
        case useSupplierManagementAction.PURCHASE_META:
            return {
                ...state,
                purchase_meta: action.payload
            };
        case useSupplierManagementAction.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case useSupplierManagementAction.SET_LOADING_DETAIL:
            return {
                ...state,
                loading_detail: action.payload
            };
        case useSupplierManagementAction.GET_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    active: action.payload?.active,
                    amount: action.payload?.amount,
                    total: action.payload?.total,
                    totalItems: action.payload?.totalItems,
                }
            }
        case useSupplierManagementAction.GET_ID_SUPPLIER:
            return {
                ...state,
                id_supplier: action.payload
            }
        case useSupplierManagementAction.OPEN_MODAL:
            return {
                ...state,
                open_modal: action.payload
            }
        case useSupplierManagementAction.OPEN_MODAL_CONFIRM:
            return {
                ...state,
                open_modal_confirm: action.payload
            }
        case useSupplierManagementAction.OPEN_CONFIRM_CANCEL:
            return {
                ...state,
                open_confirm_cancel:{
                    ...state.open_confirm_cancel,
                    open:action.payload.open,
                    array_id:action.payload.array_id,
                }
            }
        case useSupplierManagementAction.CHANGE_MODAL:
            return {
                ...state,
                change_modal: action.payload
            }
        case useSupplierManagementAction.OPEN_CONFIRM_DELETE:
            return {
                ...state,
                open_confirm_delete: action.payload,
            }
        case useSupplierManagementAction.CHANGE_MODAL_CONFIRM:
            return {
                ...state,
                modal_confirm: action.payload
            }
        case useSupplierManagementAction.CHECK_SUBMIT_CODE:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    code_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_NAME:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    name_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_ADDRESS:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    address_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_PHONE:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    phone_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_SHORT_NAME:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    short_name_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_CONTRACT:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    contract_name_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_EMAIL:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    email_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHECK_SUBMIT_NOTE:
            return {
                ...state,
                check_submit: {
                    ...state.check_submit,
                    note_check: {
                        status: action.payload.status,
                        message: action.payload.message
                    }
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_CODE:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    code: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_NAME:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    name: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_ADDRESS:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    address: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_PHONE:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    mobile: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_SHORT_NAME:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    alias: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_CONTRACT_NAME:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    contact_name: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_EMAIL:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    email: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_NOTE:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    details: action.payload
                }
            }
        case useSupplierManagementAction.CHANGE_SUPPLIER_STATUS:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    status: action.payload
                }
            }
        case useSupplierManagementAction.EMPTY_SUPPLIER: {
            return {
                ...state,
                supplier: {
                    code: "",
                    name: "",
                    alias: "",
                    contact_name: "",
                    mobile: "",
                    address: "",
                    email: "",
                    details: "",
                    status: 1
                },
                modal_confirm: false,
                open_confirm_cancel: false,
                id_supplier: ''

            }
        }
        case useSupplierManagementAction.FALSE_CHECK_SUBMIT:
            return {
                ...state,
                check_submit: {
                    code_check: {
                        status: false,
                        message: '',
                    },
                    name_check: {
                        status: false,
                        message: '',
                    },
                    address_check: {
                        status: false,
                        message: '',
                    },
                    phone_check: {
                        status: false,
                        message: '',
                    },
                    short_name_check: {
                        status: false,
                        message: '',
                    },
                    contract_name_check: {
                        status: false,
                        message: '',
                    },
                    email_check: {
                        status: false,
                        message: '',
                    },
                    note_check: {
                        status: false,
                        message: '',
                    },
                },
            };
        case useSupplierManagementAction.SET_DETAIL_SUPPLIER:
            return {
                ...state,
                supplier: {
                    ...state.supplier,
                    code: action.payload.code,
                    name: action.payload.name,
                    alias: action.payload.alias,
                    contact_name: action.payload.contact_name,
                    mobile: action.payload.mobile,
                    address: action.payload.address,
                    email: action.payload.email,
                    details: action.payload.details,
                    status: action.payload.status
                },
            }
        case useSupplierManagementAction.SET_ACTIVE_CHECK_BOX:
            return {
                ...state,
                is_active: action.payload,
            }
        case useSupplierManagementAction.SET_IS_CHECK_BOX:
            return {
                ...state,
                is_check: action.payload
            }
        case useSupplierManagementAction.SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case useSupplierManagementAction.KEY_WORD_SUPPLIER:
            return {
                ...state,
                key_word: action.payload,
            }
        case useSupplierManagementAction.GET_ORIGIN_LIST:
            return{
                ...state,
                origin_list:action.payload,
            }
        default:
            return {...state}
    }
}