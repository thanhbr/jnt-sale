import {useContext} from "react";
import {CapitalAdjustmentContext} from "../provider/context";
import {CapitalAdjustmentActions} from "../provider/action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {useLocation, useNavigate} from "react-router-dom";
import {useCreateCapitalAdjustment} from "./useCreateCapitalAdjustment";

export const useCreateCapitalActionBtn = () => {
    const {pageState, pageDispatch} = useContext(CapitalAdjustmentContext)
    const {methods} = useCreateCapitalAdjustment()
    const {formCreate} = pageState;
    const {validate, extraInfo, productInfo, search, modal} = formCreate;
    const idEdit = location.pathname.split('/')[4] || ''
    const navigate = useNavigate();
    const list = search?.selected
    const dataQueries = {
        code: extraInfo?.code || '',
        note: extraInfo?.note || '',
        is_draft: 0,
        product_item: [],

    }
    const canSubmit = [
        validate?.submitForm,
        validate?.submitFormExtra
    ].includes(true)
    const handleCreateEdit = async (url, data) => {
        const response = await sendRequestAuth('post', `${config.API}${url}`, JSON.stringify(data))
        if (response?.data?.success) {
            toast.success({title: response?.data?.message})
            navigate('/accountant/price-adjustment')
        } else {
            pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                    code:{
                        status:true,
                        message:response?.data?.errors?.details[0].filed === 'code' && response?.data?.errors?.details[0].message
                    },
                    submitFormExtra:true,
                    submitForm: false,
                }})
        }

    }
    const handleAccept = (isDraft, type = '') => {
        const newCreate = {
            ...dataQueries,
            is_draft: isDraft || 0,
            product_item: search?.selected?.map(item => ({
                product_id: item?.data?.product_id,
                product_id_details: item?.data?.id,
                cost_price: item?.data?.cost_price,
                after_adjustment: item?.after_adjustment
            }))
        }
        pageDispatch({
            type: CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT, payload: {
                submitForm: true,
            }
        })
        const checkError = newCreate?.product_item?.filter(filter => filter?.after_adjustment === '' || +filter?.after_adjustment === +filter?.cost_price)
        const url = idEdit === '' ? `/warehouse/cost-price/create` : `/warehouse/cost-price/edit/${idEdit}`
        if (search.selected.length === 0) pageDispatch({
            type: CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT, payload: {
                table: true,
            }
        })
        else if (search.selected.length > 0 && checkError.length > 0) {
            let newValidateCapital = validate?.capital_price

            checkError.map(item => {
               let value = +(item?.after_adjustment?.split(',')?.reduce((p, n) => p + n))
                newValidateCapital = newValidateCapital.filter(filter =>{
                    if(filter?.data?.id !== item?.product_id_details) return filter
                })
                let findErrorData = list?.find(find => find?.data?.id == item?.product_id_details)
                newValidateCapital=[
                    ...newValidateCapital,
                    {...findErrorData,
                        message: value === 0?'Giá vốn điều chỉnh không được để trống': +value === +item?.cost_price ?  'Giá vốn điều chỉnh cần khác Giá vốn hiện tại':'',
                        status: value === 0 || +value === +item?.cost_price ? true: false}
                ]

            } )
            pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                    capital_price: newValidateCapital,
                    submitForm:newValidateCapital?.map(item=>item.status).includes(true)
                }})
        } else {
            if (+isDraft === 1) {
                if (type !== ''){
                    pageDispatch({
                        type: CapitalAdjustmentActions.OPEN_MODAL_CONFIRM_CAPITAL_ADJUSTMENT, payload: {
                            confirmCapital: false
                        }
                    })
                    handleCreateEdit(url, newCreate)
                }
                else pageDispatch({
                    type: CapitalAdjustmentActions.OPEN_MODAL_CONFIRM_CAPITAL_ADJUSTMENT, payload: {
                        confirmCapital: true
                    }
                })
            } else {
                handleCreateEdit(url, newCreate)
            }
        }
    }
    const handleCloseModal = () => {
        pageDispatch({
            type: CapitalAdjustmentActions.OPEN_MODAL_CONFIRM_CAPITAL_ADJUSTMENT, payload: {
                confirmCapital: false
            }
        })
        pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                submitForm:false,
                submitFormExtra:false,
            }})
    }
    return {
        data: {
            modal,
            validate,
            canSubmit
        },
        confirm: {
            accept: handleAccept,
            dismiss: handleCloseModal
        }
    }
}