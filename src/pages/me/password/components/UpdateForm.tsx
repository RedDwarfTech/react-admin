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
  roles?: any;
} & Partial<API.User>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: number[]) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.User>;
};

interface UserProps {
  users: IUserState
  dispatch: Dispatch
  userListLoading: boolean
}

const UpdateForm: React.FC<UserProps & UpdateFormProps> = ({users,dispatch,onCancel, onSubmit,updateModalVisible, values}) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    // clear the state data when close the form
    clearLegacyData();
    // https://stackoverflow.com/questions/71523100/how-to-refresh-the-antd-pro-proformtext-initialvalue
    if(updateModalVisible){
      form.resetFields();
      form.setFieldsValue(values);
      getRoles(values);
    }
  },[form,updateModalVisible]);

  const clearLegacyData = () => {
    dispatch({
      type: 'users/clearCurrentUser',
      payload: {
        
      }
    }).then(()=>{
      
    });
  }

  const getSelectedRoles = (row: any) =>{
    dispatch({
      type: 'users/getCurrentUserRoles',
      payload: {
        userId: row.id
      }
    });
  };

  const getRoles = (row: any) => {
    dispatch({
      type: 'users/getSysRoleList',
      payload: {
        
      }
    }).then(() => {
      getSelectedRoles(row);
    });
  };

  const submitRoles = (formData: any) => {
    let roleIds:number[] = [];
    formData?.roles?.forEach((item: string | number) => {
      if(!BaseMethods.isNumber(item)){
        // https://stackoverflow.com/questions/71976565/how-to-handle-the-antd-proformselect-multiselect-submit-value
        let roleId = users?.roles?.filter(role=>role.name === item).map(role=>role.id);
        if(roleId){
          roleIds.push(Number(roleId));
        }
      }else{
        roleIds.push(Number(item));
      }
    });
    return onSubmit(roleIds);
  };

  function handleChange(values: any) {
    
    
  }

  if(BaseMethods.isNull(users)||BaseMethods.isNull(users.roles)){
    // the initial value only set for the first time
    // wait all data ready to render the form
    return (<div></div>);
  }
  let selectRoles: number[] = users?.userRoles?.map(role=>role.role_id);
  let rolesNames = BaseMethods.isNull(selectRoles)?[]:users?.roles?.filter(role=>selectRoles.includes(role.id)).map(role=>role.name);
  if(rolesNames.length>0){
    // do not using the initial value
    // it only works with the fisrt time that did not follow the latest value
    form.setFieldsValue({
      roles: rolesNames
    });
  }
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
    onFinish={submitRoles}
    >
      <ProFormSelect
          name="roles"
          width="md"
          fieldProps={{
            mode: 'multiple',
            onChange: handleChange
          }}
          // initialValue={rolesNames}
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