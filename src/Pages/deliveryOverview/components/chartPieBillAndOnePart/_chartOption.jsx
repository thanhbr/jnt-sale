import Chart from "react-apexcharts";
import React from "react";
import {fCurrency, fNumber} from "../../../../util/formatNumber";
import {formatMoney} from "../../../../util/functionUtil";
import {formateDecimal} from "../../utils/_formateDecimal";
export const chartOptions = (pageState) =>{
    const pieDonutOption = {
        chart: {
            width: '380px',
            height: '291.02px',
            parentHeightOffset: 50,
        },
        colors: [
            '#FF424E', '#00AB56', '#FFC240'
        ],
        stroke: {
            width: 2,
        },
        legend: {
            horizontalAlign: 'right',
            position: 'right',
            offsetY: 0,
            height: '291.02px',
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: { enabled: false, dropShadow: { enabled: false } },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: function({series, seriesIndex, dataPoint, w}) {
                const percent = pageState.listTotalDelivery.arr_order_percent
                let cod = ['Đang giao','Giao thành công','Đơn chuyển hoàn']
                return '<div class="arrow_box" style="width: 143px;height:53px;padding: 6px 12px;display: flex">' +
                    '<div>' +
                    '<img class="img-tooltip" style="margin-right: 8px;margin-top: 2px" src="/img/overview/cirle'+(seriesIndex+1)+ '.svg" alt="">' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size:14px;font-weight:400;line-height:140%">'+cod[seriesIndex]+'</p>' +
                    '<span style="font-size:15px;font-weight:600;line-height:140%">' + percent[seriesIndex] + ' % </span>' +
                    '</div>' +
                    '</div>'
            }
        },
        subtitle: {
            text: 'Tỉ lệ đơn giao hàng',
            align: 'center',
            margin: 10,
            offsetX: 12,
            offsetY: 190,
            floating: true,
            style: {
                fontSize:  '14px',
                fontWeight:  '400',
                color:  '#000000'
            },
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
                    size: '75%',
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
                                return fNumber(val) + '\n đơn '
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
                                }, 0)) + '\n đơn '

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
    const pieCodOption = {
        chart: {
            width: '380px',
            height: '291.02px',
            parentHeightOffset: 50,
        },
        colors: [
            '#FF424E', '#00AB56', '#FFC240'
        ],
        stroke: {
            width: 2,
        },
        subtitle: {
            text: 'Tỉ lệ COD giao hàng',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 190,
            floating: true,
            style: {
                fontSize:  '14px',
                fontWeight:  '400',
                color:  '#000000'
            },
        },
        legend: {
            horizontalAlign: 'right',
            position: 'right',
            offsetY: 0,
            height: '291.02px',
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: { enabled: false, dropShadow: { enabled: false } },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: function({series, seriesIndex, dataPoint, w}) {
                const percent = pageState.listTotalDelivery.arr_cod_percent
                let cod = ['Đang giao','Giao thành công','Đơn chuyển hoàn']
                return '<div class="arrow_box" style="width: 143px;height:53px;padding: 6px 12px;display: flex">' +
                    '<div>' +
                    '<img class="img-tooltip" style="margin-right: 8px;margin-top: 2px" src="/img/overview/cirle'+(seriesIndex+1)+ '.svg" alt="">' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size:14px;font-weight:400;line-height:140%">'+cod[seriesIndex]+'</p>' +
                    '<span style="font-size:15px;font-weight:600;line-height:140%">' + percent[seriesIndex] + ' % </span>' +
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
                    size: '75%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: false,
                        },
                        value: {
                            show: true,
                            fontSize: 'px',
                            fontFamily: 'SF Pro Display',
                            color: '#000000',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            offsetY: 2,
                            formatter: function (val) {
                                return formateDecimal(val)
                            }
                        },
                        total: {
                            show: true,
                            showAlways: false,
                            label: 'Total',
                            fontSize: '20px',
                            fontFamily: 'SF Pro Display',
                            color: '#000000',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            formatter: function (w) {
                                var val =  w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                return formateDecimal(val)
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
    const orderSignPart = {
        chart: {
            width: '380px',
            height: '291.02px',
            parentHeightOffset: 50,
        },
        colors: [
            '#FF424E', '#00AB56', '#FFC240','#2697FE'
        ],
        stroke: {
            width: 2,
        },
        subtitle: {
            text: 'Tỉ lệ đơn ký nhận 1 phần',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 190,
            floating: true,
            style: {
                fontSize:  '14px',
                fontWeight:  '400',
                color:  '#000000'
            },

        },
        legend: {
            horizontalAlign: 'right',
            position: 'right',
            offsetY: 0,
            height: '291.02px',
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: { enabled: false, dropShadow: { enabled: false } },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: function({series, seriesIndex, dataPoint, w}) {
                const percent = pageState.listSignOnePart.arr_order_percent
                let cod = ['Đơn đang giao 1 phần\t','Đơn ký nhận 1 phần\t','Đơn ký nhận toàn phần\t','Đơn chuyển hoàn\t']
                return '<div class="arrow_box" style="width: fit-content;height:53px;padding: 6px 12px;display: flex">' +
                    '<div>' +
                    '<img class="img-tooltip" style="margin-right: 8px;margin-top: 2px" src="/img/overview/cirle'+(seriesIndex+1)+ '.svg" alt="">' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size:14px;font-weight:400;line-height:140%">'+cod[seriesIndex]+'</p>' +
                    '<span style="font-size:15px;font-weight:600;line-height:140%">' + percent[seriesIndex] + ' % </span>' +
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
                    size: '75%',
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
                                return fNumber(val) + '\n đơn '
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
                                }, 0)) + '\n đơn '

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
    const codSignPart = {
        chart: {
            width: '380px',
            height: '291.02px',
            parentHeightOffset: 50,
        },
        colors: [
            '#FF424E', '#00AB56', '#FFC240','#2697FE'
        ],
        stroke: {
            width: 2,
        },
        subtitle: {
            text: 'Tỉ lệ COD ký nhận 1 phần',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 190,
            floating: true,
            style: {
                fontSize:  '14px',
                fontWeight:  '400',
                color:  '#000000'
            },
        },
        legend: {
            horizontalAlign: 'right',
            position: 'right',
            offsetY: 0,
            height: '291.02px',
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: { enabled: false, dropShadow: { enabled: false } },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: function({series, seriesIndex, dataPoint, w}) {
                const percent = pageState.listSignOnePart.arr_cod_percent
                let cod = ['Đơn đang giao 1 phần\t','Đơn ký nhận 1 phần\t','Đơn ký nhận toàn phần\t','Đơn chuyển hoàn\t']
                return '<div class="arrow_box" style="width: fit-content;height:53px;padding: 6px 12px;display: flex">' +
                    '<div>' +
                    '<img class="img-tooltip" style="margin-right: 8px;margin-top: 2px" src="/img/overview/cirle'+(seriesIndex+1)+ '.svg" alt="">' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size:14px;font-weight:400;line-height:140%">'+cod[seriesIndex]+'</p>' +
                    '<span style="font-size:15px;font-weight:600;line-height:140%">' + percent[seriesIndex] + ' % </span>' +
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
                    size: '75%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: false,
                        },
                        value: {
                            show: true,
                            fontSize: 'px',
                            fontFamily: 'SF Pro Display',
                            color: '#000000',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            offsetY: 2,
                            formatter: function (val) {
                                if (val === 0) return val
                                else if (val < 1000000) return ' ~ \n' + parseFloat(val / 1000)+ '\n k'
                                else if (val < 100000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                                else if (val < 1000000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                                else if (val < 100000000000) return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'
                                else return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'
                            }
                        },
                        total: {
                            show: true,
                            showAlways: false,
                            label: 'Total',
                            fontSize: '20px',
                            fontFamily: 'SF Pro Display',
                            color: '#000000',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            formatter: function (w) {
                                var val =  w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                if (val === 0) return val
                                else if (val < 1000000) return ' ~ \n' + parseFloat(val / 1000)+ '\n k'
                                else if (val < 100000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                                else if (val < 1000000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                                else if (val < 100000000000) return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'
                                else return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'

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
    return{
        pie:{
            pieDonutOption,
            pieCodOption,
        },
        sign_part:{
            orderSignPart,
            codSignPart
        }
    }
}