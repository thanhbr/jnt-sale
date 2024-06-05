import {formatDatetime} from "../../../common/form/datePicker/_functions";
export const paymentDefaultDateTime = new Date()
export const PaymentManagementState = {
    filter: {
        keyword: '',
        dateTime: {
            activeValue: {
                end: '',
                start: '',
                value: '',
            },
            end: '',
            start: '',
            trigger: true,
            value: '',
        },
        groupSubmitter: {
            activeValue: null,
            keyword: '',
            list: [],
            listOrigin: [],
            value: null,
        },
        paymentMethod: {
            activeValue: [],
            keyword: '',
            list: [],
            listOrigin: [],
            tab: 'all', // all | checked
            value: [],
        },
        employeeCreate: {
            activeValue: [],
            keyword: '',
            list: [],
            listOrigin: [],
            tab: 'all', // all | checked
            value: [],
        },
        typeReceipt: {
            activeValue: [],
            keyword: '',
            list: [],
            listOrigin: [],
            tab: 'all', // all | checked
            value: [],
        },
        status: ['1', '2'],
        per_page: '',
        start: 0,
    },
    table: {
        display: {
            list: [],
            listOrigin:[],
            loading: true,
        },
        detail: {
            id: null,
            active: null,
            list: [],
        },
        pagination: {
            active: 0,
            amount: 20,
            total: 3,
            totalItems: 59,
        },
        selected: {
            list: [],
        },
        debounceProductStatus: true,
        modal: {
            editDesc: {
                open: false,
                data: ''
            },
            cancelReceipt: {
                open: false,
                id: ''
            }
        }
    },
    formCreate:{
        form:{
            recipientGroup:{
                keyword: '',
                list: [
                    {id:1 , name:'Khách hàng',value:'customer'},
                    {id:1 , name:'Nhà cung cấp',value:'supplier'},
                    {id:1 , name:'Nhân viên',value:'user'},
                    {id:1 , name:'Đối tác vận chuyển',value:'partner_ship'},
                    {id:1 , name:'Đối tượng khác',value:'other'},
                ],
                listOrigin: [
                    {id:1 , name:'Khách hàng',value:'customer'},
                    {id:1 , name:'Nhà cung cấp',value:'supplier'},
                    {id:1 , name:'Nhân viên',value:'user'},
                    {id:1 , name:'Đối tác vận chuyển',value:'partner_ship'},
                    {id:1 , name:'Đối tượng khác',value:'other'},
                ],
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: {
                    name:'',
                    value:''
                },
            },
            recipientPerson:{
                keyword: '',
                list: [],
                listOrigin: [],
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
                canLoadMore:true,
                pagination:{
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
            },
            paymentType:{
                keyword: '',
                list: [],
                listOrigin: [],
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
                pagination:{
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
                canLoadMore : true,
            },
            paymentCode:{
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
            },
            paymentMethod:{
                keyword: '',
                list: [],
                listOrigin: [],
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
                pagination:{
                    active: 0,
                    amount: 20,
                    total: 0,
                    totalItems: 0,
                },
                canLoadMore : true,
            },
            paymentValue:{
                page: 0,
                total: 0,
                totalOrigin: 0,
                value: '',
            },
            referenceCode:'',
            description:"",
            dateTime: {
                formatValue: '',
                value: '',
            },

        },
        contentModal:{
            type:'payment type',
            open:false,
            confirm:{
                leavePage:false,
                sameName:false,
            }
        } ,
        addNew:{
            paymentType:{
                code:'',
                description:'',
                dt_created:'',
                is_default:0,
                name:'',
                status:1,
            },
            paymentMethods:{
                name: '',
                is_active: 0,
                status: 1,
            },
            haveEdit : false
        },
        validate:{
            recipientGroup:{
                status:false,
                message:'',
            },
            recipientPerson:{
                status:false,
                message:'',
            },
            paymentType:{
                status:false,
                message:'',
            },
            paymentCode:{
                status:false,
                message:'',
            },
            paymentMethod:{
                status:false,
                message:'',
            },
            paymentValue:{
                status:false,
                message:'',
            },
            referenceCode:{
                status:false,
                message:'',
            },
            description:{
                status:false,
                message:'',
            },
            name:{
                status:false,
                message:''
            },
            descriptionPayment:{
                status:false,
                message:''
            } ,
            code:{
                status:false,
                message:''
            },
            submit:false,
            paymentMethodsName:{
                status:false,
                message:''
            },
        }
    }
}