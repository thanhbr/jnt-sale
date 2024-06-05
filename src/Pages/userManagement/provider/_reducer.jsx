export const userManagementActions = {
  SET_SEARCH: 'SET_SEARCH',
  FILTER: 'FILTER',
  FILTER_EMPLOYEE_UPDATE: 'FILTER_EMPLOYEE_UPDATE',
  LIST_USER: 'LIST_USER',
  IS_CHECK_ALL: "IS_CHECK_ALL",
  ID_CHECK: "ID_CHECK",
  IS_CHECK: "IS_CHECK",
  COUNT: "COUNT",
  DETAIL: 'DETAIL',
  DETAIL_ACTIVE: 'DETAIL_ACTIVE',
  DETAIL_LIST: 'DETAIL_LIST',
  LOADING: "LOADING",
  LOADING_DETAIL: 'LOADING_DETAIL',
  OPEN_CONFIRM: "OPEN_CONFIRM",
  IS_ACTIVE: 'IS_ACTIVE',
  FORM_FULL_NAME_UPDATE: "FORM_FULL_NAME_UPDATE",
  FORM_PHONE_UPDATE: "FORM_PHONE_UPDATE",
  FORM_EMAIL_UPDATE: "FORM_EMAIL_UPDATE",
  FORM_DOB_UPDATE: "FORM_DOB_UPDATE",
  FORM_GENDER_UPDATE: "FORM_GENDER_UPDATE",
  FORM_ADDRESS_UPDATE: "FORM_ADDRESS_UPDATE",
  FORM_NOTE_UPDATE: "FORM_NOTE_UPDATE",
  FORM_USER_NAME_UPDATE: "FORM_USER_NAME_UPDATE",
  FORM_PASSWORD_UPDATE: "FORM_PASSWORD_UPDATE",
  FORM_CONFIRM_PASSWORD_UPDATE: "FORM_CONFIRM_PASSWORD_UPDATE",
  FORM_ROLE_UPDATE: "FORM_ROLE_UPDATE",
  GET_ID_USER: 'GET_ID_USER',
  GET_DATA_RESET_PASSWORD: 'GET_DATA_RESET_PASSWORD',
  VALID_FULL_NAME: "VALID_FULL_NAME",
  VALID_NOTE: "VALID_NOTE",
  VALID_PHONE: "VALID_PHONE",
  VALID_EMAIL: "VALID_EMAIL",
  VALID_USER_NAME: "VALID_USER_NAME",
  VALID_PASSWORD: "VALID_PASSWORD",
  VALID_CONFIRM_PASSWORD: "VALID_CONFIRM_PASSWORD",
  VALID_CHECK_RULE: "VALID_CHECK_RULE",
  GET_PAGINATE:'GET_PAGINATE',
  MODAL_USER_ROLE: "MODAL_USER_ROLE",
  MODAL_ROLE_UPDATE: "MODAL_ROLE_UPDATE",
  MODAL_VALID_RULES: "MODAL_VALID_RULES",
  USER_DETAIL_INFO: "USER_DETAIL_INFO",
  MODAL_CONFIRM_USER_ROLE: "MODAL_CONFIRM_USER_ROLE",
  MODAL_USER_INFOR: "MODAL_USER_INFOR",
  FORM_INFO_FULL_NAME_UPDATE: "FORM_INFO_FULL_NAME_UPDATE",
  FORM_INFO_PHONE_UPDATE: "FORM_INFO_PHONE_UPDATE",
  FORM_INFO_EMAIL_UPDATE: "FORM_INFO_EMAIL_UPDATE",
  FORM_INFO_ADDRESS_UPDATE: "FORM_INFO_ADDRESS_UPDATE",
  FORM_INFO_DOB_UPDATE: "FORM_INFO_DOB_UPDATE",
  FORM_INFO_NOTE_UPDATE: "FORM_INFO_NOTE_UPDATE",
  FORM_INFO_GENDER_UPDATE: "FORM_INFO_GENDER_UPDATE",
  FORM_INFO_STATUS_UPDATE: "FORM_INFO_STATUS_UPDATE",
  VALID_USER_INFO_FULL_NAME: "VALID_USER_INFO_FULL_NAME",
  VALID_USER_INFO_PHONE: "VALID_USER_INFO_PHONE",
  VALID_USER_INFO_EMAIL: "VALID_USER_INFO_EMAIL",
  MODAL_CONFIRM_USER_INFO: "MODAL_CONFIRM_USER_INFO",
  MODAL_VALID_INFO: "MODAL_VALID_INFO",
  MODAL_USER_PASS: "MODAL_USER_PASS",
  FORM_PASS_CURRENT_UPDATE: "FORM_PASS_CURRENT_UPDATE",
  FORM_PASS_NEW_PASS_UPDATE: "FORM_PASS_NEW_PASS_UPDATE",
  FORM_PASS_CONFIRM_PASS_UPDATE: "FORM_PASS_CONFIRM_PASS_UPDATE",
  VALID_USER_PASS_CURRENT: "VALID_USER_PASS_CURRENT",
  VALID_USER_PASS_NEW: "VALID_USER_PASS_NEW",
  VALID_USER_PASS_CONFIRM: "VALID_USER_PASS_CONFIRM",
  MODAL_CONFIRM_USER_PASS: "MODAL_CONFIRM_USER_PASS",
  WIP_DISABLED_SUBMIT: "WIP_DISABLED_SUBMIT",
  DISABLE_BUTTON:'DISABLE_BUTTON',
}
export const userManagementInitialState = {
  search: '',
  filter: {
    groupStatus: {
      value: '',
      activeValue: [],
      list: [],
    },
    groupEmployee: {
      keyword: '',
      value: [],
      activeValue: [],
      list: [],
      listOrigin: []
    },
  },
  listUser: [],
  isCheckAll: false,
  isCheck: [],
  is_active: [],
  count: 0,
  idCheck: [],
  detailUser: [],
  detailActive: null,
  detailList: [],
  loading: false,
  loadingDetail: false,
  open_confirm: {
    open: false,
    id_confirm: ''
  },
  validate: {
    fullName: {
      status: false,
      message: ''
    },
    phone: {
      status: false,
      message: ''
    },
    email: {
      status: false,
      message: ''
    },
    note: {
      status: false,
      message: ''
    },
    userName: {
      status: false,
      message: ''
    },
    password: {
      status: false,
      message: ''
    },
    confirmPassword: {
      status: false,
      message: ''
    },
    checkRule: {
      status: false,
      message: ''
    },
  },
  form: {
    userInfo: {
      fullName: {
        value: ''
      },
      phone: {
        value: ''
      },
      email: {
        value: ''
      },
      dob: {
        value: '',
        display: '',
      },
      gender: {
        value: ''
      },
      address: {
        value: ''
      },
      note: {
        value: ''
      },
    },
    accountInfo: {
      userName: {
        value: ''
      },
      password: {
        value: ''
      },
      confirmPassword: {
        value: ''
      },
    },
    userRole: {
      group: {
        value: ''
      }
    }
  },
  reset_password: {
    data: '',
  },
  id_user:'',
  paginate: {
    active: 0,
    amount: 20,
    total: 0,
    totalItems: 0,
  },
  modalUserInfo: false,
  modalUserRole: {
    value: ''
  },
  userDetailInfo: [],
  modalValidRules: {
    status: false,
    message: ''
  },
  modalConfirmUserRole: false,
  openModalUserInfo:false,
  formModalInfo: {
    fullName: {
      value: ''
    },
    phone: {
      value: ''
    },
    email: {
      value: ''
    },
    dob: {
      value: '',
      display: '',
    },
    gender: {
      value: ''
    },
    address: {
      value: ''
    },
    note: {
      value: ''
    },
    active: {
      value: ''
    }
  },
  validateModalInfo: {
    fullName: {
      status: false,
      message: ''
    },
    phone: {
      status: false,
      message: ''
    },
    email: {
      status: false,
      message: ''
    },
  },
  modalConfirmUserInfo: false,

  openModalUserPass:false,
  formModalPass: {
    password: {
      value: ''
    },
    newPassword: {
      value: ''
    },
    confirmNewPassword: {
      value: ''
    },
  },
  validateModalPass: {
    currentPassword: {
      status: false,
      message: ''
    },
    newPassword: {
      status: false,
      message: ''
    },
    confirmNewPassword: {
      status: false,
      message: ''
    },
  },
  modalConfirmUserPass: false,
  wipDisabledSubmit: false,
  disable_button:false
}
export const userManagementReducer = (state, action) => {
  switch (action.type) {
    case userManagementActions.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case userManagementActions.FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupStatus: {
            ...state.filter.groupStatus,
          },
          groupEmployee: {
            ...state.filter.groupEmployee,
            list: action.payload.groupEmployee.list,
            listOrigin: action.payload.groupEmployee.list,
          },
          ...action.payload
        }
      }
    case userManagementActions.FILTER_EMPLOYEE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupEmployee: {
            ...state.filter.groupEmployee,
            value: action.payload?.value || null,
          },
        }
      }
    case userManagementActions.LIST_USER:
      return {
        ...state,
        listUser: action.payload
      }
    case userManagementActions.IS_CHECK_ALL:
      return {
        ...state,
        isCheckAll: action.payload
      }
    case userManagementActions.ID_CHECK:
      return {
        ...state,
        idCheck: action.payload,
      }
    case userManagementActions.IS_CHECK:
      return {
        ...state,
        isCheck: action.payload,
      }
    case userManagementActions.COUNT:
      return {
        ...state,
        count: action.payload,
      }
    case userManagementActions.DETAIL:
      return {
        ...state,
        detailUser: action.payload,
      }
    case userManagementActions.DETAIL_ACTIVE:
      return {
        ...state,
        detailActive: action.payload || null,
      }
    case userManagementActions.DETAIL_LIST:
      return {
        ...state,
        detailList: action.payload || [],
      }
    case userManagementActions.LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case userManagementActions.LOADING_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload,
      }
    case userManagementActions.OPEN_CONFIRM:
      return {
        ...state,
        open_confirm: action.payload,
      }
    case userManagementActions.IS_ACTIVE:
      return {
        ...state,
        is_active: action.payload,
      }
    case userManagementActions.FORM_FULL_NAME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            fullName: {
              ...state.form.userInfo.fullName,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_PHONE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            phone: {
              ...state.form.userInfo.phone,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_EMAIL_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            email: {
              ...state.form.userInfo.email,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_DOB_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            dob: {
              ...state.form.userInfo.dob,
              value: action.payload?.value,
              display: action.payload?.display,
            },
          },
        },
      }
    case userManagementActions.FORM_GENDER_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            gender: {
              ...state.form.userInfo.gender,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_ADDRESS_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            address: {
              ...state.form.userInfo.address,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_NOTE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userInfo: {
            ...state.form.userInfo,
            note: {
              ...state.form.userInfo.note,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_USER_NAME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          accountInfo: {
            ...state.form.accountInfo,
            userName: {
              ...state.form.accountInfo.userName,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_PASSWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          accountInfo: {
            ...state.form.accountInfo,
            password: {
              ...state.form.accountInfo.password,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_CONFIRM_PASSWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          accountInfo: {
            ...state.form.accountInfo,
            confirmPassword: {
              ...state.form.accountInfo.confirmPassword,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.FORM_ROLE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          userRole: {
            ...state.form.userRole,
            group: {
              ...state.form.userRole.group,
              value: action.payload?.value,
            },
          },
        },
      }
    case userManagementActions.GET_ID_USER:
      
      return {
        ...state,
        id_user: action.payload,
      }
    case userManagementActions.GET_DATA_RESET_PASSWORD:
      return {
        ...state,
        reset_password: {
          ...state.reset_password, data: action.payload

        },
      }
    //  VALIDATE
    case userManagementActions.VALID_FULL_NAME:
      return {
        ...state,
        validate: {
          ...state.validate,
          fullName: {
            ...state.validate.fullName,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_NOTE:
      return {
        ...state,
        validate: {
          ...state.validate,
            note: {
              ...state.validate.note,
                status: action.payload?.status,
                message: action.payload?.message,
              },
        },
      }
    case userManagementActions.VALID_PHONE:
      return {
        ...state,
        validate: {
          ...state.validate,
          phone: {
            ...state.validate.phone,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_EMAIL:
      return {
        ...state,
        validate: {
          ...state.validate,
          email: {
            ...state.validate.email,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_USER_NAME:
      return {
        ...state,
        validate: {
          ...state.validate,
          userName: {
            ...state.validate.userName,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_PASSWORD:
      return {
        ...state,
        validate: {
          ...state.validate,
          password: {
            ...state.validate.password,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_CONFIRM_PASSWORD:
      return {
        ...state,
        validate: {
          ...state.validate,
          confirmPassword: {
            ...state.validate.confirmPassword,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_CHECK_RULE:
      return {
        ...state,
        validate: {
          ...state.validate,
          checkRule: {
            ...state.validate.checkRule,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.GET_PAGINATE:
      return {
        ...state,
        paginate: {
          ...state.paginate,
          active: action.payload?.active,
          amount: action.payload?.amount,
          total: action.payload?.total,
          totalItems: action.payload?.totalItems,
        },
      }
    case userManagementActions.MODAL_USER_ROLE:
      return {
        ...state,
        modalUserInfo: action.payload,
      }
    case userManagementActions.MODAL_ROLE_UPDATE:
      return {
        ...state,
        modalUserRole: {
          value: action.payload?.value,
        },
      }
    case userManagementActions.USER_DETAIL_INFO:
      return {
        ...state,
        userDetailInfo: action.payload,
      }
    case userManagementActions.MODAL_VALID_RULES:
      return {
        ...state,
        modalValidRules: {
          ...state.validate.modalValidRules,
          status: action.payload?.status,
          message: action.payload?.message,
        },
      }
    case userManagementActions.MODAL_CONFIRM_USER_ROLE:
      return {
        ...state,
        modalConfirmUserRole: action.payload,
      }

    case userManagementActions.MODAL_USER_INFOR:
      return {
        ...state,
        openModalUserInfo: action.payload,
      }
    case userManagementActions.FORM_INFO_FULL_NAME_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          fullName: {
            ...state.formModalInfo.fullName,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_PHONE_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          phone: {
            ...state.formModalInfo.phone,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_EMAIL_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          email: {
            ...state.formModalInfo.email,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_ADDRESS_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          address: {
            ...state.formModalInfo.address,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_DOB_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          dob: {
            ...state.formModalInfo.dob,
            value: action.payload?.value,
            display: action.payload?.display,
          },
        },
      }
    case userManagementActions.FORM_INFO_NOTE_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          note: {
            ...state.formModalInfo.note,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_GENDER_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          gender: {
            ...state.formModalInfo.gender,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_INFO_STATUS_UPDATE:
      return {
        ...state,
        formModalInfo: {
          ...state.formModalInfo,
          active: {
            ...state.formModalInfo.active,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.VALID_USER_INFO_FULL_NAME:
      return {
        ...state,
        validateModalInfo: {
          ...state.validateModalInfo,
          fullName: {
            ...state.validateModalInfo.fullName,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_USER_INFO_PHONE:
      return {
        ...state,
        validateModalInfo: {
          ...state.validateModalInfo,
          phone: {
            ...state.validateModalInfo.phone,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_USER_INFO_EMAIL:
      return {
        ...state,
        validateModalInfo: {
          ...state.validateModalInfo,
          email: {
            ...state.validateModalInfo.email,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.MODAL_CONFIRM_USER_INFO:
      return {
        ...state,
        modalConfirmUserInfo: action.payload,
      }
    case userManagementActions.MODAL_VALID_INFO:
      return {
        ...state,
        modalValidRules: {
          ...state.validate.modalValidRules,
          status: action.payload?.status,
          message: action.payload?.message,
        },
      }

    case userManagementActions.MODAL_USER_PASS:
      return {
        ...state,
        openModalUserPass: action.payload,
      }
    case userManagementActions.FORM_PASS_CURRENT_UPDATE:
      return {
        ...state,
        formModalPass: {
          ...state.formModalPass,
          password: {
            ...state.formModalPass.password,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_PASS_NEW_PASS_UPDATE:
      return {
        ...state,
        formModalPass: {
          ...state.formModalPass,
          newPassword: {
            ...state.formModalPass.newPassword,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.FORM_PASS_CONFIRM_PASS_UPDATE:
      return {
        ...state,
        formModalPass: {
          ...state.formModalPass,
          confirmNewPassword: {
            ...state.formModalPass.confirmNewPassword,
            value: action.payload?.value,
          },
        },
      }
    case userManagementActions.VALID_USER_PASS_CURRENT:
      return {
        ...state,
        validateModalPass: {
          ...state.validateModalPass,
          currentPassword: {
            ...state.validateModalPass.currentPassword,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_USER_PASS_NEW:
      return {
        ...state,
        validateModalPass: {
          ...state.validateModalPass,
          newPassword: {
            ...state.validateModalPass.newPassword,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.VALID_USER_PASS_CONFIRM:
      return {
        ...state,
        validateModalPass: {
          ...state.validateModalPass,
          confirmNewPassword: {
            ...state.validateModalPass.confirmNewPassword,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userManagementActions.MODAL_CONFIRM_USER_PASS:
      return {
        ...state,
        modalConfirmUserPass: action.payload,
      }
    case userManagementActions.WIP_DISABLED_SUBMIT:
      return {
        ...state,
        wipDisabledSubmit: action.payload,
      }
    case userManagementActions.DISABLE_BUTTON:
      return {
        ...state,
        disable_button: action.payload,
      }
    default:
      throw new Error()
  }
}