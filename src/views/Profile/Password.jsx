import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { withRouter } from 'react-router-dom'   
import { Layout, Divider, Input, Button, Form, Modal } from 'antd'
import { modifyPassword } from '../../service/cruise/UserService'

class Password extends Component {
    state = {
        loading: false,
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        isModalVisible: false
    }

    handleSubmit = values => {
        let oldPassword = this.state.oldPassword
        let newPassword = this.state.newPassword

        if (newPassword !== oldPassword) {
            alert('新旧密码不一致')
            return
        }
        let user = localStorage.getItem('user')
        let userObj = JSON.parse(user)
        var request = {
            userName: userObj.token.phone,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            loginType: 1
        }
        modifyPassword(request)
    }

    handleOldPasswordChange = e => {
        if(this.state.oldPassword !== e.target.value){
            this.setState({
                oldPassword : e.target.value
            })
        }
    }

    handleNewPasswordChange = e => {
        if(this.state.newPassword !== e.target.value){
            this.setState({
                newPassword : e.target.value
            })
        }
    }

    handleRepeatNewPasswordChange = e => {
        if(this.state.repeatNewPassword !== e.target.value){
            this.setState({
                repeatNewPassword : e.target.value
            })
        }
    }

     handleOk = () => {
        this.setState({
            isModalVisible: false
        });
      };
    
       handleCancel = () => {
        this.setState({
            isModalVisible: false
        });
      };

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

        const ChangePwd = () => (
            <Form
                {...layout}
                name='changepwd'
                onFinish={onFinish}
                onSubmit={this.handleSubmit}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    label='旧密码'
                    name='oldpassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!'
                        }
                    ]}>
                    <Input.Password value={this.state.oldPassword} onChange={this.handleOldPasswordChange}/>
                </Form.Item>

                <Form.Item
                    label='新密码'
                    name='newpassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        }
                    ]}>
                    <Input.Password value={this.state.newPassword} onChange={this.handleNewPasswordChange}/>
                </Form.Item>

                <Form.Item
                    label='重复新密码'
                    name='newpasswordrepeat'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        }
                    ]}>
                    <Input.Password value={this.state.repeatNewPassword} onChange={this.handleRepeatNewPasswordChange}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
        
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
                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>Some contents...</p>
                </Modal>
                </div>
            </Layout>
        )
    }
}
export default withRouter(Form.create()(Password))
