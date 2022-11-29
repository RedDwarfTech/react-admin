import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, MenuProps, IMenuState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { getDictRenderText } from '@/utils/data/dictionary';
import AddForm from './components/AddForm';

const handleRemove = async (selectedRows: API.MenuItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const MenuList: React.FC<MenuProps> = ({menus, dispatch, loading}) => {
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [disableEditField, handleDisableEditField] = useState<boolean>(false);
  const [recommendStatus] = useState<{
    editorPick: number|null,
    minimalReputation:number|null
  }>({
    editorPick: null,
    minimalReputation:0
  });
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.MenuItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.MenuItem[]>([]);
  const { initialState } = useModel('@@initialState');

  React.useEffect(()=>{
    let params = {
      pageNum: 1,
      pageSize: 10,
      parentId: 0
    };
    dispatch({
      type: 'menus/getMenuPage',
      payload: params
    });
  },[]);

  const handleUpdate = async (fields: FormValueType,id:number) => {
    const hide = message.loading('Configuring');
    try {
      let params = {
        id: id,
        sort: Number(fields.sort),
        path: fields.path,
        component: fields.component
      };
      dispatch({
        type: 'menus/updateMenu',
        payload: params
      });
      hide();
      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  const handleAdd = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
      let params = {
        name: fields.name,
        code: fields.code,
        parentId: fields.parentId.value,
        nameZh: fields.nameZh,
        path: fields.path,
        component: fields.component
      };
      dispatch({
        type: 'menus/addMenu',
        payload: params
      });
      hide();
      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  const renderOperate = (record: any) => {
      return (<div>
        <a
        key="edit_menu"
        onClick={() => {
          setCurrentRow(record);
          handleDisableEditField(false);
          handleUpdateModalVisible(true);
        }}
      >
        <FormattedMessage id="pages.permission.menu.searchTable.edit" defaultMessage="Configuration" />
      </a>
      <Divider type="vertical"></Divider>
      <a key="detail" onClick={() =>{
        setCurrentRow(record);
        handleDisableEditField(true);
        handleUpdateModalVisible(true);
      }}><FormattedMessage id="pages.permission.menu.searchTable.detail" defaultMessage="Configuration" />
      </a>
      </div>);
  }

  const intl = useIntl();

  const columns: ProColumns<API.MenuItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.permission.menu.searchTable.name"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'name_zh',
    },
    {
      title: <FormattedMessage id="pages.apps.jobs.interview.searchTable.status" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      render: (value) => {
        return (getDictRenderText("JOB_STATUS",Number(value),initialState));
      }
    },
    {
      title: (
        <FormattedMessage
          id="pages.permission.role.searchTable.createdTime"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'created_time',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return renderOperate(record)
      }
    },
  ];

  let rolesData = menus?.data;
  
  return (
    <PageContainer>
      <ProTable<API.MenuItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        dataSource={rolesData}
        pagination={menus.pagination}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <AddForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCreateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={createModalVisible}
        values={currentRow || {}}
      />
      <UpdateForm
        onSubmit={async (value) => {
          if(!currentRow){
            return
          }
          const success = await handleUpdate(value,currentRow.id);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
        disabled={disableEditField}
      />
    </PageContainer>
  );
};

const mapStateToProps = ({menus, loading}: {menus: IMenuState, loading: Loading}) => {
  return {
      menus,
      loading: loading.models.menus
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
