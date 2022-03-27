import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Radio } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, IChannelState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { removeRule } from '@/services/ant-design-pro/api';
import { addInterview, updateInterview } from '@/services/ant-design-pro/apps/jobs/interview';
import { getDictRenderText } from '@/utils/data/dictionary';
import { SortOrder } from 'antd/lib/table/interface';

interface IChannelPageProps {
  channels: IChannelState
  dispatch: Dispatch
  channelListLoading: boolean
}

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.InterviewListItem) => {
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
const handleUpdate = async (fields: FormValueType,id:number) => {
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

const TableList: React.FC<IChannelPageProps> = ({channels, dispatch, channelListLoading}) => {
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
  const [recommendStatus, hanleUpdateRecommendStatus] = useState({
    editorPick: 0,
    minimalReputation:0
  });

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterviewListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterviewListItem[]>([]);
  const { initialState } = useModel('@@initialState');

  React.useEffect(()=>{
    // Effect Hook 相当于componentDidMount、componentDidUpdate和componentWillUnmount的组合体。
    // 传递一个空数组（[]）作为第二个参数，这个 Effect 将永远不会重复执行，因此可以达到componentDidMount的效果。
    let params = {
      pageNum: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'channels/getChannelPage',
      payload: params
    });
  },[]);

  const onRadioClick = (e: any) => {
    hanleUpdateRecommendStatus({
      editorPick: Number(e.target.value),
      minimalReputation: Number(e.target.value) === 0?5:0
    });
    let params = {
      pageNum: 1,
      pageSize: 10,
      editorPick: Number(e.target.value),
      minimalReputation: Number(e.target.value) === 0?5:0
    };
    dispatch({
      type: 'channels/getChannelPage',
      payload: params
    });
  };

  const handleRequest = (params:any, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) =>{
    dispatch({
      type: 'channels/getChannelPage',
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

  const columns: ProColumns<API.InterviewListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.subName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'sub_name',
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
          id="pages.apps.cruise.channel.searchTable.createdTime"
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
      title: <FormattedMessage id="pages.apps.jobs.interview.searchTable.infoSource" defaultMessage="Status" />,
      dataIndex: 'info_source',
      hideInForm: true,
      render: (value) => {
        return (getDictRenderText("INTERVIEW_INFO_SOURCE",Number(value),initialState));
      }
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.reputation"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'reputation'
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);            
          }}
        >
          <FormattedMessage id="pages.apps.jobs.interview.updateInterview" defaultMessage="Configuration" />
        </a>,
        <a
        key="job_detail"
        onClick={() => {
          window.open(record.job_link.toString())            
        }}
      >
        <FormattedMessage id="pages.apps.jobs.interview.jobDetail" defaultMessage="Configuration" />
      </a>,
      ],
    },
  ];

  let channelData = channels.data.data;
  if(channelData){
    
  }

  return (
    <PageContainer>
      <Radio.Group onChange={(e) => onRadioClick(e,dispatch)}style={{ marginBottom: 16 }}>
          <Radio.Button value="-1">全部</Radio.Button>
          <Radio.Button value="0">待推荐</Radio.Button>
          <Radio.Button value="1">已推荐</Radio.Button>
        </Radio.Group>
      <ProTable<API.InterviewListItem, API.PageParams>
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
        dataSource={channelData}
        pagination={channels.data}
        request={(params: any,sort:any,filter:any) => {
          handleRequest(params, sort, filter, dispatch);
          return Promise.resolve({
            data: channelData,
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
          const success = await handleAdd(value as API.InterviewListItem);
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

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.company && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.company}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.company,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

const mapStateToProps = ({channels, loading}: {channels: IChannelState, loading: Loading}) => {
  // users 为 namespace 为 users 的model，user: {}
  // 所以从 model 下 返回数据时，最好是一个对象类型的数据，才不会报错 user: { data: [] }
  console.log('channels', channels, loading);
  return {
      channels,
      userListLoading: loading.models.channels
  }
}
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);

