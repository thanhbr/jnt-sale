import { TableLayout } from 'layouts/tableLayout'
import { useEffect } from 'react'
import { PageHeader } from './components/pageHeader/index'
import { PurchasesFilterForm } from './components/purchasesFilterForm'
import { OrderNotifications } from './components/purchasesNotifications'
import './components/purchasesTable/index.scss'
import { PurchasesTBody } from './components/purchasesTable/_purchasesTBody'
import { PurchasesTHead } from './components/purchasesTable/_purchasesTHead'
import usePurchases from './hooks/usePurchases'
import usePurchasesFilterForm from './hooks/useFilter'
import {
  PURCHASES_BREADCRUMB
} from './interfaces/_constants'
import { PURCHASES_ICONS } from './interfaces/_icons'
import { PurchasesProvider } from './provider'
import { PurchaseCreateImportFileModal } from './components/modal/importPurchase'
import { useTranslation } from 'react-i18next'

export const PurchasesManagement = () => {
  const {fetch, pagination, provider,methods} = usePurchases()
  const {state, dispatch} = provider
  const {table} = state
  const {loading} = table
  
  useEffect(() => {
    fetch.origin()
  }, [])

  return (
    <PurchasesProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <OrderNotifications />
      {table?.properties?.canShowExport  && <PurchaseCreateImportFileModal onClose={methods.onCloseImportModal} />}
      <TableLayout
        disabled={!loading}
        header={
          <>
            <PurchasesFilterForm />
          </>
        }
        table={{
          tHead: <PurchasesTHead />,
          tBody: <PurchasesTBody />,
        }}
        pagination={{
          ...table.pagination,
          loading: !loading,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </PurchasesProvider>
  )
}

const Header = () => {
  const {functions} = usePurchasesFilterForm()
  const {t} = useTranslation()
  const headerActions = [
    {
      id: 1,
      name: null,
      appearance: 'secondary',
      icon: PURCHASES_ICONS.repeat,
      onClick: functions.applyPurchasesOtherFilter
    },
    {
      id: 2,
      name: 'create_inventory_receipt_using_excel',
      appearance: 'secondary',
      icon: PURCHASES_ICONS.filePlus,
      onClick: functions.handleOpenImportExcel
    },
    {
      id: 4,
      name: 'create',
      appearance: 'primary',
      icon: PURCHASES_ICONS.plus,
      href: '/purchase/create',
    },
  ]

  return (
    <>
      <PageHeader
        actions={headerActions}
        breadcrumbLinks={PURCHASES_BREADCRUMB}
        breadcrumbTitle={t('inventory_receipt_management')}
      />
    </>
  )
}
