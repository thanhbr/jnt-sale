import React, {useRef, useState} from 'react';
import {PageHeader} from "../../../../../../../layouts/pageHeader";
import {
  REPORT_INVENTORY_BREADCRUMB,
  REPORT_INVENTORY_BREADCRUMB_TITLE,
  REPORT_INVENTORY_PAGE_HEADER_ACTIONS
} from "../../interfaces/_contant";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import Template from "../../interfaces/template";
import {ModalExport} from "../../../../../Sales/Components/modalExport";
import useAlert from "../../../../../../../hook/useAlert";
import { useTranslation } from 'react-i18next'

const Header = () => {
  const {t} = useTranslation()
  const {methods, pagination, queries} = useFilterReportInventory()
  const {showAlert} = useAlert()

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
    () => methods.onPrint(),
    handleExportClick
  ]
  return (
    <>
      <PageHeader
        actions={REPORT_INVENTORY_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={REPORT_INVENTORY_BREADCRUMB}
        breadcrumbTitle={t(REPORT_INVENTORY_BREADCRUMB_TITLE)}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>
      {!!exportModalData && <ModalExport data={exportModalData} title={t('product')} api={'/report/warehouses/stock/export'}/>}

      <Template />
    </>
  )
}

export default Header