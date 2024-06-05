import { PageHeader } from './components/pageHeader/index'
import { TableLayout } from 'layouts/tableLayout'
import { PURCHASES_ICONS } from '../../../../purchases/interfaces/_icons'
import { useEffect, useRef, useState } from 'react'
import { CustomerFilterForm } from './components/customerFilterForm'
import { CustomerTBody } from './components/customerTable/_customerTBody'
import { CustomerTHead } from './components/customerTable/_customerTHead'
import { CustomerProvider } from './provider'
import './components/customerTable/index.scss'
import useCustomer from './hooks/useCustomer'
import { getDateFromNow } from './utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'
import { useSearchParams } from 'react-router-dom'
import { REPORT_SALE_ICONS } from '../../interfaces/_icons'
import useCustomerFilterForm from './hooks/useCustomerFilterForm'
import { ModalExport } from '../../Components/modalExport'
import useAlert from '../../../../../hook/useAlert'
import { FilterHeader } from './components/pageHeader/filter'
import { useTranslation } from 'react-i18next'

export const ReportCustomer = () => {
  const {t} = useTranslation()
  const { fetch, provider } = useCustomer()
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
    <CustomerProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <FilterHeader/>
      <TableLayout
        disabled={!loading}
        style={{ padding: '16px' }}
        header={
          <>
            <CustomerFilterForm/>
          </>
        }
        table={{
          tHead: <CustomerTHead/>,
          tBody: <CustomerTBody/>,
        }}
      />
    </CustomerProvider>
  )
}

const Header = () => {
  const {t} = useTranslation()
  const { showAlert } = useAlert()
  const {functions,queries,pageState} = useCustomerFilterForm()
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
      showAlert({ type: 'info', content: t('report__export_customer_notify')})
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
      onClick: functions.applyCustomerOtherFilter
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
        breadcrumbTitle={t('report_sale_by_customer')}
        actions={headerActions}
        breadcrumbLinks={[{
          id: 1,
          name: t('sales_overview'),
          url: `/report/sales/overview`,
          isBack: true
        }]}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData && <ModalExport data={exportModalData} title={t('customer')} api={'/report/sales/export-customer-report'}/>}
    </>
  )
}
