import { PageHeader } from './components/pageHeader/index'
import { TableLayout } from 'layouts/tableLayout'
import { PURCHASES_ICONS } from '../../../../purchases/interfaces/_icons'
import { useEffect, useRef, useState } from 'react'
import { ProductRevenueFilterForm } from './components/productRevenueFilterForm'
import { ProductRevenueTBody } from './components/productRevenueTable/_productRevenueTBody'
import { ProductRevenueTHead } from './components/productRevenueTable/_productRevenueTHead'
import { ProductRevenueProvider } from './provider'
import './components/productRevenueTable/index.scss'
import useProductRevenue from './hooks/useProductRevenue'
import { getDateFromNow } from './utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'
import { useSearchParams } from 'react-router-dom'
import { ProductOverview } from './components/overview'
import { STATISTIC_TYPE, TypeStatistic } from '../../Components/typeStatistic'
import { Text } from '../../../../../common/text'
import useProductRevenueFilterForm from './hooks/useProductRevenueFilterForm'
import { ModalExport } from '../../Components/modalExport'
import useAlert from '../../../../../hook/useAlert'
import { REPORT_SALE_ICONS } from '../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const ReportProductRevenue = () => {
  const { fetch, pagination, provider } = useProductRevenue()
  const { state, dispatch } = provider
  const { filter, table } = state
  const { loading } = table
  const [searchParams] = useSearchParams()
  const dateType = searchParams.get('datetype') ?? ''
  const downTime = searchParams.get('downtime') ?? ''
  const {t} = useTranslation()
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
    <ProductRevenueProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <TypeStatistic page={{type: STATISTIC_TYPE.profit, name: t(state?.filter?.sortBy?.name)}}/>
      <TableLayout
        disabled={!loading}
        style={{ padding: '16px' }}
        header={
          <>
            <ProductRevenueFilterForm/>
            <ProductOverview/>
            <div style={{margin: '0 -16px', background: '#ffffff'}}>
              <Text fontSize={18} fontWeight={600}>{t('report__revenue_profit_detail')}</Text>
            </div>
          </>
        }
        table={{
          tHead: <ProductRevenueTHead/>,
          tBody: <ProductRevenueTBody/>,
          scrollable: true,
          width: 1800
        }}
      />
    </ProductRevenueProvider>
  )
}

const Header = () => {
  const { showAlert } = useAlert()
  const {t} = useTranslation()
  const {pageState,functions, queries} = useProductRevenueFilterForm()
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
      showAlert({ type: 'info', content: t('report__export_product_notify') })
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
      onClick: functions.applyProductRevenueOtherFilter
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
        breadcrumbTitle={t('report__revenue_profit_by_product')}
        actions={headerActions}
        breadcrumbLinks={[{
          id: 1,
          name: t('sales_overview'),
          url: `/report/sales/overview`,
          isBack: true
        }]}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>

      {!!exportModalData && <ModalExport data={exportModalData} title={t('product')} api={'/report/sales/export-product-report'}/>}
    </>
  )
}
