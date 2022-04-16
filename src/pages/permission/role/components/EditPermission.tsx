import React, { useEffect } from 'react';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { Dispatch, IRoleState, useIntl, useModel } from 'umi';
import { Form, Tabs, Tree } from 'antd';

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

const EditPermission: React.FC<RoleProps> = ({roles, dispatch, roleListLoading}) => {
  const intl = useIntl();
  const [form] = Form.useForm()
  const { initialState } = useModel('@@initialState');

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const treeData = [
    {
      name: 'parent 1',
      key: '0-0',
      children: [
        {
          name: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          
        }
      ],
    },
  ];

  useEffect(() => {
    //dispatch({
    //  type: 'roles/getTree',
    //  payload: {
    //    pageNum: 1,
    //    pageSize: 10,
    //    parentId: 0
    //  }
   // });
  },[]);

  return (
    <ModalForm
    form = {form}
    title={intl.formatMessage({
      id: 'pages.permission.role.searchTable.editPermission',
      defaultMessage: 'New rule',
    })}
    width="400px"
    //visible={props.updateModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        //props.onCancel();
      }
    }}
    //onFinish={props.onSubmit}
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
          fieldNames={{title: 'name'}}
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

export default EditPermission;


