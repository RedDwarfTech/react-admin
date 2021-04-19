import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Icon, Input,  Col, Table, Button, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getArticleList } from '../../../../service/cruise/ArticleService'
import Highlighter from 'react-highlight-words'
import queryString from 'query-string'
import moment from 'moment'

class Article extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        channelId: null
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    onPageChange = (current) => {
        this.setState({
            pageNum: current
        })
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
        let params = queryString.parse(this.props.location.search)
        this.setState({
            channelId: params.channelId
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            channelId: params.channelId
        }
        getArticleList(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            title: dataIndex === 'title' ? selectedKeys[0] : '',
            subUrl: dataIndex === 'link' ? selectedKeys[0] : ''
        }
        getArticleList(request)
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type='primary'
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon='search'
                    size='small'
                    style={{ width: 90, marginRight: 8 }}>
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select())
            }
        },
        render: (text, record) =>
            this.state.searchedColumn === dataIndex ? (
                <a href={record.link} target='_blank'>
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                </a>
            ) : (
                <a href={record.link} target='_blank'>
                    {text}
                </a>
            )
    })

    render() {
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
                width: 400,
                ...this.getColumnSearchProps('title')
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
                render: text => <span>{moment.unix(parseInt(text)/1000).format("YYYY-MM-DD HH:mm:ss")}</span>
            },
            {
                title: '创建时间',
                dataIndex: 'createdTime',
                key: 'createdTime',
                render: text => <span>{moment.unix(parseInt(text)/1000).format("YYYY-MM-DD HH:mm:ss")}</span>
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
                            <h3 id='basic'>文章管理</h3>
                            <Divider />
                            <Table columns={columns} 
                            dataSource={data.list} 
                            pagination={paginationProps} 
                            rowKey='id' />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Article))
