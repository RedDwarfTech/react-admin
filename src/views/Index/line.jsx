import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import moment from 'moment'
import { fetchTrend } from '../../service/cruise/DashboardService'

class Line extends Component {
    state = {
        trend: {}
    }

    componentDidMount() {
        fetchTrend({})
    }
    render() {
        let data = this.props.trend

        if ((data && Object.keys(data).length === 0) || data === undefined) {
        } else {
            let lineElement = document.getElementById('line')
            if (lineElement == null) {
                return <div>暂无数据</div>
            }
            let myChart = echarts.init(lineElement)
            myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['文章', '频道']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:
                        this.props.trend.length > 0
                            ? [
                                  ...new Set(
                                      this.props.trend.map(item => {
                                          return moment.unix(parseInt(item.statisticTime) / 1000).format('YYYY-MM-DD')
                                      })
                                  )
                              ]
                            : ['']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '文章',
                        type: 'line',
                        data:
                            this.props.trend.length > 0
                                ? this.props.trend.filter(item => item.trendItem === 1).map(item => item.increNum)
                                : [1]
                    },
                    {
                        name: '频道',
                        type: 'line',
                        data:
                            this.props.trend.length > 0
                                ? this.props.trend
                                      .filter(item => item.trendItem === 2)
                                      .sort((a, b) => a.statisticTime - b.statisticTime)
                                      .map(item => item.increNum)
                                : [1]
                    }
                ]
            })

            window.addEventListener('resize', function() {
                myChart.resize()
            })
        }

        return <div id='line' style={{ height: 300 }}></div>
    }
}

export default Line
