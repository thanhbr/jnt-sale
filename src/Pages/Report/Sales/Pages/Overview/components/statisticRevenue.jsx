import styled from 'styled-components'
import { Text } from '../../../../../../common/text'
import ReactApexChart from 'react-apexcharts'
import React, { useContext, useEffect, useState } from 'react'
import { formatMoney } from '../../../../../../util/functionUtil'
import { fNumber } from '../../../../../../util/formatNumber'
import { OverviewPanels } from './overviewPanels'
import { SaleOverviewContext } from '../provider/_context'
import { TimeFilter } from './overviewFilter/_timeFilter'
import { ProfitOnOrder } from './overviewFilter/profitOnOrder'
import { StatisticTab } from './statistic/tab'
import { useTranslation } from 'react-i18next'

export const StatisticRevenue = () => {
  const {t} = useTranslation()
  const { pageState } = useContext(SaleOverviewContext)
  const { statisticTab } = pageState
  const { revenues, orders, products, profits, timeX } = pageState.overview
  const { loading } = pageState.overview
  const chartRevenueOption = {
    series: [{
      name: 'Doanh thu',
      type: 'column',
      data: revenues
    }, {
      name: 'Lợi nhuận',
      type: 'column',
      data: profits
    }
    ],
    options: {
      grid: {
        borderColor: '#EBEEF5',
        strokeDashArray: 3,
      },
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      legend: {
        show: false,
      },
      toolbar: {
        show: false,
      },
      colors: ['#2276FC', '#33CC91'],

      markers: {
        colors: ['#2276FC', '#33CC91'],
      },

      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      plotOptions: {
        bar: {
          columnWidth: '17%',
        }
      },

      stroke: {
        width: [0, 0, 1, 1]
      },
      // dataLabels: {
      //   enabled: true,
      //   enabledOnSeries: [1]
      // },
      labels: timeX,
      xaxis: {
        type: 'string',
        tooltip: {
          enabled: false,
        }
      },
      yaxis: [{
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            fontSize: '12px',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-label',
            lineHeight: '140%',
            color: '#808089',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => {
            if (value >= 1000000000)
              return value / 1000000000 + ' tỉ'
            if (value >= 100000)
              return value / 1000000 + 'tr'
            else if (value > 0)
              return fNumber(value) + ' đ'
            return value
          },
        },
      }
      ],
      tooltip: {
        // shared: true,
        // intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          let html = '<div class="arrow_box arrow_box_revenue">'
          if (series[0].length > 0)
            html += '<div class="item-tooltip"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<circle cx="6" cy="6" r="4.5" stroke="#2276FC" stroke-width="3"/>\n' +
              '</svg><p >' + t('revenue') + ': &nbsp; </p>' +
              '<span>' + formatMoney(series[0][dataPointIndex]) + '</span> </div>'
          if (series[1] && series[1].length > 0)
            html += '<div class="item-tooltip"> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<circle cx="6" cy="6" r="4.5" stroke="#33CC91" stroke-width="3"/>\n' +
              '</svg>\n <p >' + t('profit') + ' &nbsp; </p>' +
              '<span>' + formatMoney(series[1][dataPointIndex]) + '</span> </div>'
          return html
        }
      },
    },

  }

  const chartQuantityOption = {
    series: [{
      name: 'Số lượng đơn',
      type: 'line',
      data: orders
    }, {
      name: 'Số lượng sản phẩm',
      type: 'line',
      data: products
    }
    ],
    options: {
      grid: {
        borderColor: '#EBEEF5',
        strokeDashArray: 3,
      },
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      legend: {
        show: false,
      },
      toolbar: {
        show: false,
      },
      colors: ['#FF6666', '#FF9D0B'],

      markers: {
        colors: ['#FF6666', '#FF9D0B'],
      },

      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      plotOptions: {
        bar: {
          columnWidth: '17%',
        }
      },

      stroke: {
        width: [2, 2]
      },
      // dataLabels: {
      //   enabled: true,
      //   enabledOnSeries: [1]
      // },
      labels: timeX,
      xaxis: {
        type: 'string',
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => {
            return fNumber(value)
          },
        },
      },
      tooltip: {
        // shared: true,
        // intersect: false,
        custom: function ({ series, dataPointIndex, w }) {
          let html = '<div class="arrow_box">'
          if (series[0] && series[0].length > 0)
            html += '<div class="item-tooltip"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<circle cx="6" cy="6" r="4.5" stroke="#FF6666" stroke-width="3"/>\n' +
              '</svg>\n<p >'+ t('quantity')+ ' &nbsp;' + t('orders') +': &nbsp; </p>' +
              '<span>' + fNumber(series[0][dataPointIndex]) + '</span> </div>'
          if (series[1] && series[1].length > 0)
            html += '<div class="item-tooltip"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<circle cx="6" cy="6" r="4.5" stroke="#FF9D0B" stroke-width="3"/>\n' +
              '</svg>\n <p >'+ t('quantity')+ ' &nbsp;' + t('product') + ': &nbsp; </p>' +
              '<span>' + fNumber(series[1][dataPointIndex]) + '</span> </div>'
          html += '</div>'
          return html
        }
      },
    },

  }
  return (
    <StyledContent>
      <div className={'content-report'}>
        <div className="content-report__title">
          <Text as={'p'} fontSize={18} fontWeight={600}>{t('statistics_overview_by_time')}</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TimeFilter/>
            <ProfitOnOrder/>
          </div>
        </div>
        <StatisticTab/>
        <OverviewPanels/>
        {
          revenues.length > 0 && !loading ?
            <div className={'content-report__wrapper'}>
              <div className={'mixed-chart_series'}>
                <div className={'mixed-chart_series-legend'}>
                  <div className={'mixed-chart_series-legend-box'} style={{ background: '#1A94FF' }}></div>
                  <Text fontSize={12} color={'#808089'}>{statisticTab == 1 ? `${t('value')} (đ)` : t('quantity')} </Text>
                </div>
              </div>
              {
                statisticTab == 1 ?
                  <ReactApexChart options={chartRevenueOption.options} series={chartRevenueOption.series} type="line"
                                  height={411}
                                  width={'100%'}/>
                  :
                  <ReactApexChart options={chartQuantityOption.options} series={chartQuantityOption.series} type="line"
                                  height={411}
                                  width={'100%'}/>
              }
            </div>
            : !loading ? <LoadingChart/>
            : <LoadingChart/>
        }
      </div>
    </StyledContent>
  )
}

const LoadingChart = () => (
  <div className={'content-report__wrap'}>
    <img className={'content-report__wrap-image'} src="/img/report/loading-chart-overview.png" alt=""/>
  </div>
)

const StyledContent = styled.div`
  width: 100%;
  background: #FFFFFF;
  padding: 16px;
  .mixed-chart_series{
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    &-legend-box{
      display: flex;
      align-items: center;
      div{
        margin-right: 44px;
      }
    }
  }
  .content-report{
    margin-bottom: 8px;
    &__title{
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__wrapper{
      width: 100%;
      display: block;
      //margin: 0 -24px;
      &-image{
        width: 100%;
      }
    }
    
  }
  .arrow_box{
    width: 220px!important;
  }
  .arrow_box_revenue{
    width: 260px!important;
  }
  .content-report__wrap{
    img{
      width: 100%;
      height: 411px;
    }
  }
  .content-report__wrapper{
    margin-bottom: -24px;
  }
`