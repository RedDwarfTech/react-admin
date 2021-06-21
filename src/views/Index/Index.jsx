import React, { Component } from 'react'
import { Layout, Row, Col, Divider } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

import BarEcharts from './bar.jsx'
import PieEcharts from './pie.jsx'
import LineEcharts from './line.jsx'
import ScatterEcharts from './scatter.jsx'
import PictorialBarEcharts from './pictorialBar.jsx'
import { fetchDashboard } from '../../service/cruise/DashboardService'
import { AppleOutlined, FullscreenOutlined } from '@ant-design/icons'

class Index extends Component {
    componentDidMount() {
        fetchDashboard('')
    }

    fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    render() {
        let data = this.props.dashboard.dashboard

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div>接口无数据</div>
        }

        return (
            <Layout className='index animated fadeIn'>
                <Row gutter={24} className='index-header'>
                    <Col span={6}>
                        <div className='base-style wechat'>
                            <AppleOutlined type='app' className='icon-style' />
                            <div>
                                <span>{data.appCount}</span>
                                <div>应用数</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='base-style'>
                            <div className='bar-header'>
                                <div>图形全屏展示</div>
                                <FullscreenOutlined
                                    type='fullscreen'
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.fullToggle}
                                />
                            </div>
                            <Divider />
                            <BarEcharts />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                            <LineEcharts trend={this.props.dashboard.trend} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PieEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <ScatterEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PictorialBarEcharts />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Index
