export const printTemplateActions = {
  FILTER: {
    TYPE: 'FILTER_TYPE',
    SIZE: 'FILTER_SIZE',
  },
  CONTENT: {
    DEFAULT: 'TEMPLATE_DEFAULT'
  },
  SHOW_EDIT_PRINT: 'SHOW_EDIT_PRINT',
  LIST_KEYWORD: 'LIST_KEYWORD',
  ADD_ID_TEMPLATE: 'ADD_ID_TEMPLATE',
  OLD_VALUE: 'OLD_VALUE',
  ON_CKEDITOR_CHANGE: 'ON_CKEDITOR_CHANGE',
  SHOW_MODAL_CONFIRM: 'SHOW_MODAL_CONFIRM',
  SHOW_MODAL_CONFIRM_TEMPLATE: 'SHOW_MODAL_CONFIRM_TEMPLATE',
  TEMPLATE_AFTER_CHANGE: 'TEMPLATE_AFTER_CHANGE',
  SHOW_MODAL_CONFIRM_CHANGE: 'SHOW_MODAL_CONFIRM_CHANGE',
  SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE: 'SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE',
  OPTION_TYPE_FILTER: 'OPTION_TYPE_FILTER',
  OPTION_SIZE_FILTER: 'OPTION_SIZE_FILTER',
}
export const printTemplateInitialState = {
  filter: {
    type: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
    size: {
      activeValue: null,
      keyword: '',
      list: [],
      listOrigin: [],
      value: null,
    },
  },
  templateID: '',
  content: {
    template: ''
  },
  editPrint: false,
  listKeyword: [],
  oldValue: {
    id: '',
    content: ''
  },
  onCkeditorChange: false,
  modalConfirm: false,
  modalConfirmTemplate: false,
  templateAfterChange: '',
  modalConfirmChange: false,
  modalConfirmTemplateChange: false,
  optionTypeFilter: '',
  optionSizeFilter: '',
}
export const printTemplateReducer = (state, action) => {
  switch (action.type) {
    case printTemplateActions.FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          type: {
            ...state.filter.type,
            list: action.payload.type.list,
            listOrigin: action.payload.type.list,
          },
          size: {
            ...state.filter.size,
            list: action.payload.size.list,
            listOrigin: action.payload.size.list,
          },
          ...action.payload
        },
      }
    case printTemplateActions.CONTENT.DEFAULT:
      return {
        ...state,
        content: {
          ...state.content,
          ...action.payload
        },
      }
    case printTemplateActions.SHOW_EDIT_PRINT:
      return {
        ...state,
        editPrint: !state.editPrint,
      }
    case printTemplateActions.LIST_KEYWORD:
      return {
        ...state,
        listKeyword: action.payload,
      }
    case printTemplateActions.ADD_ID_TEMPLATE:
      return {
        ...state,
        templateID: action.payload,
      }
    case printTemplateActions.OLD_VALUE:
      return {
        ...state,
        oldValue: {
          id: action.payload.oldValue.id,
          content: action.payload.oldValue.content,
        }
      }
    case printTemplateActions.ON_CKEDITOR_CHANGE:
      return {
        ...state,
        onCkeditorChange: action.payload,
      }
    case printTemplateActions.SHOW_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirm: action.payload,
      }
    case printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE:
      return {
        ...state,
        modalConfirmTemplate: action.payload,
      }
    case printTemplateActions.TEMPLATE_AFTER_CHANGE:
      return {
        ...state,
        templateAfterChange: action.payload,
      }
    case printTemplateActions.SHOW_MODAL_CONFIRM_CHANGE:
      return {
        ...state,
        modalConfirmChange: action.payload,
      }
    case printTemplateActions.SHOW_MODAL_CONFIRM_TEMPLATE_CHANGE:
      return {
        ...state,
        modalConfirmTemplateChange: action.payload,
      }
    case printTemplateActions.OPTION_TYPE_FILTER:
      return {
        ...state,
        optionTypeFilter: action.payload,
      }
    case printTemplateActions.OPTION_SIZE_FILTER:
      return {
        ...state,
        optionSizeFilter: action.payload,
      }
    default:
      throw new Error()
  }
}