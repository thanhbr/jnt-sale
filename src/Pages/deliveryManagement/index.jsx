import {PageHeader} from './components/pageHeader/index'
import {TableLayout} from 'layouts/tableLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import {DeliveryFilterForm} from './components/deliveryFilterForm'
import {DeliveryTBody} from './components/deliveryTable/_deliveryTBody'
import {DeliveryTHead} from './components/deliveryTable/_deliveryTHead'
import {
  ORDER_BREADCRUMB,
  DELIVERY_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {DeliveryProvider} from './provider'
import './components/deliveryTable/index.scss'
import useDelivery from './hooks/useDelivery'
import {OrderNotifications} from './components/deliveryNotifications'
import {TagsStatus} from './components/tagsStatus'
import { DeliveryPanels } from './components/deliveryPanels'
import {getDateFromNow} from './utils/date'
import {formatDatetime} from '../../common/form/datePicker/_functions'
import useDeliveryFilterForm from './hooks/useDeliveryFilterForm'
import useAlert from '../../hook/useAlert'
import { DeliveryContext } from './provider/_context'
import { DeliveryExport } from './components/deliveryExport'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const DeliveryManagement = () => {
 
  const { t } = useTranslation()
  const {fetch, pagination, provider} = useDelivery()
  const {state, dispatch} = provider
  const {filter, table} = state
  const {loading} = table
  const [searchParams] = useSearchParams();
  const dateType = searchParams.get('datetype') ?? ''
  const downTime = searchParams.get('downtime') ?? ''
  useEffect(() => {
    let dateTimeValue = ''
    if(dateType){
      const dateTimeDefaultValue = [getDateFromNow(-30), getDateFromNow(0,{type: 'end'})]
      dateTimeValue = `${formatDatetime(
        dateTimeDefaultValue[0],
      )} - ${formatDatetime(dateTimeDefaultValue[1])}`
      dispatch({
        type:'SET_DATE_TIME_URL',
        payload: {
          end: dateTimeDefaultValue[1],
          start: dateTimeDefaultValue[0],
          type: {
            name: t('order_sent_date'),
            value: 'created'
          },
          value: dateTimeValue
        }
      })
    }
    else{
      dateTimeValue = filter?.dateTime?.activeValue?.value
    }
    if(downTime) {
      dispatch({
        type:'SET_DOWN_TIME_URL',
        payload: downTime
      })
    }
    if (dateTimeValue) {
      fetch.origin(dateTimeValue,downTime)
      fetch.statusList(dateTimeValue,downTime)
    }
  }, [])
  return (
    <DeliveryProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <OrderNotifications />
      <TagsStatus />
      <TableLayout
        disabled={!loading}
        header={
          <>
            <DeliveryFilterForm />
            <DeliveryPanels />
          </>
        }
        table={{
          tHead: <DeliveryTHead />,
          tBody: <DeliveryTBody />,
        }}
        pagination={{
          ...table.pagination,
          loading: !loading,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </DeliveryProvider>
  )
}

const Header = () => {
  const { t, i18n } = useTranslation()
  const {showAlert} = useAlert()
  const {pageState} = useContext(DeliveryContext)
  const {queries,functions} = useDeliveryFilterForm()
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
  const actions = [functions.applyDeliveryOtherFilter,null, handleExportClick, null, null]

  return (
    <>
      <PageHeader
        actions={DELIVERY_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle={t('delivery_manager')}
      />
      {!!exportModalData && <DeliveryExport data={exportModalData} />}
    </>
  )
}
