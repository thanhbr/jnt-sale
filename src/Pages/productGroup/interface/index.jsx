import {PATH} from "const/path";
import {ORDER_ICONS} from "Pages/refactorOrder/interfaces/_icons";
import {USER_ICON} from "Pages/userManagement/icon/icon";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {useProductAction} from "../provider/_reducer";
import {PRODUCT_GROUP_ICON} from "./icon"
import useAlert from "../../../hook/useAlert";
export const PRODUCT_BREADCUM = [
    {id: 1, name: 'Cấu hình & cài đặt', url: PATH.SETTING},
    {id: 2, name: 'Nhóm sản phẩm', url: '#'}
]
export const PRODUCT_BUTTON_ACTION = (pageState, pageDispatch) => {
    //   const {state,dispatch}=useContext(Delivery)
    const { showAlert } = useAlert()
    const [exportUrl, setExportUrl] = useState('#')
    const [exportModalData, setExportModalData] = useState(null)
    const selectedList = pageState.listCategory
    const arrId = selectedList.map(item => item.id)
    const filter = selectedList.filter(item => item.category_childs?.length > 0)
    let selectId = []
    filter?.map(item => item.category_childs?.map(i=>selectId.push(i.id)))
    let newArrId = [...selectId,... arrId]
    const queries = {
        keyword: pageState.search ? pageState.search : '',
        arr_id: pageState.is_check.length > 0
            ? pageState.is_check.map(item => item).join(',')
            : newArrId,
        per_page: '',
        start: '',
    }
    const exportLink = useRef()
    const handleExportClick = () => {
        const selectedList = pageState.listCategory
        const arrId = selectedList.map(item => item.id)
        const filter = selectedList.filter(item => item.category_childs?.length > 0)
        let selectId = []
        filter?.map(item => item.category_childs?.map(i=>selectId.push(i.id)))
        let newArrId = [...selectId,... arrId]
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...queries,
            per_page: '',
            arr_id: pageState.is_check.length > 0
                ? pageState.is_check.map(item => item).join(',')
                : newArrId.join(','),
            start: '',
        })) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        setExportModalData({
            data: {
                query: queryString,
                total: pageState.is_check.length > 0 ? pageState.is_check.length : newArrId.length,
            },
            onClose: () => setExportModalData(null),
        })
        handleLargeExport(
            {
                ...queries,
                per_page: '',
                start: '',
            },newArrId.length
        )

    }
    const handleLargeExport = (q,total) => {
        const selectedList = pageState.listCategory
        if (selectedList.length <= 0) {
            showAlert({ type: 'info', content: 'Bạn cần có ít nhất 1 nhóm sản phẩm để thực hiện xuất excel' })
            return
        }

        setExportModalData({
            data: {
                query: q,
                total: pageState.is_check.length > 0 ? pageState.is_check.length : total,
            },
            onClose: () => setExportModalData(null),
        })
    }
    useEffect(() => {
        if (exportUrl && exportUrl !== '#') {
            if (exportLink?.current) exportLink.current.click()
        }
    }, [exportUrl])
    const PRODUCT_ACTION_BUTTON = [
        {
            id: 1,
            name: null,
            appearance: 'secondary',
            icon: ORDER_ICONS.repeat,
            onClick: () => pageDispatch({type: useProductAction.IS_LOADING, payload: false}),
            tooltip: 'Làm mới dữ liệu',
        },
        {
            id: 2,
            name: 'Xuất Excel',
            appearance: 'secondary',
            icon: ORDER_ICONS.download,
            onClick: () => handleExportClick(),
        },
        {
            id: 3,
            name: 'Thêm mới',
            appearance: 'primary',
            icon: ORDER_ICONS.plus,
            onClick: () => pageDispatch({type: useProductAction.OPEN_MODAL, payload: true}),
        },
    ]
    return {
        PRODUCT_ACTION_BUTTON,
        exportModalData,
        exportLink,
        exportUrl
    }
}
export const PRODUCT_HEADER_TITLE = [
    {id: 1, name: 'Mã nhóm sản phẩm', class: 'code'},
    {id: 2, name: 'Tên nhóm sản phẩm', class: 'name'},
    {id: 3, name: 'Ghi chú', class: 'note'},
    {id: 4, name: 'Trạng thái', class: 'status'},
    {id: 5, name: '', class: 'setting'},
]
export const PRODUCT_GROUP_EMPTY = {
    EMPTY_PRODUCT: 'Bạn chưa có nhóm sản phẩm nào.',
    NONE_PRODUCT: 'Không tìm thấy dữ liệu phù hợp.'
}
export const PRODUCT_MENU_ACTION = [
    {id: '1', name: 'Chỉnh sửa', icon: USER_ICON.edit, action: 1},
    {id: '2', name: 'Xóa', icon: PRODUCT_GROUP_ICON.delete, action: 2,isDanger: true},
]
export const PRODUCT_MODAL_HEADER_TITLE = {
    title: 'Thông tin nhóm sản phẩm',
    subTitle: '“Phân loại sản phẩm theo nhóm để tối ưu hóa việc quản lý”',
}

