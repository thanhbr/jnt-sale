import { PageHeader } from './components/pageHeader/index'
import { TableLayout } from 'layouts/tableLayout'
import { PURCHASES_ICONS } from '../../../../purchases/interfaces/_icons'
import { useEffect, useRef, useState } from 'react'
import { ShippingDifferenceFilterForm } from './components/shippingDifferenceFilterForm'
import { ShippingDifferenceTBody } from './components/shippingDifferenceTable/_shippingDifferenceTBody'
import { ShippingDifferenceTHead } from './components/shippingDifferenceTable/_shippingDifferenceTHead'
import { ShippingDifferenceProvider } from './provider'
import './components/shippingDifferenceTable/index.scss'
import useShippingDifference from './hooks/useShippingDifference'
import { getDateFromNow } from './utils/date'
import { formatDatetime } from 'common/form/datePicker/_functions'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ModalExport } from '../../Components/modalExport'
import useAlert from '../../../../../hook/useAlert'
import useShippingDifferenceFilterForm from './hooks/useShippingDifferenceFilterForm'
import { ShippingDifferenceFooter } from './components/shippingDifferenceTable/_shippingDifferenceFooter'
import { REPORT_SALE_ICONS } from '../../interfaces/_icons'
import { VIEW_TYPE, TypeView } from '../../Components/typeView'
import { REPORT_SALE_SHIPPING_BREADCRUMB } from './interfaces/_constants'
import { Tooltip } from '../../../../../common/tooltip'
import useGlobalContext from "../../../../../containerContext/storeContext";
import { useTranslation } from 'react-i18next'

export const ReportShippingDifference = () => {
  const { fetch, pagination, provider } = useShippingDifference()
  const { state, dispatch } = provider
  const { filter, table } = state
  const { loading } = table
  const [searchParams] = useSearchParams()
  const dateType = searchParams.get('datetype') ?? ''
  const downTime = searchParams.get('downtime') ?? ''
  const {t} = useTranslation()
  const navigate = useNavigate()
  const [stateGolbal,] = useGlobalContext()
  const licenseID = stateGolbal?.user?.package?.license_id
  const packageConnect = [4, 19, 20]

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

    // UV-3217
    if(!!!packageConnect?.includes(+licenseID)) navigate('/admin')
  }, [])
  const viewType = state.view
  return (
    <ShippingDifferenceProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <TypeView page={{ name: t('source_order'), value: 'origin' }}/>
      <TableLayout
        className={'report-table'}
        disabled={!loading}
        header={
          <>
            <ShippingDifferenceFilterForm/>
          </>
        }
        table={{
          tHead: <ShippingDifferenceTHead/>,
          tBody: <ShippingDifferenceTBody/>,
          scrollable: viewType == 1 ? false :true,
          width: viewType == 1 ? '100%' : 1604
        }}
        footer={(
          <ShippingDifferenceFooter/>
        )}
        footerStyle={
          {
            height: 'auto'
          }
        }
      />
    </ShippingDifferenceProvider>
  )
}

const Header = () => {
  const { showAlert } = useAlert()
  const {t} = useTranslation()
  const { pageState, queries, functions } = useShippingDifferenceFilterForm()

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
      showAlert({ type: 'info', content: t('report__export_order_sources_notify') })
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
      onClick: functions.applyShippingDifferenceOtherFilter
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
        breadcrumbTitle={
          (<div style={{display: 'flex', alignItems: 'center'}}>{t('report__revenue_shipping')} &nbsp;
            <Tooltip title={t('report__revenue_shipping_tooltip')}
                     style={{display: 'flex', cursor: 'pointer'}}
                     placement={'right-start'}>
              {REPORT_SALE_ICONS.questionBold}
            </Tooltip>
          </div>)
        }
        actions={headerActions}
        breadcrumbLinks={REPORT_SALE_SHIPPING_BREADCRUMB}
      />
      <a ref={exportLink} href={exportUrl} style={{ display: 'none' }}></a>
      {!!exportModalData && <ModalExport data={exportModalData} title={'report__row'}
                                         api={'/report/sales/fee/origins-export'}/>}
    </>
  )
}
