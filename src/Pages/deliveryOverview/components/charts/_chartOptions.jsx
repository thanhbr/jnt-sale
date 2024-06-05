import Chart from "react-apexcharts";
import React from "react";
import {fCurrency, fNumber} from "../../../../util/formatNumber";
import {formatMoney} from "../../../../util/functionUtil";

export const chartOptions = (pageState) => {
    const x_labels = pageState?.listDelivery.arr_status.map(item => `
        <div>
            <p>${item}</p>
        </div>
    `)
    const total = pageState.listDelivery?.total_orders?.reduce((a,b)=>a+b,0)

    const labels = {
        chart: {
            height: '100%',
            type: 'line',
        },
        toolbar: {
            show: false,
        },
        colors: ['#1A94FF', '#5FCC28'],

        markers: {
            colors: ['#1A94FF', '#5FCC28']
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
            enabledOnSeries: [1]
        },
        // labels: pageState?.listDelivery.arr_status,
        plotOptions: {
            bar: {
                columnWidth: '42%',
            }
        },

        xaxis: {
            type: 'string',
            categories: [
                ['Gửi đơn', ' giao hàng'],
                ['Lấy hàng', 'thành công'],
                ['Đang', 'vận chuyển'],
                ['Đang', 'phát hàng'],
                ['Giao hàng', 'thành công'],
                ['Chờ', 'chuyển hoàn'],
                ['Chuyển', 'hoàn'],
                ['Chuyển hoàn', 'thành công'],
            ],
            crosshairs: {
                show: false,
            },
            labels: {
                rotate: 0,
                style: {
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#00081D',
                },
            },
            rotate: 0,
            style: {
                cssClass: 'apexcharts-xaxis-label',
            },

        },
        yaxis: [
            {
                show:total == 0 ?false:true,
                axisTicks: {
                    show: true,
                    borderType: 'dotted',
                },
                axisBorder: {
                    show: true,
                    color: '#1A94FF'
                },
                labels: {
                    formatter: (val) => {
                        val = val.toString();
                        let pattern = /(-?\d+)(\d{3})/;
                        while (pattern.test(val))
                            val = val.replace(pattern, "$1,$2");
                        return val;
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#00081D',
                    },
                }

            },
            {
                show:total == 0 ?false:true,
                opposite: true,
                axisTicks: {
                    show: true,
                    borderType: 'dotted',
                },
                axisBorder: {
                    show: true,
                    color: '#5FCC28',
                },
                labels: {
                    formatter: val => {
                        if (val === 0) return val
                        else if (val < 1000000) return ' ~ \n' + parseFloat(val / 1000)+ '\n k'
                        else if (val < 100000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                        else if (val < 1000000000) return ' ~ \n' + parseFloat(val / 1000000) + '\n tr'
                        else if (val < 100000000000) return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'
                        else return ' ~ \n' + parseFloat(val / 1000000000) + '\n tỷ'


                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#00081D',
                    },
                }
            }
        ],

    }
    const series = [{
        name: 'Số lượng đơn',
        type: 'bar',
        data: pageState.listDelivery?.total_orders
    }, {
        name: 'Giá trị đơn',
        type: 'bar',
        data: pageState.listDelivery?.total_cod
    }];
    const pieDonutOption = {
        chart: {
            width: '380px',
            height: '100%',
            parentHeightOffset: 50,
        },
        colors: [
            '#FF424E', '#00AB56', '#FFC24099'
        ],
        stroke: {
            width: 2,
        },
        legend: {
            horizontalAlign: 'right',
            position: 'right',
            offsetY: 0,
            height: '300px',
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: {enabled: false, dropShadow: {enabled: false}},
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: function ({series, seriesIndex, dataPoint, w}) {
                let percent = pageState.listControl.arr_percent;
                let cod = pageState.listControl.data.map(item => item.status_name)
                return '<div class="arrow_box" style="width: 143px;height:53px;padding: 6px 12px;display: flex">' +
                    '<div>' +
                    '<img class="img-tooltip" style="margin-right: 8px;margin-top: 2px" src="/img/overview/cirle' + (seriesIndex + 1) + '.svg" alt="">' +
                    '</div>' +
                    '<div>' +
                    '<p style="font-size:14px;font-weight:400;line-height:140%">' + cod[seriesIndex] + '</p>' +
                    '<span style="font-size:15px;font-weight:600;line-height:140%">' + percent[seriesIndex] + ' % </span>' +
                    '</div>' +
                    '</div>'

            }
        },
        plotOptions: {
            donut: {donut: {labels: {show: false}}},
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
    return {
        labels,
        series,
        pie: {
            pieDonutOption,
        }
    }
}