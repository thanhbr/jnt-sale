import {paymentDefaultDateTime, PaymentManagementState} from "./inittialState";
import {PaymentManagementActions} from "./action";
import {formatDatetime} from "../../../common/form/datePicker/_functions";
import {PaymentTypeActions} from "../../paymentType/provider/action";
import {paymentMethodActions} from "../../paymentsMethod/provider/~reducer";

export const PaymentManagementReducer = (state = PaymentManagementState, action) => {
    switch (action.type) {
        //=======CREATE PAYMENT=====
        //edit
        case PaymentManagementActions.GET_DETAIL_EDIT_PAYMENT:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state.formCreate?.form,
                        recipientGroup: {
                            ...state.formCreate?.form?.recipientGroup,
                            value: {
                                name: action?.payload?.object_type,
                                value: action?.payload?.object_type
                            },
                        },
                        recipientPerson: {
                            ...state.formCreate?.form?.recipientPerson,
                            value: {
                                name: action?.payload?.object_name,
                                value: action?.payload?.object_id
                            },
                        },
                        paymentType: {
                            ...state.formCreate?.form?.paymentType,
                            value: {
                                name: action?.payload?.receipt_type_name,
                                value: action?.payload?.receipt_type_id
                            },
                        },
                        paymentCode: {
                            ...state.formCreate?.form?.paymentCode,
                            value: {
                                name: action?.payload?.receipt_code,
                                value: action?.payload?.receipt_code
                            },
                        },
                        paymentMethod: {
                            ...state.formCreate?.form?.paymentMethod,
                            value: {
                                name: action?.payload?.payment_method_name,
                                value: action?.payload?.payment_method_id,
                            },
                        },
                        paymentValue: {
                            ...state.formCreate?.form?.paymentValue,
                            value: {
                                name: action?.payload?.amount,
                                value: action?.payload?.amount,
                            },
                        },
                        referenceCode: action?.payload?.reference_code,
                        description: action?.payload?.description,
                        dateTime: {
                            formatValue: formatDatetime(paymentDefaultDateTime),
                            value: paymentDefaultDateTime,
                        },
                    }
                }
            }
        case PaymentManagementActions.GET_LIST_RECIPIENT_PERSON:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientPerson: {
                            ...state?.formCreate?.form?.recipientPerson,
                            list: action.payload?.list,
                            listOrigin: action.payload?.listOrigin,
                            pagination: {
                                ...state.formCreate?.form?.recipientPerson?.pagination,
                                totalItem: action.payload?.total?.totals || action.payload?.total?.total,
                                amount: action.payload?.total?.per_page || state.formCreate?.form?.recipientPerson?.pagination?.amount,
                                active: action.payload?.total?.start / action.payload?.total?.per_page || state.formCreate?.form?.recipientPerson?.pagination?.active,
                            },
                            canLoadMore: action.payload?.canLoadMore
                        }
                    }
                }
            }
        case PaymentManagementActions.FORM_PAYMENT_RICIPIENT_GROUP_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientGroup: {
                            ...state?.formCreate?.form?.recipientGroup,
                            value: {
                                name: action.payload?.value?.name,
                                value: action.payload?.value?.value,
                            },
                        }
                    }
                }
            }
        case PaymentManagementActions.GET_RECIPIENT_PERSON_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientPerson: {
                            ...state?.formCreate?.form?.recipientPerson,
                            value: {
                                name: action.payload?.value?.name,
                                value: action.payload?.value?.value,
                                mobile: action.payload?.value?.mobile || ''
                            },
                        }
                    }
                }
            }
        case PaymentManagementActions.GET_KEYWORD_RECIPIENT_PERSON_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientPerson: {
                            ...state?.formCreate?.form?.recipientPerson,
                            list: action.payload?.list,
                            keyword: action.payload.keyword,
                        }
                    }
                }
            }
        case PaymentManagementActions.UPLOAD_CAN_LOAD_MORE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientPerson: {
                            ...state?.formCreate?.form?.recipientPerson,
                            canLoadMore: action.payload?.canLoadMore,
                        }
                    }
                }
            }
        case PaymentManagementActions.GET_KEYWORD_RECIPIENT_GROUP_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        recipientGroup: {
                            ...state?.formCreate?.form?.recipientGroup,
                            list: action.payload?.list,
                            keyword: action.payload.keyword,
                        }
                    }
                }
            }
        //payment type
        case PaymentManagementActions.GET_LIST_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentType: {
                            ...state?.formCreate?.form?.paymentType,
                            list: action.payload?.list?.filter(filter => +filter.is_default === 0),
                            listOrigin: action.payload?.list,
                            pagination: {
                                ...state?.formCreate?.form?.paymentType?.pagination,
                                total: Math.ceil(
                                    +action.payload.pagination.totalItems /
                                    +state?.formCreate?.form?.paymentType?.amount,
                                ),
                                totalItems: action.payload.pagination.totalItems,
                            },
                        }
                    }
                }
            }
        case PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentType: {
                            ...state?.formCreate?.form?.paymentType,
                            canLoadMore: action.payload,
                        }
                    }
                }
            }
        case PaymentManagementActions.SEARCH_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentType: {
                            ...state?.formCreate?.form?.paymentType,
                            keyword: action.payload?.keyword,
                            list: action.payload?.list,
                            canLoadMore: action.payload?.canLoadMore
                        }
                    }
                }
            }
        case PaymentManagementActions.UPDATE_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentType: {
                            ...state?.formCreate?.form?.paymentType,
                            value: {
                                name: action.payload?.value?.name,
                                value: action.payload?.value?.value,
                            },
                        }
                    }
                }
            }
        //PAYMENT METHOD
        case PaymentManagementActions.GET_LIST_PAYMENT_METHOD:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentMethod: {
                            ...state?.formCreate?.form?.paymentMethod,
                            list: action.payload?.list,
                            listOrigin: action.payload?.list,
                            pagination: {
                                ...state?.formCreate?.form?.paymentMethod?.pagination,
                                total: Math.ceil(
                                    +action.payload.pagination.totalItems /
                                    +state?.formCreate?.form?.paymentMethod?.amount,
                                ),
                                totalItems: action.payload.pagination.totalItems,
                            },
                        }
                    }
                }
            }
        case PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_METHOD:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentMethod: {
                            ...state?.formCreate?.form?.paymentMethod,
                            canLoadMore: action.payload,
                        }
                    }
                }
            }
        case PaymentManagementActions.SEARCH_PAYMENT_METHOD:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentMethod: {
                            ...state?.formCreate?.form?.paymentMethod,
                            keyword: action.payload?.keyword,
                            list: action.payload?.list,
                            canLoadMore: action.payload?.canLoadMore
                        }
                    }
                }
            }

        case PaymentManagementActions.UPDATE_PAYMENT_METHOD:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentMethod: {
                            ...state?.formCreate?.form?.paymentMethod,
                            value: {
                                name: action.payload?.value?.name,
                                value: action.payload?.value?.value,
                            },
                        }
                    }
                }
            }


        //PAYMENT CODE
        case PaymentManagementActions.GET_PAYMENT_CODE_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentCode: {
                            ...state?.formCreate?.form?.paymentCode,
                            ...action.payload
                        }
                    }
                }
            }
        case PaymentManagementActions.GET_PAYMENT_VALUE_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        paymentValue: {
                            ...state?.formCreate?.form?.paymentValue,
                            ...action.payload
                        }
                    }
                }
            }
        case PaymentManagementActions.GET_DESCRIPTION_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        description: action.payload
                    }
                }
            }
        case PaymentManagementActions.GET_REFERENCE_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state?.formCreate?.form,
                        referenceCode: action.payload
                    }
                }
            }



        //extra info
        case PaymentManagementActions.FORM_PAYMENT_DATETIME_UPDATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    form: {
                        ...state.formCreate?.form,
                        dateTime: {
                            ...state.formCreate?.form.dateTime,
                            ...action.payload,
                        },
                    }
                },
            }

        //modal
        case PaymentManagementActions.OPEN_MODAL_ADD_NEW:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    contentModal: {
                        ...state.formCreate?.contentModal,
                        ...action.payload
                    }
                }
            }

        case PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    contentModal: {
                        ...state.formCreate?.contentModal,
                        confirm: {
                            ...state.formCreate?.contentModal?.confirm,
                            ...action.payload
                        }
                    }
                }
            }
        case PaymentManagementActions.SET_DETAIL_EMPTY:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    addNew: {
                        paymentType: {
                            code: '',
                            description: '',
                            dt_created: '',
                            is_default: 0,
                            name: '',
                            status: 1,
                        },
                        paymentMethods: {
                            name: '',
                            is_active: 0,
                            status: 1,
                        },
                        haveEdit: false
                    },
                    validate: {
                        recipientGroup: {
                            status: false,
                            message: '',
                        },
                        recipientPerson: {
                            status: false,
                            message: '',
                        },
                        paymentType: {
                            status: false,
                            message: '',
                        },
                        paymentCode: {
                            status: false,
                            message: '',
                        },
                        paymentMethod: {
                            status: false,
                            message: '',
                        },
                        paymentValue: {
                            status: false,
                            message: '',
                        },
                        referenceCode: {
                            status: false,
                            message: '',
                        },
                        description: {
                            status: false,
                            message: '',
                        },
                        name: {
                            status: false,
                            message: ''
                        },
                        descriptionPayment: {
                            status: false,
                            message: ''
                        },
                        code: {
                            status: false,
                            message: ''
                        },
                        submit: false,
                        paymentMethodsName: {
                            status: false,
                            message: ''
                        },
                    }
                }
            }
        case PaymentManagementActions.SET_HAVE_EDIT:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    addNew: {
                        ...state.formCreate?.addNew,
                        haveEdit: action.payload
                    }
                }
            }


        case PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    addNew: {
                        ...state.formCreate?.addNew,
                        paymentType: {
                            ...state.formCreate?.addNew?.paymentType,
                            ...action.payload
                        }
                    }
                }
            }
        case PaymentManagementActions.MODAL_FORM_CREATE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    addNew: {
                        ...state.formCreate?.addNew,
                        paymentMethods: {
                            ...state.formCreate?.addNew?.paymentMethods,
                            ...action.payload
                        }
                    }
                },
            }

        //VALIDATE
        case PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    validate: {
                        ...state.formCreate?.validate,
                        ...action.payload
                    }
                },
            }
        case PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    validate: {
                        ...state.formCreate.validate,
                        ...action.payload
                    }
                }

            }

        //======= CREATE PAYMENT ====

        //====table====
        case PaymentManagementActions.FILTER_CHANGE_SEARCH_KEYWORD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    keyword: action.payload
                },
            }
        case PaymentManagementActions.FILTER_DATE_TIME_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        end: action.payload?.end,
                        start: action.payload?.start,
                        type: action.payload?.type,
                        value: action.payload?.value,
                    },
                },
            }
        case PaymentManagementActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        activeValue: {
                            ...state.filter.dateTime.activeValue,
                            end: action.payload?.end || '',
                            start: action.payload?.start || '',
                            type: action.payload?.type || 'create',
                            value: action.payload?.value || '',
                        },
                        end: action.payload?.end || '',
                        start: action.payload?.start || '',
                        type: action.payload?.type || 'create',
                        value: action.payload?.value || '',
                    },
                },
            }
        case PaymentManagementActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        trigger: action.payload,
                    },
                },
            }
        //===================  FILTER PAYMENT METHOD  ===================
        case PaymentManagementActions.FILTER_OTHER_PAYMENT_METHOD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    paymentMethod: {
                        ...state.filter.paymentMethod,
                        activeValue: action?.payload?.activeValue || [],
                        keyword: action?.payload?.keyword || '',
                        list: action?.payload?.list || [],
                        listOrigin: action?.payload?.listOrigin || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_PAYMENT_METHOD_CHANGE_KEYWORD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    paymentMethod: {
                        ...state.filter.paymentMethod,
                        keyword: action?.payload || '',
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    paymentMethod: {
                        ...state.filter.paymentMethod,
                        list: action?.payload?.list || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    paymentMethod: {
                        ...state.filter.paymentMethod,
                        list: action?.payload?.list || [],
                        tab: action?.payload?.tab || 'all',
                    }
                },
            }
        case PaymentManagementActions.FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    paymentMethod: {
                        ...state.filter.paymentMethod,
                        activeValue: action?.payload || [],
                    }
                },
            }

        //=================== END FILTER PAYMENT METHOD  ===================
        case PaymentManagementActions.FILTER_OTHER_GROUP_SUBMITTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    groupSubmitter: {
                        ...state.filter.groupSubmitter,
                        activeValue: action?.payload?.activeValue || [],
                        keyword: action?.payload?.keyword || '',
                        list: action?.payload?.list || [],
                        listOrigin: action?.payload?.listOrigin || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_GROUP_SUBMITTER_CHANGE_KEYWORD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    groupSubmitter: {
                        ...state.filter.groupSubmitter,
                        keyword: action?.payload || '',
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    groupSubmitter: {
                        ...state.filter.groupSubmitter,
                        value: action?.payload || {},
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_LIST:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    groupSubmitter: {
                        ...state.filter.groupSubmitter,
                        list: action?.payload,
                    }
                },
            }
        case PaymentManagementActions.FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    groupSubmitter: {
                        ...state.filter.groupSubmitter,
                        activeValue: action?.payload || [],
                    }
                },
            }

        //===================  FILTER EMPLOYEE_CREATE  ===================
        case PaymentManagementActions.FILTER_OTHER_EMPLOYEE_CREATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employeeCreate: {
                        ...state.filter.employeeCreate,
                        activeValue: action?.payload?.activeValue || [],
                        keyword: action?.payload?.keyword || '',
                        list: action?.payload?.list || [],
                        listOrigin: action?.payload?.listOrigin || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_EMPLOYEE_CREATE_CHANGE_KEYWORD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employeeCreate: {
                        ...state.filter.employeeCreate,
                        keyword: action?.payload || '',
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employeeCreate: {
                        ...state.filter.employeeCreate,
                        list: action?.payload?.list || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employeeCreate: {
                        ...state.filter.employeeCreate,
                        list: action?.payload?.list || [],
                        tab: action?.payload?.tab || 'all',
                    }
                },
            }
        case PaymentManagementActions.FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employeeCreate: {
                        ...state.filter.employeeCreate,
                        activeValue: action?.payload || [],
                    }
                },
            }
        //=================== END  FILTER EMPLOYEE_CREATE  ===================

        // =================== TYPE CREATE ===================
        case PaymentManagementActions.FILTER_OTHER_TYPE_RECEIPT:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    typeReceipt: {
                        ...state.filter.typeReceipt,
                        activeValue: action?.payload?.activeValue || [],
                        keyword: action?.payload?.keyword || '',
                        list: action?.payload?.list || [],
                        listOrigin: action?.payload?.listOrigin || [],
                        value: action?.payload?.value || [],
                    }
                },
            }

        case PaymentManagementActions.FILTER_OTHER_TYPE_RECEIPT_CHANGE_KEYWORD:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    typeReceipt: {
                        ...state.filter.typeReceipt,
                        keyword: action?.payload || '',
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    typeReceipt: {
                        ...state.filter.typeReceipt,
                        list: action?.payload?.list || [],
                        value: action?.payload?.value || [],
                    }
                },
            }
        case PaymentManagementActions.FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    typeReceipt: {
                        ...state.filter.typeReceipt,
                        list: action?.payload?.list || [],
                        tab: action?.payload?.tab || 'all',
                    }
                },
            }
        case PaymentManagementActions.FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    typeReceipt: {
                        ...state.filter.typeReceipt,
                        activeValue: action?.payload || [],
                    }
                },
            }
        //  ========== END TYPE CREATE =============
        case PaymentManagementActions.FILTER_ACTIVE_OTHER_STATUS:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: action?.payload || [],
                },
            }
        case PaymentManagementActions?.TABLE_DISPLAY_DATA_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        ...action.payload,
                    },
                },
            }
        case PaymentManagementActions.TABLE_DISPLAY_DETAIL_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    detail: {
                        ...state.table.detail,
                        active: action.payload?.active || null,
                        list: action.payload?.list || [],
                    },
                },
            }

        case PaymentManagementActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    detail: {
                        ...state.table.detail,
                        id: action.payload?.id || null,
                    },
                },
            }

        case PaymentManagementActions.TABLE_PAGINATION_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    pagination: {
                        ...state.table.pagination,
                        active: action.payload?.active || 0,
                        amount: action.payload?.amount || 20,
                        total: action.payload?.total || 0,
                        totalItems: action.payload?.totalItems || 0,
                    },
                },
            }
        case PaymentManagementActions.TOGGLE_MODAL_EDIT_DESCRIPTION:
            return {
                ...state,
                table: {
                    ...state.table,
                    modal: {
                        ...state.table.modal,
                        editDesc: {
                            ...state.table.modal.editDesc,
                            open: action.payload
                        }
                    },
                },
            }
        case PaymentManagementActions.UPDATE_MODAL_EDIT_DESCRIPTION:
            return {
                ...state,
                table: {
                    ...state.table,
                    modal: {
                        ...state.table.modal,
                        editDesc: {
                            ...state.table.modal.editDesc,
                            data: action.payload
                        }
                    },
                },
            }
        case PaymentManagementActions.TOGGLE_MODAL_CANCEL_RECEIPT:
            return {
                ...state,
                table: {
                    ...state.table,
                    modal: {
                        ...state.table.modal,
                        cancelReceipt: {
                            ...state.table.modal.cancelReceipt,
                            open: action?.payload?.open,
                            id: action?.payload?.id,
                        }
                    },
                },
            }
        default:
            throw new Error()
    }
}