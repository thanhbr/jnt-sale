import { PageHeader } from './components/pageHeader/index'
import { TableLayout } from 'layouts/tableLayout'
import { useEffect, useRef, useState } from 'react'
import { EmployeeFilterForm } from './components/employeeFilterForm'
import { EmployeeTBody } from './components/employeeTable/_employeeTBody'
import { EmployeeTHead } from './components/employeeTable/_employeeTHead'
import { EmployeeProvider } from './provider'
import './components/employeeTable/index.scss'
import useEmployee from './hooks/useEmployee'
import { PAGE_TYPE, TypeReport } from '../../Components/typeReport'
import { EmployeeFooter } from './components/employeeTable/_employeeFooter'
import useAlert from '../../../../../hook/useAlert'
import useEmployeeFilterForm from './hooks/useEmployeeFilterForm'
import { ModalExport } from '../../Components/modalExport'
import { REPORT_SALE_ICONS } from '../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ReportEmployee = () => {
  const { fetch, pagination, provider } = useEmployee()
  const { state, dispatch } = provider
  const { filter, table } = state
  const { loading } = table
  useEffect(() => {
    let dateTimeValue = ''
    dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
    }
  }, [])
  return (
    <EmployeeProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <TypeReport page={{ type: PAGE_TYPE.employee, name: 'follow_employee' }}/>
      <TableLayout
        className={'report-table'}
        disabled={!loading}
        header={
          <>
            <EmployeeFilterForm/>
          </>
        }
        table={{
          tHead: <EmployeeTHead/>,
          tBody: <EmployeeTBody/>,
          scrollable: table.display.list.length > 0,
          width: 1604
        }}
        footer={(
          <EmployeeFooter/>
        )}
        footerStyle={
          {
            height: 'auto'
          }
        }
      />
    </EmployeeProvider>
  )
}

const Header = () => {
  const { showAlert } = useAlert()
  const { pageState, queries, functions } = useEmployeeFilterForm()
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)

  const {t} = useTranslation()
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
      showAlert({ type: 'info', content: t('report__export_employee_notify') })
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
      icon: REPORT_SALE_ICONS.repeat,
      onClick: functions.applyEmployeeOtherFilter
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
        breadcrumbTitle={t('report_sale_employee')}
        actions={headerActions}
        breadcrumbLinks={[{
          id: 1,
          name: t('sales_overview'),
          url: `/report/sales/overview`,
          isBack: true
        }]}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData && <ModalExport data={exportModalData} title={t('employee')} api={'/report/sales/export-staff-report'}/>}
    </>
  )
}
