import { getArrayFromValue } from '../utils/array'
import { bulkOrderActions, bulkOrderCreateActions } from './_actions'
import { bulkOrderInitialState } from './_initialState'

export const bulkOrderReducer = (state, action) => {
  switch (action.type) {
    case bulkOrderActions.FILTER_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            end: action.payload?.end,
            start: action.payload?.start,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: action.payload?.trigger,
          },
        },
      }

    case bulkOrderActions.FILTER_EMPLOYEE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderActions.FILTER_EMPLOYEE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: action.payload?.keyword,
            list: action.payload?.list,
          },
        },
      }

    case bulkOrderActions.FILTER_ORIGIN_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            list: action.payload?.employee?.list,
            listOrigin: action.payload?.employee?.list,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            list: action.payload?.shippingPartner?.list,
            listOrigin: action.payload?.shippingPartner?.list,
          },
        },
      }

    case bulkOrderActions.FILTER_OTHER_ACTIVE_VALUE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: state.filter.dateTime.end,
              start: state.filter.dateTime.start,
              value: state.filter.dateTime.value,
            },
          },
          employee: {
            ...state.filter.employee,
            activeValue: state.filter.employee.value,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            activeValue: state.filter.shippingPartner.value,
          },
        },
      }

    case bulkOrderActions.FILTER_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          search: {
            ...state.filter.search,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderActions.FILTER_SHIPPING_PARTNER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            keyword: action.payload?.keyword,
            list: action.payload?.list,
          },
        },
      }

    case bulkOrderActions.FILTER_TAG_DELETE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: getArrayFromValue(action.payload.list).includes(
                'dateTime.current',
              )
                ? ''
                : state.filter.dateTime.activeValue.end,
              start: getArrayFromValue(action.payload.list).includes(
                'dateTime.current',
              )
                ? ''
                : state.filter.dateTime.activeValue.start,
              value: getArrayFromValue(action.payload.list).includes(
                'dateTime.current',
              )
                ? ''
                : state.filter.dateTime.activeValue.value,
            },
            end: getArrayFromValue(action.payload.list).includes(
              'dateTime.current',
            )
              ? ''
              : state.filter.dateTime.end,
            start: getArrayFromValue(action.payload.list).includes(
              'dateTime.current',
            )
              ? ''
              : state.filter.dateTime.start,
            trigger: getArrayFromValue(action.payload.list).includes(
              'dateTime.current',
            )
              ? !state.filter.dateTime.trigger
              : state.filter.dateTime.trigger,
            value: getArrayFromValue(action.payload.list).includes(
              'dateTime.current',
            )
              ? ''
              : state.filter.dateTime.value,
          },
          employee: {
            ...state.filter.employee,
            activeValue: getArrayFromValue(action.payload.list).includes(
              'employee',
            )
              ? null
              : state.filter.employee.activeValue,
            keyword: getArrayFromValue(action.payload.list).includes('employee')
              ? ''
              : state.filter.employee.keyword,
            value: getArrayFromValue(action.payload.list).includes('employee')
              ? null
              : state.filter.employee.value,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            activeValue: getArrayFromValue(action.payload.list).includes(
              'shippingPartner',
            )
              ? null
              : state.filter.shippingPartner.activeValue,
            keyword: getArrayFromValue(action.payload.list).includes(
              'shippingPartner',
            )
              ? ''
              : state.filter.shippingPartner.keyword,
            value: getArrayFromValue(action.payload.list).includes(
              'shippingPartner',
            )
              ? null
              : state.filter.shippingPartner.value,
          },
        },
      }

    case bulkOrderActions.TABLE_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list,
            listOrigin: action.payload?.display?.listOrigin,
            loading: false,
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
      }

    case bulkOrderActions.TABLE_DISPLAY_LOADING_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: true,
          },
        },
      }

    default:
      throw new Error()
  }
}

export const bulkOrderCreateReducer = (state, action) => {
  switch (action.type) {
    case bulkOrderCreateActions.FORM_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          loading: false,
          shippingPartner: {
            ...state.form.shippingPartner,
            list: action.payload?.shippingPartner?.list,
            listOrigin: action.payload?.shippingPartner?.list,
          },
          shippingPoint: {
            ...state.form.shippingPoint,
            list: action.payload?.shippingPoint?.list,
          },
          source: {
            ...state.form.source,
            list: action.payload.source.list,
            listOrigin: action.payload.source.list,
          },
          activePrint: action.payload.activePrint
        },
      }

    case bulkOrderCreateActions.FORM_SOURCE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          source: {
            ...state.form.source,
            value: action.payload?.value || null,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SOURCE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          source: {
            ...state.form.source,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_PARTNER_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            options: action.payload?.options,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_PARTNER_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            keyword: action.payload?.keyword,
            list: action.payload?.list,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_PARTNER_OPTION_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            options: action.payload?.options,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_POINT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            value: action.payload?.value,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_POINT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            keyword: action.payload?.keyword,
          },
        },
      }

    case bulkOrderCreateActions.FORM_SHIPPING_POINT_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            list: action.payload?.list,
          },
        },
      }

    case bulkOrderCreateActions.TABLE_DISPLAY_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list,
            listOrigin: action.payload?.display?.listOrigin,
            loading: false,
          },
          file: {
            ...state.table.file,
            id: action.payload?.file?.id || state.table.file.id,
          },
          report: {
            ...state.table.report,
            list: action.payload?.report?.list,
          },
          total: {
            ...state.table.total,
            rows: action.payload?.total?.rows || state.table.total.rows,
            sent: action.payload?.total?.sent || state.table.total.sent,
          },
        },
      }

    case bulkOrderCreateActions.TABLE_ERROR_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          error: {
            ...state.table.error,
            list: action.payload?.error?.list,
          },
        },
      }

    case bulkOrderCreateActions.TABLE_DISPLAY_LOADING_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: true,
          },
        },
      }

    case bulkOrderCreateActions.TABLE_SELECTED_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          selected: {
            ...state.table.selected,
            list: action.payload?.selected?.list,
          },
        },
      }

    case bulkOrderCreateActions.SETLOADINGPERCENT:
      return {
        ...state,
        loadingPercent: action.payload,
      }

    case bulkOrderActions.TABLE_UPDATE_ONLY_ERROR:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            ...action.payload
          },
        },
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      throw new Error()
  }
}
