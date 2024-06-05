import { formatDatetime } from 'common/form/datePicker/_functions'
import useAlert from 'hook/useAlert'
import { TableLayout } from 'layouts/tableLayout'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab2/provider/_context'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ForControlCODExport } from './components/Export'
import { ForControlCODFilterForm } from './components/FilterForm'
import { ForControlCODNotifications } from './components/Notifications'
import { PageHeader } from './components/pageHeader/index'
import { ForControlCODPanels } from './components/Panels'
import './components/Table/index.scss'
import { ForControlCODTBody } from './components/Table/_ForControlCODTBody'
import { ForControlCODTHead } from './components/Table/_ForControlCODTHead'
import useForControlCOD from './hooks/useForControlCOD'
import useForControlCODFilterForm from './hooks/useForControlCODFilterForm'
import {
  ForControlCOD_BREADCRUMB,
  ForControlCOD_PAGE_HEADER_ACTIONS
} from './interfaces/_constants'
import { ForControlCODProvider } from './provider'
import { getDateFromNow } from './utils/date'
import {useTranslation} from "react-i18next";

const OrderNotVerified = () => {
  const { t } = useTranslation()
  const {fetch, pagination, provider} = useForControlCOD()
  const {state, dispatch} = provider
  const {filter, table} = state
  const {loading} = table
  const [searchParams] = useSearchParams()
  const dateType = searchParams.get('datetype') ?? ''
  const downTime = searchParams.get('downtime') ?? ''
  useEffect(() => {
    let dateTimeValue = ''
    if (dateType) {
      const dateTimeDefaultValue = [
        getDateFromNow(-30),
        getDateFromNow(0, {type: 'end'}),
      ]
      dateTimeValue = `${formatDatetime(
        dateTimeDefaultValue[0],
      )} - ${formatDatetime(dateTimeDefaultValue[1])}`
      dispatch({
        type: 'SET_DATE_TIME_URL',
        payload: {
          end: dateTimeDefaultValue[1],
          start: dateTimeDefaultValue[0],
          type: {
            name: t("order_date_sended"),
            value: '0',
          },
          value: dateTimeValue,
        },
      })
    } else {
      dateTimeValue = filter?.dateTime?.activeValue?.value
    }
    if (downTime) {
      dispatch({
        type: 'SET_DOWN_TIME_URL',
        payload: downTime,
      })
    }
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
    }
  }, [])

  return (
    <ForControlCODProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <ForControlCODNotifications />
      <TableLayout
        disabled={!loading}
        header={
          <>
            <ForControlCODFilterForm />
            <ForControlCODPanels />
          </>
        }
        table={{
          tHead: <ForControlCODTHead />,
          tBody: <ForControlCODTBody />,
        }}
        // pagination={{
        //   ...table.pagination,
        //   loading: !loading,
        //   onAmountChange: pagination.onAmountChange,
        //   onPageChange: pagination.onPageChange,
        // }}
      />
    </ForControlCODProvider>
  )
}

export default OrderNotVerified

const Header = () => {
  const {showAlert} = useAlert()
  const {pageState} = useContext(ForControlCODContext)
  const {queries, functions} = useForControlCODFilterForm()
  const [exportModalData, setExportModalData] = useState(null)
  const { t } = useTranslation()

  const handleExportClick = async () => {
    const selectedList = pageState.table.selected.list
    const totalItems = pageState.table.pagination.totalItems
    if (totalItems <= 0)
      return showAlert({
        content: t("report__export_order_notify"),
        type: 'info',
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      multiple_search:
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
  const actions = [
    functions.applyForControlCODOtherFilter,
    handleExportClick,
    handleExportClick,
    null,
    null,
  ]

  return (
    <>
      <PageHeader
        actions={ForControlCOD_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={ForControlCOD_BREADCRUMB}
        breadcrumbTitle={t("cod-for-control")}
      />
      {!!exportModalData && <ForControlCODExport data={exportModalData} />}
    </>
  )
}
