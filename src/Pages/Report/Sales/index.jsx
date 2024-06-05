import { REPORT_SALE_BREADCRUMB } from './interfaces/_constants'
import { PageHeader } from '../../../layouts/pageHeader'
import { ContentReportSale } from './Components/content'
import { useTranslation } from 'react-i18next'

export const ReportSaleManagement = () => {
  return (
    <>
      <Header/>
      <ContentReportSale/>
    </>
  )
}

const Header = () => {
  const {t} = useTranslation()
  return (
    <>
      <PageHeader
        breadcrumbLinks={REPORT_SALE_BREADCRUMB}
        breadcrumbTitle={t('sales_report')}
      />
    </>
  )
}
