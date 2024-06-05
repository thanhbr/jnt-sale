
import React, {useRef, useState} from "react";
import {PageHeader} from "../../../../../../../layouts/pageHeader";
import {ModalExport} from "../../../../../Sales/Components/modalExport";
import useAlert from "../../../../../../../hook/useAlert";
import {
  REPORT_QUOTA_BREADCRUMB,
  REPORT_QUOTA_BREADCRUMB_TITLE,
  REPORT_QUOTA_PAGE_HEADER_ACTIONS
} from "../../interfaces/_contant";
import useFilter from "../../hooks/useFilter";
import { useTranslation } from 'react-i18next'

const Header = () => {
  const {methods, pagination, queries} = useFilter()
  const {showAlert} = useAlert()
  const {t} = useTranslation()
  const exportLink = useRef()

  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)

  const handleExportClick = () => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      per_page: '',
      start: '',
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    handleLargeExport(
      {
        ...queries,
        per_page: '',
        start: '',
      }
    )
  }

  const handleLargeExport = (q) =>{
    if (pagination?.totalItems <= 0) {
      showAlert({type: 'info', content: t('report__export_product_notify')})
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: pagination?.totalItems,
      },
      onClose: () => setExportModalData(null),
    })
  }
  const actions = [
    () => methods.onRefresh(),
    handleExportClick
  ]
  return (
    <>
      <PageHeader
        actions={REPORT_QUOTA_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={REPORT_QUOTA_BREADCRUMB}
        breadcrumbTitle={t(REPORT_QUOTA_BREADCRUMB_TITLE)}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>
      {!!exportModalData && <ModalExport data={exportModalData} title={'product'} api={'/report/warehouses/quantity-low/export'}/>}
    </>
  )
}

export default Header