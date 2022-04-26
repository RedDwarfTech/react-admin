import React from 'react'
import { Layout, Divider, Input, Button, Form } from 'antd'
import { IUserState } from '@/models/permission/user/UserModel'
import { connect, Dispatch, IRoleState } from 'umi'

interface IUserPageProps {
  users: IUserState
  dispatch: Dispatch
  userListLoading: boolean
}

const Password: React.FC<IUserPageProps> = ({ users, dispatch, userListLoading }) => {

  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    if (values.newpassword !== values.newpasswordrepeat) {
      debugger
      alert('密码不一致')
      return
    }
    let user: any = localStorage.getItem('user')
    let userObj = JSON.parse(user)
    var request = {
      userName: userObj.token.phone,
      oldPassword: values.oldpassword,
      newPassword: values.newpassword,
      loginType: 1
    }
    changePasswordImpl(request);
  }

  const changePasswordImpl = (request:any) => {
    dispatch({
      type: 'users/changeUserPwd',
      payload: request
    });
  }

  const ChangePwd = () => {
    return (
      <Form
        form={form}
        onFinish={handleSubmit}
        name='changepwd'>
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

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout>
      <div className='base-style'>
        <h3>修改密码</h3>
        <Divider />
        <ChangePwd />
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ users, loading }: { users: IRoleState, loading: Loading }) => {
  return {
    users,
    userListLoading: loading.models.users
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);
