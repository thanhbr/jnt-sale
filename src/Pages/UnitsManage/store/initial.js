export const initial = {
    isloading: false,
    openModal:false,
    list: [],
    meta: {
        start: 0,
        per_page: 20,
        total: 20,
    },
    emptyTitle: 'Bạn chưa có đơn vị tính nào',
    infoNote:'',
    is_check_default:false,
    is_switch_active:true,
    content:'',
    position:0,
    edit_id:'',
    is_default:0,
    status: 1,
    isCheckAll:false,
    isCheck:[],
    is_active:[],
    count:0,
    idCheck:[],
    valid_note:{
        valid:false,
        error:''
    },
    valid_position:{
        valid:false,
        error:''
    },
    disable_save:false,
    item_drop:'',
    check_search:false,
    confirm: {
        open: false,
        type: '',
        title: '',
        message: '',
        action: true,
        accept: false,
    },
    checkEmpty:false,
    pagination: {
        active: 0,
        amount: 20,
        total: 0,
        totalItems: 0,
      },
    valueSearch:'',
}