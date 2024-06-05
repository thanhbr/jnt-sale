import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
import ContentLoader from 'styled-content-loader'
// @mui
import { styled } from '@mui/material/styles'
import { BaseOptionChart } from '../../../../../../../Component/chart'
import React, { memo} from 'react'
import { ChartOption } from './ChartOption.jsx'
import { Text } from '../../../../../../../common/text'
import { QuantityChartOption } from './ChartOption'
// ---------------------------------------------------------------

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
  },
}))

// ----------------------------------------------------------------------

const AppCurrentVisits = function ({ title, subheader, startTime, endTime, chartData, quantity,chartRate,...props }) {
  AppCurrentVisits.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
  }
  const optional = !!quantity ? QuantityChartOption : ChartOption
  const chartOptions = merge(BaseOptionChart(), {
    labels: [],
    productRate: chartRate,
    ...optional
  })

  return (
    <>
      {chartData.length > 0 ?
        <div className={'content-chart'}>
          <ChartWrapperStyle>
            <ReactApexChart type="donut" series={chartData} options={chartOptions} height={200}/>
            <Text as={'p'}
                  style={{ textAlign: 'center', marginTop: '24px', width: '100%!important' }}>{props.label}</Text>
          </ChartWrapperStyle>
        </div>
        :
        <ContentLoader backgroundColor="#FFFFFF"
                       foregroundColor="#F4F7FC">
          <img src="/img/controlpanel/donut-loading.png" alt="loading"/>
        </ContentLoader>
      }
    </>
  )
}

export default memo(AppCurrentVisits)