import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Tag, Table, Button, Anchor, message, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getChannelList } from '../../../../service/cruise/ChannelService';

const { Link } = Anchor

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '源名称',
        dataIndex: 'subName',
        key: 'subName',
        width: 200
    },
    {
        title: '频率配置',
        dataIndex: 'cron',
        key: 'cron',
    },
    {
        title: '下一次拉取时间',
        dataIndex: 'nextTriggerTime',
        key: 'nextTriggerTime',
        render: text => <span>{new Date(text).toLocaleTimeString("en-US")}</span>
    },
    {
        title: '更新频率',
        dataIndex: 'frequencyMonth',
        key: 'frequencyMonth',
    },
    {
        title: '源链接',
        dataIndex: 'subUrl',
        key: 'subUrl',
    },
    {
        title: '失败次数',
        dataIndex: 'failedCount',
        key: 'failedCount',
    },
    {
        title: 'RSS标准',
        dataIndex: 'standardVersion',
        key: 'standardVersion',
    },
    {
        title: '订阅状态',
        dataIndex: 'subStatus',
        key: 'subStatus',
        render: text => (
            text === 1?<span>{'正常'}</span>:<span>{'停止订阅'}</span>
        )
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>详情</Button>
                <Divider type='vertical' />
                <Button type='link'>删除</Button>
            </span>
        )
    }
]
class Channel extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
    }

    constructor(props) {
        super(props);
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    onPageChange = current => {
        this.setState({
            pageNum: current,
        });
        let request = {
            pageSize: this.state.pageSize,
            pageNum: current
        };
        getChannelList(request);
    };
    changePageSize(pageSize, current) {
        // 将当前改变的每页条数存到state中
        this.setState({
            pageSize: pageSize,
        });
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        };
        getChannelList(request);
    }
    
    componentDidMount() {
        getChannelList('');
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let data = this.props.channel.channel.list;
        let channel = this .props.channel.channel;

        if((data && Object.keys(data).length === 0)|| data == undefined){
            return (<div></div>);
        }

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize:channel.pagination.pageSize,
            pageSizeOptions:['10','20','30'],
            // showTotal: () => `共${total}条`,
            current: channel.pagination.pageNum,
            total: channel.pagination.total,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize,current),
            onChange: current => this.onPageChange(current),
        };

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '订阅源']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>订阅源管理</h3>
                            <Divider />
                            <Table columns={columns} dataSource={data} pagination={paginationProps} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Channel))
