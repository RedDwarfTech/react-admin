import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { withRouter } from 'react-router-dom'
import { Layout, Divider, Input, Button, Form, Modal } from 'antd'
import { modifyPassword } from '@/service/cruise/UserService'

class Password extends Component {
    formRef = React.createRef()

    state = {
        loading: false,
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        isModalVisible: false
    }

    handleSubmit = values => {
        let oldPassword = this.formRef.current.getFieldValue('oldpassword')
        let newPassword = this.formRef.current.getFieldValue('newpassword')
        let newpasswordrepeat = this.formRef.current.getFieldValue('newpasswordrepeat')

        if (newPassword !== newpasswordrepeat) {
            alert('密码不一致')
            return
        }
        let user = localStorage.getItem('user')
        let userObj = JSON.parse(user)
        var request = {
            userName: userObj.token.phone,
            oldPassword: oldPassword,
            newPassword: newPassword,
            loginType: 1
        }
        modifyPassword(request)
    }

    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
    }

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
        const layout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 4
            }
        }
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 4
            }
        }

        const onFinish = values => {
            console.log('Success:', values)
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo)
        }

        const ChangePwd = () => {
            return (
                <Form
                    ref={this.formRef}
                    {...layout}
                    name='changepwd'
                    onFinish={this.handleSubmit}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label='旧密码'
                        name='oldpassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old password!'
                            }
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label='新密码'
                        name='newpassword'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!'
                            }
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label='重复新密码'
                        name='newpasswordrepeat'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!'
                            }
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            )
        }

        return (
            <Layout>
                <div>
                    <CustomBreadcrumb arr={['修改密码']}></CustomBreadcrumb>
                </div>
                <div className='base-style'>
                    <h3>修改密码</h3>
                    <Divider />
                    <ChangePwd />
                </div>
                <div>
                    <Modal
                        title='Basic Modal'
                        visible={this.state.isModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </Layout>
        )
    }
}
export default withRouter(Password)
