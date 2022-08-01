import { Card, Row, Col, Button, Space, Tag } from 'antd';
import React from 'react';
import { ITrendPageProps, ITrendState } from 'umi';
import { connect, Loading, Dispatch } from 'umi'
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { ProList } from '@ant-design/pro-components';
import styles from './index.less'

const TableList: React.FC<ITrendPageProps> = ({ trends, dispatch, loading }) => {

  const articleTrend = (start: number, end: number): void => {
    dispatch({
      type: 'trends/getTrendsList',
      payload: {
        startTime: start,
        endTime: end
      }
    });
  }

  const top10ArticleChannel = (): void => {
    dispatch({
      type: 'trends/getArticleTopChannel',
      payload: {
        pageNum: 1,
        pageSize: 10,
        sort: 'article_count',
        direction: 'descend'
      }
    });
  }

  React.useEffect(() => {
    let monthStartMilli = dayjs().subtract(1,'month').valueOf();
    let monthEndMilli = dayjs().endOf('month').valueOf();
    articleTrend(monthStartMilli, monthEndMilli);
    top10ArticleChannel();
  }, []);

  const top10Channel=()=>{
    let dataSource = trends.topNumArticleChannel.map(item =>({
      name: item.sub_name +"(" + item.article_count +")",
      image: item.fav_icon_url,
      desc: item.sub_url,
    }));
    return (<div>
      <ProList<any>
        toolBarRender={() => {
          return [
            <Button key="add" type="primary">
              新建
            </Button>,
          ];
        }}
        onRow={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        rowKey="name"
        headerTitle="文章数量Top10频道"
        tooltip="基础列表的配置"
        dataSource={dataSource}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
          },
          description: {
            dataIndex: 'desc',
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color="blue">Ant Design</Tag>
                  <Tag color="#5BD8A6">TechUI</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
                链路
              </a>,
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
                报警
              </a>,
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
                查看
              </a>,
            ],
          },
        }}
      />
    </div>);
  };

  const qualityTop10Channel=()=>{
    
    const dataSource = [
      {
        name: '语雀的天空',
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        desc: '我是一条测试的描述',
      },
      {
        name: 'Ant Design',
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        desc: '我是一条测试的描述',
      },
      {
        name: '蚂蚁金服体验科技',
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        desc: '我是一条测试的描述',
      },
      {
        name: 'TechUI',
        image:
          'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        desc: '我是一条测试的描述',
      },
    ];

    return (<div>
      <ProList<any>
        toolBarRender={() => {
          return [
            <Button key="add" type="primary">
              新建
            </Button>,
          ];
        }}
        onRow={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        rowKey="name"
        headerTitle="文章质量Top10频道"
        tooltip="基础列表的配置"
        dataSource={dataSource}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
          },
          description: {
            dataIndex: 'desc',
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color="blue">Ant Design</Tag>
                  <Tag color="#5BD8A6">TechUI</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
                链路
              </a>,
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
                报警
              </a>,
              <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
                查看
              </a>,
            ],
          },
        }}
      />
    </div>);
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
      <Card className={styles.card}>
          <Row gutter={24}>
            <Col span={6}>
              <div>
                  <div>
                      <span>总频道数</span>
                      <div className={styles.number}>999</div>
                  </div>
              </div>
            </Col>
            <Col span={6}>
              <div >
                  <div>
                      <span>推荐频道数</span>
                      <div className={styles.number}>45</div>
                  </div>
              </div>
            </Col>
            <Col span={6}>
              <div >
                  <div>
                      <span>低质量频道数</span>
                      <div className={styles.number}>45</div>
                  </div>
              </div>
            </Col>
          </Row>
      </Card>
      <Card className={styles.card}>
          <Row gutter={24} >
            <Col span={6}>
              <div >
                  <div>
                      <span>文章数</span>
                      <div className={styles.number}>999</div>
                  </div>
              </div>
            </Col>
            <Col span={6}>
              <div >
                  <div>
                      <span>今日新增文章数</span>
                      <div className={styles.number}>999</div>
                  </div>
              </div>
            </Col>
            <Col span={6}>
              <div >
                  <div>
                      <span>永久存储文章数</span>
                      <div className={styles.number}>999</div>
                  </div>
              </div>
            </Col>
          </Row>
      </Card>
      <Card className={styles.card}>
        <Row gutter={24}>
          <Col span={12}>
            <ReactECharts option={option} style={{ height: '700px', width: '100%' }}/>
          </Col>
          <Col span={12}>
            {top10Channel()}
          </Col>
        </Row>
      </Card>
      <Card>
        <Row gutter={24}>
          <Col span={12}>
            {qualityTop10Channel()}
          </Col>
        </Row>
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

