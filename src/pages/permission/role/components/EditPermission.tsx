import React, { Key, useEffect, useState } from 'react';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { connect, Dispatch, IRoleState, Loading, useIntl } from 'umi';
import { Form, Tabs, Tree } from 'antd';
import { BaseMethods } from 'rdjs-wheel';

const { TabPane } = Tabs;

export type FormValueType = {
  company?: string;
  address?: string;
  city?: string;
  status?: number;
} & Partial<API.InterviewListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.MenuItem[]|undefined, roleId: number|undefined) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RoleItem>;
};

interface RoleProps {
  roles: IRoleState
  dispatch: Dispatch
  roleListLoading: boolean
}

const EditPermission: React.FC<RoleProps & UpdateFormProps> = ({roles, dispatch, updateModalVisible, onSubmit, onCancel, values}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [selectNodes, handleSelectedNodes] = useState<API.MenuItem[]>();

  useEffect(() => {
    clearLegacyData();
    if(updateModalVisible){
      form.resetFields();
      form.setFieldsValue(values);
      getMenuTree();
    }
  },[updateModalVisible]);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checked: Key[] | {checked: Key[];halfChecked: Key[];}, info: any) => {
    handleSelectedNodes(info.checkedNodes);
  };

  const onFinalSubmit = async () => {
    onSubmit(selectNodes, values.id);
  };

  const getMenuTree = () =>{
    dispatch({
      type: 'roles/getMenuTree',
      payload: {
        pageNum: 1,
        pageSize: 10,
        parentId: 0,
        roleId: values.id
      }
    }).then(() =>{});
  }

  const clearLegacyData = () => {
    dispatch({
      type: 'roles/clearRoleState',
      payload: {}
    });
  }

  const treeData: any = roles?.menus;
  const selectedMenus = roles?.selectedMenus;

  if(BaseMethods.isNull(treeData)){
    // do not trigger the first render when treeData is null
    return (<div></div>);
  }

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
        onCancel();
      }
    }}
    onFinish={onFinalSubmit}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="菜单权限" key="1">
        <Tree
          key={values.id}
          checkable
          defaultExpandedKeys={selectedMenus}
          defaultSelectedKeys={selectedMenus}
          defaultCheckedKeys={selectedMenus}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
          fieldNames={{title: 'name_zh',key: 'tree_id_path'}}
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
    roleListLoading: loading.models.roles
 }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
 return {
     dispatch
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPermission);


