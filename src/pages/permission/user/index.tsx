import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { useIntl, FormattedMessage, useModel, IRoleState, IUserState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { getDictRenderText, getOrgRenderText } from '@/utils/data/dictionary';
import { SortOrder } from 'antd/lib/table/interface';
import AddForm from './components/AddForm';
import styles from './user.less';

interface IUserPageProps {
  users: IUserState
  dispatch: Dispatch
  userListLoading: boolean
}

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.AdminUserItem[]) => {
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

const UserList: React.FC<IUserPageProps> = ({ users, dispatch, userListLoading }) => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [recommendStatus] = useState<{
    editorPick: number | null,
    minimalReputation: number | null
  }>({
    editorPick: null,
    minimalReputation: 0
  });

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.AdminUserItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.AdminUserItem[]>([]);
  const { initialState } = useModel('@@initialState');

  React.useEffect(() => {
  }, []);


  const loadDefaultData = async () => {
    let params = {
      pageNum: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'users/getUserPage',
      payload: params
    });
  }

  const handleUpdate = async (fields: FormValueType, id: number) => {
    const hide = message.loading('Configuring');
    try {
      let params = {
        roleIds: fields,
        userId: id
      };
      dispatch({
        type: 'users/saveCurrentUserRoles',
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

  const handleAdd = async (fields: any) => {
    try {
      let params = {
        userName: fields.userName,
        phone: fields.phone,
        orgId: fields.org.value
      };
      dispatch({
        type: 'users/addNewUser',
        payload: params
      }).then(() => {
        loadDefaultData();
      });
      return true;
    } catch (error) {
      message.error('Failed, please try again!');
      return false;
    }
  }

  const renderOperate = (record: any) => {
    return (<div>
      <a
        key="job_detail"
        onClick={() => {
          setCurrentRow(record);
          handleUpdateModalVisible(true);
        }}
      >
        <FormattedMessage id="pages.permission.user.searchTable.edit" defaultMessage="Configuration" />
      </a></div>);
  }

  const handleRequest = (params: any, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
    dispatch({
      type: 'users/getUserPage',
      payload: {
        ...params,
        pageNum: params.current,
        editorPick: recommendStatus.editorPick,
        minimalReputation: recommendStatus.minimalReputation,
      }
    });
  }

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.AdminUserItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.permission.user.searchTable.userName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'user_name',
      render: (dom, entity) => {
        return (<Fragment>
              <span>
                <img className={styles.pre} 
                src={'https://p4.music.126.net/uHo-9R1egcJG6JjQmJjM6g==/18677404023421806.jpg'} referrerPolicy="no-referrer" alt="img" />
                <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
              </span>
            </Fragment>);
      },
    },
    {
      title: <FormattedMessage id="pages.permission.user.searchTable.nickName" defaultMessage="Status" />,
      dataIndex: 'nickname',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.permission.user.searchTable.phone" defaultMessage="--" />,
      dataIndex: 'phone',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.permission.user.searchTable.orgName" defaultMessage="Status" />,
      dataIndex: 'org_id',
      hideInForm: true,
      render: (value) => {
        return (getOrgRenderText(Number(value), initialState));
      }
    },
    {
      title: <FormattedMessage id="pages.apps.jobs.interview.searchTable.status" defaultMessage="Status" />,
      dataIndex: 'user_status',
      hideInForm: true,
      render: (value) => {
        return (getDictRenderText("USER_STATUS", Number(value), initialState));
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

  let rolesData = users?.data;

  return (
    <PageContainer>
      <ProTable<API.RoleItem, API.PageParams>
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
              handleAddModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        dataSource={rolesData}
        pagination={users?.pagination}
        request={(params: any, sort: any, filter: any) => {
          handleRequest(params, sort, filter);
          return Promise.resolve({
            data: rolesData,
            success: true,
          });
        }}
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
            handleAddModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddModalVisible(false);
          setCurrentRow(undefined);
        }}
        addModalVisible={addModalVisible}
        values={currentRow || {}}
      />
      <UpdateForm
        onSubmit={async (value) => {
          if (!currentRow) {
            return
          }
          const success = await handleUpdate(value, currentRow.id);
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
      />
    </PageContainer>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

