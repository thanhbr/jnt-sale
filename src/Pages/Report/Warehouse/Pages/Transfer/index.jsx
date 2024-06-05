import { PageHeader } from 'layouts/pageHeader'
import { TableLayout } from 'layouts/tableLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import { TransferFilterForm } from './components/transferFilterForm'
import { TransferPanels } from './components/transferPanels'
import { TransferTBody } from './components/transferTable/_transferTBody'
import { TransferTHead } from './components/transferTable/_transferTHead'
import {
  ORDER_BREADCRUMB,
} from './interfaces/_constants'
import { TransferProvider } from './provider'
import './components/transferTable/index.scss'
import useTransfer from './hooks/useTransfer'
import useTransferFilterForm from './hooks/useTransferFilterForm'
import useAlert from 'hook/useAlert'
import { TransferContext } from './provider/_context'
import { REPORT_WAREHOUSE_ICONS } from '../../interfaces/_icons'
import { ModalExport } from '../../../Sales/Components/modalExport'
import { Loading } from '../../../../../common/loading'
import { TransferPrint } from './components/transferPrint'
import { useTranslation } from 'react-i18next'

export const TransferWarehouse = () => {
  const { fetch, pagination, provider } = useTransfer()

  const { state, dispatch } = provider
  const { table } = state

  useEffect(() => {
    fetch.origin()
  }, [])

  const printRef = useRef()
  return (
    <TransferProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header printRef={printRef}/>
      <TableLayout
        style={{ padding: '16px' }}
        className={'warehouse-report'}
        ref={printRef}
        header={
          <div style={{margin: '-16px -16px 0 -16px'}}>
            <TransferFilterForm/>
            <TransferPanels/>
          </div>
        }
        table={{
          tHead: <TransferTHead/>,
          tBody: <TransferTBody/>,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </TransferProvider>
  )
}

const Header = () => {
  const { showAlert } = useAlert()
  const {t} = useTranslation()
  const { pageState } = useContext(TransferContext)
  const { loading } = pageState

  const { queries, functions } = useTransferFilterForm()

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
    if (+pageState.panels.totals < 1) {
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
      onClick: functions.applyTransferOtherFilter
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
        breadcrumbTitle={t('report_transfer')}
      />
      <TransferPrint/>
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData &&
      <ModalExport data={exportModalData} title={t('product')} api={'/report/warehouses/transfer/export'}/>}
      {loading && <Loading/>}
    </>
  )
}
