import {useContext, useEffect, useState} from "react";
import {SupplierManagement} from "../provider/_context";
import {sendRequestAuth} from "../../../api/api";
import toast from "../../../Component/Toast";
import config from "../../../config";
import {NOTIFICATION_SUPPLIER} from "../interfaces/noteScript";
import {useSupplierManagementAction} from "../provider/_reducer";

export const useCheckStatusSupplier = () => {
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const [isActive, setIsActive] = useState(pageState.is_active)
    const [disable, setDisabled] = useState(false)
    const list = pageState.list
    const isCheck = pageState.is_check
    useEffect(() => {
        setIsActive({...isActive, ...pageState.is_active})
    }, [pageState.is_active])
    const setActive = async data => {
        try {
            const res = await sendRequestAuth('post', `${config.API}/supplier/active`, data)
            if (res.data.message === 'Ngưng sử dụng nhà cung cấp thành công') toast.success({title: NOTIFICATION_SUPPLIER.TURN_OFF_STATUS_SUCCESS})
            else toast.success({title: NOTIFICATION_SUPPLIER.TURN_ON_STATUS_SUCCESS})
        } catch (er) {
            console.log(er)
        }
    }

    const shouldActiveCheckbox = pageState.is_check?.length > 0

    const isActiveAll =
        list.length <= 0
            ? false
            : pageState.is_check?.length < list.length
            ? false
            : !!!list.find(
                item => !!!pageState.is_check?.find(find => find === item?.supplier_id),
            )
    const checkAll = () => {
        let newSelectedList = []
        if (isActiveAll) {
            newSelectedList = pageState.is_check?.filter(
                item => !!!list.find(find => {
                    return find?.supplier_id === item
                }),
            )
        } else {
            let addingList = []
            list.forEach(item => {
                if (!!!pageState.is_check?.find(find => find === item?.supplier_id)) {
                    addingList.push(item?.supplier_id)
                }

            })
            newSelectedList = [...pageState.is_check, ...addingList]
        }
        pageDispatch({
            type: useSupplierManagementAction.SET_IS_CHECK_BOX,
            payload: newSelectedList,
        })
    }
    const is_check = (id) => {
        let check = isCheck.find(item => item === id)
        if (check !== undefined) {
            pageDispatch({
                type: useSupplierManagementAction.SET_IS_CHECK_BOX,
                payload: isCheck.filter(item => item !== id)
            })
            pageDispatch({type: useSupplierManagementAction.SET_COUNT, payload: pageState.count - 1})

        } else {
            pageDispatch({type: useSupplierManagementAction.SET_COUNT, payload: pageState.count + 1})
            pageDispatch({type: useSupplierManagementAction.SET_IS_CHECK_BOX, payload: [...isCheck, id]})
        }

    }
    const handleStatus = (e) => {
        const {checked, id} = e.target
        setDisabled(true)
        if (!checked) {
            pageDispatch({
                type: useSupplierManagementAction.OPEN_CONFIRM_CANCEL, payload: {
                    open: true,
                    array_id: [id],
                }
            })
            // setActive({ id: [id], status: 0 })
            // pageDispatch({ type: useSupplierManagementAction.SET_ACTIVE_CHECK_BOX, payload: { ...pageState.is_active, [id]: 0 } })
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        } else {
            // setIsActive({ ...isActive, [id]: checked })
            pageDispatch({
                type: useSupplierManagementAction.SET_ACTIVE_CHECK_BOX,
                payload: {...pageState.is_active, [id]: 1}
            })
            setActive({id: [id], status: 1})
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        }
    }
    const handleActive = async (data) => {
        let ArrTemp = []
        data?.id.map(item => {
            ArrTemp = {...ArrTemp, [item]: data.status}
        })
        if (data.status === 0) {
            pageDispatch({
                type: useSupplierManagementAction.OPEN_CONFIRM_CANCEL, payload: {
                    open: true,
                    array_id: pageState.is_check
                }
            })
        } else {
            setActive(data)
            pageDispatch({type: useSupplierManagementAction.SET_COUNT, payload: 0})
            pageDispatch({type: useSupplierManagementAction.SET_IS_CHECK_BOX, payload: []})
            pageDispatch({type: useSupplierManagementAction.SET_ACTIVE_CHECK_BOX, payload: ArrTemp})
        }

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