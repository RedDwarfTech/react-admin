import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { withRouter } from 'react-router-dom'
import { Layout, Divider, Input, Button, Form } from 'antd'

class Password extends Component {
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
                name='basic'
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
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
                    <Input />
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
                    <Input.Password />
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
            </Layout>
        )
    }
}
export default withRouter(Form.create()(Password))
