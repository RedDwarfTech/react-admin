import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '@/api'
import { API } from '@/api/config'
import '@/style/view-style/login.scss'

class Login extends Component {
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
                            let token = res.data.result.token;
                            localStorage.setItem('token', token)
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

    componentDidMount() {}

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>后台管理系统</h3>
                        <Divider />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input
                                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='用户名'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(
                                    <Input
                                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type='password'
                                        placeholder='密码'
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    loading={this.state.loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Login))
