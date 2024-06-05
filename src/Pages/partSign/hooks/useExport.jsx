import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {CUSTOMER_LIMIT_EXPORT} from 'Pages/customer/_constants'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {DeliveryContext} from '../provider/_context'
import usePartSignFilterForm from './usePartSignFilterForm'
import {useTranslation} from "react-i18next";

const useExport = () => {
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {queries} = usePartSignFilterForm()
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const {showAlert} = useAlert()
  const { t } = useTranslation()

  const exportLink = useRef()

  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.table.pagination.totalItems,
        autoDownload: opt?.autoDownload,
      },
      onClose: () => setExportModalData(null),
      setExportModalData,
    })

  const handleExportClick = async () => {
    const listData = pageState.table.display.list
    if (pageState.table.pagination.totalItems === 0) return showAlert({content: t("general_excel_least_1_billcode_export"), type: 'info'})

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
        total: pageState.table.pagination.totalItems,
        autoDownload: pageState.table.pagination.totalItems <= CUSTOMER_LIMIT_EXPORT
      },
    )
  }

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return {
    exportUrl,
    exportLink,
    exportModalData,
    handleExportClick,
  }
}

export default useExport
