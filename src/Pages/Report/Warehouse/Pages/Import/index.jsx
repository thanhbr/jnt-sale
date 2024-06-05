import { PageHeader } from 'layouts/pageHeader'
import { TableLayout } from 'layouts/tableLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import { ImportFilterForm } from './components/importFilterForm'
import { ImportPanels } from './components/importPanels'
import { ImportTBody } from './components/importTable/_importTBody'
import { ImportTHead } from './components/importTable/_importTHead'
import {
  ORDER_BREADCRUMB,
} from './interfaces/_constants'
import { ImportProvider } from './provider'
import './components/importTable/index.scss'
import useImport from './hooks/useImport'
import useImportFilterForm from './hooks/useImportFilterForm'
import useAlert from 'hook/useAlert'
import { ImportContext } from './provider/_context'
import { REPORT_WAREHOUSE_ICONS } from '../../interfaces/_icons'
import { ModalExport } from '../../../Sales/Components/modalExport'
import { Loading } from '../../../../../common/loading'
import { ImportPrint } from './components/importPrint'
import { useTranslation } from 'react-i18next'

export const ImportWarehouse = () => {
  const { fetch, pagination, provider } = useImport()

  const { state, dispatch } = provider
  const { table } = state

  useEffect(() => {
    fetch.origin()
  }, [])

  const printRef = useRef()
  return (
    <ImportProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header printRef={printRef}/>
      <TableLayout
        style={{ padding: '16px' }}
        className={'warehouse-report'}
        ref={printRef}
        header={
          <div style={{margin: '-16px -16px 0 -16px'}}>
            <ImportFilterForm/>
            <ImportPanels/>
          </div>
        }
        table={{
          tHead: <ImportTHead/>,
          tBody: <ImportTBody/>,
          scrollable: true,
          width: 1800
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </ImportProvider>
  )
}

const Header = () => {
  const { showAlert } = useAlert()
  const {t} = useTranslation()
  const { pageState } = useContext(ImportContext)
  const { loading } = pageState

  const { queries, functions } = useImportFilterForm()

  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)

  const exportLink = useRef()

  const handleExportClick = () => {
    const selectedList = pageState.panels.totals
    handleLargeExport(
      {
        ...queries,
        per_page: '',
        start: '',
      },
      { total: +selectedList > 0 ? +selectedList : undefined },
    )
  }

  const handleLargeExport = (q, opt) => {
    if (pageState.panels.totals < 1) {
      showAlert({ type: 'info', content: t('report__export_product_notify') })
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.totals,
      },
      onClose: () => setExportModalData(null),
    })
  }

  const handleReportPrint = _ => {
    if (+pageState.panels.totals < 1) {
      showAlert({ type: 'info', content: t('report__print_notify') })
      return false
    }
    functions.print()
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
      onClick: functions.applyImportOtherFilter
    },
    {
      id: 2,
      name: 'report_print',
      appearance: 'secondary',
      icon: REPORT_WAREHOUSE_ICONS.printer,
      onClick: handleReportPrint
    },
    {
      id: 3,
      name: 'export_report',
      appearance: 'primary',
      icon: REPORT_WAREHOUSE_ICONS.download,
      onClick: handleExportClick
    },
  ]
  return (
    <>

      <PageHeader
        actions={headerActions}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle={t('report_import_goods')}
      />
      <ImportPrint/>
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData &&
      <ModalExport data={exportModalData} title={t('product')} api={'/report/warehouses/purchase/export'}/>}
      {loading && <Loading/>}
    </>
  )
}
