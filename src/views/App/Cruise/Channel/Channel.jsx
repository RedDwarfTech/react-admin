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
    },
    {
        title: '拉取频率配置',
        dataIndex: 'cron',
        key: 'cron',
    },
    {
        title: '下一次拉取时间',
        dataIndex: 'nextTriggerTime',
        key: 'nextTriggerTime',
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
        loading: false
    }

    constructor(props) {
        super(props);
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
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

        if((data && Object.keys(data).length === 0)|| data == undefined){
            return (<div></div>);
        }

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
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Channel))
