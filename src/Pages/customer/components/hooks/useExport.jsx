import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {CustomerContext} from 'Pages/customer'
import {CUSTOMER_LIMIT_EXPORT} from 'Pages/customer/_constants'
import React, {useContext, useEffect, useRef, useState} from 'react'
import UseCustomerFilterForm from './useCustomerFilterForm'

const useExport = () => {
  const {state, dispatch} = useContext(CustomerContext)
  const {search, groupCustomer, groupCity, groupWard, groupDistrict} =
    UseCustomerFilterForm({state, dispatch})
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const {showAlert} = useAlert()

  const exportLink = useRef()

  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || state.filter.total,
        autoDownload: opt?.autoDownload,
      },
      onClose: () => setExportModalData(null),
      setExportModalData,
    })

  const handleExportClick = async () => {
    const selectedList = state.selectedList

    const queries = {
      group: groupCustomer.value,
      city_id: groupCity.value,
      district_id: groupDistrict.value,
      ward_id: groupWard.value,
      keyword:
        selectedList.length > 0
          ? selectedList.map(item => item.id).join(',')
          : '',
      per_page: '',
      start: '',
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
        total: selectedList.length > 0 ? selectedList.length : undefined,
        autoDownload: state.filter.total <= CUSTOMER_LIMIT_EXPORT
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
