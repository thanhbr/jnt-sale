import {useContext} from "react";
import {StoreAccountContext} from "../reducer/context";
import {useAccountAction} from "../reducer/reducer";
import {removeAcent} from "../../../common/fieldText/_functions";
import {STORE_CONFIG_PRINT_TEMPLATE} from "../account";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import useAlert from "../../../hook/useAlert";
import useGlobalContext from "../../../containerContext/storeContext";

export const useUpdateStoreConfig = () => {
    const {pageState, pageDispatch} = useContext(StoreAccountContext)
    const [GlobalState, GlobalDispatch] = useGlobalContext()
    const {shopInfo} = GlobalState
    const {storeConfig} = pageState
    const {warningPhone, bulkOrder, quantityLowRate, validate, cancelEdit, confirm, updateStoreConfig, shopId} = storeConfig;
    const {showAlert} = useAlert()
    const dataStore = {
        ct_order_warning: warningPhone ? 1 : 0,
        quantity_low_rate : quantityLowRate?.activeValue || 0,
        setting_print : bulkOrder.activeValue?.value || 1
    }
    const changeUpdateStoreConfig = ()=>{
        pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:false})
    }
    const cancelEditStoreConfig = ()=>{
        if(cancelEdit) pageDispatch({type:useAccountAction.MODAL_CONFIRM_LEAVE_PAGE,payload:true})
       else pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:true})
    }
    const handleUpdateNewSoreConfig = async (checkBolUpdate)=>{
        pageDispatch({type:useAccountAction.SET_SUBMIT_BUTTON,payload:true})

        const response = await sendRequestAuth('post',
            `${config.API}/shop/setting/${shopId}`,
            dataStore
            )
        if(response?.data?.success){
            fetchDetailStore()
            let info = {
                ...shopInfo,
                setting_print:dataStore?.setting_print
            }
            pageDispatch({type:useAccountAction.SET_SUBMIT_BUTTON,payload:false})
            pageDispatch({type:useAccountAction.UPDATE_STORE_CONFIG,payload:true})
            pageDispatch({type:useAccountAction.MODAL_CONFIRM_LEAVE_PAGE,payload:false})
            pageDispatch({type:useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG,payload:false})
            showAlert({type:'success',content:response?.data?.message})
            GlobalDispatch({type: 'GET_STORE_INFO', payload: info})

            checkBolUpdate(false)
        }
    }
    const fetchDetailStore = async ()=>{
        const response = await sendRequestAuth('get',`${config.API}/shop/info`)
        if(response?.data?.success) pageDispatch({type:useAccountAction.GET_DETAIL_STORE_CONFIG,payload:response.data.data})
    }
    const onChangeQuantity = (e,checkBolUpdate) => {
        let {value} = e.target;
        let currentValue = value.toString().replace(/[^0-9]/g, '')
        currentValue = Math.ceil(currentValue)
        if(currentValue <= 9999) pageDispatch({type: useAccountAction.CHANGE_QUANTITY_LOW_RATE, payload: currentValue || 0})
        pageDispatch({type:useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG,payload:true})
        checkBolUpdate(true)
    }
    //bulk order
    const onChangeBulkOrder = (val,checkBolUpdate) =>{
        pageDispatch({type: useAccountAction.UPDATE_ACTIVE_VALUE_BULK_ORDER,payload: val})
        pageDispatch({type:useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG,payload:true})
        checkBolUpdate(true)
    }
    const onKeywordChangeBulkOrder = data =>{
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''
        const listBulkOrder = STORE_CONFIG_PRINT_TEMPLATE.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({type:useAccountAction.SEARCH_BULK_ORDER,payload:{
            keyword: data?.value,
                list: listBulkOrder
            }})
    }
    const handleCancel = ()=>{
        pageDispatch({type:useAccountAction.MODAL_CONFIRM_LEAVE_PAGE,payload:false})
    }
    const handleAccept = ()=>{
        pageDispatch({type:useAccountAction.ACCEPT_LEAVE_PAGE})
        pageDispatch({
          type: useAccountAction.SET_WARNING_PHONE_CREATE_ORDER,
          payload: +GlobalState?.shopInfo?.ct_order_warning !== 1
        })
    }
    const handleToggleWarning = (val, checkBolUpdate) => {
      pageDispatch({
        type: useAccountAction.SET_WARNING_PHONE_CREATE_ORDER,
        payload: val
      })
      checkBolUpdate(true)
      pageDispatch({type:useAccountAction.CHECK_CANCEL_EDIT_STORE_CONFIG,payload:true})
    }
    return {
        warningPhone,
        bulkOrder,
        quantityLowRate,
        validate,
        confirm,
        storeFunction: {
            onChange: onChangeQuantity,
            onChangBulkOrder: onChangeBulkOrder,
            onKeywordChange: onKeywordChangeBulkOrder,
            handleCancelConfirm: handleCancel,
            handleAcceptConfirm: handleAccept
        },
        functions:{
            changeEdit: changeUpdateStoreConfig,
            cancelStore: cancelEditStoreConfig,
            updateStore: handleUpdateNewSoreConfig,
            handleToggleWarning
        },
        data:{
            updateStoreConfig,
        }
    }
}