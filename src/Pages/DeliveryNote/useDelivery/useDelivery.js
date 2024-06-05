import {getData, postData} from 'api/api'
import {createNote, getDetailNote, getListDeliveryNote, update_note} from 'api/url'
import toast from 'Component/Toast'
import {useReducer} from 'react'
import {useContext, useEffect, useState} from 'react'
import {Delivery} from '..'
import {ALERT_NOTE, NOTE} from '../SCRIPT_NOTE'
import {ActionType} from '../store/action'
import {initialDelivery} from '../store/initial'
import reducerDelivery from '../store/reducer'
import {checkEmptyNote} from './useCheckTextNote'

export const useDelivery = () => {
    const {state, dispatch} = useContext(Delivery)
    const [state2, dispatch2] = useReducer(reducerDelivery, initialDelivery)
    const [page, setPage] = useState()
    const fetchList = async () => {
        try {
            const res = await getData(
                getListDeliveryNote(state.pagination.amount, state.pagination.active),
            )
            setPage(res.data.meta)
            dispatch({type: ActionType.META, payload: res.data.meta})
            dispatch({type: ActionType.LIST_NOTE, payload: res.data.data})
            dispatch({type: ActionType.IS_LOADING, payload: true})
            const perPage = res?.data?.meta?.per_page || 0
            const start = res?.data?.meta?.start || 0
            const total = res?.data?.meta?.total || 0
            dispatch({
                type: ActionType.GET_PAGINATION,
                payload: {
                    active: Math.floor(start / perPage),
                    amount: perPage,
                    total: Math.ceil(total / perPage),
                    totalItems: total,
                },
            })
        } catch (er) {
            console.log(er)
        }
    }
    const onChangePage = page => {
        const amount = state.meta.per_page
        dispatch({type: ActionType.META_START, payload: page * amount})
        dispatch({type: ActionType.IS_LOADING, payload: true})
    }
    const handleAmountChange = amount => {
        dispatch({type: ActionType.META_PER_PAGE, payload: amount})
        dispatch({type: ActionType.META_START, payload: 0})
        dispatch({type: ActionType.IS_LOADING, payload: true})

    }
    const getDetailDelivery = async id => {
        try {
            const res = await getData(getDetailNote(id))
            if (res.data.success) {
                dispatch({type: ActionType.INFO_NOTE, payload: res.data.data})
                dispatch({type: ActionType.CHECK_BEFORE_UPDATE, payload: res.data.data})
            }
        } catch (er) {
            console.log(er)
        }
    }

    const changeCheckboxnote = () => {
        let defaultStatus = state.is_default
        if (defaultStatus == 0) dispatch({type: ActionType.IS_DEFAULT, payload: 1})
        if (defaultStatus == 1) dispatch({type: ActionType.IS_DEFAULT, payload: 0})
    }
    const changeStatusNote = () => {
        let defaultStatus = state.is_switch_active
        if (defaultStatus) {
            dispatch({
                type: ActionType.IS_SWITCH_ACTIVE,
                payload: !state.is_switch_active,
            })
            dispatch({type: ActionType.STATUS, payload: -1})
        } else {
            dispatch({
                type: ActionType.IS_SWITCH_ACTIVE,
                payload: !state.is_switch_active,
            })
            dispatch({type: ActionType.STATUS, payload: 1})
        }
    }
    const createDeliveryNote = async data => {
        try {
            const res = await postData(createNote(), data)
            if (res.data.success) {
                toast.success({title: ALERT_NOTE.CREATE_NOTE})
                dispatch({type: ActionType.OPEN_MODAL, payload: !state.openModal})
                dispatch({type: ActionType.CHECK_EMPTY, payload: false})
                dispatch({type: ActionType.OPEN_CONFIRM, payload: false})
                fetchList()
            } else {
                dispatch({type: ActionType.ERROR_NOTE, payload: {valid: true, error: res.data.errors.message}})
            }
        } catch (er) {
            console.log(er)
        }
    }
    const handleCreate = () => {
        dispatch({type: ActionType.CHECK_EMPTY, payload: true})
        const info = {
            content: state.content == undefined ? '' : state.content.trim(),
            position: state.position == undefined ? 0 : state.position,
            is_default: state.is_default == undefined ? 0 : state.is_default,
            status: state.status == undefined ? 1 : state.status,
        }
        // createDeliveryNote(info)
        let check = checkEmptyNote(info.content)
        if (check == 0)
            dispatch({
                type: ActionType.ERROR_NOTE,
                payload: {valid: true, error: NOTE.VALID_NOTE},
            })
        else {
            dispatch({type: ActionType.CHECK_CONFIRM, payload: true})
            createDeliveryNote(info)
        }

    }
    const updataNote = async (id, data) => {
        try {
            const res = await postData(update_note(id), data)
            if (res.data.success) {
                toast.success({title: ALERT_NOTE.UPDATE_NOTE})
                dispatch({type: ActionType.OPEN_MODAL, payload: !state.openModal})
                dispatch({type: ActionType.DISABLE_SAVE, payload: !state.disable_save})
                dispatch({type: ActionType.INFO_NOTE, payload: ''})
                dispatch({type: ActionType.CHECK_EMPTY, payload: false})
                dispatch({type: ActionType.OPEN_CONFIRM, payload: false})
                dispatch({type:ActionType.CONTENT,payload:''})
                dispatch({type:ActionType.POSITION,payload:''})
                fetchList()
            } else {
                dispatch({type: ActionType.ERROR_NOTE, payload: {valid: true, error: res.data.errors.message}})
            }
        } catch (er) {
            console.log(er);
        }
    }
    const checkBeforeUpdate = (data) => {
        let data_check = state.check_before_update
        const checked = [
            data_check.content === data.content,
            data_check.position === data.position,
            data_check.is_default === data.is_default,
            data_check.status === data.status,
        ].includes(true)
        return checked
    }
    const handleUpdate = (id) => {
        dispatch({type: ActionType.CHECK_EMPTY, payload: true})
        const info = {
            content: state.content.trim(),
            position: state.position == undefined ? 0 : state.position,
            is_default: state.is_default,
            status: state.status,
        }
        let check = checkEmptyNote(info.content)
        if (check == 0)
            dispatch({
                type: ActionType.ERROR_NOTE,
                payload: {valid: true, error: NOTE.VALID_NOTE},
            })
        else {
            let check = state.change_modal
            if (check) {
                dispatch({type: ActionType.CHECK_CONFIRM, payload: true})
                dispatch({type: ActionType.CHANGE_MODAL, payload: false})
                updataNote(id, info)
            } else {
                dispatch({type: ActionType.OPEN_MODAL, payload: false})
            }
        }

    }
    return {
        fetchList,
        onChangePage,
        handleAmountChange,
        page,
        getDetailDelivery,
        createDeliveryNote,
        changeCheckboxnote,
        changeStatusNote,
        handleCreate,
        handleUpdate,
    }
}
