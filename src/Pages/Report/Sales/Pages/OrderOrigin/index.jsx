import { PageHeader } from './components/pageHeader/index'
import { TableLayout } from 'layouts/tableLayout'
import { PURCHASES_ICONS } from '../../../../purchases/interfaces/_icons'
import { useEffect, useRef, useState } from 'react'
import { OrderOriginFilterForm } from './components/orderOriginFilterForm'
import { OrderOriginTBody } from './components/orderOriginTable/_orderOriginTBody'
import { OrderOriginTHead } from './components/orderOriginTable/_orderOriginTHead'
import { OrderOriginProvider } from './provider'
import './components/orderOriginTable/index.scss'
import useOrderOrigin from './hooks/useOrderOrigin'
import { getDateFromNow } from './utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'
import { useSearchParams } from 'react-router-dom'
import { PAGE_TYPE, TypeReport } from '../../Components/typeReport'
import { ModalExport } from '../../Components/modalExport'
import useAlert from '../../../../../hook/useAlert'
import useOrderOriginFilterForm from './hooks/useOrderOriginFilterForm'
import { OrderOriginFooter } from './components/orderOriginTable/_orderOriginFooter'
import { REPORT_SALE_ICONS } from '../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ReportOrderOrigin = () => {
  const {t} = useTranslation()
  const { fetch, pagination, provider } = useOrderOrigin()
  const { state, dispatch } = provider
  const { filter, table } = state
  const { loading } = table
  const [searchParams] = useSearchParams()
  const dateType = searchParams.get('datetype') ?? ''
  const downTime = searchParams.get('downtime') ?? ''
  useEffect(() => {

    let dateTimeValue = ''
    if (dateType) {
      const dateTimeDefaultValue = [getDateFromNow(-30), getDateFromNow(0, { type: 'end' })]
      dateTimeValue = `${formatDatetime(
        dateTimeDefaultValue[0],
      )} - ${formatDatetime(dateTimeDefaultValue[1])}`
      dispatch({
        type: 'SET_DATE_TIME_URL',
        payload: {
          end: dateTimeDefaultValue[1],
          start: dateTimeDefaultValue[0],
          type: {
            name: t('create_order_date'),
            value: 'created'
          },
          value: dateTimeValue
        }
      })
    } else {
      dateTimeValue = filter?.dateTime?.activeValue?.value
    }
    if (downTime) {
      dispatch({
        type: 'SET_DOWN_TIME_URL',
        payload: downTime
      })
    }
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
    }
  }, [])
  return (
    <OrderOriginProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <TypeReport page={{type: PAGE_TYPE.orderOrigin, name: t('follow_source_of_order')}}/>
      <TableLayout
        className={'report-table'}
        disabled={!loading}
        header={
          <>
            <OrderOriginFilterForm/>
          </>
        }
        table={{
          tHead: <OrderOriginTHead/>,
          tBody: <OrderOriginTBody/>,
          scrollable: table.display.list.length > 0,
          width: 1604
        }}
        footer={(
          <OrderOriginFooter/>
        )}
        footerStyle={
          {
            height: 'auto'
          }
        }
        pagination={{
          ...table.pagination,
          loading: !loading,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </OrderOriginProvider>
  )
}

const Header = () => {
  const {t} = useTranslation()
  const { showAlert } = useAlert()
  const { pageState, queries, functions } = useOrderOriginFilterForm()

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
      }
    )
  }

  const handleLargeExport = (q) => {
    if (pageState.table.display.list.length <= 0) {
      showAlert({ type: 'info', content: t('report__export_order_source_notify') })
      return
    }

    setExportModalData({
      data: {
        query: q,
        total: pageState.table.display.list.length,
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
      icon: PURCHASES_ICONS.repeat,
      onClick: functions.applyOrderOriginOtherFilter
    },
    {
      id: 2,
      name: t('export_report'),
      appearance: 'primary',
      icon: REPORT_SALE_ICONS.download,
      onClick: handleExportClick
    },
  ]

  return (
    <>
      <PageHeader
        breadcrumbTitle={t('report_sale_source_of_order')}
        actions={headerActions}
        breadcrumbLinks={[{
          id: 1,
          name: t('sales_overview'),
          url: `/report/sales/overview`,
          isBack: true
        }]}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>
      {!!exportModalData && <ModalExport data={exportModalData} title={t('source_order')} api={'/report/sales/export-order-origin-report'}/>}
    </>
  )
}
