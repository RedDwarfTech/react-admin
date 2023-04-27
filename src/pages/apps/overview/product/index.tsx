import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, IProductProps, connect, Dispatch, IProductState, Loading } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { SortOrder } from 'antd/lib/table/interface';


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
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

const ProductList: React.FC<IProductProps> = ({ products, dispatch, loading }) => {
 
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductListItem[]>([]);
  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const handleAdd = async (fields: API.ProductListItem) => {
    const hide = message.loading('正在添加');
    try {
      dispatch({
        type: 'products/addProduct',
        payload: fields
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


  const handleUpdate = async (fields: FormValueType,id:number) => {
    const hide = message.loading('Configuring');
    try {
      let params = {
        remark: fields.remark,
        id: id,
      };
      dispatch({
        type: 'products/editProduct',
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

  const columns: ProColumns<API.ProductListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.product.searchTable.productId"
          defaultMessage="Product ID"
        />
      ),
      dataIndex: 'product_id'
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.product.searchTable.productName"
          defaultMessage="Product name"
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
          id="pages.apps.overview.product.searchTable.remark"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'remark'
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.overview.product.searchTable.createdTime"
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
      type: 'products/getProductPage',
      payload: {
        ...params,
        pageNum: params.current
      }
    });
  }

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

  let productResult = products.data;

  return (
    <PageContainer>
      <ProTable<API.ProductListItem, API.PageParams>
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
        dataSource={productResult}
        pagination={products?.pagination}
        request={(params: any, sort: any, filter: any) => {
          handleRequest(params, sort, filter);
          return Promise.resolve({
            data: productResult,
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
          id: 'pages.apps.overview.product.addProduct',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ProductListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.apps.overview.product.nameRequired"
                  defaultMessage="Product name is required"
                />
              ),
            },
          ]}
          width="md"
          name="productName"
          placeholder="请输入产品线名称"
        />
        <ProFormTextArea 
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.apps.overview.product.descRequired"
                defaultMessage="Product desc is required"
              />
            ),
          },
        ]}
        width="md" 
        name="remark" 
        placeholder="请输入产品线说明" />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.apps.overview.product.abbrRequired"
                  defaultMessage="Product abbr is required"
                />
              ),
            },
          ]}
          width="md"
          name="productAbbr"
          placeholder="请输入产品线英文简写"
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

const mapStateToProps = ({ products, loading }: { products: IProductState, loading: Loading }) => {
  return {
    products,
    loading: loading.models.products
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);