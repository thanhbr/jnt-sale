import {useEffect, useState} from "react"
import {useContext} from "react"
import {ProductGroup} from "../provider/_context"
import {useProductAction} from "../provider/_reducer"
import {SCRIPT_NOTE_PRODUCT} from "../interface/script";
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";
import {getData, postData} from "../../../api/api";
import {createProductGroup, detailProductGroup, getListProductGroup, updateProductGroup} from "../../../api/url";
import toast from "../../../Component/Toast";
import useProductGroup from "./useProductGroup";
import StringUtils from "../util/string";

export const useModal = () => {
    const {pageState, pageDispatch} = useContext(ProductGroup)
    const [animate, setAnimate] = useState(false)
    const [status, setStatus] = useState(pageState.status_product)
    const handleClose = () => {
        if (!pageState.change_modal) {
            setAnimate(true)
            setTimeout(() => {
                pageDispatch({type: useProductAction.OPEN_MODAL, payload: false})
                setAnimate(false)
            }, 300)
            pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: ''})
            pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: ''})
            pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: 1})
            pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: ''})
            pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: '', id: ''}})
            pageDispatch({
                type: useProductAction.VALID_CODE_PRODUCT,
                payload: {status: false, message: ''}
            })
            pageDispatch({
                type: useProductAction.VALID_NAME_PRODUCT,
                payload: {status: false, message: ''}
            })
            pageDispatch({
                type: useProductAction.VALID_NOTE,
                payload: {status: false, message: ''}
            })
            pageDispatch({type: useProductAction.GET_ID, payload: ''})
            pageDispatch({type: useProductAction.DISABLE_SELECT, payload: false})
        } else {

            pageDispatch({type: useProductAction.MODAL_CONFIRM, payload: true})
        }
    }
    const checkBeforeSubmit = [
        pageState.valid?.filde_code?.status,
        pageState.valid?.filde_name?.status,
        pageState.valid?.filde_note?.status,
    ].includes(true)
    const handleAccept = async () => {
        if (!checkBeforeSubmit) {
            const new_product = {
                category_code: pageState.code_product,
                category_name: pageState.name_product,
                parent_id: pageState.item_category?.id,
                note: pageState.note_product,
                status: pageState.status_product
            }
            if (new_product.category_code === '' || new_product.category_name === '') {
                pageDispatch({
                    type: useProductAction.VALID_CODE_PRODUCT,
                    payload: {
                        status: new_product.category_code === '' ? true : false,
                        message: SCRIPT_NOTE_PRODUCT.VALID_CODE.EMPTY_CODE
                    }
                })
                pageDispatch({
                    type: useProductAction.VALID_NAME_PRODUCT,
                    payload: {
                        status: new_product.category_name === '' ? true : false,
                        message: SCRIPT_NOTE_PRODUCT.VALID_NAME.EMPTY_NAME
                    }
                })

            } else {
                try {
                    if (pageState.id_product) {
                        const res = await postData(updateProductGroup(pageState.id_product), new_product)
                        if (res.data.success) {
                            setAnimate(true)
                            setTimeout(() => {
                                pageDispatch({type: useProductAction.OPEN_MODAL, payload: false})
                                setAnimate(false)
                            }, 300)
                            pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: 1})
                            pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: '', id: ''}})
                            toast.success({title: SCRIPT_NOTE_PRODUCT.UPDATE_SUCCESS})
                            pageDispatch({type: useProductAction.IS_LOADING, payload: false})
                            pageDispatch({type: useProductAction.GET_ID, payload: ''})
                            pageDispatch({type: useProductAction.DISABLE_SELECT, payload: false})
                        } else {
                            pageDispatch({
                                type: useProductAction.VALID_CODE_PRODUCT,
                                payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_CODE.HAVE_CODE}
                            })
                        }
                    } else {
                        const res = await postData(createProductGroup(), new_product)
                        if (res.data.success) {
                            setAnimate(true)
                            setTimeout(() => {
                                pageDispatch({type: useProductAction.OPEN_MODAL, payload: false})
                                setAnimate(false)
                            }, 300)
                            pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: 1})
                            pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: ''})
                            pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: '', id: ''}})
                            toast.success({title: SCRIPT_NOTE_PRODUCT.CREATE_SUCEESS})
                            pageDispatch({type: useProductAction.IS_LOADING, payload: false})
                            pageDispatch({type: useProductAction.DISABLE_SELECT, payload: false})
                            pageDispatch({type:useProductAction.SET_SEARCH,payload:''})
                        } else {
                            pageDispatch({
                                type: useProductAction.VALID_CODE_PRODUCT,
                                payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_CODE.HAVE_CODE}
                            })
                        }
                    }

                } catch (e) {
                    console.log(e)
                }
            }


        }
    }
    const getDetailProduct = async () => {
        try {
            const res = await getData(detailProductGroup(pageState.id_product))
            if (res.data.success) {
                let detail = res.data.data
                const item = pageState.category_list.find(find => find.id == detail[0].parent_id)
                const list = pageState.listCategory
                const findParent = list.find(item=>{
                     if(item.category_name === detail[0].category_name) return item
                })

                if(findParent?.category_childs.length > 0) pageDispatch({type:useProductAction.DISABLE_SELECT,payload:true})
                else pageDispatch({type:useProductAction.CHECK_PARENT,payload:detail[0].category_name})
                if (item !== undefined) pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: item.item, id: item.id}})
                pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: detail[0].category_code})
                pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: detail[0].category_name})
                pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: detail[0].status})
                pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: detail[0].category_note})
                // pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: detail[0].category_name, id: detail[0].id}})
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleCancelConfirm = () => {
        pageDispatch({type: useProductAction.MODAL_CONFIRM, payload: false})
    }
    const handleAcceptConfirm = () => {
        pageDispatch({type: useProductAction.MODAL_CONFIRM, payload: false})
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: false})
        setAnimate(true)
        setTimeout(() => {
            pageDispatch({type: useProductAction.OPEN_MODAL, payload: false})
            setAnimate(false)
        }, 300)
        pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: ''})
        pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: ''})
        pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: 1})
        pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: ''})
        pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: '', id: ''}})
        pageDispatch({
            type: useProductAction.VALID_CODE_PRODUCT,
            payload: {status: false, message: ''}
        })
        pageDispatch({
            type: useProductAction.VALID_NAME_PRODUCT,
            payload: {status: false, message: ''}
        })
        pageDispatch({
            type: useProductAction.VALID_NOTE,
            payload: {status: false, message: ''}
        })
        pageDispatch({type: useProductAction.GET_ID, payload: ''})
        pageDispatch({type: useProductAction.DISABLE_SELECT, payload: false})
    }
    const onPickup = (item, id) => {
        pageDispatch({type: useProductAction.PICK_ITEM_CATEGORY, payload: {item: item, id: id}})
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: true})
    }
    const onChangeCodeProduct = (e) => {
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: true})
        pageDispatch({
            type: useProductAction.VALID_CODE_PRODUCT,
            payload: {status: false, message: ''}
        })
        pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: e.target.value})

    }
    const onBlurCodePrduct = e => {
        const {value} = e.target;
        // const regex = REGEX_CUSTOMER_CODE

        const regex = /^[a-zA-Z0-9_.-]*$/
        if (value == '') {
            pageDispatch({
                type: useProductAction.VALID_CODE_PRODUCT,
                payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_CODE.EMPTY_CODE}
            })
        } else if (regex.test(value) ){
            pageDispatch({
                type: useProductAction.VALID_CODE_PRODUCT,
                payload: {status: false, message: ''}
            })
            pageDispatch({type: useProductAction.GET_CODE_PRODUCT, payload: value})
        }
        else if (value.length > 80) pageDispatch({
            type: useProductAction.VALID_CODE_PRODUCT,
            payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_CODE.MAX_CODE}
        })
        else pageDispatch({
                type: useProductAction.VALID_CODE_PRODUCT,
                payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_CODE.SPECIAL_CODE}
            })
    }


    const onChangeNameProduct = (e) => {
        let {value} = e.target;
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: true})
        pageDispatch({
            type: useProductAction.VALID_NAME_PRODUCT,
            payload: {status: false, message: ''}
        })
        pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: value})
    }
    const onBlurNameProduct = (e) => {
        const {value} = e.target;
        if (value == '') pageDispatch({
            type: useProductAction.VALID_NAME_PRODUCT,
            payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_NAME.EMPTY_NAME}
        })
        else pageDispatch({type: useProductAction.GET_NAME_PRODUCT, payload: value.trim()})
    }

    const onChangeNote = value => {
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: true})
        if(value.length > 255){
            pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: value})
            pageDispatch({
                type: useProductAction.VALID_NOTE,
                payload: {status: true, message: SCRIPT_NOTE_PRODUCT.VALID_NOTE.MAX_NOTE}})
        }
        else{
            pageDispatch({type: useProductAction.GET_NOTE_PRODUCT, payload: value})
            pageDispatch({
                type: useProductAction.VALID_NOTE,
                payload: {status: false, message: ''}})
        }
    }
    const onBlurNoteProduct =(value)=>{

    }
    const onChangeStatus = () => {
        pageDispatch({type: useProductAction.CHANGE_MODAL, payload: true})
        if (status) {
            setStatus(!status)
            pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: -1})
        } else {
            setStatus(!status)
            pageDispatch({type: useProductAction.GET_STATUS_PRODUCT, payload: 1})
        }
    }


    const searchkeyWord = (data) => {
        const formatDataValue = data?.value
            ? StringUtils.removeAcent(data?.value?.toLowerCase())
            : ''
        const listData = pageState.arr_category?.filter(item => {
            const formatNameItem = item?.item
                ? StringUtils.removeAcent(item?.item.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue.trim())) return true
            return false
        })
        pageDispatch({type: useProductAction.CATEGORY_LIST, payload: listData})
        pageDispatch({type: useProductAction.KEY_WORD, payload: formatDataValue})
    }
    return {
        modal: {
            handleAccept,
            handleClose,
            checkBeforeSubmit,
        },
        confirm: {
            handleCancelConfirm,
            handleAcceptConfirm,
        },
        animate,
        onPickup,
        field_name: {
            onChangeNameProduct,
            onBlurNameProduct,
        },
        field_code: {
            onChangeCodeProduct,
            onBlurCodePrduct
        },
        onChangeNote,
        onBlurNoteProduct,
        status_product: {
            status,
            onChangeStatus,
        },
        getDetailProduct,
        search: {
            searchkeyWord,
        }

    }
}