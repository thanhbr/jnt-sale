import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
import CountUp from 'react-countup'
// @mui
import { Card, CardHeader, Box } from '@mui/material'
import {CustomToolTip} from "../../../../Component/tooltip/CustomTooltip"
import Tooltip from '@mui/material/Tooltip'
// components
import { BaseOptionChart } from '../../../../Component/chart'
import React, { memo, useEffect, useState } from 'react'
import { getUrlRevenueOverTime } from '../../../../api/url'
import { getData } from '../../../../api/api'
import { formatMoney } from '../../../../util/functionUtil'
import './index.scss'
import { useTranslation } from 'react-i18next'
import { ChartOption } from './ChartOption'
import { Grid } from '@material-ui/core'
import ContentLoader from 'styled-content-loader'
import { fNumber } from '../../../../util/formatNumber'
// ----------------------------------------------------------------------

const AppRevenueOverTime = function ({ title, subheader, startTime, endTime, ...other }) {
  const { t } = useTranslation()
  const url = getUrlRevenueOverTime(startTime, endTime)
  const [revenue, setRevenue] = useState([])
  const [chartData, setChartData] = useState(() => window.localStorage.getItem('chart_data_revenue') ? JSON.parse(window.localStorage.getItem('chart_data_revenue')) : [])
  const [chartLabels, setChartLabels] = useState([])
  const [totalAmounts, setTotalAmounts] = useState([])
  const [totalDelivery, setTotalDelivery] = useState([])
  const [totalPos, setTotalPos] = useState([])
  const [totalEcommerce, setTotalEcommerce] = useState([])
  const [isActiveTotal, setIsActiveTotal] = useState(true)
  const [isActiveDelivery, setIsActiveDelivery] = useState(false)
  const [isActivePos, setIsActivePos] = useState(false)
  const [isActiveEcommerce, setIsActiveEcommerce] = useState(false)
  useEffect(() => {
    getData(url)
      .then(res => {
        if (res.data.success) {
          let revenues = res.data.data
          let arrRevenueTemp, tempAmounts, tempDelivery, templPos, templEcommerce
          arrRevenueTemp = tempAmounts = tempDelivery = templPos = templEcommerce = []
          setRevenue(res.data.data)
          revenues.total.dates.map((i) => {
            arrRevenueTemp = [...arrRevenueTemp, i.date]
            tempAmounts = [...tempAmounts, i.total_amounts]
          })
          setChartLabels(arrRevenueTemp)
          revenues.delivery.dates.map((i) => {
            tempDelivery = [...tempDelivery, i.total_amounts]
          })
          revenues.pos.dates.map((i) => {
            templPos = [...templPos, i.total_amounts]
          })
          revenues.ecommerce.dates.map((i) => {
            templEcommerce = [...templEcommerce, i.total_amounts]
          })
          setTotalAmounts(tempAmounts)
          setTotalDelivery(tempDelivery)
          setTotalPos(templPos)
          setTotalEcommerce(templEcommerce)
          let chartTemp = [
            {
              name: 'totalAmounts',
              type: 'area',
              fill: 'gradient',
              data: [],
            },
            {
              name: 'totalDelivery',
              type: 'area',
              fill: 'gradient',
              data: [],
            },
            {
              name: 'totalPos',
              type: 'area',
              fill: 'gradient',
              data: [],
            },
            {
              name: 'totalEcommerce',
              type: 'area',
              fill: 'gradient',
              data: [],
            }
          ]
          if (isActiveTotal)
            chartTemp[0].data = tempAmounts
          if (isActiveDelivery)
            chartTemp[1].data = tempDelivery
          if (isActivePos)
            chartTemp[2].data = templPos
          if (isActiveEcommerce)
            chartTemp[3].data = templEcommerce
          setChartData(chartTemp)
          window.localStorage.setItem('chart_data_revenue', JSON.stringify(chartTemp))
        }
      })
      .catch(err => {
        console.log('error')
      })
  }, [startTime])
  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    ...ChartOption
  })
  const showTab1 = () => {
    if (
      (document.querySelectorAll('.legend .active').length > 0 && document.querySelectorAll('.total.active').length == 0)
      || document.querySelectorAll('.legend .active').length > 1
    ) {
      setIsActiveTotal(!isActiveTotal)
      let flag = 0
      let charttemp = chartData
      charttemp.map((data) => {
        if (data.name == 'totalAmounts' && data.data.length > 0) {
          data.data = []
          flag = 1
        }
      })
      if (flag == 0) {
        charttemp[0].data = totalAmounts
      }
      setChartData(charttemp)
    }
  }
  const showTab2 = () => {
    if (
      (document.querySelectorAll('.legend .active').length > 0 && document.querySelectorAll('.delivery.active').length == 0)
      || document.querySelectorAll('.legend .active').length > 1
    ) {
      setIsActiveDelivery(!isActiveDelivery)
      let flag = 0
      let charttemp = chartData
      charttemp.map((data) => {
        if (data.name == 'totalDelivery' && data.data.length > 0) {
          data.data = []
          flag = 1
        }
      })
      if (flag == 0) {
        charttemp[1].data = totalDelivery
      }
      setChartData(charttemp)
    }
  }
  const showTab3 = () => {
    if (
      (document.querySelectorAll('.legend .active').length > 0 && document.querySelectorAll('.pos.active').length == 0)
      || document.querySelectorAll('.legend .active').length > 1
    ) {
      setIsActivePos(!isActivePos)
      let flag = 0
      let charttemp = chartData
      charttemp.map((data) => {
        if (data.name == 'totalPos' && data.data.length > 0) {
          data.data = []
          flag = 1
        }
      })
      if (flag == 0) {
        charttemp[2].data = totalPos
      }
      setChartData(charttemp)
    }
  }
  const showTab4 = () => {
    if (
      (document.querySelectorAll('.legend .active').length > 0 && document.querySelectorAll('.ecommerce.active').length == 0)
      || document.querySelectorAll('.legend .active').length > 1
    ) {
      setIsActiveEcommerce(!isActiveEcommerce)
      let flag = 0
      let charttemp = chartData
      charttemp.map((data) => {
        if (data.name == 'totalEcommerce' && data.data.length > 0) {
          data.data = []
          flag = 1
        }
      })
      if (flag == 0) {
        charttemp[3].data = totalEcommerce
      }
      setChartData(charttemp)
    }
  }
 
  return (
    <Grid className="upos-report-wrapper" item xs={12} sm={12} md={12}>
      <div className="body-report-wrapper">
        <Card {...other} className="custom-chart">
          <CardHeader title={title} subheader={subheader} className="custom-header"/>
          {Object.keys(revenue).length > 0 && <div className="legend">
            <div className={isActiveTotal ? 'header-chart-tab total active' : 'header-chart-tab total'}
                 onClick={() => showTab1()}>
              <div className="content-chart-tab">
                <div className="d-flex align-item-center">
                  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.9375 11.3878L13.0437 3.38777C13.0174 3.14303 12.9012 2.91677 12.7176 2.75281C12.534 2.58885 12.2961 2.49886 12.05 2.50027H9.95622C9.8359 1.80344 9.47329 1.17152 8.9324 0.716028C8.39151 0.260532 7.70711 0.0107422 6.99997 0.0107422C6.29284 0.0107422 5.60843 0.260532 5.06754 0.716028C4.52665 1.17152 4.16405 1.80344 4.04372 2.50027H1.94997C1.70383 2.49886 1.46592 2.58885 1.28233 2.75281C1.09874 2.91677 0.982534 3.14303 0.95622 3.38777L0.0624699 11.3878C0.0473327 11.5282 0.0617556 11.6703 0.104811 11.8048C0.147867 11.9394 0.218603 12.0634 0.31247 12.169C0.406024 12.2736 0.520671 12.3572 0.648864 12.4143C0.777057 12.4714 0.915888 12.5007 1.05622 12.5003H12.9437C13.0841 12.5007 13.2229 12.4714 13.3511 12.4143C13.4793 12.3572 13.5939 12.2736 13.6875 12.169C13.7813 12.0634 13.8521 11.9394 13.8951 11.8048C13.9382 11.6703 13.9526 11.5282 13.9375 11.3878ZM4.99997 5.00027C4.99997 5.13287 4.94729 5.26005 4.85352 5.35382C4.75976 5.44759 4.63258 5.50027 4.49997 5.50027C4.36736 5.50027 4.24019 5.44759 4.14642 5.35382C4.05265 5.26005 3.99997 5.13287 3.99997 5.00027V4.00027C3.99997 3.86766 4.05265 3.74048 4.14642 3.64671C4.24019 3.55294 4.36736 3.50027 4.49997 3.50027C4.63258 3.50027 4.75976 3.55294 4.85352 3.64671C4.94729 3.74048 4.99997 3.86766 4.99997 4.00027V5.00027ZM5.06247 2.50027C5.17262 2.07006 5.42282 1.68875 5.77363 1.41645C6.12443 1.14415 6.55589 0.996344 6.99997 0.996344C7.44406 0.996344 7.87551 1.14415 8.22632 1.41645C8.57712 1.68875 8.82732 2.07006 8.93747 2.50027H5.06247ZM9.99997 5.00027C9.99997 5.13287 9.94729 5.26005 9.85352 5.35382C9.75976 5.44759 9.63258 5.50027 9.49997 5.50027C9.36736 5.50027 9.24018 5.44759 9.14642 5.35382C9.05265 5.26005 8.99997 5.13287 8.99997 5.00027V4.00027C8.99997 3.86766 9.05265 3.74048 9.14642 3.64671C9.24018 3.55294 9.36736 3.50027 9.49997 3.50027C9.63258 3.50027 9.75976 3.55294 9.85352 3.64671C9.94729 3.74048 9.99997 3.86766 9.99997 4.00027V5.00027Z"
                      fill="#FF0000"/>
                  </svg>
                  <p>{t('total_orders')}</p>
                  <CustomToolTip title={t('tooltip_order_total')} placement="top-start">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                      ' +
                      <path
                        d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                        fill="#808089"/>' +
                      <path
                        d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>' +
                    </svg>
                  </CustomToolTip>
                </div>
                <div className="total-order"><p><CountUp start={10000} end={revenue.total.total_orders} duration={1} separator=","/><span className="text-order"> {t('orders')}</span></p></div>
                <div className="total-prices"><p><CountUp start={10000} end={revenue.total.total_amounts} duration={1} separator=","/> ₫</p></div>
              </div>
            </div>
            <div className={isActiveDelivery ? 'header-chart-tab delivery active' : 'header-chart-tab delivery'}
                 onClick={() => showTab2()}>
              <div className="content-chart-tab">
                <div className="d-flex align-item-center">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.5 7.99375V7.98125C15.501 7.96639 15.4989 7.95148 15.4937 7.9375V7.91875C15.4937 7.90625 15.4875 7.89375 15.4875 7.88125V7.86875L15.475 7.81875H15.4688L14.5938 5.64375C14.524 5.4534 14.3971 5.28931 14.2303 5.17403C14.0636 5.05876 13.8652 4.99797 13.6625 5H11.5V4.5C11.5 4.36739 11.4473 4.24021 11.3536 4.14645C11.2598 4.05268 11.1326 4 11 4H1.5C1.23478 4 0.98043 4.10536 0.792893 4.29289C0.605357 4.48043 0.5 4.73478 0.5 5V12C0.5 12.2652 0.605357 12.5196 0.792893 12.7071C0.98043 12.8946 1.23478 13 1.5 13H2.3125C2.42265 13.4302 2.67285 13.8115 3.02366 14.0838C3.37446 14.3561 3.80591 14.5039 4.25 14.5039C4.69409 14.5039 5.12554 14.3561 5.47635 14.0838C5.82715 13.8115 6.07735 13.4302 6.1875 13H9.8125C9.92265 13.4302 10.1729 13.8115 10.5237 14.0838C10.8745 14.3561 11.3059 14.5039 11.75 14.5039C12.1941 14.5039 12.6255 14.3561 12.9763 14.0838C13.3271 13.8115 13.5773 13.4302 13.6875 13H14.5C14.7652 13 15.0196 12.8946 15.2071 12.7071C15.3946 12.5196 15.5 12.2652 15.5 12V8V7.99375ZM11.5 6H13.6625L14.2625 7.5H11.5V6ZM1.5 5H10.5V9H1.5V5ZM4.25 13.5C4.05222 13.5 3.85888 13.4414 3.69443 13.3315C3.52998 13.2216 3.40181 13.0654 3.32612 12.8827C3.25043 12.7 3.23063 12.4989 3.26921 12.3049C3.3078 12.1109 3.40304 11.9327 3.54289 11.7929C3.68275 11.653 3.86093 11.5578 4.05491 11.5192C4.24889 11.4806 4.44996 11.5004 4.63268 11.5761C4.81541 11.6518 4.97159 11.78 5.08147 11.9444C5.19135 12.1089 5.25 12.3022 5.25 12.5C5.25 12.7652 5.14464 13.0196 4.95711 13.2071C4.76957 13.3946 4.51522 13.5 4.25 13.5ZM11.75 13.5C11.5522 13.5 11.3589 13.4414 11.1944 13.3315C11.03 13.2216 10.9018 13.0654 10.8261 12.8827C10.7504 12.7 10.7306 12.4989 10.7692 12.3049C10.8078 12.1109 10.903 11.9327 11.0429 11.7929C11.1827 11.653 11.3609 11.5578 11.5549 11.5192C11.7489 11.4806 11.95 11.5004 12.1327 11.5761C12.3154 11.6518 12.4716 11.78 12.5815 11.9444C12.6914 12.1089 12.75 12.3022 12.75 12.5C12.75 12.7652 12.6446 13.0196 12.4571 13.2071C12.2696 13.3946 12.0152 13.5 11.75 13.5Z"
                      fill="#00AB56"/>
                  </svg>
                  <p>{t('delivered_orders')}</p>
                  <CustomToolTip title={t('tooltip_delivery_total')} placement="top-start">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                      ' +
                      <path
                        d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                        fill="#808089"/>
                      <path
                        d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </CustomToolTip>
                </div>
                <div className="total-order"><p><CountUp start={10000} end={revenue.delivery.total_orders} duration={1} separator=","/><span className="text-order"> {t('orders')}</span></p></div>
                <div className="total-prices"><p><CountUp start={10000} end={revenue.delivery.total_amounts} duration={1} separator=","/> ₫</p></div>
              </div>
            </div>
            <div className={isActivePos ? 'header-chart-tab pos active' : 'header-chart-tab pos'}
                 onClick={() => showTab3()}>
              <div className="content-chart-tab">
                <div className="d-flex align-item-center">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.5 6.4875V6.4625C14.4973 6.45222 14.4952 6.44178 14.4937 6.43125V6.4125C14.4875 6.4 14.4875 6.3875 14.4812 6.375V6.3625L13.5875 3.225C13.5259 3.01698 13.3991 2.83425 13.2258 2.70373C13.0526 2.5732 12.8419 2.50179 12.625 2.5H3.375C3.15806 2.50179 2.94744 2.5732 2.77416 2.70373C2.60087 2.83425 2.47409 3.01698 2.4125 3.225L1.51875 6.3625V6.375C1.5125 6.3875 1.5125 6.4 1.50625 6.4125V6.43125C1.50479 6.44178 1.5027 6.45222 1.5 6.4625V7.5C1.5 7.88811 1.59036 8.2709 1.76393 8.61803C1.9375 8.96517 2.18951 9.26713 2.5 9.5V13.5C2.5 13.7652 2.60536 14.0196 2.79289 14.2071C2.98043 14.3946 3.23478 14.5 3.5 14.5H12.5C12.7652 14.5 13.0196 14.3946 13.2071 14.2071C13.3946 14.0196 13.5 13.7652 13.5 13.5V9.5C13.8105 9.26713 14.0625 8.96517 14.2361 8.61803C14.4096 8.2709 14.5 7.88811 14.5 7.5V6.4875ZM2.5 7H5.5V7.5C5.50023 7.75798 5.43392 8.01165 5.30747 8.23652C5.18103 8.46139 4.99873 8.64984 4.77818 8.78368C4.55764 8.91751 4.3063 8.99221 4.04846 9.00054C3.79061 9.00887 3.53498 8.95057 3.30625 8.83125C3.27168 8.80386 3.2339 8.78077 3.19375 8.7625C2.98106 8.62761 2.80592 8.44113 2.68463 8.22041C2.56334 7.99968 2.49983 7.75186 2.5 7.5V7ZM9.5 7.5C9.5 7.89782 9.34196 8.27936 9.06066 8.56066C8.77936 8.84196 8.39782 9 8 9C7.60218 9 7.22064 8.84196 6.93934 8.56066C6.65804 8.27936 6.5 7.89782 6.5 7.5V7H9.5V7.5ZM12.8062 8.7625C12.7661 8.78077 12.7283 8.80386 12.6938 8.83125C12.465 8.95057 12.2094 9.00887 11.9515 9.00054C11.6937 8.99221 11.4424 8.91751 11.2218 8.78368C11.0013 8.64984 10.819 8.46139 10.6925 8.23652C10.5661 8.01165 10.4998 7.75798 10.5 7.5V7H13.5V7.5C13.5002 7.75186 13.4367 7.99968 13.3154 8.22041C13.1941 8.44113 13.0189 8.62761 12.8062 8.7625Z"
                      fill="#FFC116"/>
                  </svg>
                  <p>{t('pos_sales')}</p>
                  <CustomToolTip title={t('tooltip_pos_total')} placement="top-start">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                        d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                        fill="#808089"/>
                      <path
                        d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </CustomToolTip>
                </div>
                <div className="total-order"><p>
                  <CountUp start={10000} end={revenue.pos.total_orders} duration={1} separator=","/><span className="text-order"> {t('orders')}</span></p></div>
                <div className="total-prices"><p><CountUp start={10000} end={revenue.pos.total_amounts} duration={1} separator=","/> ₫</p></div>
              </div>
            </div>
            <div className={isActiveEcommerce ? 'header-chart-tab ecommerce active' : 'header-chart-tab ecommerce'}
                 onClick={() => showTab4()}>
              <div className="content-chart-tab">
                <div className="d-flex align-item-center">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.8501 11.3312C14.2799 10.4493 14.5022 9.4809 14.5001 8.49993C14.4982 7.06816 14.0244 5.67693 13.1522 4.54148C12.28 3.40604 11.058 2.58967 9.6751 2.21867H9.64385C8.62985 1.95171 7.56625 1.9345 6.54415 2.16853C5.52205 2.40256 4.57191 2.88085 3.7751 3.56243L3.69385 3.63743C2.70446 4.51062 2.00457 5.66453 1.68742 6.94546C1.37026 8.22639 1.45088 9.57354 1.91853 10.8075C2.38619 12.0415 3.21869 13.1037 4.30516 13.8526C5.39162 14.6016 6.68049 15.0018 8.0001 14.9999H8.1501C9.33034 14.9708 10.4805 14.6216 11.4778 13.9898C12.4751 13.3579 13.2821 12.4671 13.8126 11.4124L13.8501 11.3312ZM13.5001 8.49993C13.499 9.15472 13.3826 9.80421 13.1563 10.4187L10.2563 8.63742C10.1367 8.56223 10.0025 8.51324 9.8626 8.49368L8.4376 8.30618C8.25456 8.28251 8.06854 8.30964 7.89988 8.38459C7.73122 8.45955 7.58643 8.57945 7.48135 8.73117H6.94385L6.70635 8.23743C6.63981 8.10107 6.54349 7.98141 6.42449 7.8873C6.30549 7.79318 6.16686 7.72701 6.01885 7.69368L5.60635 7.60617L5.7626 7.23743C5.80152 7.14691 5.86601 7.06972 5.94817 7.01532C6.03032 6.96092 6.12657 6.93168 6.2251 6.93118H7.23135C7.39969 6.93042 7.56516 6.88744 7.7126 6.80618L8.4751 6.38118C8.54239 6.3447 8.60529 6.30066 8.6626 6.24993L10.3438 4.72492C10.4902 4.59661 10.5951 4.42767 10.6452 4.23959C10.6952 4.0515 10.6883 3.85278 10.6251 3.66868C11.4946 4.1409 12.2205 4.83894 12.7265 5.6892C13.2325 6.53947 13.4998 7.51049 13.5001 8.49993ZM2.5001 8.49993C2.49867 7.63749 2.70217 6.78705 3.09385 6.01868L3.74385 7.76242C3.80329 7.91861 3.90069 8.05754 4.02727 8.16665C4.15385 8.27577 4.30561 8.35164 4.46885 8.38742L4.8126 8.46243H4.81885L5.56885 8.62493C5.64308 8.63994 5.7128 8.67204 5.77247 8.71869C5.83214 8.76534 5.88011 8.82525 5.9126 8.89368L6.04385 9.16867C6.12654 9.33699 6.25463 9.47884 6.41366 9.57823C6.57268 9.67762 6.75632 9.73059 6.94385 9.73117H7.01885L6.5376 10.8062C6.45627 10.9845 6.4295 11.1829 6.46064 11.3764C6.49178 11.5699 6.57944 11.7499 6.7126 11.8937L7.71885 12.9812C7.77065 13.0391 7.80879 13.1079 7.83042 13.1826C7.85206 13.2572 7.85665 13.3358 7.84385 13.4124L7.73135 13.9937C6.32134 13.9232 4.99228 13.3138 4.01874 12.2914C3.04519 11.269 2.50154 9.91169 2.5001 8.49993Z"
                      fill="#5245E5"/>
                  </svg>
                  <p>{t('ecommerce_platform')}</p>
                  <CustomToolTip title={t('tooltip_ecommerce_total')} placement="top-start">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                      <path
                        d="M8 12.667C8.48325 12.667 8.875 12.2752 8.875 11.792C8.875 11.3087 8.48325 10.917 8 10.917C7.51675 10.917 7.125 11.3087 7.125 11.792C7.125 12.2752 7.51675 12.667 8 12.667Z"
                        fill="#808089"/>
                      ' +
                      <path
                        d="M7.99967 9.16667V8.58333C8.40348 8.58333 8.79821 8.46359 9.13396 8.23925C9.46971 8.01491 9.7314 7.69605 9.88593 7.32298C10.0405 6.94991 10.0809 6.5394 10.0021 6.14336C9.92333 5.74731 9.72888 5.38352 9.44335 5.09799C9.15782 4.81246 8.79403 4.61801 8.39798 4.53923C8.00194 4.46045 7.59143 4.50088 7.21836 4.65541C6.8453 4.80994 6.52643 5.07163 6.30209 5.40738C6.07775 5.74313 5.95801 6.13786 5.95801 6.54167"
                        stroke="#808089" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </CustomToolTip>
                </div>
                <div className="total-order"><p><CountUp start={10000} end={revenue.ecommerce.total_orders} duration={1} separator=","/><span className="text-order"> {t('orders')}</span></p></div>
                <div className="total-prices"><p><CountUp start={10000} end={revenue.ecommerce.total_amounts} duration={1} separator=","/> ₫</p></div>
              </div>
            </div>
          </div>}
          <Box sx={{ p: 3, pb: 1 }} dir="ltr" className="chart-content">
            {chartData.length > 0 ?
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} palette="1"/>
            :

              <ContentLoader  backgroundColor= "#FFFFFF"
                              foregroundColor= "#F4F7FC" >
                <img src="/img/controlpanel/revenue-loading.png" alt="loading"/>
              </ContentLoader>
            }
          </Box>
        </Card>
      </div>
    </Grid>
  )
}
AppRevenueOverTime.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  // chartData: PropTypes.array.isRequired,
  // chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
}
export default memo(AppRevenueOverTime)