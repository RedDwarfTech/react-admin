import React, { useEffect } from 'react';
import {
  ModalForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import { connect, Dispatch, IUserState, Loading, useIntl } from 'umi';
import { getRolePair } from '@/utils/data/dictionary';
import { Form } from 'antd';
import BaseMethods from 'js-wheel/dist/src/utils/data/BaseMethods';

export type FormValueType = {
  company?: string;
  address?: string;
  city?: string;
  status?: number;
} & Partial<API.InterviewListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.InterviewListItem>;
};

interface UserProps {
  users: IUserState
  dispatch: Dispatch
  roleListLoading: boolean
}

const UpdateForm: React.FC<UserProps & UpdateFormProps> = ({users,dispatch,roleListLoading,onCancel, onSubmit,updateModalVisible, values}) => {
  const intl = useIntl();
  const [form] = Form.useForm()

  useEffect(() => {
    // https://stackoverflow.com/questions/71523100/how-to-refresh-the-antd-pro-proformtext-initialvalue
    if(updateModalVisible){
      form.resetFields();
      form.setFieldsValue(values);
      getRoles();
    }
  },[form,updateModalVisible]);

  const getSelectedRoles = () =>{
    dispatch({
      type: 'users/getCurrentUserRoles',
      payload: {
        
      }
    });
  };

  const getRoles = () => {
    dispatch({
      type: 'users/getSysRoleList',
      payload: {
        
      }
    }).then(() => {
      getSelectedRoles();
    });
  };

  let selectRoles: number[] = users?.userRoles?.map(role=>role.role_id);
  if(BaseMethods.isNull(selectRoles)){
    //debugger
    return (<div></div>);
  }
  let rolesNames = users?.roles?.filter(role=>selectRoles.includes(role.id)).map(role=>role.name)

  return (
    <ModalForm
    form = {form}
    title={intl.formatMessage({
      id: 'pages.apps.jobs.interview.updateInterview',
      defaultMessage: 'New rule',
    })}
    width="400px"
    visible={updateModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        onCancel();
      }
    }}
    onFinish={onSubmit}
    >
      <ProFormSelect
          name="status"
          width="md"
          fieldProps={{
            mode: 'multiple',
          }}
          initialValue={rolesNames}
          valueEnum={getRolePair(users?.roles)}
          label={
            intl.formatMessage({
              id: 'pages.permission.user.searchTable.roles',
              defaultMessage: '角色',
            })
          }
        >
        </ProFormSelect>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);