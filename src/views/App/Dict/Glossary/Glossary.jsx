import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Input, Button, notification, Form, Tag, Tabs, Card, Statistic } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getDomainPage } from '@/service/app/cernitor/domain/DomainService'
import { getOrderByClause } from '@/api/StringUtil'
import queryString from 'query-string'

const { Search } = Input
const { TabPane } = Tabs

class Glossary extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        channelId: null,
        editorPick: null,
        name: null,
        defaultActiveKey: 1
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    onPageChange = (current, e) => {
        if (e === undefined) {
            // 如果是点击翻页触发的事件，e为10
            // 如果是由检索等其他操作触发的页面改变事件，则e为undefined
            // 不做任何操作
            // 避免事件重复触发
            return
        }
        this.setState({
            pageNum: current
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: current
        }
        getDomainPage(request)
    }

    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getDomainPage(request)
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        if ((params && Object.keys(params).length === 0) || params === undefined) {
            let request = {
                pageSize: this.state.pageSize,
                pageNum: this.state.pageNum
            }
            getDomainPage(request)
            return
        }
        this.setState({
            channelId: params.channelId
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            subSourceId: params.channelId
        }
        getDomainPage(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    renderSearchResult = () => {
        return (
            <div>
                <Card title='Card title'>
                    <Card type='inner' title='Inner Card title' extra={<a href='#'>More</a>}>
                        Inner Card content
                    </Card>
                    <Card style={{ marginTop: 16 }} type='inner' title='Inner Card title' extra={<a href='#'>More</a>}>
                        Inner Card content
                    </Card>
                </Card>
            </div>
        )
    }

    render() {
        let data = this.props.domain.domain.list

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', '红矮星词典', '翻译']}></CustomBreadcrumb>
                </div>
                <Search placeholder='input search text' enterButton='Search' size='large' loading />
                {this.renderSearchResult()}
            </Layout>
        )
    }
}

export default withRouter(Glossary)
