import { TableLayout } from 'layouts/tableLayout'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { formatDatetime } from '../../common/form/datePicker/_functions'
import useAlert from '../../hook/useAlert'
import { CashBooksExport } from './components/Export'
import { CashBooksFilterForm } from './components/FilterForm'
import { PageHeader } from './components/pageHeader/index'
import { CashBooksPanels } from './components/Panels'
import './components/Table/index.scss'
import { CashBooksTBody } from './components/Table/_cashBooksTBody'
import { CashBooksTHead } from './components/Table/_cashBooksTHead'
import useCashBooks from './hooks/useCashBooks'
import useCashBooksFilterForm from './hooks/useCashBooksFilterForm'
import {
  CASHBOOKS_BREADCRUMB,
  CASHBOOKS_PAGE_HEADER_ACTIONS
} from './interfaces/_constants'
import { CashBooksProvider } from './provider'
import { CashBooksContext } from './provider/_context'
import { getDateFromNow } from './utils/date'
import { useTranslation } from 'react-i18next'

export const CashBooks = () => {
  const { t } = useTranslation()
  const {fetch, pagination, provider} = useCashBooks()
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
      fetch.origin(dateTimeValue)
    }
  }, [])

  return (
    <CashBooksProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <TableLayout
        disabled={!loading}
        header={
          <>
            <CashBooksFilterForm />
            <CashBooksPanels />
          </>
        }
        table={{
          tHead: <CashBooksTHead />,
          tBody: <CashBooksTBody />,
        }}
        pagination={{
          ...table.pagination,
          loading: !loading,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </CashBooksProvider>
  )
}

const Header = () => {
  const { t } = useTranslation()
  const {showAlert} = useAlert()
  const {pageState} = useContext(CashBooksContext)
  const {queries,functions} = useCashBooksFilterForm()
  const [exportModalData, setExportModalData] = useState(null)

  const handleExportClick = async () => {
    const totalItems = pageState.table.pagination.totalItems
    if (totalItems <= 0) return showAlert({content: t('cashbook_activity_required'), type: 'info'}) 

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      keyword: '',
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
      {total: totalItems},
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
  const actions = [functions.applyCashBooksOtherFilter,handleExportClick, handleExportClick, null, null]

  return (
    <>
      <PageHeader
        actions={CASHBOOKS_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={CASHBOOKS_BREADCRUMB}
        breadcrumbTitle={t('cashbook_management')}
      />
      {!!exportModalData && <CashBooksExport data={exportModalData} />}
    </>
  )
}
