export const PaymentTypeState = {
    paymentType:{
        list:[],
        listOrigin:[],
        loading:false,
        detail:{
            code:'',
            description:'',
            dt_created:'',
            is_default:0,
            name:'',
            status:1,
        },
        pagination: {
            active: 0,
            amount: 20,
            total: 0,
            totalItems: 0,
        },
        id_delete:'',
        keyword:'',
        is_active:[],
        is_check:[],
        count:0,
    },
    validate:{
        name:{
            status:false,
            message:''
        },
        description:{
            status:false,
            message:''
        } ,
        code:{
            status:false,
            message:''
        },
        submit:false,
    },
    search:'',
    modal:{
        create_payment:false,
        close_modal:false,
        confirm_status:false,
        delete_payment:false,
        confirm_same_name:false,
        confirm_leave_page:false,
    },
    haveEdit:false,
}