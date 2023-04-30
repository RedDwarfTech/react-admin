import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel, IAppProps, connect, Dispatch, Loading, IAppState } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { SortOrder } from 'antd/lib/table/interface';

const handleRemove = async (selectedRows: API.InterviewListItem[]) => {
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

const TableList: React.FC<IAppProps> = ({ apps, dispatch, loading }) => {
 
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.AppListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.AppListItem[]>([]);
  const intl = useIntl();

  useEffect(() => {
    fetchProducts();
  },[]);

  const handleUpdate = async (fields: FormValueType,id:number) => {
    const hide = message.loading('Configuring');
    try {
      let params = {
        remark: fields.remark,
        id: id
      };
      dispatch({
        type: 'apps/editApp',
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
        key="edit_channel"
        onClick={() => {
          setCurrentRow(record);
          handleUpdateModalVisible(true);
        }}
      >
        <FormattedMessage id="pages.apps.cruise.channel.searchTable.edit" defaultMessage="Configuration" />
      </a>
    </div>);
  };

  const handleAdd = async (fields: API.AppListItem) => {
    const hide = message.loading('正在添加');
    try {
      dispatch({
        type: 'apps/addApp',
        payload: {
          productId: fields.product_id,
          appName: fields.app_name,
          remark: fields.remark,
          appAbbr: fields.app_abbr,
        }
      });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  const columns: ProColumns<API.AppListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.appId"
          defaultMessage="Rule ID"
        />
      ),
      dataIndex: 'app_id'
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.appAbbr"
          defaultMessage="App abbr"
        />
      ),
      dataIndex: 'app_abbr'
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.appName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'app_name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.productName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'product_name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.remark"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'remark',
      sorter: true,
      hideInForm: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.list.searchTable.createdTime"
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
      },
    },
  ];

  const handleRequest = (params: any, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
    dispatch({
      type: 'apps/getAppPage',
      payload: {
        ...params,
        pageNum: params.current
      }
    });
  }

  const fetchProducts = () => {
    dispatch({
      type: 'apps/getProductList',
      payload: {
      }
    });
  }

  let appResult = apps.data;

  return (
    <PageContainer>
      <ProTable<API.AppListItem, API.PageParams>
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
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        dataSource={appResult}
        pagination={apps?.pagination}
        request={(params: any, sort: any, filter: any) => {
          handleRequest(params, sort, filter);
          return Promise.resolve({
            data: appResult,
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
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.apps.overview.app.addApp',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.AppListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormSelect
          name="product_id"
          width="md"
          options={apps.products?.map((item: any)=>({
            label: item.product_name,
            value: item.product_id,
          }))}
          label={
            intl.formatMessage({
              id: 'pages.apps.overview.product.searchTable.productName',
              defaultMessage: '产品',
            })
          }
        >
        </ProFormSelect>
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="app_name"
          placeholder="请输入应用名称"
        />
        <ProFormTextArea width="md" name="remark" placeholder="请输入应用描述" />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="app_abbr"
          placeholder="请输入应用简写"
        />
      </ModalForm>
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
      />
    </PageContainer>
  );
};

const mapStateToProps = ({ apps, loading }: { apps: IAppState, loading: Loading }) => {
  return {
    apps,
    loading: loading.models.apps
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);

