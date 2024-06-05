import {getData, postData} from "api/api"
import {getListProductGroup, setActiveproductGroup} from "api/url"
import { useReducer, useState } from "react"
import { useContext } from "react"
import toast from "Component/Toast"
import { SCRIPT_NOTE_PRODUCT } from "../interface/script"
import { ProductGroup } from "../provider/_context"
import { useProductAction, useProductInitialState, useProductReducer } from "../provider/_reducer"
import { useEffect } from "react"
import {ActionType} from "../../DeliveryNote/store/action";

export const useProductCheckbox = () => {
    const { pageState, pageDispatch } = useContext(ProductGroup)
    const [isActive, setIsActive] = useState(pageState.is_active)
    const [disable, setDisabled] = useState(false)
    const list = pageState.listCategory
    const isCheck = pageState.is_check
    useEffect(() => {
        setIsActive({...isActive,...pageState.is_active})
    }, [pageState.is_active])
    const setActive = async data => {
        try {
            const res = await postData(setActiveproductGroup(), data)
            if (res.data.code === 1069) toast.success({ title: SCRIPT_NOTE_PRODUCT.SUCCESS_ACTIVE })
            else toast.success({ title: SCRIPT_NOTE_PRODUCT.SUCCESS_DEACTIVE })
            resetCategoryList()
        } catch (er) {
            console.log(er)
        }
    }
    const resetCategoryList = async () =>{
        try{
            const response = await getData(getListProductGroup())
            let arr = []
            if (response.data.success) {
                if(response.data.data){
                    response.data.data.map(item=>{
                        if(item.status == 1) arr.push({item:item.category_name,id:item.id})
                    })
                }
                pageDispatch({type:useProductAction.CATEGORY_LIST,payload:arr})
                pageDispatch({type:useProductAction.ARR_CATEGORY,payload:arr})

            }
        }catch (e) {
            console.log(e)
        }
    }
    const shouldActiveCheckbox = pageState.is_check?.length > 0

    const isActiveAll =
        list.length <= 0
            ? false
            : pageState.is_check?.length < list.length
            ? false
            : !!!list.find(
                item => !!!pageState.is_check?.find(find => find === item?.id),
            )
    const checkAll = () => {
        let newSelectedList = []
        if (isActiveAll)
            newSelectedList = pageState.is_check?.filter(
                item => !!!list.find(find =>{
                    if(find?.category_childs.length > 0){
                      return  find?.category_childs.filter(el => el?.id === item)
                    }
                    return   find?.id === item
                }),
            )
        else {
            let addingList = []
            list.forEach(item => {
                if(item?.category_childs.length > 0){
                    item?.category_childs.forEach(el=>{
                        if (!!!pageState.is_check?.find(find => find === el?.id))
                            addingList.push(el?.id)
                    })
                }
                if (!!!pageState.is_check?.find(find => find === item?.id)){
                    addingList.push(item?.id)
                }

            })
            newSelectedList = [...pageState.is_check, ...addingList]
        }
        pageDispatch({
            type: useProductAction.IS_CHECK,
            payload: newSelectedList ,
        })
    }
    const is_check = (id) => {
        let check = isCheck.find(item => item === id)
        if (check !== undefined) {
            pageDispatch({ type: useProductAction.IS_CHECK, payload: isCheck.filter(item => item !== id) })
            pageDispatch({ type: useProductAction.COUNT, payload: pageState.count - 1 })

        } else {
            pageDispatch({ type: useProductAction.COUNT, payload: pageState.count + 1 })
            pageDispatch({ type: useProductAction.CHECK_ALL, payload: true })
            pageDispatch({ type: useProductAction.IS_CHECK, payload: [...isCheck, id] })
        }

    }
    const handleStatus = (e) => {
        const { checked, id } = e.target
        setDisabled(true)
        if (!checked) {
            // setIsActive({ ...isActive, [id]: checked })
            setActive({ id: [id], status: -1 })
            pageDispatch({ type: useProductAction.IS_ACTIVE, payload: { ...pageState.is_active, [id]: -1 } })
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        }
        else {
            // setIsActive({ ...isActive, [id]: checked })
            pageDispatch({ type: useProductAction.IS_ACTIVE, payload: { ...pageState.is_active, [id]: 1 } })
            setActive({ id: [id], status: 1 })
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        }
    }
    const handleActive = async (data) => {
        let ArrTemp = []
       data?.id.map(item => {
           ArrTemp = { ...ArrTemp, [item]: data.status }
        })
        setActive(data)
        pageDispatch({ type: useProductAction.COUNT, payload: 0 })
        pageDispatch({ type: useProductAction.CHECK_ALL, payload: false })
        pageDispatch({ type: useProductAction.IS_CHECK, payload: [] })
        pageDispatch({ type: useProductAction.IS_ACTIVE, payload: ArrTemp})
    }
    return {
        checkAll,
        is_check,
        handleStatus,
        isActive,
        handleActive,
        disable,
        shouldActiveCheckbox,

    }
}