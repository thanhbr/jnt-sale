import {PageHeader} from 'layouts/pageHeader'
import {TableLayout} from 'layouts/tableLayout'
import {useContext, useEffect, useRef, useState} from 'react'
import {OrderFilterForm} from './components/orderFilterForm'
import {OrderPanels} from './components/orderPanels'
import {OrderTBody} from './components/orderTable/_orderTBody'
import {OrderTHead} from './components/orderTable/_orderTHead'
import {
  ORDER_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {OrderProvider} from './provider'
import './components/orderTable/index.scss'
import useOrder from './hooks/useOrder'
import useOrderFilterForm from './hooks/useOrderFilterForm'
import useAlert from 'hook/useAlert'
import {OrderContext} from './provider/_context'
import { ModalExport } from '../../Components/modalExport'
import { useTranslation } from 'react-i18next'

export const OrderRevenue = () => {
  const {fetch, pagination, provider} = useOrder()

  const {state, dispatch} = provider
  const {table} = state

  useEffect(() => {
    fetch.origin()
  }, [])
  return (
    <OrderProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <TableLayout
        style={{ padding: '0 16px 16px 16px' }}
        header={
          <div style={{margin: '0 -16px'}}>
            <OrderFilterForm />
            <OrderPanels />
          </div>
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
  const {t} = useTranslation()
  const {pageState} = useContext(OrderContext)

  const {queries, functions} = useOrderFilterForm()

  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const [canExport, setCanExport] = useState(true)

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
      }
    )
  }

  const handleLargeExport = (q) =>{
    if (pageState.panels.orderTotal <= 0) {
      showAlert({type: 'info', content: t('report__export_order_notify')})
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: pageState.panels.orderTotal,
      },
      onClose: () => setExportModalData(null),
    })
  }

  const actions = [functions.refresh, handleExportClick]

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
        breadcrumbLinks={[{
          id: 1,
          name: t('sales_overview'),
          url: `/report/sales/overview`,
          isBack: true
        }]}
        breadcrumbTitle={t('report__revenue_profit_by_order')}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData && <ModalExport data={exportModalData} title={t('order')} api={'/report/sales/order-report-export'}/>}
    </>
  )
}
