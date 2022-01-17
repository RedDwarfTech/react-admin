import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'antd'

export default function AddApp(props) {
    const { visible, rowData: data = {}, onVisibleChange, onCreate, dispatch } = props

    const [form] = Form.useForm()

    function onConfirm() {
        form.validateFields()
            .then(values => {
                onCreate(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info)
            })
    }

    function onCancel() {
        onVisibleChange()
    }

    return (
        <>
            <Modal title='添加应用' visible={visible} onOk={onConfirm} onCancel={onCancel}>
                <Form form={form}>
                    <Form.Item
                        label='应用名'
                        name='appName'
                        rules={[
                            {
                                required: true,
                                message: '请填写应用的名称!'
                            },
                            {
                                max: 32,
                                message: '超过字符数限制!'
                            }
                        ]}>
                        <Input placeholder='请为你的应用取一个正式的名称，最大32个字符' />
                    </Form.Item>
                    <Form.Item
                        label='应用缩写'
                        name='appAbbr'
                        rules={[
                            {
                                required: true,
                                message: '请输入应用英文缩写'
                            },
                            {
                                max: 32,
                                message: '超过字符数限制'
                            }
                        ]}>
                        <Input placeholder='应用全局唯一英文缩写，提交后不可更改且不可再次使用!' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
