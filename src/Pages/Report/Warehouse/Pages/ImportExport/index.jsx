import {PageHeader} from 'layouts/pageHeader'
import { TableLayout } from 'layouts/tableLayout'
import {useContext, useEffect, useRef, useState} from 'react'
import {ImportFilterForm} from './components/importFilterForm'
import {ImportTBody} from './components/importTable/_importTBody'
import {ImportTHead} from './components/importTable/_importTHead'
import {
  ORDER_BREADCRUMB,
} from './interfaces/_constants'
import './components/importTable/index.scss'
import useImport from './hooks/useImport'
import useImportFilterForm from './hooks/useImportFilterForm'
import useAlert from 'hook/useAlert'
import { REPORT_WAREHOUSE_ICONS } from '../../interfaces/_icons'
import {ImportExportProvider} from "./provider/index"
import {ImportExportContext} from "./provider/_context";
import {ImportExportFooter} from "./components/importTable/_importExportFooter";
import './index.scss'
import { useTranslation } from 'react-i18next'
import { ModalExport } from '../../../Sales/Components/modalExport'
export const ImportExportWarehouse = () => {
  const {fetch, pagination, provider} = useImport()

  const {state, dispatch} = provider
  const {table} = state
  useEffect(() => {
    fetch.origin()
  }, [])
  return (
    <ImportExportProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <TableLayout
        style={{ padding: '16px'}}
        className={'warehouse-report-import-export'}
        header={
          <div style={{margin: '-16px'}}>
            <ImportFilterForm />
          </div>
        }
        table={{
          tHead: <ImportTHead />,
          tBody: <ImportTBody />,
          scrollable: table.display.list.length > 0,
          width: 1604
        }}
        footer={<ImportExportFooter/>}
        footerStyle={
          {
            height: 'auto'
          }
        }
      />
    </ImportExportProvider>
  )
}

const Header = () => {
  const {showAlert} = useAlert()
  const {t} = useTranslation()
  const {pageState} = useContext(ImportExportContext)

  const {queries, functions} = useImportFilterForm()

  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)

  const exportLink = useRef()

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
      },

    )
  }

  const handleLargeExport = (q, opt) =>{
    if (pageState?.table?.pagination?.totalItems <= 0) {
      showAlert({type: 'info', content: t('report__export_documents_notify')})
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: pageState?.table?.pagination?.totalItems,
      },
      onClose: () => setExportModalData(null),
    })
  }

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])
  const headerActions = [
    {
      id: 1,
      name: null,
      appearance: 'secondary',
      icon: REPORT_WAREHOUSE_ICONS.repeat,
      onClick: () => functions.refresh()
    },
    {
      id: 2,
      name: 'export_report',
      appearance: 'primary',
      icon: REPORT_WAREHOUSE_ICONS.download,
      onClick: () => handleExportClick()
    },
  ]

  return (
    <>

      <PageHeader
        actions={headerActions}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle={t('report_ex_im_transfer')}
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      {!!exportModalData &&
      <ModalExport data={exportModalData} title={t('row')} api={'/report/warehouses/inventory/export'}/>}
    </>
  )
}
