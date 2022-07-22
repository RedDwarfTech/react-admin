import { Card, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import { ITrendPageProps, ITrendState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import Icon from '@ant-design/icons';
//import '@/style/view-style/index.scss'

const TableList: React.FC<ITrendPageProps> = ({ trends, dispatch, loading }) => {

  const [recommendStatus, hanleUpdateRecommendStatus] = useState<{
    editorPick: number | null,
    minimalReputation: number | null,
    isTag: number|null
  }>({
    editorPick: null,
    minimalReputation: 0,
    isTag: 0
  });

  const handleRequest = (start: number, end: number): void => {
    dispatch({
      type: 'trends/getTrendsList',
      payload: {
        startTime: start,
        endTime: end
      }
    });
  }

  React.useEffect(() => {
    let monthStartMilli = dayjs().startOf('month').valueOf();
    let monthEndMilli = dayjs().endOf('month').valueOf();
    handleRequest(monthStartMilli, monthEndMilli);
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

  const option = {
    title: {
      text: '每日新增文章数',
      x: 'center',
    },
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
        <Layout className='index animated fadeIn'>
          <Row gutter={24} className='index-header'>
            <Col span={6}>
              <div className='base-style wechat'>
                  <Icon type='wechat' className='icon-style' />
                  <div>
                      <span>999</span>
                      <div>微信</div>
                  </div>
              </div>
            </Col>
            <Col span={6}>
              <div className='base-style qq'>
                  <Icon type='qq' className='icon-style' />
                  <div>
                      <span>366</span>
                      <div>QQ</div>
                  </div>
              </div>
            </Col>
          </Row>
        </Layout>
      </Card>
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

