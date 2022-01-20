import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'antd'

export default function EditApp(props) {
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
            <Modal title='编辑应用' visible={visible} onOk={onConfirm} onCancel={onCancel}>
                <Form form={form}>
                    <Form.Item
                        label='上线状态'
                        name='onlineStatus'
                        rules={[
                            {
                                required: true,
                                message: '请指定上线状态!'
                            },
                        ]}>
                        <Input placeholder='上线状态' />
                    </Form.Item>
                    <Form.Item
                        label='备注'
                        name='remark'
                        rules={[
                            {
                                required: true,
                                message: '请输入备注'
                            },
                            {
                                max: 128,
                                message: '超过字符数限制'
                            }
                        ]}>
                        <Input placeholder='请输入备注' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
