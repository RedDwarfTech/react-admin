import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Icon, Input, Table, Button, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getChannelList, editChannel } from '../../../../service/cruise/ChannelService'
import { getOrderByClause } from '../../../../api/StringUtil'
import Highlighter from 'react-highlight-words'
import moment from 'moment'
import queryString from 'query-string'

class Channel extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        channelId: null,
        editorPick:null
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
        getChannelList(request)
    }
    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getChannelList(request)
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        if ((params && Object.keys(params).length === 0) || params === undefined){
            getChannelList('')
            return
        }
        this.setState({
            channelId: params.channelId
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            subSourceId: params.channelId
        }
        getChannelList(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    onChange = (pagination, filters, sorter, extra) => {
        if (Object.keys(sorter).length === 0 && Object.keys(filters) === 0) {
            return
        }
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            orderByClause: sorter && Object.keys(sorter).length === 0 ? '' : getOrderByClause(sorter),
            editorPick: Object.keys(filters).length === 0?null: filters.editorPick[0]
        }
        getChannelList(request)
    }

    cancelSub = (text, record) => {
        let request = {
            id: record.id,
            subStatus: record.subStatus === 1 ? 0 : 1
        }
        editChannel(request)
    }

    showArticles = (record) => {
        this.props.history.push('/app/cruise/article?channelId=' + encodeURIComponent(record.id));
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
                <a href={record.subUrl} target='_blank'>
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                </a>
            ) : (
                <a href={record.subUrl} target='_blank'>
                    {text}
                </a>
            )
    })

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            name: dataIndex === 'subName' ? selectedKeys[0] : '',
            subUrl: dataIndex === 'subUrl' ? selectedKeys[0] : ''
        }
        getChannelList(request)
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '频道名称',
                dataIndex: 'subName',
                key: 'subName',
                width: 200,
                ...this.getColumnSearchProps('subName')
            },
            {
                title: '频率配置',
                dataIndex: 'cron',
                key: 'cron'
            },
            {
                title: '下一次拉取时间',
                dataIndex: 'nextTriggerTime',
                key: 'nextTriggerTime',
                render: text => <span>{moment.unix(parseInt(text)/1000).format("YYYY-MM-DD HH:mm:ss")}</span>
            },
            {
                title: '月更新数量',
                dataIndex: 'frequencyMonth',
                key: 'frequencyMonth',
                sorter: (a, b) => {},
                sortDirections: ['descend', 'ascend']
            },
            {
                title: '源链接',
                dataIndex: 'subUrl',
                key: 'subUrl',
                width: 400,
                ...this.getColumnSearchProps('subUrl')
            },
            {
                title: '失败次数',
                dataIndex: 'failedCount',
                key: 'failedCount',
                sorter: (a, b) => {},
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'RSS标准',
                dataIndex: 'standardVersion',
                key: 'standardVersion'
            },
            {
                title: '订阅状态',
                dataIndex: 'subStatus',
                key: 'subStatus',
                filters: [
                    {
                        text: '正常',
                        value: '1'
                    },
                    {
                        text: '停止订阅',
                        value: '0'
                    }
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                render: text => (text === 1 ? <span>{'正常'}</span> : <span>{'停止订阅'}</span>)
            },
            {
                title: '编辑选择',
                dataIndex: 'editorPick',
                key: 'editorPick',
                filters: [
                    {
                        text: '是',
                        value: '1'
                    },
                    {
                        text: '否',
                        value: '0'
                    }
                ],
                onFilter: (value, record) => {
                   return record.editorPick.toString().indexOf(value) === 0
                },
                render: text => (text === 1 ? <span>{'是'}</span> : <span>{'否'}</span>)
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type='primary'>详情</Button>
                        <Divider type='vertical' />
                        <Button type='primary' onClick={() => this.cancelSub(text, record)}>
                            {record.subStatus === 1 ? '取消订阅' : '订阅'}
                        </Button>
                        <Divider type='vertical' />
                        <Button type='primary' onClick={() => { this.showArticles(record)}}>文章</Button>
                    </span>
                )
            }
        ]

        let data = this.props.channel.channel.list
        let channel = this.props.channel.channel
        let total = 0
        let pageSize = 0
        let pageNum = 0

        if ((data && Object.keys(data).length === 0) || data === undefined) {
        } else {
            total = parseInt(channel.pagination.total)
            pageSize = channel.pagination.pageSize
            pageNum = channel.pagination.pageNum
        }

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: pageSize,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: () => `共${total}条`,
            current: pageNum,
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
                            <Table
                                columns={columns}
                                dataSource={data}
                                onChange={this.onChange}
                                pagination={paginationProps}
                                rowKey='id'
                            />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(Channel))
