import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
import ContentLoader from 'styled-content-loader'
// @mui
import { useTheme, styled } from '@mui/material/styles'
import { Card, CardHeader } from '@mui/material'
// utils
// components
import { BaseOptionChart } from '../../../../Component/chart'
import React, { memo, useEffect, useState } from 'react'
import { getUrlOrderRateByShippingStatus } from '../../../../api/url'
import { getData } from '../../../../api/api'
import { formatMoney, UposLogFunc } from '../../../../util/functionUtil'
import './index.scss'
import { Grid } from '@material-ui/core'
import { ChartOption } from './ChartOption.js'
import { fNumber } from '../../../../util/formatNumber'
import { useTranslation } from 'react-i18next'
// ---------------------------------------------------------------

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  marginTop: '4.5rem',
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    // height: LEGEND_HEIGHT,
    // alignContent: 'center',
    // position: 'relative !important',
    // borderTop: `solid 1px ${theme.palette.divider}`,
    // top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}))

// ----------------------------------------------------------------------

const AppCurrentVisits = function ({ title, subheader, startTime, endTime, ...other }) {

  const { t } = useTranslation()
  AppCurrentVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
  }
  const [chartData, setChartData] = useState(() => window.localStorage.getItem('chart_data') ? JSON.parse(window.localStorage.getItem('chart_data')) : [])
  const [lenghtData, setLenghtData] = useState(0)
  useEffect(() => {
    // fakeDataUser()
    const url = getUrlOrderRateByShippingStatus(startTime, endTime)
    getData(url)
      .then(res => {
        let chart_data = []
        if (res.data.success) {
          res.data.data.map((data) => {
            chart_data = [...chart_data, {
              'label': data.title,
              'value': data.total_orders,
              'price': data.total_cods,
            }]
            if (data.total_orders !== 0)
              setLenghtData(lenghtData + 1)
          })
          setChartData(chart_data)
          window.localStorage.setItem('chart_data', JSON.stringify(chart_data))
        }
      })
      .catch(err => {
        console.log('error')
      })
  }, [startTime])
  const theme = useTheme()
  const chartLabels = chartData.map((i, index) => {
    return `
        <div class="container-shipping">
            <div class="img-content">
                <img src="/img/iconDelivery/shipping` + (index + 1) + `.svg"  alt="">
            </div>
            <div class="text-content">
              <p class="label-status">${i.label}</p>
              <p class="label-order">${fNumber(i.value)} <span>${t('orders')}</span></p>
              <p class="label-price">${formatMoney(i.price)}</p>
            </div>
        </div>
    `
  })

  const orderTotal = chartData.map((i) => i.price)
  const chartSeries = chartData.map((i) => i.value)

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    orderTotal: orderTotal,
    ...ChartOption
    // stroke: { colors: [theme.palette.background.paper] },
  })

  return (
    <Grid
      className="upos-trans-status-wrapper"
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
    >
      <div className="body-trans-status-wrapper">
        <Card {...other} className="custom-donut">
          <CardHeader className="header-donut" title={title} subheader={subheader}/>
          {chartData.length > 0 ?
            <div>
              {(chartSeries.length > 0 && lenghtData > 0) ?
                <ChartWrapperStyle>
                  <ReactApexChart type="donut" series={chartSeries} options={chartOptions} height={200}/>
                </ChartWrapperStyle>
                :
                <img className="img-empty" src="/img/controlpanel/emptyshipping.png" alt="loading"/>
              }
            </div>
            :
            <ContentLoader backgroundColor="#FFFFFF"
                           foregroundColor="#F4F7FC">
              <img src="/img/controlpanel/donut-loading.png" alt="loading"/>
            </ContentLoader>
          }
        </Card>
      </div>
    </Grid>
  )
}
export default memo(AppCurrentVisits)