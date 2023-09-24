import React, { useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { connect, Dispatch, IUserState, Loading, useIntl } from 'umi';
import { Form } from 'antd';
import { BaseMethods } from 'rdjs-wheel';

export type FormValueType = {
  phone?: string;
  userName?: string;
  org?: number;
} & Partial<API.User>;

export type AddFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  addModalVisible: boolean;
  values: Partial<API.User>;
};

interface UserProps {
  users: IUserState
  dispatch: Dispatch
  userListLoading: boolean
}

const AddForm: React.FC<UserProps & AddFormProps> = ({users,onCancel, onSubmit,addModalVisible, values}) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    if(addModalVisible){
      form.resetFields();
      form.setFieldsValue(values);
    }
  },[form,addModalVisible]);

  let selectRoles: number[] = users?.userRoles?.map(role=>role.role_id);
  let rolesNames = BaseMethods.isNull(selectRoles)?[]:users?.roles?.filter(role=>selectRoles.includes(role.id)).map(role=>role.name);
  if(rolesNames.length>0){
    // debugger
  }
  return (
    <ModalForm
    title="新增"
    form = {form}
    
    width="400px"
    visible={addModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        onCancel();
      }
    }}
    onFinish={onSubmit}
    >
      <ProFormText
          name="dict_type"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.dict.searchTable.type',
              defaultMessage: '类型',
            })
          }
        >
      </ProFormText>
      <ProFormText
          name="dict_type_name"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            }
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.dict.searchTable.typeName',
              defaultMessage: '类型名',
            })
          }
        >
      </ProFormText>
      <ProFormText
          name="key"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            }
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.dict.searchTable.key',
              defaultMessage: '键',
            })
          }
        >
      </ProFormText>
      <ProFormText
          name="value"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.dict.searchTable.value',
              defaultMessage: '值',
            })
          }
        >
      </ProFormText>
      <ProFormText
          name="show_value"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.dict.searchTable.showValue',
              defaultMessage: '显示值',
            })
          }
        >
      </ProFormText>
    </ModalForm>
  );
};

const mapStateToProps = ({users, loading}: {users: IUserState, loading: Loading}) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);