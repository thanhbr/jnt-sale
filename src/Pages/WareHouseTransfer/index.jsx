import { TableLayout } from 'layouts/tableLayout'
import { useContext, useEffect, useState } from 'react'
import useAlert from '../../hook/useAlert'
import { PageHeader } from './components/pageHeader/index'
import { WareHouseFilterForm } from './components/wareHouseTransferFilterForm'
import './components/wareHouseTransferTable/index.scss'
import { WareHouseTransferTBody } from './components/wareHouseTransferTable/_wareHouseTransferTBody'
import { WareHouseTransferTHead } from './components/wareHouseTransferTable/_wareHouseTransferTHead'
import useWareHouseTransfer from './hooks/useWareHouseTransfer'
import useWareHouseTransferFilterForm from './hooks/useWareHouseTransferFilterForm'
import {
  ORDER_BREADCRUMB,
  WAREHOUSE_TRANSFER_PAGE_HEADER_ACTIONS,
  WAREHOUSE_TS_BREADCRUMB
} from './interfaces/_constants'
import { WareHouseTransferProvider } from './provider'
import { WareHouseTransferContext } from './provider/_context'

export const WareHouseTransfer = () => {
  const {fetch, pagination, provider} = useWareHouseTransfer()
  const {state, dispatch} = provider
  const {table} = state
  const {loading} = table

  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <WareHouseTransferProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <TableLayout
        disabled={!loading}
        header={<WareHouseFilterForm />}
        table={{
          tHead: <WareHouseTransferTHead />,
          tBody: <WareHouseTransferTBody />,
        }}
        pagination={{
          ...table.pagination,
          loading: !loading,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </WareHouseTransferProvider>
  )
}

const Header = () => {
  const {showAlert} = useAlert()
  const {pageState} = useContext(WareHouseTransferContext)
  const {queries,functions} = useWareHouseTransferFilterForm ()
  const [exportModalData, setExportModalData] = useState(null)

  const handleExportClick = async () => {
    const selectedList = pageState.table.selected.list
    const totalItems = pageState.table.pagination.totalItems
    if (totalItems <= 0) return showAlert({content: 'Bạn cần có ít nhật 1 vận đơn để thực hiện xuất excel', type: 'info'}) 

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      keyword:
        selectedList.length > 0
          ? selectedList.map(item => item.id).join(',')
          : '',
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
      {total: selectedList.length > 0 ? selectedList.length : totalItems},
    )
  }
  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.orderTotal,
      },
      onClose: () => setExportModalData(null),
    })
  const actions = [functions.applyWareHouseTransferOtherFilter,null, handleExportClick, null, null]

  return (
    <>
      <PageHeader
        actions={WAREHOUSE_TRANSFER_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={WAREHOUSE_TS_BREADCRUMB}
        breadcrumbTitle="Quản lý chuyển kho"
      />
    </>
  )
}
