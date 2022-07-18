import { Button, message, Input, Drawer, Radio, Tag, Divider, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel,  Link, ITrendPageProps, ITrendState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import ReactECharts from 'echarts-for-react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
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
import dayjs from 'dayjs';

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

const TableList: React.FC<ITrendPageProps> = ({ trends, dispatch, loading }) => {
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
    minimalReputation: number | null,
    isTag: number|null
  }>({
    editorPick: null,
    minimalReputation: 0,
    isTag: 0
  });
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterviewListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterviewListItem[]>([]);
  const { initialState } = useModel('@@initialState');

  React.useEffect(() => {
    let monthStartMilli = dayjs().startOf('month').valueOf();
    let monthEndMilli = dayjs().endOf('month').valueOf();
    handleRequest(monthStartMilli, monthEndMilli);
    handleRequest();
  }, []);

  const onRadioClick = (e: any) => {
    hanleUpdateRecommendStatus({
      editorPick: Number(e.target.value) === 1 ? 1 : null,
      minimalReputation: Number(e.target.value) === 0 ? 1 : 0,
      isTag: Number(e.target.value) === 2? 0:null,
    });
    let editorPick = Number(e.target.value) === 1 ? 1 : 0;
    let minimalReputation = Number(e.target.value) === 0 ? 1 : 0;
    let isTag = Number(e.target.value) === 2?0:null;
    loadChannelPage(editorPick, minimalReputation, isTag);
  };

  const loadChannelPage=(editorPick:number| null,minimalReputation:number,isTag:number|null) => {
    let params = {
      pageNum: 1,
      pageSize: 10,
      editorPick: editorPick,
      minimalReputation: minimalReputation,
      isTag: isTag
    };
    dispatch({
      type: 'trends/getChannelPage',
      payload: params
    });
  };

  const handleUpdate = async (fields: FormValueType, id: number) => {
    const hide = message.loading('Configuring');
    try {
      
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
    let showName = record.editor_pick == 1?"pages.apps.cruise.channel.searchTable.editorPickCancel":"pages.apps.cruise.channel.searchTable.editorPickExec";
      return (<div>
        <a
          key="editor_pick"
          onClick={() => {
            dispatch({
              type: 'channels/editorPickChannel',
              payload: {
                channelId: record.id,
                editor_pick: record.editor_pick == 0? 1:0
              }
            }).then(() => {
              handleSimpleRequest();
            });
          }}
        >
          <FormattedMessage id={showName} defaultMessage="Configuration" />
        </a>
        <Divider type="vertical"></Divider>
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

  const handleRequest = (start: number, end: number): void => {
    dispatch({
      type: 'trends/getTrendsList',
      payload: {
        startTime: start,
        endTime: end
      }
    });
  }

  const handleSimpleRequest = () => {
    dispatch({
      type: 'trends/getChannelPage',
      payload: {
        
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
          id="pages.apps.cruise.channel.searchTable.id"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'id',
      width: 60
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.subName"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'sub_name',
      width: 300,
      render: (dom, entity) => {
        return renderChannelName(dom,entity);
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.articleCount"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'article_count',
      width: 60,
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.subUrl"
          defaultMessage="Rule name"
        />
      ),
      ellipsis: true,
      copyable: true,
      width: 380,
      dataIndex: 'sub_url',
    },
    {
      title: (
        <FormattedMessage
          id="pages.apps.cruise.channel.searchTable.latestTriggerTime"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'last_trigger_time',
      width: 165,
    },
    {
      title: <FormattedMessage id="pages.apps.jobs.interview.searchTable.status" defaultMessage="Status" />,
      dataIndex: 'sub_status',
      width: 50,
      render: (value) => {
        return (getDictRenderText("RSS_SUB_STATUS", Number(value), initialState));
      }
    },
    {
      title: <FormattedMessage id="pages.apps.cruise.channel.searchTable.editorPick" defaultMessage="Status" />,
      dataIndex: 'editor_pick',
      width: 50,
      render: (value) => {
        return (getDictRenderText("YES_NO", Number(value), initialState));
      }
    },
    {
      title: <FormattedMessage id="pages.apps.cruise.channel.searchTable.standardVersion" defaultMessage="Status" />,
      dataIndex: 'standard_version',
      hideInForm: true,
      width: 80,
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
      width: 150,
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
      width: 80,
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
      dataIndex: 'reputation',
      width: 50,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => {
        return renderOperate(record)
      }
    },
  ];

  const option = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: trends?.data.map(trend => dayjs.unix(trend.statistic_time/1000).format("YYYY-MM-DD")),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: trends?.data.map(trend => trend.incre_num),
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

   return (
    <div>
      <Card>
        <ReactECharts option={option} style={{ height: '700px', width: '100%' }}/>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ trends, loading }: { trends: ITrendState, loading: Loading }) => {
  return {
    trends,
    loading: loading.models.trends
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList);

