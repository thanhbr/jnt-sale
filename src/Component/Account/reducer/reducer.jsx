import {provinceData} from "../../../Pages/orderSingle/provider/_initialState";
import {STORE_CONFIG_PRINT_TEMPLATE} from "../account";
export const useAccountAction={
    OPEN_MODAL:'OPEN_MODAL',
    FORM_ADDRESS_UPDATE: 'FORM_ADDRESS_UPDATE',
    FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE: 'FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE',
    FORM_ADDRESS_PROVINCE_UPDATE: 'FORM_ADDRESS_PROVINCE_UPDATE',
    FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE: 'FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE',
    FORM_ADDRESS_DISTRICT_UPDATE: 'FORM_ADDRESS_DISTRICT_UPDATE',
    FORM_ADDRESS_WARD_KEYWORD_UPDATE: 'FORM_ADDRESS_WARD_KEYWORD_UPDATE',
    FORM_ADDRESS_WARD_UPDATE: 'FORM_ADDRESS_WARD_UPDATE',
    UPLOAD_IMAGE:'UPLOAD_IMAGE',
    VALIDATE_UPLOAD:'VALIDATE_UPLOAD',

    //store config
    UPDATE_STORE_CONFIG: 'UPDATE_STORE_CONFIG',
    GET_DETAIL_STORE_CONFIG: 'GET_DETAIL_STORE_CONFIG',
    VALIDATE_QUANTITY_LOW_RATE: 'VALIDATE_QUANTITY_LOW_RATE',
    CHANGE_QUANTITY_LOW_RATE: 'CHANGE_QUANTITY_LOW_RATE',
    SET_SUBMIT_BUTTON: 'SET_SUBMIT_BUTTON',
    CHECK_CANCEL_EDIT_STORE_CONFIG: 'CHECK_CANCEL_EDIT_STORE_CONFIG',
    UPDATE_ACTIVE_VALUE_BULK_ORDER: 'UPDATE_ACTIVE_VALUE_BULK_ORDER',
    SEARCH_BULK_ORDER: 'SEARCH_BULK_ORDER',
    MODAL_CONFIRM_LEAVE_PAGE: 'MODAL_CONFIRM_LEAVE_PAGE',
    ACCEPT_LEAVE_PAGE: 'ACCEPT_LEAVE_PAGE',

    //modal confirm switch tab
    OPEN_MODAL_COFIRM_SWITCH_TAB:'OPEN_MODAL_COFIRM_SWITCH_TAB',
    SET_WARNING_PHONE_CREATE_ORDER: 'SET_WARNING_PHONE_CREATE_ORDER'
}

export const useAccountState={
    open_modal:false,
    form: {
        customerInfo: {
            address: {
                value: '',
                province: {list: provinceData, keyword: '', value: null},
                district: {list: [], keyword: '', value: null},
                ward: {list: [], keyword: '', value: null},
            },
            fullName: {
                keyword: '',
                list: [],
                listOrigin: [],
                loading: false,
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
            },
            phone: {
                detail: null,
                list: [],
                listOrigin: [],
                order: {figures: [], recentList: []},
                report: [],
                value: '',
            },
        },
    },
    upload_image:'',
    validate:{
        valid:false,
        message:''
    },
    storeConfig: {
        detailStoreConfig:{},
        updateStoreConfig: true,
        warningPhone: 0,
        quantityLowRate: {
            value: 0,
            activeValue: 0,
        },
        bulkOrder: {
            activeValue: {name: 'In mẫu đơn vị vận chuyển', value: 1},
            keyword: '',
            list: [
                {name: 'In mẫu đơn vị vận chuyển', value: 1},
                {name: 'In mẫu evoshop A4', value: 2},
                {name: 'In mẫu evoshop A5', value: 3},
                {name: 'In mẫu evoshop K80', value: 4},
            ],
            listOrigin: [],
            value: null,
        },
        shopId:'',
        submit: false,
        cancelEdit: false,
        confirm: false,
    },
    switchTab: false
}

