import {PageHeader} from './components/pageHeader/index'
import {TableLayout} from 'layouts/tableLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import {ShippingTrackingFilterForm} from './components/shippingTrackingFilterForm'
import {ShippingTrackingTBody} from './components/shippingTrackingTable/_shippingTrackingTBody'
import {ShippingTrackingTHead} from './components/shippingTrackingTable/_shippingTrackingTHead'
import {
  ORDER_BREADCRUMB,
  DELIVERY_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {ShippingTrackingProvider} from './provider'
import './components/shippingTrackingTable/index.scss'
import useShippingTracking from './hooks/useShippingTracking'
import {ShippingTrackingNotifications} from './components/shippingTrackingNotifications'
import { ORDER_LIMIT_EXPORT, ORDER_PAGE_HEADER_ACTIONS } from '../refactorOrder/interfaces/_constants'
import useShippingTrackingFilterForm from './hooks/useShippingTrackingFilterForm'
import useAlert from '../../hook/useAlert'
import { sendRequestAuth } from '../../api/api'
import config from '../../config'
import { OrderExport } from '../refactorOrder/components/orderExport'
import { ShippingTrackingContext } from './provider/_context'

export const ShippingTrackingManagement = () => {
  const {fetch, pagination, provider} = useShippingTracking()
  const {state, dispatch} = provider
  const {filter, table} = state
  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
    }
  }, [])
  return (
    <ShippingTrackingProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <ShippingTrackingNotifications />
      <TableLayout
        header={
          <>
            <ShippingTrackingFilterForm />
          </>
        }
        table={{
          tHead: <ShippingTrackingTHead />,
          tBody: <ShippingTrackingTBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </ShippingTrackingProvider>
  )
}

const Header = () => {
  const {showAlert} = useAlert()
  const {pageState} = useContext(ShippingTrackingContext)
  const {queries,functions} = useShippingTrackingFilterForm()
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const exportLink = useRef()
  const handleExportClick = async () => {
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

    if (
      selectedList.length > ORDER_LIMIT_EXPORT ||
      (selectedList.length <= 0 &&
        pageState.panels.orderTotal > ORDER_LIMIT_EXPORT)
    ) {
      handleLargeExport(
        {
          ...queries,
          per_page: '',
          start: '',
        },
        {total: selectedList.length > 0 ? selectedList.length : undefined},
      )
      return
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/delivery/export-xlsx${queryString}`,
    )
    if (response?.data?.success && response?.data?.data?.url) {
      showAlert({content: 'Xuất excel thành công', type: 'success'})
      if (response.data.data.url && response.data.data.url !== '#')
        setExportUrl(response.data.data.url)
    } else {
      showAlert({content: 'Xuất excel thất bại', type: 'danger'})
    }
  }
  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.orderTotal,
      },
      onClose: () => setExportModalData(null),
    })
  const actions = [functions.applyShippingTrackingOtherFilter,null, handleExportClick, null, null]

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])
  return (
    <>
      <PageHeader
        actions={DELIVERY_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle="Cảnh báo kiện vấn đề"
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      {!!exportModalData && <OrderExport data={exportModalData} />}
    </>
  )
}
