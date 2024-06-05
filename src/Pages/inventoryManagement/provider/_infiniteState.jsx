import {
    ADJUST_COD_FILTER_FORM,
    ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
    ORDER_FILTER_FORM_DUPLICATE_VALUES, ORDER_FILTER_FORM_PRINT
} from "../../deliveryManagement/interfaces/_constants";
import { getDateFromNow } from '../utils/date'
import { formatDatetime } from '../../../common/form/datePicker/_functions'
import {ORDER_TABLE_THEAD_PAYMENT_FILTER_LIST} from "../../refactorOrder/interfaces/_constants";
import moment from 'moment'
const dateTimeDefaultValue = [getDateFromNow(-7), getDateFromNow(0,{type: 'end'})]
const formatDateTimeDefaultValue = `${formatDatetime(
    dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`

const date = new Date()
export const InventoryState={
    filter: {
        advancedSearch: {
            customer: {
                keyword: '',
                value: '',
            },
            liveVideoId: '',
        },
        dateTime: {
            activeValue: {
                end: '',
                start: '',
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
            },
            end: dateTimeDefaultValue[1],
            start: dateTimeDefaultValue[0],
            type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
            trigger: true,
            value: '',
        },
        employee: {
            activeValue: {
                type: {name: 'Nhân viên tạo phiếu', value: ''},
                value: [],
            },
            keyword: '',
            list: [],
            listOrigin: [],
            tab: 'all', // all | checked
            type: {
                list: [],
                value: {name: 'Nhân viên tạo phiếu', value: ''},
            },
            value: [],
        },
        search: {
            value: '',
        },
        shippingStatus: {
            activeValue: null,
            keyword: '',
            list: [
                {name: 'Đã kiểm kho', value: 2},
                {name: 'Đang kiểm kho', value: 1},
                {name: 'Hủy', value: 3},
            ],
            listOrigin: [],
            tab: 'all', // all | checked
            value: null,
        },
        warehouse: {
            activeValue: null,
            keyword: '',
            list: [],
            listOrigin: [],
            value: null,
        },
    },
    notifications: {
        list: [],
        total:'',
    },
    table: {
        display: {
            list: [],
            loading: true,
        },
        detail: {
            id: null,
            active: null,
            list: [],
            isDiff:0,
        },
        pagination: {
            active: 0,
            amount: 20,
            total: 0,
            totalItems: 0,
        },
        selected: {
            list: [],
        },
        properties: {
            canShowExport: false
        },
        loading:false,
    },
    loading: false,
    modal:{
        balance:{
            show:false,
        },
        cancel:{
            show:false,
        },
        import_excel:{
          show:false,
        },
        title:'',
        id:'',
    },
    import_file:null,
    purchase : {
        generalInfo: {
            warehouse: {
                keyword: '',
                list: [],
                listOrigin: [],
                page: 0,
                total: 0,
                value: null,
            },

        },
    },
}