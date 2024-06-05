import addressData from 'Pages/addressSeparationTool/_data.json'
import {transformAddressData} from '../utils/transform'
export const provinceData = addressData.map(transformAddressData)

export const initial = {
    isloading: false,
    openModal:false,
    list: [],
    meta: {
        start: 0,
        per_page: 20,
        total: 20,
        store_limit: 0,
    },
    emptyTitle: 'Bạn chưa có kho nào',
    infoNote:'',
    is_check_default:false,
    is_switch_active:true,
    content:'',
    position:0,
    edit_item_id: '',
    is_default:0,
    status: 1,
    isCheckAll:false,
    isCheck:[],
    is_active:[],
    count:0,
    idCheck:[],
    disable_save:false,
    item_drop:'',
    check_search:false,
    confirm: {
        open: false,
        type: '',
        title: '',
        message: '',
        action: () => {},
        accept: false,
    },
    modalInfo: {
        open: false,
        type: '',
        title: '',
        message: '',
    },
    checkEmpty:false,
    pagination: {
        active: 0,
        amount: 20,
        total: 0,
        totalItems: 0,
      },
    valueSearch:'',
    form: {
        warehouseInfo: {
            address: {
                value: '',
                origin: '',
                province: {list: provinceData, keyword: '', value: null},
                district: {list: [], keyword: '', value: null},
                ward: {list: [], keyword: '', value: null},
                provinceOrigin: null,
                districtOrigin: null,
                wardOrigin: null,
            },
            name: {
                value: '',
                origin: ''
            },
            isPurchase: {
                value: true,
                origin: true
            },
            isMain: {
                value: false,
                origin: false
            },
            status: {
                value: true,
                origin: true
            }
        }
    },
    errors: []
}