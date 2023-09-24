import React, { useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { connect, Dispatch, FormattedMessage, IUserState, Loading, useIntl } from 'umi';
import { Form } from 'antd';
import { BaseMethods } from 'rdjs-wheel';
import { orgTree } from '@/services/ant-design-pro/permission/org/org';

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

const AddForm: React.FC<UserProps & AddFormProps> = ({users,dispatch,onCancel, onSubmit,addModalVisible, values}) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  useEffect(() => {
    if(addModalVisible){
      form.resetFields();
      form.setFieldsValue(values);
    }
  },[form,addModalVisible]);

  const loadOrgTree = async () => {
    let params = {
      pageNum: 1,
      pageSize: 10,
      parentId: 0,
    };
    let result:any = (await orgTree(params));
    return result;
  }

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
          name="userName"
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
              id: 'pages.permission.user.searchTable.userName',
              defaultMessage: '用户名',
            })
          }
        >
      </ProFormText>
      <ProFormText
          name="phone"
          width="md"
          initialValue={''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
            { 
              pattern: /^1[3456789]\d{9}$/, 
              message: '手机号码格式错误' 
            }
          ]}
          label={
            intl.formatMessage({
              id: 'pages.permission.user.searchTable.phone',
              defaultMessage: '电话',
            })
          }
        >
      </ProFormText>
      <ProFormTreeSelect
        name="org"
        label={intl.formatMessage({
          id: 'pages.permission.org.searchTable.org',
          defaultMessage: '部门名称',
        })}
        width="md"
        request={async () => {
          return loadOrgTree();
        }}
        fieldProps={{
          showArrow: false,
          filterTreeNode: true,
          showSearch: true,
          dropdownMatchSelectWidth: false,
          labelInValue: true,
          autoClearSearchValue: true,
          multiple: false,
          treeNodeFilterProp: 'title',
          fieldNames: {
            label: 'org_name',
            key: 'tree_id_path',
            value: 'id',
          },
        }}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleName.nameRules"
                defaultMessage="请输入规则名称！"
              />
            ),
          },
        ]}
      />
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