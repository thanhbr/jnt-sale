import React, {createContext, useReducer} from 'react'

import {Grid} from '@material-ui/core'
import {useConfigContext} from '../../Component/NavBar/navBar'
import {InitialState} from './store/dashboardInitState'
import DashboarReducer from './store/dasboardReducer'
import AppRevenueOverTime from './component/revenue/AppRevenueOverTime'
import AppOrderRateByShipping from './component/OrderRateByShipping/AppOrderRateByShipping'
import TopProducts from './component/topproduct'
import BannerTopRight from './component/bannerTopRight/index'
import PackageRenewal from './component/packageRenewal/index'
import HeaderDashboard from './component/headerDashboard/index'
import './ControlPanel.scss'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export const DashboardContext = createContext(InitialState)

const DashboardStore = ({children}) => {
  const [state, dispatch] = useReducer(DashboarReducer, InitialState)
  return (
    <DashboardContext.Provider value={[state, dispatch]}>
      {children}
    </DashboardContext.Provider>
  )
}

export default function ControlPanel() {

  const { t } = useTranslation()
  const {openMenu} = useConfigContext()
  const [state, dispatch] = useReducer(DashboarReducer, InitialState)
  const changeFilter = day => {
    const date = new Date()
    const date_start = moment(
      new Date(date.getTime() - day * 24 * 60 * 60 * 1000),
    ).format('YYYY-MM-DD')
    dispatch({type: 'CHANGE_START_TIME', payload: date_start})
    dispatch({type: 'CHANGE_DAY', payload: day})
  }
  return (
    <DashboardStore>
      <Grid container className="control-panel-wrapper">
        <HeaderDashboard changeFilter={changeFilter} data={state} />
        <Grid
          className="control-panel-col-1"
          container
          xs={12}
          sm={12}
          md={9}
          lg={9}
        >
          <AppRevenueOverTime
            title={t('revenue_time')}
            startTime={state.date_start}
            endTime={state.date_end}
          />
          <Grid
            className="upos-trans-wrapper"
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid
              className="upos-trans-check-wrapper"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={8}
            >
              <AppOrderRateByShipping
                title={t('order_rate_by_shipping_status')}
                startTime={state.date_start}
                endTime={state.date_end}
              />
            </Grid>

            <Grid
              className="upos-trans-check-wrapper"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={4}
            >
              <div className="body-trans-check-wrapper">
                <TopProducts
                  title={t("top_bestselling_products")}
                  startTime={state.date_start}
                  endTime={state.date_end}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="control-panel-col-2" container xs={12} sm={12} md={3}>
          <Grid className="upos-service-wrapper" item xs={12} sm={12} md={12}>
            <div className="body-service-wrapper">
              <BannerTopRight />
            </div>
            <div className="body-guide-wrapper">
              <PackageRenewal
                startTime={state.date_start}
                endTime={state.date_end}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <div className="fake-div-80"></div>
    </DashboardStore>
  )
}
