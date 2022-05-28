import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, ITagPageProps, ITagState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { SortOrder } from 'antd/lib/table/interface';
import AddForm from './components/AddForm';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.DictItem[]) => {
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

const TagList: React.FC<ITagPageProps> = ({ tags, dispatch, loading }) => {
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
    
  }

  const handleUpdate = async (fields: FormValueType, id: number) => {
    
  };

  const handleAdd = async (fields: any) => {
    try {
      let params = {
        userName: fields.userName,
        phone: fields.phone,
        orgId: fields.org.value
      };
      dispatch({
        type: 'tags/addNewUser',
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
      type: 'tags/getTagPage',
      payload: {
        ...params,
        pageNum: params.current,
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
          id="pages.system.dict.searchTable.type"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'tag_name',        
    },
    {
      title: (
        <FormattedMessage
          id="pages.system.dict.searchTable.typeName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'dict_type_name',        
    },
    {
      title: <FormattedMessage id="pages.system.dict.searchTable.key" defaultMessage="Status" />,
      dataIndex: 'key',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.system.dict.searchTable.name" defaultMessage="--" />,
      dataIndex: 'show_value',
      hideInForm: true,
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

  let rolesData = tags?.data;

  return (
    <PageContainer>
      <ProTable<API.TagItem, API.PageParams>
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
        pagination={tags?.pagination}
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

const mapStateToProps = ({ tags, loading }: { tags: ITagState, loading: Loading }) => {
  return {
    tags,
    loading: loading.models.tags
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagList);

