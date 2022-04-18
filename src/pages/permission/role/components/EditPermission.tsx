import React, { useEffect } from 'react';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { connect, Dispatch, IRoleState, Loading, useIntl, useModel } from 'umi';
import { Form, Tabs, Tree } from 'antd';
import BaseMethods from "js-wheel/dist/src/utils/data/BaseMethods";

const { TabPane } = Tabs;

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

interface RoleProps {
  roles: IRoleState
  dispatch: Dispatch
  roleListLoading: boolean
}

const EditPermission: React.FC<RoleProps & UpdateFormProps> = ({roles, dispatch, updateModalVisible, onSubmit, onCancel}) => {
  const intl = useIntl();
  const [form] = Form.useForm()
  const { initialState } = useModel('@@initialState');

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const treeData = roles?.menus;
  if(!BaseMethods.isNull(treeData)) {
    //debugger
  }

  useEffect(() => {
    if(updateModalVisible){
      dispatch({
        type: 'roles/getMenuTree',
        payload: {
          pageNum: 1,
          pageSize: 10,
          parentId: 0
        }
      });
    }
  },[updateModalVisible]);

  return (
    <ModalForm
    form = {form}
    title={intl.formatMessage({
      id: 'pages.permission.role.searchTable.editPermission',
      defaultMessage: 'New rule',
    })}
    width="400px"
    visible={updateModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        debugger
        onCancel();
      }
    }}
    onFinish={onSubmit}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="菜单权限" key="1">
        <Tree
          checkable
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-0', '0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={onSelect}
          treeData={treeData}
          fieldNames={{title: 'name',key: 'id'}}
        />
        </TabPane>
        <TabPane tab="控件权限" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="数据权限" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    
    </ModalForm>
  );
};

const mapStateToProps = ({roles, loading}: {roles: IRoleState, loading: Loading}) => {
  return {
    roles,
    userListLoading: loading.models.roles
 }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
 return {
     dispatch
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPermission);


