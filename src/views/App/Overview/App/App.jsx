import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Table, Button, notification, Form, message } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getAppList, addApp } from '@/service/global/AppService'
import moment from 'moment'
import AddApp from './crud/AddApp'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '应用名',
        dataIndex: 'app_name',
        key: 'app_name'
    },
    {
        title: '应用编号',
        dataIndex: 'app_id',
        key: 'app_id'
    },
    {
        title: '应用英文缩写',
        dataIndex: 'app_abbr',
        key: 'app_abbr'
    },
    {
        title: '用户数',
        dataIndex: 'user_count',
        key: 'user_count'
    },
    {
        title: '上线状态',
        dataIndex: 'online_status',
        key: 'online_status',
        render: (text, record) => <span>{record.online_status === 1 ? '已上线' : '未上线'}</span>
    },
    {
        title: '创建时间',
        dataIndex: 'created_time',
        key: 'created_time',
        render: text => <span>{moment.unix(parseInt(text) / 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>详情</Button>
                <Divider type='vertical' />
            </span>
        )
    }
]
class App extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        isAddModalVisible: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    addApp = () => {
        this.setState({
            isAddModalVisible: true
        })
    }

    onPageChange = current => {
        this.setState({
            pageNum: current
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: current
        }
        getAppList(request)
    }

    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getAppList(request)
    }

    onAddModalCancelClick = (rowData = {}) => {
        const { isAddModalVisible } = this.state
        this.setState({ isAddModalVisible: !isAddModalVisible })
    }

    onCreateApp = values => {
        let params = {
            appName: values.appName,
            appAbbr: values.appAbbr
        }
        addApp(params)
    }

    componentDidMount() {
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum
        }
        getAppList(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.app.app.list
        let apps = this.props.app.app

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div></div>
        }

        let total = parseInt(apps.pagination.total)

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: apps.pagination.pageSize,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: () => `共${total}条`,
            current: apps.pagination.pageNum,
            total: total,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: current => this.onPageChange(current)
        }

        return (
            <Layout>
                <div>
                    <CustomBreadcrumb arr={['应用', '全局', '应用']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>应用管理</h3>
                            <Divider />
                            <Button
                                type='primary'
                                onClick={this.addApp}
                                shape='round'
                                style={{ width: 90, marginRight: 8 }}>
                                添加应用
                            </Button>
                            <Table columns={columns} dataSource={data} pagination={paginationProps} rowKey='id' />
                            <AddApp
                                visible={this.state.isAddModalVisible}
                                onVisibleChange={this.onAddModalCancelClick}
                                onCreate={this.onCreateApp}
                                {...{ data }}
                            />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(App)
