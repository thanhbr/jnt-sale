import {PageHeader} from './components/pageHeader/index'
import {TableLayout} from 'layouts/tableLayout'
import {useContext, useEffect, useRef, useState} from 'react'
import {PartSignTBody} from './components/partSignTable/_partSignTBody'
import {PartSignTHead} from './components/partSignTable/_partSignTHead'
import {
  ORDER_BREADCRUMB,
  DELIVERY_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {DeliveryProvider} from './provider'
import './components/partSignTable/index.scss'
import useDelivery from './hooks/usePartSign'
import {OrderNotifications} from './components/partSignNotifications'
import {PartSignPanels} from './components/partSignPanels'
import {
  ORDER_LIMIT_EXPORT,
  ORDER_PAGE_HEADER_ACTIONS,
} from '../refactorOrder/interfaces/_constants'
import usePartSignFilterForm from './hooks/usePartSignFilterForm'
import useAlert from '../../hook/useAlert'
import {sendRequestAuth} from '../../api/api'
import config from '../../config'
import {Export} from './components/Export'
import {DeliveryContext} from './provider/_context'
import { PartSignFilterForm } from './components/partSignFilterForm'
import useExport from './hooks/useExport'
import {useTranslation} from "react-i18next";

export const PartSign = () => {
  const {fetch, pagination, provider} = useDelivery()
  const {state, dispatch} = provider
  const {filter, table} = state
  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
    }
  }, [])

  return (
    <DeliveryProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header />
      <OrderNotifications />
      <TableLayout
        header={
          <>
            <PartSignFilterForm />
            <PartSignPanels />
          </>
        }
        table={{
          tHead: <PartSignTHead />,
          tBody: <PartSignTBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </DeliveryProvider>
  )
}

const Header = () => {
  const {functions} = usePartSignFilterForm()
  const {exportUrl, exportLink, exportModalData, handleExportClick} = useExport()
  const { t } = useTranslation()

  const actions = [
    functions.applyDeliveryOtherFilter,
    handleExportClick,
  ]

  return (
    <>
      <PageHeader
        actions={DELIVERY_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={ORDER_BREADCRUMB}
        breadcrumbTitle={t("sign_1_part_management")}
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      {exportModalData && <Export data={exportModalData} />}
    </>
  )
}
