import { REPORT_SALE_BREADCRUMB } from './interfaces/_constants'
import { PURCHASES_ICONS } from '../../../../purchases/interfaces/_icons'

import { PageHeader } from '../../../../../layouts/pageHeader'
import { StatisticRevenue } from './components/statisticRevenue'
import { TopEmployee } from './components/topRevenue/topEmployee'
import { TopProduct } from './components/topProduct'

import { SaleOverviewProvider } from './provider'
import useOverview from './hooks/useOverview'

import styled from 'styled-components'
import { OrderOfDay } from './components/orderOfDay'
import { useEffect } from 'react'
import useOverviewFilter from './hooks/useOverviewFilter'
import useGlobalContext from '../../../../../containerContext/storeContext'
import { useTranslation } from 'react-i18next'

export const ReportSaleOverview = () => {
  const { provider, origin } = useOverview()

  const { state, dispatch } = provider

  const { filter } = provider.state

  useEffect(() => {
    let dateTimeValue = ''
    dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue) {
      origin(dateTimeValue)
    }
  }, [])

  return (
    <SaleOverviewProvider value={{ pageState: state, pageDispatch: dispatch }}>
      <Header/>
      <StatisticRevenue/>
      <StyledContentOverview>
        <div className="statistic-extra flex">
          <OrderOfDay/>
          <TopProduct/>
          <TopEmployee/>
        </div>
      </StyledContentOverview>
    </SaleOverviewProvider>
  )
}

const StyledContentOverview = styled.div`
  .statistic-extra{
    margin-top: 24px;
    height: 450px;
    flex-wrap: wrap;
  }
  
  
  @media screen and (max-width: 1919px) {
    .statistic-extra{
      margin-bottom: 450px;
    }
  }
`

const Header = () => {

  const {t} = useTranslation()

  const [globalState] = useGlobalContext()
  const { shouldMinimizeSidebar } = globalState

  const { refresh } = useOverviewFilter()
  useEffect(() => {
    refresh()
  }, [shouldMinimizeSidebar])

  const headerActions = [
    {
      id: 1,
      name: null,
      appearance: 'secondary',
      icon: PURCHASES_ICONS.repeat,
      onClick: refresh
    },
  ]
  return (
    <>
      <PageHeader
        breadcrumbLinks={REPORT_SALE_BREADCRUMB}
        breadcrumbTitle={t('sales_overview')}
        actions={headerActions}
      />
    </>
  )
}
