import {useContext, useState} from "react";
import {ProductContext} from "../provider/~context";
import useProductFilterForm from "./useProductFilterForm";
import {PRODUCT_LIMIT_EXPORT} from "../interfaces/~constants";
import {productActions} from "../provider/~action";

export const useImportExpport = ()=>{
    const {pageState,pageDispatch}=useContext(ProductContext)
    const {filter} = pageState
    const {functions} = useProductFilterForm()
    const [exportModalData, setExportModalData] = useState(null)
    const fetchData = () => {
        let filter = pageState.filter
        functions.doFilter(filter, false)
    }
    const handleLargeExport = (q, opt) =>
        setExportModalData({
            data: {
                query: q,
                total: opt?.total || pageState.table?.pagination?.totalItems,
                // autoDownload: opt?.autoDownload,
            },
            onClose: () => {
                pageDispatch({type:productActions.EXPORT_FILE,payload:{id:''}})
                setExportModalData(null)
            },
            setExportModalData,
        })
    const handleExportClick = async () => {
        const selectedList = pageState.table?.selected?.list
        const total = pageState.table?.pagination?.totalItems
        const queries = {
            keyword:pageState.filter?.keyword|| '',
            category_id: filter?.category_id?.id || '',
            status: filter?.status?.id || '',
            id:  selectedList.length > 0
                ? selectedList.map(item => item.id).join(',')
                :'',
            per_page: 5000,
            start: 0,
        }


        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(queries)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        handleLargeExport(
            {
                ...queries,
                per_page: '',
                start: '',
            },
            {
                total: selectedList.length > 0 ? selectedList.length : total,
                // autoDownload: pageState.filter.total <= PRODUCT_LIMIT_EXPORT
            },
        )
    }
    return{
        fetchData,
        export_data:{
            // exportUrl,
            // exportLink,
            exportModalData,
            handleExportClick,
        },
        filter,
    }
}