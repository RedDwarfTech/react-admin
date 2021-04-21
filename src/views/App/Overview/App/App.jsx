import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Table, Button, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getUserList } from '../../../../service/cruise/UserService'
import moment from 'moment'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '注册时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{moment.unix(parseInt(text)/1000).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
        title: '用户名',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>详情</Button>
                <Divider type='vertical' />
                <Button type='link'>删除</Button>
            </span>
        )
    }
]
class App extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10
    }

    enterLoading = () => {
        this.setState({
            loading: true
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
        getUserList(request)
    }
    changePageSize(pageSize, current) {
        // 将当前改变的每页条数存到state中
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getUserList(request)
    }

    componentDidMount() {
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum
        }
        getUserList(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.user.user.list
        let users = this.props.user.user

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div></div>
        }

        let total = parseInt(users.pagination.total)

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: users.pagination.pageSize,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: () => `共${total}条`,
            current: users.pagination.pageNum,
            total: total,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: current => this.onPageChange(current)
        }

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '用户']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>用户管理</h3>
                            <Divider />
                            <Table columns={columns} dataSource={data} pagination={paginationProps} rowKey='id' />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(App))
