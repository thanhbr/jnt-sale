import {useContext} from "react";
import {SupplierManagement} from "../provider/_context";
import {useSupplierManagementAction} from "../provider/_reducer";
import {NOTE_SCRIPT} from "../interfaces/noteScript";
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";

export const useCreateSupplier = () => {
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const onChangeCodeSupplier = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_CODE, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_CODE, payload: value})

    }
    const onBlurCodeSupplier = (e) => {
        const {value} = e.target;
        const regex = REGEX_CUSTOMER_CODE
        if (value.length > 20) {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_CODE,
                payload: {status: true, message: NOTE_SCRIPT.MAX_CODE}
            })
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        }
        else if (!regex.test(value) && value !== '') {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_CODE,
                payload: {status: true, message: NOTE_SCRIPT.REGEX_CODE}
            })
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        }
        else {
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_CODE, payload: {status: false, message: ''}})
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_CODE, payload: value.trim()})
        }
    }
    const onChangeNameSupplier = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_NAME, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_NAME, payload: value})

    }
    const onBlurNameSupplier = (e) => {
        const {value} = e.target;
        if (value === '') {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_NAME,
                payload: {status: true, message: NOTE_SCRIPT.NAME_SUPPLIER.EMPTY}
            })
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        } else if (value.length > 80) {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_NAME,
                payload: {status: true, message: NOTE_SCRIPT.NAME_SUPPLIER.MAX_NAME}
            })
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        } else {
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_NAME, payload: {status: false, message: ''}})
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_NAME, payload: value.trim()})
        }
    }
    const onChangeAddressSupplier = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_ADDRESS, payload: value})

    }
    const onBlurAddressSupplier = (e) => {
        const {value} = e.target;
        if (value === '') {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS,
                payload: {status: true, message: NOTE_SCRIPT.ADDRESS.EMPTY}
            })
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        } else if (value.length > 255) {
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS,
                payload: {status: true, message: NOTE_SCRIPT.ADDRESS.MAX_ADDRESS}
            })
        } else {
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_CODE, payload: {status: false, message: ''}})
            pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_ADDRESS, payload: value.trim()})
        }
    }
    const onChangePhoneSupplier = (e) => {
        const {value} = e.target;
        const regex = /^[0-9\b]+$/
        if (value === '' || regex.test(value)) {
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_PHONE, payload: {status: false, message: ''}})
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_PHONE, payload: value.trim()})
        }


    }
    const onBlurPhoneSupplier = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        if (value === '') {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_PHONE,
                payload: {status: true, message: NOTE_SCRIPT.PHONE.EMPTY}
            })
        } else if (value.length > 11) {
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_PHONE,
                payload: {status: true, message: NOTE_SCRIPT.PHONE.MAX_PHONE}
            })
        } else if (value.length < 10) pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_PHONE,
            payload: {status: true, message: NOTE_SCRIPT.PHONE.MAX_PHONE}
        })
        else {
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_PHONE, payload: {status: false, message: ''}})
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_PHONE, payload: value.trim()})
        }
    }
    const onChangeNameAlias = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_SHORT_NAME, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_SHORT_NAME, payload: value})
    }
    const onBlurNameAlias = (e) => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        if (value.length > 30) pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_SHORT_NAME,
            payload: {status: true, message: NOTE_SCRIPT.SHORT_NAME}
        })
        else {
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_SHORT_NAME, payload: value.trim()})
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_SHORT_NAME,
                payload: {status: false, message: ''}
            })
        }
    }
    const onChangePeopleContact = (e) => {
        const {value} = e.target
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_CONTRACT, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_CONTRACT_NAME, payload: value})
    }
    const onBlurPeopleContact = e => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        if (value.length > 80) pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_CONTRACT,
            payload: {status: true, message: NOTE_SCRIPT.CONTRACT_NAME}
        })
        else {
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_CONTRACT_NAME, payload: value.trim()})
            pageDispatch({
                type: useSupplierManagementAction.CHECK_SUBMIT_CONTRACT,
                payload: {status: false, message: ''}
            })
        }
    }
    const onChangeEmail = e => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_EMAIL, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_EMAIL, payload: value})
    }
    const onBlurEmail = e => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        let regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regex.test(value) && value !== '') pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_EMAIL,
            payload: {status: true, message: NOTE_SCRIPT.EMAIL.REGEX}
        })
        else if (value.length > 80) pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_EMAIL,
            payload: {status: true, message: NOTE_SCRIPT.EMAIL.MAX_EMAIL}
        })
        else {
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_EMAIL, payload: value.trim()})
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_EMAIL, payload: {status: false, message: ''}})
        }
    }
    const onChangeNote = e => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_NOTE, payload: {status: false, message: ''}})
        pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_NOTE, payload: value})
    }
    const onBlurNote = e => {
        const {value} = e.target;
        pageDispatch({type: useSupplierManagementAction.CHANGE_MODAL_CONFIRM, payload: true})
        if (value.length > 255) pageDispatch({
            type: useSupplierManagementAction.CHECK_SUBMIT_NOTE,
            payload: {status: true, message: NOTE_SCRIPT.NOTE}
        })
        else {
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_NOTE, payload: value.trim()})
            pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_NOTE, payload: {status: false, message: ''}})
        }
    }
    const onChangeStatus = (e) => {
        const {checked} = e.target;
        if (checked) {
            pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_STATUS, payload: 1})
        } else pageDispatch({type: useSupplierManagementAction.CHANGE_SUPPLIER_STATUS, payload: -1})
    }
    return {
        function_create: {
            code_supplier: {
                onChangeCodeSupplier,
                onBlurCodeSupplier
            },
            name: {
                onChangeNameSupplier,
                onBlurNameSupplier
            },
            address: {
                onChangeAddressSupplier,
                onBlurAddressSupplier
            },
            phone: {
                onChangePhoneSupplier,
                onBlurPhoneSupplier
            },
            aliasName: {
                onChangeNameAlias,
                onBlurNameAlias
            },
            contact: {
                onChangePeopleContact,
                onBlurPeopleContact
            },
            email: {
                onChangeEmail,
                onBlurEmail
            },
            detail: {
                onChangeNote,
                onBlurNote
            },
            status: {
                onChangeStatus
            }

        }
    }
}