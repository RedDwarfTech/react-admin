import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import axios from '@/api'
import { API } from '@/api/config'
import { withRouter } from 'react-router-dom'

const { Link } = Anchor

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <Button type='link'>{text}</Button>
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green'
                    if (tag === 'loser') {
                        color = 'volcano'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    )
                })}
            </span>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>Invite {record.name}</Button>
                <Divider type='vertical' />
                <Button type='link'>Delete</Button>
            </span>
        )
    }
]

const data = []
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: `${i + 1}`,
        address: `London, Park Lane no. ${i}`,
        tags: ['nice', 'developer']
    })
}

class Channel extends Component {
    state = {
        loading: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleLoginSuccess = values => {
        // 这里可以做权限校验 模拟接口返回用户权限标识
        switch (values.username) {
            case 'admin':
                values.auth = 0
                break
            default:
                values.auth = 0
        }

        localStorage.setItem('user', JSON.stringify(values))
        this.enterLoading()
        message.success('登录成功!')
        this.props.history.push('/')
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password } = values
                var request = {
                    phone: username,
                    password: password
                }
                axios
                    .post(`${API}/manage/user/login`, JSON.stringify(request))
                    .then(res => {
                        if (res.data.statusCode === '200' && res.data.resultCode === '200') {
                            //localStorage.setItem('user', JSON.stringify(res.data.data.user))
                            localStorage.setItem('token', res.data.result)
                            this.props.history.push('/')
                            this.handleLoginSuccess(values)
                        } else {
                            // 这里处理一些错误信息
                            message.error('登录失败：' + res.data.msg)
                            return
                        }
                    })
                    .catch(err => {})
            }
        })
    }

    componentDidMount() {
        var request ={}
        axios
        .post(`${API}/manage/sub/source/page`, JSON.stringify(request))
        .then(res => {
            if (res.data.statusCode === '200' && res.data.resultCode === '200') {
                let datasource = res.data.result;
                console.log(datasource);
            } else {
                message.error('加载失败：' + res.data.msg)
                return
            }
        })
        .catch(err => {})
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '订阅源']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>订阅源管理</h3>
                            <Divider />
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Channel))
