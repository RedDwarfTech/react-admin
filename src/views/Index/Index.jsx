import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'
import LineEcharts from './line.jsx'
import { fetchDashboard } from '@/service/cruise/DashboardService'
import { AppleOutlined } from '@ant-design/icons'

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
            return <div>loading...</div>
        }

        return (
            <Layout className='index animated fadeIn'>
                <Row gutter={24} className='index-header'>
                    <Col span={6}>
                        <div className='base-style wechat'>
                            <AppleOutlined type='app' className='icon-style' />
                            <div>
                                <span>{data.app_count}</span>
                                <div>应用数</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                            <LineEcharts trend={this.props.dashboard.trend} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Index
