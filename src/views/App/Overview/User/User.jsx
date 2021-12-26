import React, { Component, Fragment } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Table, Button, notification } from 'antd'
import '@/style/view-style/table.scss'
import '@/style/view-style/user/user.scss'
import { withRouter } from 'react-router-dom'
import { getUserList } from '@/service/user/profile/UserService'
import moment from 'moment'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '注册时间',
        dataIndex: 'created_time',
        key: 'createdTime',
        render: text => <span>{moment.unix(parseInt(text) / 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
        title: '用户名',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: '用户头像',
        dataIndex: 'avatar_url',
        key: 'avatar_url',
        render: val => {
            if (val) {
                return (
                    <Fragment>
                        <span>
                            <img
                                style={{ height: '4vh', width: '4vw' }}
                                src={val}
                                referrerPolicy='no-referrer'
                                alt='img'
                            />
                        </span>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <span></span>
                    </Fragment>
                )
            }
        }
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
    },
    {
        title: '所属应用',
        dataIndex: 'app_id',
        key: 'app_id'
    },
    {
        title: '用户状态',
        dataIndex: 'user_status',
        key: 'user_status'
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
class User extends Component {
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

export default withRouter(User)
