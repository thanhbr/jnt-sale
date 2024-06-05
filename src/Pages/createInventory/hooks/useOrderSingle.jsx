import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useContext, useState} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {InventorySingleContext,} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
    transformProductData,
    transformSourceData,
    transformWarehouseData,
} from '../utils/transform'
import useOrderSingleProductInfo from './useOrderSingleProductInfo'
import toast from "../../../Component/Toast";
import useGlobalContext from "../../../containerContext/storeContext";
import {useNavigate, useParams} from "react-router-dom";

const useOrderSingle = () => {
    const {state, dispatch} = useContext(InventorySingleContext)
    const productHook = useOrderSingleProductInfo()
    const {productInfo} = state.form
    const {extraInfo} = state.form
    const {validateTable}= state
    const isEnoughProductInfo = productInfo.withInventoryConfig.search?.selected?.length === 0
            ? true
            : false
    const {inventoryId} = useParams()
    const navigate = useNavigate()
    const canSaveOrder = isEnoughProductInfo
    const {withInventoryConfig} = productInfo
    const {warehouse} = withInventoryConfig
    const selectedList = productInfo?.withInventoryConfig?.search?.selected
    const total_wareHouse = selectedList?.reduce(
        (accumulator, currentValue) => Number(accumulator + currentValue?.data?.warehouse_quantity),
        0
    );
    const total_quantity = selectedList?.reduce(
        (accumulator, currentValue) => Number(accumulator) + Number(currentValue?.quantity),
        0
    );
    const submitQueries = {
        warehouse_id: warehouse?.value?.value,
        total_after_adjustment: total_quantity || 0,
        product_item: [selectedList],
        note: extraInfo?.note?.value || '',
    }

    const handleFetchOrigin = async () => {
        const response = await Promise.all([

            sendRequestAuth(
                'get',
                `${config.API}/order/origins?keyword=&status=1&per_page=10&start=0`,
            ),

            sendRequestAuth(
                'get',
                `${config.API}/warehouse/warehouses?keyword=&per_page10&start=0&is_purchase=1&status=1`,
            ),
            inventoryId ? sendRequestAuth('get',
                `${config.API}/warehouse/inventory/detail/${inventoryId}?is_diff=0`
            ) : null,
        ])

        if (

            !!response[0]?.data?.success &&
            !!response[1]?.data?.success
        ) {
            let WarehouseValueData = null
            const formatWarehouseList = ArrayUtils.getQualifiedArray(
                response[1]?.data?.data,
            ).map(item => {
                if (item?.is_main === '1' && !WarehouseValueData)
                    WarehouseValueData = transformWarehouseData(item)
                return transformWarehouseData(item)
            })

            const productResponse = await Promise.all([
                sendRequestAuth(
                    'get',
                    `${
                        config.API
                    }/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${
                        formatWarehouseList[0]?.value || ''
                    }&per_page=10&start=0`,
                ),
            ])
            const formatProductList = {
                inventory: ArrayUtils.getQualifiedArray(
                    productResponse[0]?.data?.data,
                ).map(transformProductData),
                withInventory: ArrayUtils.getQualifiedArray(
                    productResponse[0]?.data?.data,
                ).map(transformProductData),
            }
            if(inventoryId){
                const list = response[2]?.data.data
                const newSelectArr = list?.item_details.map(item=>{
                    return {
                        data: {
                            id:item?.id || '',
                            image_thumb:'',
                            product_id: item?.product_id || '',
                            product_name: item?.product_name_version ||  '',
                            sku: item?.sku || '',
                            warehouse_quantity: item?.quantity || '',
                        },
                        quantity: item?.quantity_after_adjustment ||0,
                        reason: item?.reason || '',
                    }
                })
                WarehouseValueData = {value: list?.warehouse_id , name:list?.warehouse_name}
                dispatch({
                    type: orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE,
                    payload: {list: newSelectArr},
                })
                dispatch({
                    type: orderSingleAction.FORM_NOTE_UPDATE,
                    payload: {value: list?.note},
                })
            }

            dispatch({
                type: orderSingleAction.ORIGIN,
                payload: {

                    productInfo: {
                        inventoryConfig: {
                            auto: {
                                list: formatProductList.inventory,
                                total: productResponse[0]?.data?.meta?.total || 0,
                            },
                        },
                        withInventoryConfig: {
                            search: {
                                list: formatProductList.withInventory,
                                total: productResponse[0]?.data?.meta?.total || 0,
                            },
                            warehouse: {
                                list: formatWarehouseList,
                                total: response[0]?.data?.meta?.total || 0,
                                value: WarehouseValueData || formatWarehouseList[0],
                            },
                        },
                    },
                },
            })
        }
    }

    const resetFormData = () => {
        dispatch({type: 'RESET_FORM_DEFAULT'})
        dispatch({type: 'RESET_VALIDATE_FORM'})
        dispatch({type: 'UPDATE_COLLECT_TRIGGER', payload: true})

        // UV-1587
        dispatch({
            type: orderSingleAction.UPDATE_SHIPPING_INFO,
            payload: {
                deliveryNote: {
                    selected: 0,
                    content: state?.deliveryNote?.find(item => +item.is_default === 1)?.content || '',
                },
            },
        })
    }

    const resetCustomer = () => {
        dispatch({type: 'RESET_FORM_CUSTOMER_INFO'})
        dispatch({type: 'RESET_VALIDATE_FORM'})
    }

    const [debounceSubmit, setDebounceSubmit] = useState(true)
    const checkError = (res) => {
        switch (res.field || res.filed) {
            case "product_item":
                toast.error({title: res.message})
                break;
            case "quantity":
                toast.error({title: res.message})
                break;
            case "quantity_after_adjustment":
                toast.error({title: res.message})
                break;
            default:
                break;
        }
    }
    const handleSubmit = async opt => {
        if(productInfo.withInventoryConfig.search?.selected?.length === 0){
            dispatch({type:'CHECK_VALIDATE_TABLE',payload:false})
            toast.error({title:'Vui lòng chọn ít nhất 1 sản phẩm'})
            return
        }
        const listProduct = selectedList?.map(item => {
            return {
                product_id: item?.data?.product_id,
                product_id_details: item?.data?.id,
                quantity:  item?.data?.warehouse_quantity,
                quantity_after_adjustment: item?.quantity || 0,
                reason: item?.reason || ''
            }
        })
        const submitProduct = {...submitQueries, product_item: listProduct}
        if (debounceSubmit) {
            setDebounceSubmit(false)
            setTimeout(() => setDebounceSubmit(true), 2000)
            if(inventoryId){
                const response = await sendRequestAuth(
                    'post',
                    `${config.API}/warehouse/inventory/update/${inventoryId}`,
                    JSON.stringify({...submitProduct}),
                )
                if (response?.data.success) {
                    if(opt.is_balance === 1 ) {
                        const res = await sendRequestAuth(
                            'post',
                            `${config.API}/warehouse/inventory/balance/${inventoryId}`,
                        )
                        if(res.data.success){
                            // toast.success({title: response?.data?.message})
                            navigate(`/warehouse/inventory-management`)
                        }
                    }
                    toast.success({title: response?.data?.message})
                    navigate(`/warehouse/inventory-management`)
                } else {
                    response.data?.errors?.details.map(item => checkError(item))
                }
            }else{
                const response = await sendRequestAuth(
                    'post',
                    `${config.API}/warehouse/inventory/create`,
                    JSON.stringify({...submitProduct}),
                )
                if (response?.data.success) {
                    if(opt.is_balance === 1 ) {
                        const res = await sendRequestAuth(
                            'post',
                            `${config.API}/warehouse/inventory/balance/${response?.data?.meta?.insert_id}`,
                        )
                        if(res.data.success){
                            // toast.success({title: response?.data?.message})
                            navigate(`/warehouse/inventory-management`)
                        }
                    }
                    toast.success({title: response?.data?.message})
                    navigate(`/warehouse/inventory-management`)
                } else {
                    response.data?.errors?.details.map(item => checkError(item))
                }
            }
        }
    }

    return {
        form: state.form,
        properties: {
            canSaveOrder,
        },
        methods: {
            onFetchOrigin: handleFetchOrigin,
            onSubmit: handleSubmit,
            onResetFormData: resetFormData,
            onResetCustomer: resetCustomer,
        },
        loading: state.loading,
        productInfo,
        validateTable,
    }
}

export default useOrderSingle
