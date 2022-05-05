import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Radio, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel, IChannelState, Link } from 'umi';
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
import { addInterview } from '@/services/ant-design-pro/apps/jobs/interview';
import { getDictRenderText } from '@/utils/data/dictionary';
import { SortOrder } from 'antd/lib/table/interface';
import BaseMethods from 'js-wheel/dist/src/utils/data/BaseMethods';

interface IChannelPageProps {
  channels: IChannelState
  dispatch: Dispatch
  loading: boolean
}

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

const TableList: React.FC<IChannelPageProps> = ({ channels, dispatch, loading }) => {
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
  const [recommendStatus, hanleUpdateRecommendStatus] = useState<{
    editorPick: number | null,
    minimalReputation: number | null
  }>({
    editorPick: null,
    minimalReputation: 0
  });
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterviewListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterviewListItem[]>([]);
  const { initialState } = useModel('@@initialState');

  React.useEffect(() => {
    
  }, []);

  const onRadioClick = (e: any) => {
    hanleUpdateRecommendStatus({
      editorPick: Number(e.target.value) === -1 ? null : Number(e.target.value),
      minimalReputation: Number(e.target.value) === 0 ? 1 : 0
    });
    let params = {
      pageNum: 1,
      pageSize: 10,
      editorPick: Number(e.target.value) === -1 ? null : Number(e.target.value),
      minimalReputation: Number(e.target.value) === 0 ? 1 : 0
    };
    dispatch({
      type: 'channels/getChannelPage',
      payload: params
    });
  };

  const handleUpdate = async (fields: FormValueType, id: number) => {
    const hide = message.loading('Configuring');
    try {
      let tag_arr: { code: any; }[] = [];
      fields?.tags?.forEach(tag => {
        let tag_obj = {
          "code": tag
        };
        tag_arr.push(tag_obj);
      });
      dispatch({
        type: 'channels/updateChannel',
        payload: {
          channelId: id,
          tags: tag_arr
        }
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
    if (recommendStatus.editorPick === 0) {
      return (<div>
        <a
          key="job_detail"
          onClick={() => {
            dispatch({
              type: 'channels/editorPickChannel',
              payload: {
                channelId: record.id
              }
            });
          }}
        >
          <FormattedMessage id="pages.apps.cruise.channel.searchTable.editorPickExec" defaultMessage="Configuration" />
        </a></div>);
    } else {
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
    }
  }

  const handleRequest = (params: any, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
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

  const renderChannelName = (dom: React.ReactNode, entity: API.ChannelListItem) => {
    return (
      <div>
      <Link
        key={entity.id}
        to={"/apps/cruise/article?channelId=" + entity.id}
        target="_blank"
      >{dom}</Link>
      {renderTags(entity)}
    </div>
    );
  }

  const renderTags = (entity: API.ChannelListItem)=>{
    if(BaseMethods.isNull(entity.tags)){
      return;
    }
    let tagElement: JSX.Element[] = [];
    entity?.tags?.forEach(tag =>{
      tagElement.push(<Tag color="green">{tag.code}</Tag>);
    })
    return tagElement;
  }

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.ChannelListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.subName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'sub_name',
      render: (dom, entity) => {
        return renderChannelName(dom,entity);
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.subUrl"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'sub_url',
    },
    {
      title: <FormattedMessage id="pages.apps.jobs.interview.searchTable.status" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      render: (value) => {
        return (getDictRenderText("JOB_STATUS", Number(value), initialState));
      }
    },
    {
      title: <FormattedMessage id="pages.apps.cruise.channel.searchTable.standardVersion" defaultMessage="Status" />,
      dataIndex: 'standard_version',
      hideInForm: true,
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
        return (getDictRenderText("INTERVIEW_INFO_SOURCE", Number(value), initialState));
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
      render: (_, record) => {
        return renderOperate(record)
      }
    },
  ];

  let channelData = channels.data;

  return (
    <PageContainer>
      <Radio.Group onChange={(e) => onRadioClick(e)} style={{ marginBottom: 16 }}>
        <Radio.Button value="-1">全部</Radio.Button>
        <Radio.Button value="0">待推荐</Radio.Button>
        <Radio.Button value="1">已推荐</Radio.Button>
      </Radio.Group>
      <ProTable<API.ChannelListItem, API.PageParams>
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
        loading={loading}
        pagination={channels.pagination}
        request={(params: any, sort: any, filter: any) => {
          handleRequest(params, sort, filter);
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
          debugger
          if (!currentRow) {
            return
          }
          const success = await handleUpdate(value, currentRow.id);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            debugger
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

const mapStateToProps = ({ channels, loading }: { channels: IChannelState, loading: Loading }) => {
  return {
    channels,
    loading: loading.models.channels
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);

