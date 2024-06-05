import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
import ContentLoader from 'styled-content-loader'
// @mui
import { useTheme, styled } from '@mui/material/styles'
import { Card, CardHeader } from '@mui/material'
// utils
// components
import { BaseOptionChart } from '../../../../../../../Component/chart'
import React, { memo, useContext, useEffect, useState } from 'react'
import { formatMoney } from '../../../../../../../util/functionUtil'
import './index.scss'
import { Grid } from '@material-ui/core'
import { ChartOption } from './ChartOption.jsx'
import { fNumber } from '../../../../../../../util/formatNumber'
import { SaleOverviewContext } from '../../provider/_context'
import { Text } from '../../../../../../../common/text'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { Tooltip } from '../../../../../../../common/tooltip'
import { TOOLTIP_ORDER_OF_THE_DAY } from '../../interfaces/_constants'
import { useTranslation } from 'react-i18next'
// ---------------------------------------------------------------

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  marginTop: '48px',
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '.order-chart__content': {
    display: 'flex',
  },
  '.order-chart__donut': {
    marginLeft: '-35px',
    paddingTop: '20px'
  },
  '.order-chart__legend': {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '8px',
    marginLeft: '-22px',
    width: '75%'
  },
  '.order-chart__legend-item': {
    width: '33.33%',
    padding: '16px 14.5px',
  },
  '.legend-item_text': {
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center'
  },
  '.legend-item_text span': {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
}))

// ----------------------------------------------------------------------

const AppCurrentVisits = function ({ title, subheader, startTime, endTime, ...other }) {
  AppCurrentVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
  }
  const { pageState } = useContext(SaleOverviewContext)
  const chartData = pageState.orders.list
  const { loading } = pageState
  const legendData = pageState.orders.origin
  const orderTotal = chartData.map((i) => i.price)
  const chartSeries = chartData.map((i) => i.value)
  const {t} = useTranslation()

  const chartOptions = merge(BaseOptionChart(), {
    ...ChartOption,
    orderTotal: orderTotal,
    legend: {
      show: false,
    },
    offsetX: 23
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
      <div className="body-chart-wrapper">
        <Card {...other} className="custom-donut">
          {!loading ?
            <div>
              {(chartData?.length > 0) ?
                <ChartWrapperStyle>
                  <div className={'order-chart__content'}>
                    <ReactApexChart className={'order-chart__donut'} type="donut" series={chartSeries}
                                    options={chartOptions} height={200}/>
                    <div className={'order-chart__legend'}>
                      {legendData.map((legend, index) => {
                        if (index < 6)
                          return (
                            <div className={'order-chart__legend-item'}>
                              <Text className={'legend-item_text'} as={'p'} color={legend?.color} fontSize={16}
                                    fontWeight={600}>{legend?.total_orders}&nbsp;
                                <Text color={'#7C88A6'}>{t('orders')}</Text></Text>
                              <Text className={'legend-item_text'} as={'p'} as={'p'} color={'##00081D'}
                                    fontWeight={600}>{legend?.title}
                                <Tooltip className={'flex'} title={t(TOOLTIP_ORDER_OF_THE_DAY[index])}>
                                  &nbsp; {REPORT_SALE_ICONS.question}
                                </Tooltip>
                              </Text>
                              <Text className={'legend-item_text'} as={'p'} as={'p'}
                                    color={'##00081D'}>{formatMoney(legend?.total_cods)}</Text>
                            </div>
                          )
                      })}
                    </div>
                  </div>
                  <div className={'order-chart__header'}>
                    <div className="order-chart__header-title">
                      <div className={'header-title__icon'}>{REPORT_SALE_ICONS.problemBox}</div>
                      <div>
                        <Text as={'p'} fontSize={16} fontWeight={600} color={'#FFFFFF'}>{t('problematic_packages_day')}</Text>
                        <Text as={'p'} fontSize={12} color={'#FFFFFF'}>{t('problematic_packages_day_remind')}</Text>
                      </div>
                    </div>
                    <div className="order-chart__header-content">
                      <Text as={'p'} fontSize={16} fontWeight={600}
                            color={'#FFFFFF'}>{fNumber(!!legendData[6] ? legendData[6]?.total_orders : 0)}</Text>
                      <Text as={'p'} fontSize={12} color={'#FFFFFF'}>{t('order')}</Text>
                    </div>
                    <div className="order-chart__header-detail">
                      <Text as={'a'} href={'/shipping-trackings'} fontWeight={600} fontSize={12}>{t('view_detail')} {REPORT_SALE_ICONS.arrowRight}</Text>
                    </div>
                  </div>
                </ChartWrapperStyle>
                :
                <img className="img-empty" src="/img/controlpanel/emptyshipping.png" alt="loading"/>
              }
            </div>
            :
            <ContentLoader backgroundColor="#FFFFFF"
                           foregroundColor="#F4F7FC">
              <img src="/img/report/loading-order-of-day.png" alt="loading"/>
            </ContentLoader>
          }
        </Card>
      </div>
    </Grid>
  )
}
export default memo(AppCurrentVisits)