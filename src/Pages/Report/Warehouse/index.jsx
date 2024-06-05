import { REPORT_WAREHOUSE_BREADCRUMB } from './interfaces/_constants'
import { PageHeader } from '../../../layouts/pageHeader'
import { ContentReportWarehouse } from './Components/content'
import { useTranslation } from 'react-i18next'

export const ReportWarehouseManagement = () => {
  return (
    <>
      <Header/>
      <ContentReportWarehouse/>
    </>
  )
}

const Header = () => {
  const {t} = useTranslation()
  return (
    <>
      <PageHeader
        breadcrumbLinks={REPORT_WAREHOUSE_BREADCRUMB}
        breadcrumbTitle={t('report_warehouse')}
      />
    </>
  )
}
