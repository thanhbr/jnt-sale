import {useCallback, useContext, useReducer, useState} from "react";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {CapitalAdjustmentContext} from "../provider/context";
import {CapitalAdjustmentActions} from "../provider/action";
import {debounce} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const useCreateCapitalAdjustment = () =>{
    const {pageState, pageDispatch} = useContext(CapitalAdjustmentContext)
    const {formCreate} = pageState;
    const {productInfo, search, validate} = formCreate
    const selectedList = search
    const navigate = useNavigate();
    const {page} = productInfo
    const validateCapital = validate?.capital_price
    const queries = {
        keyword:'',
        category_id:'',
        product_id_details:'',
        status:'',
        warehouse_id:'',
        is_inventory:'',
        per_page:20,
        start:productInfo?.page || 0,
    }
    const transformQueryObjToString = data => {
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(data)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        return queryString
    }
    const fetchProductOrigin = async (qs)=>{
       const q = transformQueryObjToString(qs)
        const response = await sendRequestAuth('get',
            `${config.API}/product/list-all-product-details${q}`
            )
        if(response?.data?.success){
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []
            pageDispatch({type:CapitalAdjustmentActions.GET_LIST_PRODUCT,payload:{
                    list:
                        page === 0
                            ? response?.data?.data
                            : [...productInfo.list, ...displayListData],
                    page,
                    total: response?.data?.meta?.total || 0,
                    canLoadMore: [...productInfo.list, ...displayListData].length >= response?.data?.meta?.total ? false : true
                }})
            pageDispatch({type:CapitalAdjustmentActions.SET_LOADING_GET_LIST_PRODUCT,payload:true})
        }
    }
    const handleFetchListLoadMore = async (k,page = 0, otp)=>{
        const q = transformQueryObjToString({...queries,
            keyword : k.trim() || '',
            start: page * 20,
            ...otp?.queries,
        })
        const response = await sendRequestAuth('get',
            `${config.API}/product/list-all-product-details${q}`
        )
        if(response?.data?.success){
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []
            pageDispatch({type:CapitalAdjustmentActions.GET_LIST_PRODUCT,payload:{
                    list:
                        page === 0
                            ? response?.data?.data
                            : [...productInfo.list, ...displayListData],
                    page,
                    keyword: k.trim(),
                    total: response?.data?.meta?.total || 0,
                    canLoadMore: [...productInfo.list, ...displayListData].length >= response?.data?.meta?.total ? false : true
                }})
            pageDispatch({type:CapitalAdjustmentActions.SET_LOADING_GET_LIST_PRODUCT,payload:true})


        }
    }

    const handleLoadMore = ()=>{
        const currentTotal = productInfo.list.length
        const total = productInfo.total
        if (currentTotal >= total){
            pageDispatch({
                type: CapitalAdjustmentActions.GET_LIST_PRODUCT,
                payload: {canLoadMore: false},
            })
            return
        }

        const response = handleFetchListLoadMore(
            productInfo.value,
            productInfo.page + 1,
        )

        return response
    }
    const debounceWarehouseKeywordChange = useCallback(
        debounce((data, page) => {
            handleFetchListLoadMore(data, 0)
        }, 500),
        [],
    )
    const handleWithInventorySearchChange = val => {
        const keyword = val ? `${val}` : ''

        debounceWarehouseKeywordChange(keyword,0)
    }
    const handleProductSearchSelect = (data, opt) => {
        if (
            ![
                'amount',
                'increase',
                'decrease',
            ].includes(opt?.type) ||
            !data
        )
            return
        let newSelectArr = search.selected
        let newValidateCapital = validate?.capital_price
        const findIndexData = newSelectArr.findIndex(
            item => item?.data?.id === data?.id,
        )
        switch (opt.type) {
            case 'amount':
                if (findIndexData !== -1){
                    newValidateCapital = newValidateCapital.filter(filter =>{
                        if(filter?.data?.id !== data?.id) return filter
                    })
                    const priceAfter = Number(opt?.amount  || newSelectArr[findIndexData].after_adjustment )
                    let afterAdjustment = ''
                    if(opt?.amount !== '' && priceAfter <= 99999999){
                        afterAdjustment = +priceAfter - newSelectArr[findIndexData].data?.cost_price
                        newSelectArr[findIndexData].difference= afterAdjustment
                        newSelectArr[findIndexData].after_adjustment = priceAfter
                    }else{
                        newSelectArr[findIndexData].difference = ''
                        newSelectArr[findIndexData].after_adjustment = ''
                    }

                }
                break
            case 'decrease':

                newValidateCapital = newValidateCapital.filter(filter =>{
                    if(filter?.data?.id !== data?.id) return filter
                })
                    newSelectArr = newSelectArr.filter(filter =>{
                        if(filter?.data?.id !== data?.id) return filter
                    })
                break

            case 'increase':
                newSelectArr = newSelectArr.filter(filter =>{
                    if(filter?.data?.id !== data?.id) return filter
                })
                newSelectArr=[
                    ...newSelectArr,
                    {data,difference: '',after_adjustment:''}
                ]
                pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                        table:false,
                    }})
                break;
            default:
                break
        }
        pageDispatch({
            type: CapitalAdjustmentActions.FORM_SELECTED_SEARCH_PRODUCT,
            payload: {list: newSelectArr},
        })
        pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                capital_price: newValidateCapital
            }})
    }
    const handleBlurCapitalPrice = (data,value)=>{
        value = +(value?.split(',')?.reduce((p, n) => p + n))
        let newValidateCapital = validate?.capital_price
        newValidateCapital = newValidateCapital.filter(filter =>{
            if(filter?.data?.id !== data?.id) return filter
        })
        newValidateCapital=[
            ...newValidateCapital,
            {data,
                message: value === 0?'Giá vốn điều chỉnh không được để trống': +value === +data?.cost_price ?  'Giá vốn điều chỉnh cần khác Giá vốn hiện tại':'',
                status: value === 0 || +value === +data?.cost_price ? true: false}
        ]
        pageDispatch({type:CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT,payload:{
                capital_price: newValidateCapital,
                submitForm:newValidateCapital?.map(item=>item.status).includes(true)
            }})

    }
    const handleDetailProduct =async (id) =>{
        const response = await sendRequestAuth('get',`${config.API}/warehouse/cost-price/detail/${id}`)
        if(response?.data?.success){
            const list = response?.data?.data?.product_item?.map(item =>({
                data:{
                    id:item?.product_id_details,
                    product_id:item?.product_id,
                    sku:item?.product_model,
                    product_name:item?.product_name,
                    cost_price:item?.cost_price
                },
                after_adjustment:item?.after_adjustment,
                difference:item?.difference
            }))
            pageDispatch({type:CapitalAdjustmentActions.FORM_SELECTED_SEARCH_PRODUCT,payload:{
                list:list
            }})
            pageDispatch({type:CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT,payload:{
                code:response?.data?.data?.code,
                note:response?.data?.data?.note,
                    user_name:  response?.data?.data?.fullname
            }})
            
        }else navigate('/accountant/price-adjustment')
    }
    return {
        methods:{
            fetchOrigin: fetchProductOrigin,
            onWithInventorySearchFetchMoreProductList: handleLoadMore,
            onWithInventorySearchChange:handleWithInventorySearchChange,
            onSelectedProduct: handleProductSearchSelect,
            fetchDetail:handleDetailProduct,
            onHandleBlurCapital: handleBlurCapitalPrice,
        },
        data:{
            list: productInfo?.list,
            canLoadMore: productInfo?.canLoadMore,
            loading: productInfo?.loading,
            value:  productInfo?.keyword,
            selectedList,
            validate
        }
    }
}