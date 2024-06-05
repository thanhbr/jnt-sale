import { fNumber } from '../../../../../../../util/formatNumber'
import { formatMoney } from '../../../../../../../util/functionUtil'

const lang = window.localStorage.getItem('i18n') || 'vi'

export const ChartOption = {
  chart: {
    width: '100%',
    height: '100%',
    // parentHeightOffset: 50,
  },
  colors: [
    '#FF9D0B', '#00AB56', '#66C8FF', '#2276FC', '#FF6666', '#A20BFF'
  ],
  stroke: {
    width: 0,
  },
  dataLabels: { enabled: false, dropShadow: { enabled: false } },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    custom: function({series, seriesIndex, dataPoint, w}) {
      return '<div class="arrow_box">' +
        '<div class="item-tooltip">' +
        '<img class="img-tooltip" src="/img/iconDelivery/shipping'+(seriesIndex+1)+ '.svg" alt="">'+
        '<span>' + fNumber(series[seriesIndex]) + (lang == 'vi' ? ' đơn' : ' orders') + ' </span>' +
        '</div>' +
        '<div class="item-tooltip">' +
        '<span style="margin-left: 31px">' + formatMoney(w.config.orderTotal[seriesIndex]) + '</span>' +
        '</div>' +
        '</div>'
    }
  },
  plotOptions: {
    donut: { donut: { labels: { show: false } } },
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 0,
      customScale: 1.2,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10
      },
      donut: {
        size: '80%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: '18px',
            fontFamily: 'SF Pro Display',
            color: '#000000',
            fontStyle: 'normal',
            fontWeight: 600,
            offsetY: 2,
            formatter: function (val) {
              return fNumber(val) + (lang == 'vi' ? ' đơn' : ' orders')
            }
          },
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            fontSize: '18px',
            fontFamily: 'SF Pro Display',
            color: '#000000',
            fontStyle: 'normal',
            fontWeight: 600,
            formatter: function (w) {
              return fNumber(w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)) + (lang == 'vi' ? ' đơn' : ' orders')
            }
          }
        }
      },
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        show: false
      }
    }
  }
  ]
}