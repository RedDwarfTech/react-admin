import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Table, Button, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getArticleList } from '../../../../service/cruise/ArticleService'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 400
    },
    {
        title: '作者',
        dataIndex: 'author',
        key: 'author'
    },
    {
        title: '发布时间',
        dataIndex: 'pubTime',
        key: 'pubTime',
        render: text => <span>{new Date(text).toLocaleTimeString('en-US')}</span>
    },
    {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{new Date(text).toLocaleTimeString('en-US')}</span>
    },
    {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
        width: 400,
        render: (text, record) => (
            <a href={text} target='_blank'>
                {text}
            </a>
        )
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type='link'>详情</Button>
            </span>
        )
    }
]
class Article extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    onPageChange = current => {
        this.setState({
            pageNum: current
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: current
        }
        getArticleList(request)
    }
    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getArticleList(request)
    }

    componentDidMount() {
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum
        }
        getArticleList(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.article.article

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div></div>
        }

        let total = parseInt(data.pagination.total)

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: data.pagination.pageSize,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: () => `共${total}条`,
            current: data.pagination.pageNum,
            total: total,
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: current => this.onPageChange(current)
        }

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '频道']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>频道管理</h3>
                            <Divider />
                            <Table columns={columns} dataSource={data.list} pagination={paginationProps} rowKey='id' />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Article))
