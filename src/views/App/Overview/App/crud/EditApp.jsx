import React, { useRef } from 'react'
import { Modal, Input, Form } from 'antd'

export default function EditApp(props) {
    const { visible, rowData: data = {}, onVisibleChange, onEdit, dispatch } = props

    const [form] = Form.useForm()

    const formRef = useRef()
    if (formRef.current) {
        formRef.current.setFieldsValue({
            remark: data ? data.remark : ''
        })
    }

    function onConfirm() {
        form.validateFields()
            .then(values => {
                let localValues = {
                    ...values,
                    appId: data.app_id
                }
                onEdit(localValues)
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
            <Modal title='编辑应用' visible={visible} onOk={onConfirm} onCancel={onCancel} forceRender={true}>
                <Form form={form} ref={formRef}>
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
