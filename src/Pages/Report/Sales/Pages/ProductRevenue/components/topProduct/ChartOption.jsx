import { fNumber } from '../../../../../../../util/formatNumber'
import { formatMoney } from '../../../../../../../util/functionUtil'

const lang = window.localStorage.getItem('i18n') || 'vi'

export const QuantityChartOption = {
  chart: {
    width: '100%',
    height: '100%',
    parentHeightOffset: 50,
  },
  colors: [
    '#2276FC', '#FF9D0B', '#FF6666', '#3CBC88'
  ],
  stroke: {
    width: 0,
  },
  legend: {
    show: false
  },
  dataLabels: { enabled: false, dropShadow: { enabled: false } },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    custom: function ({ series, seriesIndex, dataPoint, w }) {
      if (seriesIndex > 2) {
        return '<div class="arrow_box">' +
          '<div class="item-tooltip">' +
          '<img class="img-tooltip" src="/img/report/tooltip/product' + (seriesIndex + 1) + '.svg" alt="">' +
          '<span style="font-weight: 300; margin-left: 8px"> ' + (lang == 'vi' ? 'Phần còn lại' : 'Remaining part') + '</span>' +
          '</div>' +
          '<div class="item-tooltip">' +
          '<span style="margin-left: 20px"> ' + (lang == 'vi' ? 'Số lượng: ' : 'Quantity: ') + fNumber(series[seriesIndex]) + '</span>' +
          '</div>' +
          '<div class="item-tooltip">' +
          '<span style="margin-left: 20px"> ' + (lang == 'vi' ? 'Tỉ lệ: ' : 'Rate: ') + fNumber(w.config.productRate[seriesIndex]) + '%</span>' +
          '</div>' +
          '</div>'
      }
      return '<div class="arrow_box">' +
        '<div class="item-tooltip">' +
        '<img class="img-tooltip" src="/img/report/tooltip/product' + (seriesIndex + 1) + '.svg" alt="">' +
        '<span style="font-weight: 300; margin-left: 8px"> Top ' + (seriesIndex + 1) + ' </span>' +
        '</div>' +
        '<div class="item-tooltip">' +
        '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Số lượng: ' : 'Quantity: ') + fNumber(series[seriesIndex]) + '</span>' +
        '</div>' +
        '<div class="item-tooltip">' +
        '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Tỉ lệ: ' : 'Rate: ') + fNumber(w.config.productRate[seriesIndex]) + '%</span>' +
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
              return fNumber(val)
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
              }, 0))
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

export const ChartOption = {
  chart: {
    width: '100%',
    height: '100%',
    parentHeightOffset: 50,
  },
  colors: [
    '#2276FC', '#FF9D0B', '#FF6666', '#3CBC88'
  ],
  stroke: {
    width: 0,
  },
  legend: {
    show: false
  },
  dataLabels: { enabled: false, dropShadow: { enabled: false } },
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    custom: function ({ series, seriesIndex, dataPoint, w }) {
      if (seriesIndex > 2) {
        return '<div class="arrow_box arrow_box_advance">' +
          '<div class="item-tooltip">' +
          '<img class="img-tooltip" src="/img/report/tooltip/product' + (seriesIndex + 1) + '.svg" alt="">' +
          '<span style="font-weight: 300; margin-left: 8px"> ' + (lang == 'vi' ? 'Phần còn lại: ' : 'Remaining part: ') + ' </span>' +
          '</div>' +
          '<div class="item-tooltip">' +
          '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Doanh thu: ' : 'Revenue: ') + formatMoney(series[seriesIndex]) + '</span>' +
          '</div>' +
          '<div class="item-tooltip">' +
          '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Tỉ lệ: ' : 'Rate: ') + fNumber(w.config.productRate[seriesIndex]) + '%</span>' +
          '</div>' +
          '</div>'
      }
      return '<div class="arrow_box arrow_box_advance">' +
        '<div class="item-tooltip">' +
        '<img class="img-tooltip" src="/img/report/tooltip/product' + (seriesIndex + 1) + '.svg" alt="">' +
        '<span style="font-weight: 300; margin-left: 8px"> Top ' + (seriesIndex + 1) + ' </span>' +
        '</div>' +
        '<div class="item-tooltip">' +
        '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Doanh thu: ' : 'Revenue: ') + formatMoney(series[seriesIndex]) + '</span>' +
        '</div>' +
        '<div class="item-tooltip">' +
        '<span style="margin-left: 20px">' + (lang == 'vi' ? 'Tỉ lệ: ' : 'Rate: ') + fNumber(w.config.productRate[seriesIndex]) + '%</span>' +
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
              return formatMoney(val)
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
              return formatMoney(w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0))
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