export const useAccountReducer = (state, action) =>{
    switch (action.type) {
        case useAccountAction.OPEN_MODAL:
            return {
                ...state,
                open_modal: action.payload
            }
        case useAccountAction.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            district: {
                                ...state.form.customerInfo.address.district,
                                list: action.payload?.list,
                                keyword: action.payload?.keyword,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_DISTRICT_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            district: {
                                ...state.form.customerInfo.address.district,
                                value: action.payload?.district?.value,
                            },
                            ward: {
                                ...state.form.customerInfo.address.ward,
                                keyword: '',
                                list: action.payload?.ward?.list,
                                value: null,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            province: {
                                ...state.form.customerInfo.address.province,
                                list: action.payload?.list,
                                keyword: action.payload?.keyword,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_PROVINCE_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            province: {
                                ...state.form.customerInfo.address.province,
                                value: action.payload?.province?.value,
                            },
                            district: {
                                ...state.form.customerInfo.address.district,
                                keyword: '',
                                list: action.payload?.district?.list,
                                value: null,
                            },
                            ward: {
                                ...state.form.customerInfo.address.ward,
                                keyword: '',
                                list: [],
                                value: null,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_WARD_KEYWORD_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            ward: {
                                ...state.form.customerInfo.address.ward,
                                list: action.payload?.list,
                                keyword: action.payload?.keyword,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_WARD_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            ward: {
                                ...state.form.customerInfo.address.ward,
                                value: action.payload?.ward?.value,
                            },
                        },
                    },
                },
            }

        case useAccountAction.FORM_ADDRESS_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    customerInfo: {
                        ...state.form.customerInfo,
                        address: {
                            ...state.form.customerInfo.address,
                            value: action.payload?.value,
                        },
                    },
                },
            }
        case useAccountAction.UPLOAD_IMAGE:
            return{
                ...state,
                upload_image:action.payload
            }
        case useAccountAction.VALIDATE_UPLOAD:
            console.log(action.payload)
            return{
                ...state,
                validate:action.payload

            }
        case useAccountAction.UPDATE_STORE_CONFIG:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    updateStoreConfig: action.payload
                }
            }


        case useAccountAction.GET_DETAIL_STORE_CONFIG:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    quantityLowRate: {
                        ...state.storeConfig.quantityLowRate,
                        value: action.payload?.quantity_low_rate,
                        activeValue: action.payload?.quantity_low_rate
                    },
                    bulkOrder: {
                        ...state?.storeConfig?.bulkOrder,
                        activeValue: {
                            name: STORE_CONFIG_PRINT_TEMPLATE[+action.payload?.setting_print - 1]?.name,
                            value: action.payload?.setting_print
                        },
                        value: action.payload?.setting_print
                    },
                    shopId: action.payload?.shop_id,
                    detailStoreConfig:action.payload
                }
            }
        case useAccountAction.VALIDATE_QUANTITY_LOW_RATE:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    validate: {
                        ...state.storeConfig.validate,
                        ...action.payload
                    }

                }
            }
        case useAccountAction.CHANGE_QUANTITY_LOW_RATE:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    quantityLowRate: {
                        ...state.storeConfig?.quantityLowRate,
                        activeValue: action.payload
                    }

                }
            }
        case useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    cancelEdit: action.payload,

                }
            }
        case useAccountAction.SET_SUBMIT_BUTTON:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    submit: action.payload,

                }
            }
        case useAccountAction.UPDATE_ACTIVE_VALUE_BULK_ORDER:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    bulkOrder: {
                        ...state?.storeConfig?.bulkOrder,
                        activeValue: action.payload
                    }

                }
            }
        case useAccountAction.SEARCH_BULK_ORDER:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    bulkOrder: {
                        ...state?.storeConfig?.bulkOrder,
                        keyword: action.payload?.keyword,
                        list: action.payload?.list
                    }

                }
            }
        case useAccountAction.MODAL_CONFIRM_LEAVE_PAGE:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    confirm: action.payload
                }
            }
        case useAccountAction.ACCEPT_LEAVE_PAGE:
            return {
                ...state,
                storeConfig: {
                    ...state.storeConfig,
                    confirm: false,
                    submit: false,
                    cancelEdit: false,
                    quantityLowRate: {
                        ...state.storeConfig.quantityLowRate,
                        value: state.storeConfig?.detailStoreConfig?.quantity_low_rate,
                        activeValue: state.storeConfig?.detailStoreConfig?.quantity_low_rate
                    },
                    bulkOrder: {
                        ...state?.storeConfig?.bulkOrder,
                        activeValue: {
                            name: STORE_CONFIG_PRINT_TEMPLATE[+state.storeConfig?.detailStoreConfig?.setting_print - 1]?.name,
                            value: state.storeConfig?.detailStoreConfig?.setting_print
                        },
                        value: state.storeConfig?.detailStoreConfig?.setting_print
                    },
                    updateStoreConfig:true,
                }
            }
        case useAccountAction.OPEN_MODAL_COFIRM_SWITCH_TAB:
            return{
                ...state,
                switchTab:action.payload,
            }
        case useAccountAction.SET_WARNING_PHONE_CREATE_ORDER:
          return {
            ...state,
            storeConfig: {
              ...state.storeConfig,
              warningPhone: !action.payload,
            }
          }
        default:
            return {...state}
    }
}