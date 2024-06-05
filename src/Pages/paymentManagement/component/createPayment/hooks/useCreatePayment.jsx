import {useCallback, useContext} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {PaymentManagementActions} from "../../../provider/action";
import {CREATE_PAYMENT_FORM_VALIDATE, RECIPIENT_GROUP_TYPE} from "../../../interfaces/_const";
import {removeAcent} from "../../../../../common/fieldText/_functions";
import {transFormValue} from "../../../util/_transformValue";
import {REGEX_CUSTOMER_CODE} from "../../../../../util/regex";
import {replaceAllCustom} from "../../../../../util/functionUtil";
import {fNumber} from "../../../../../util/formatNumber";
import {transformMoneyToSendRequest} from "../../../../orderSingle/utils/transform";

export const useCreatePayment = () => {
    const {pageState, pageDispatch} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form} = formCreate;
    const {recipientGroup, recipientPerson, paymentType, paymentValue} = form;
    const findList = recipientGroup?.listOrigin
    const list = recipientPerson?.list
    const findListPerson = recipientPerson?.listOrigin
    const listPaymentType = paymentType.list
    //fetch list recipient
    const fetchListRecipientPerson = async (type,qs) => {
        let queryString = '?'
        let i = 0
        if(qs?.query) {
            for (const [key, value] of Object.entries(qs?.query)) {
                queryString += `${i > 0 ? '&' : ''}${key}=${value}`
                i++
            }
        }
        const response = await sendRequestAuth('get',
            `${config.API}${qs?.url}${queryString}`
        )
        if (response?.data?.success) {
            const listData = transFormValue(type,response?.data?.data)
            pageDispatch({
                type: PaymentManagementActions.GET_LIST_RECIPIENT_PERSON, payload: {
                    list:  qs?.query?.start === 0
                        ? listData
                        : [...list, ...listData],
                    listOrigin:  qs?.query?.start === 0
                        ? listData
                        : [...list, ...listData],
                    total: response?.data?.meta,
                    loading: false,
                    canLoadMore: [...listData, ...list].length >= +response?.data?.meta?.total ? false : true,
                }
            })
        }
    }
    const handleFetchListRecipientPerson = async (data,otp)=>{
        pageDispatch({
            type: PaymentManagementActions.FORM_PAYMENT_RICIPIENT_GROUP_UPDATE, payload: {
                value: {
                    name: data?.name,
                    value: data?.value
                }
            }
        })
        if(data?.value !== recipientGroup?.value?.value)pageDispatch({
            type: PaymentManagementActions.GET_RECIPIENT_PERSON_UPDATE, payload: {
                value: {
                    name: '',
                    value: ''
                }
            }
        })

        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
            recipientGroup:{
                status:false,
                message:''
            }
            }})
        const queriesCustomer = {
            query:{
                keyword:'',
                group:'',
                city_id:'',
                district_id:'',
                ward_id:'',
                per_page: 200,
                start : 0,
            },
            url :'/customer/customers'

        }
        const queriesSupplier = {
            query:{
                keyword:'',
                per_page: 200,
                start : 0,
                status:1,
            },
            url :'/supplier/suppliers'
        }
        const queriesEmployee = {
            query:{
                keyword:'',
                group:'',
                status:'',
                per_page:200,
                start:0
            },
            url :'/admin/employees'
        }
        if(data?.value === 'partner_ship'){
            const response = await sendRequestAuth('get',
                `${config.API}/order/shipping/partner`
            )

            if (response?.data?.success) {
                const listData = response?.data?.data.filter(filter => filter.connected).slice(0,6)
                const listArray = transFormValue(data?.value,listData.filter(filter=>filter.name !== "SuperShip"))
                pageDispatch({
                    type: PaymentManagementActions.GET_LIST_RECIPIENT_PERSON, payload: {
                        list: listArray,
                        listOrigin: listArray,
                    }
                })
            }
        }
        switch (data?.value) {
            case RECIPIENT_GROUP_TYPE[0] :
                fetchListRecipientPerson(data?.value,queriesCustomer)
                break
            case RECIPIENT_GROUP_TYPE[1] :
                fetchListRecipientPerson(data?.value,queriesSupplier)
                break;
            case RECIPIENT_GROUP_TYPE[2] :
                fetchListRecipientPerson(data?.value,queriesEmployee)
                break
            default:
                break;
        }

    }
    const handleRicipientKeyWord = (data)=>{
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''
        const postListData = findList.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({type:PaymentManagementActions.GET_KEYWORD_RECIPIENT_GROUP_UPDATE,payload:{
                list:postListData,
                keyword:data?.value
            }})
    }
    const handleLoadMore = ()=>{
        pageDispatch({
            type: PaymentManagementActions.UPLOAD_CAN_LOAD_MORE,
            payload: {canLoadMore: false},
        })

        const currentTotal = recipientPerson.list.length
        const total = +recipientPerson?.pagination?.totalItem
        if (currentTotal >= total) {
            return
        }
        const queriesCustomer = {
            query:{
                keyword:'',
                group:'',
                city_id:'',
                district_id:'',
                ward_id:'',
                per_page: 20,
                start :  (+recipientPerson?.pagination?.active + 1) * 20,
            },
            url :'/customer/customers'

        }
        const queriesSupplier = {
            query:{
                keyword:'',
                per_page: 20,
                start :  (+recipientPerson?.pagination?.active + 1) * 20,
                status:1,
            },
            url :'/supplier/suppliers'
        }
        const queriesEmployee = {
            query:{
                keyword:'',
                group:'',
                status:1,
                per_page:20,
                start: (+recipientPerson?.pagination?.active + 1) * 20
            },
            url :'/admin/employees'
        }
        switch (recipientGroup?.value?.value) {
            case RECIPIENT_GROUP_TYPE[0] :
                fetchListRecipientPerson(recipientGroup?.value?.value,queriesCustomer)
                break
            case RECIPIENT_GROUP_TYPE[1] :
                fetchListRecipientPerson(recipientGroup?.value?.value,queriesSupplier)
                break;
            case RECIPIENT_GROUP_TYPE[2] :
                fetchListRecipientPerson(recipientGroup?.value?.value,queriesEmployee)
                break
            default:
                break;
        }
    }
    const handleRecipientPersonKeyword = (data)=>{
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''
        const postListData = findListPerson.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({type:PaymentManagementActions.GET_KEYWORD_RECIPIENT_PERSON_UPDATE,payload:{
                list:postListData,
                keyword:data?.value
            }})
    }

    const handleRecipientPersonChange = (data) =>{
        pageDispatch({
            type: PaymentManagementActions.GET_RECIPIENT_PERSON_UPDATE, payload: {
                value: {
                    name: data?.name,
                    value: data?.value,
                    mobile: data?.mobile || '',
                }
            }
        })
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
            recipientPerson:{
                status:false,
                message: "",
            }
            }})

    }

    const handleChangeOther =(e)=>{
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                recipientPerson:{
                    status:false,
                    message: "",
                }
            }})
        pageDispatch({
            type: PaymentManagementActions.GET_RECIPIENT_PERSON_UPDATE, payload: {
                value: {
                    name: e.target.value,
                    value:  e.target.value
                }
            }
        })
    }

    const handleBlurChangOther = e =>{
        const {value} = e.target
        if(value === '') pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                recipientPerson:{
                    status:true,
                    message: CREATE_PAYMENT_FORM_VALIDATE.other.EMPTY,
                }
            }})
        else if(value.length > 50) pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                recipientPerson:{
                    status:true,
                    message: CREATE_PAYMENT_FORM_VALIDATE.other.MAX,
                }
            }})
        else {
            pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    recipientPerson:{
                        status:false,
                        message: '',
                    }
                }})
            pageDispatch({
                type: PaymentManagementActions.GET_RECIPIENT_PERSON_UPDATE, payload: {
                    value: {
                        name: e.target.value.trim(),
                        value:  e.target.value.trim()
                    }
                }
            })
        }
    }

    //payment type
    const queriesPayment = {
        keyword: paymentType?.keyword || '',
        status: 1,
        per_page: paymentType?.pagination?.amount || 20,
        start: paymentType?.pagination?.active * paymentType?.pagination?.amount || 0,
    }
    const fetchListPaymentType = async (qs,opt) =>{
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get',`${config.API}/cashbook/payments-type/list${queryString}`)
        if(response?.data?.success){
            const listData = response?.data?.data
            pageDispatch({type:PaymentManagementActions.GET_LIST_PAYMENT_TYPE,payload:{
                    list: qs?.query?.start === 0
                        ? listData
                        : [...listPaymentType, ...listData],
                    pagination :{
                        totalItems:response?.data?.meta?.total
                    }
                }})
            pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_TYPE,payload: [...listPaymentType, ...listData].length >= +response?.data?.meta?.total ? false : true,})
        }
    }
    const handleLoadMorePaymentType = ()=>{
        pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_TYPE,payload:false})
        const currentTotal = paymentType.listOrigin.length
        const total = +paymentType?.pagination?.totalItems
        if (currentTotal >= total) {
            return
        }

        const page = (+paymentType?.pagination?.active +1) * paymentType?.pagination?.amount
        const response = fetchListPaymentType(
            {...queriesPayment,start :page}
        )
        return response
    }
    const handleChangePaymentType = (data)=>{
        pageDispatch({
            type: PaymentManagementActions.UPDATE_PAYMENT_TYPE, payload: {
                value: {
                    name: data?.name,
                    value: data?.id
                }
            }
        })
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                paymentType:{
                    status:false,
                    message: "",
                }
            }})
    }


    const handleSearchChangePayment = (data) => {
        pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_TYPE,payload:  false })
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''
        const postListData = paymentType?.listOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({type:PaymentManagementActions.SEARCH_PAYMENT_TYPE,payload:{
                list:postListData.filter(filter => +filter.is_default === 0),
                keyword:data?.value,
                canLoadMore:true,
            }})
    }
    const handleChangePaymentCode =(e)=>{
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                paymentCode:{
                    status:false,
                    message: "",
                }
            }})
        pageDispatch({
            type: PaymentManagementActions.GET_PAYMENT_CODE_UPDATE, payload: {
                value: {
                    name: e.target.value.trim(),
                    value:  e.target.value.trim()
                }
            }
        })
    }

    const handleBlurChangePaymentCode = e =>{
        const {value} = e.target
        const regex = REGEX_CUSTOMER_CODE;
        if( value !== '' && !regex.test(value) ){
            if(value.length > 50)

                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                        paymentCode:{
                            status:true,
                            message: CREATE_PAYMENT_FORM_VALIDATE.paymentCode.MAX,
                        }
                    }})
            else pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentCode:{
                        status:true,
                        message: CREATE_PAYMENT_FORM_VALIDATE.paymentCode.VALID,
                    }
                }})

        }
        else {
            pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentCode:{
                        status:false,
                        message: '',
                    }
                }})
            pageDispatch({
                type: PaymentManagementActions.GET_PAYMENT_CODE_UPDATE, payload: {
                    value: {
                        name: e.target.value.trim(),
                        value:  e.target.value.trim()
                    }
                }
            })
        }
    }

    //payment value
    const handleChangePaymentValue = (amount) => {

        const result = +(amount?.split(',')?.reduce((p, n) => p + n))
        pageDispatch({
            type: PaymentManagementActions.GET_PAYMENT_VALUE_UPDATE,
            payload: { value:{
                    name: result,
                    value:  result
                } }
        })
         pageDispatch({
            type: PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,
            payload: {paymentValue: { status: result === '' || +paymentValue?.value?.name === 0 ,
                    message: !!!paymentValue?.value?.name ? 'Giá trị chi không được để trống'
                        : +paymentValue?.value?.name === 0 ? 'Giá trị chi cần > 0' : ''}}
        })
        pageDispatch({
            type: PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,
            payload: {
                submit:false,
            }
        })

    }
    const handleBlurPaymentValue = (val) =>{
        pageDispatch({
            type:  PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,
            payload: { paymentValue: { status:  val.target.value === ''|| +paymentValue?.value?.name === 0,
                    message: !!!paymentValue?.value?.name ? 'Giá trị chi không được để trống'
                        : +paymentValue?.value?.name === 0 ? 'Giá trị chi cần > 0' : ''}}
        })
    }
    return {
        methods: {

            //recipient group
            onRecipientGroupChange: handleFetchListRecipientPerson,
            onRecipientGroupKeyword: handleRicipientKeyWord,
            onPostFetchMoreProductList: handleLoadMore,

            //recipient person
            onRicipientPersonKeywordChange:handleRecipientPersonKeyword,
            onRicipientPersonChange:handleRecipientPersonChange,
            onChangeOther: handleChangeOther,
            onBlurChangeOther: handleBlurChangOther,
            canLoadMore: recipientPerson?.canLoadMore,

            paymentMethods:{
                fetchOrigin :()=> fetchListPaymentType(queriesPayment),
                handlLoadMore: handleLoadMorePaymentType,
                onPaymentTypeChange:handleChangePaymentType,
                canLoadMore : paymentType?.canLoadMore,
                onPaymentKeywordChange: handleSearchChangePayment,
                // payment code
                onChangePaymentCode: handleChangePaymentCode,
                onBlurChangePaymentCode: handleBlurChangePaymentCode,
                //payment value
                onChangePaymentValue: handleChangePaymentValue,
                onBlurPaymentValue: handleBlurPaymentValue,
            },

        },

    }
}