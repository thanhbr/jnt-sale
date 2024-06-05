import {PageHeader} from 'layouts/pageHeader'
import {TableLayout} from 'layouts/tableLayout'
import {useContext, useEffect, useRef, useState} from 'react'
import {OrderFilterForm} from './components/orderFilterForm'
import {OrderPanels} from './components/orderPanels'
import {OrderTBody} from './components/orderTable/_orderTBody'
import {OrderTHead} from './components/orderTable/_orderTHead'
import {
  ORDER_BREADCRUMB,
  ORDER_LIMIT_EXPORT,
  ORDER_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {OrderProvider} from './provider'
import './components/orderTable/index.scss'
import useOrder from './hooks/useOrder'
import {OrderNotifications} from './components/orderNotifications'
import useOrderFilterForm from './hooks/useOrderFilterForm'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {OrderExport} from './components/orderExport'
import {OrderContext} from './provider/_context'

export const RefactorOrder = () => {
  const {fetch, pagination, provider} = useOrder()

  const {state, dispatch} = provider
  const {table} = state

  useEffect(() => {
    fetch.origin()
  }, [])
  return (
    <OrderProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <OrderNotifications />
      <TableLayout
        header={
          <>
            <OrderFilterForm />
            <OrderPanels />
          </>
        }
        table={{
          tHead: <OrderTHead />,
          tBody: <OrderTBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </OrderProvider>
  )
}

const Header = () => {
  const {showAlert} = useAlert()

  const {pageState} = useContext(OrderContext)

  const {queries, functions} = useOrderFilterForm()

  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const [canExport, setCanExport] = useState(true)

  const exportLink = useRef()

  const handleExportClick = () => {
    const selectedList = pageState.table.selected.list

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
      {total: selectedList.length > 0 ? selectedList.length : undefined},
    )

    // if (
    //   selectedList.length > ORDER_LIMIT_EXPORT ||
    //   (selectedList.length <= 0 &&
    //     pageState.panels.orderTotal > ORDER_LIMIT_EXPORT)
    // ) {
    //   handleLargeExport(
    //     {
    //       ...queries,
    //       per_page: '',
    //       start: '',
    //     },
    //     {total: selectedList.length > 0 ? selectedList.length : undefined},
    //   )
    //   return
    // }

    // if (!canExport) return
    // setCanExport(false)

    // handleExportSingle(queryString)
  }

  const handleExportSingle = async q => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/export-orders-xlsx${q}`,
    )
    if (response?.data?.success && response?.data?.data?.url) {
      showAlert({content: 'Xuất excel thành công', type: 'success'})
      if (response.data.data.url && response.data.data.url !== '#')
        setExportUrl(response.data.data.url)
      setCanExport(true)
    } else {
      showAlert({content: 'Xuất excel thất bại', type: 'danger'})
      setCanExport(true)
    }
  }

  const handleLargeExport = (q, opt) =>{
    if (pageState.panels.orderTotal <= 0) {
      showAlert({type: 'info', content: 'Bạn cần có ít nhất 1 đơn hàng để thực hiện xuất excel'})
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.orderTotal,
      },
      onClose: () => setExportModalData(null),
    })
  }

  const actions = [functions.refresh, handleExportClick, null, null]

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return (
    <>
      <PageHeader
        actions={ORDER_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          props: {
            disabled: i === 1 && !canExport,
          },
        }))}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle="Quản lý đơn hàng"
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>

      {!!exportModalData && <OrderExport data={exportModalData} />}
    </>
  )
}
