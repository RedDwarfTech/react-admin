import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, ArticleDetailProps, IArticleState, Loading, Dispatch, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { addInterview, updateInterview } from '@/services/ant-design-pro/apps/jobs/interview';
import { getDictRenderText } from '@/utils/data/dictionary';
import { Link, useLocation } from 'react-router-dom'
import { SortOrder } from 'antd/lib/table/interface';
import dayjs from 'dayjs';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ArticleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addInterview({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType, id: number) => {
  const hide = message.loading('Configuring');
  try {
    await updateInterview({
      company: fields.company,
      address: fields.address,
      city: fields.city,
      status: Number(fields.status),
      salary_range: fields.salary_range,
      job_link: fields.job_link,
      id: id,
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

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ArticleListItem[]) => {
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

const TableList: React.FC<ArticleDetailProps> = ({ articles, dispatch, loading }) => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ArticleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ArticleListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const location = useLocation();

  React.useEffect(() => {

  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.ArticleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.article.searchTable.title"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <div>
            <Link
              key={entity.id}
              to={"/apps/cruise/article/detail?id=" + entity.id}
              target="_blank"
            >{dom}</Link>
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.apps.cruise.article.searchTable.createdTime" defaultMessage="Status" />,
      dataIndex: 'created_time',
      hideInForm: true,
      render: (_, record) =>{ 
        return (<span>{dayjs.unix(parseInt(record.created_time.toString()) / 1000).format('YYYY-MM-DD HH:mm:ss')}</span>);
      }
    },
    {
      title: <FormattedMessage id="pages.apps.cruise.channel.searchTable.subName" defaultMessage="Status" />,
      dataIndex: 'channel_name',
      hideInForm: true,
      render: (_, record) =>{
        return (<Link
          key={record.id}
          to={"/apps/cruise/channel?id=" + record.sub_source_id}
          target="_blank"
        >{record.channel_name}</Link>);
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Link
          key={record.id}
          to={"/apps/cruise/article/detail?id=" + record.id}
          target="_blank"
        >详情</Link>
      ],
    },
  ];

  const handleRequest = (params: any, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
    let channelId = (location as any).query.channelId;
    debugger
    dispatch({
      type: 'articles/getArticlePage',
      payload: {
        ...params,
        pageNum: params.current,
        maxOffset: articles.maxOffset === 0 ? null : articles.maxOffset,
        channelId: Number(channelId)
      }
    });
  }

  let articleData = articles?.data as API.ArticleListItem[];;

  return (
    <PageContainer>
      <ProTable<API.ArticleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: "300" }}
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
        dataSource={articleData}
        loading={loading}
        pagination={articles?.pagination}
        request={(params: any, sort: any, filter: any) => {
          handleRequest(params, sort, filter);
          return Promise.resolve({
            data: articleData,
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
          id: 'pages.apps.jobs.interview.addInterview',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ArticleListItem);
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
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="company"
          placeholder="请输入公司名称"
        />
        <ProFormTextArea width="md" name="address" placeholder="请输入地址" />
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
          name="city"
          placeholder="请输入工作城市"
        />
      </ModalForm>
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

const mapStateToProps = ({ articles, loading }: { articles: IArticleState, loading: Loading }) => {
  return {
    articles,
    loading: loading.models.articles
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);