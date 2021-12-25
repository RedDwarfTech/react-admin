import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, Input, Table, Button, notification, Form, Tag, Tabs, Card, Statistic } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getChannelList, editChannel, editorPickChannel } from '@/service/cruise/ChannelService'
import { getDomainPage } from '@/service/app/cernitor/domain/DomainService'
import { getOrderByClause } from '@/api/StringUtil'
import Highlighter from 'react-highlight-words'
import moment from 'moment'
import queryString from 'query-string'

const { TabPane } = Tabs
class Domain extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        channelId: null,
        editorPick: null,
        name: null,
        defaultActiveKey: 1
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    onPageChange = (current, e) => {
        if (e === undefined) {
            // 如果是点击翻页触发的事件，e为10
            // 如果是由检索等其他操作触发的页面改变事件，则e为undefined
            // 不做任何操作
            // 避免事件重复触发
            return
        }
        this.setState({
            pageNum: current
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: current
        }
        getDomainPage(request)
    }

    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getDomainPage(request)
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        if ((params && Object.keys(params).length === 0) || params === undefined) {
            let request = {
                pageSize: this.state.pageSize,
                pageNum: this.state.pageNum
            }
            getDomainPage(request)
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
        getDomainPage(request)
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
            editorPick:
                Object.keys(filters).length === 0 || filters.editorPick === undefined ? null : filters.editorPick[0]
        }
        getDomainPage(request)
    }

    cancelSub = (text, record) => {
        let request = {
            id: record.id,
            subStatus: record.subStatus === 1 ? 0 : 1
        }
        editChannel(request)
    }

    showArticles = record => {
        this.props.history.push('/app/cruise/article?channelId=' + encodeURIComponent(record.id))
    }

    editorPick = record => {
        let request = {
            id: record.id,
            editor_pick: record.editorPick === 1 ? 0 : 1
        }
        editorPickChannel(request)
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
                    onPressEnter={e => this.handleSearch(selectedKeys, confirm, dataIndex, e)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type='primary'
                    onClick={e => this.handleSearch(selectedKeys, confirm, dataIndex, e)}
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
        filterIcon: filtered => <SearchOutlined type='search' style={{ color: filtered ? '#1890ff' : undefined }} />,
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
        render: (text, record) => {
            if (this.state.searchedColumn === dataIndex) {
                return (
                    <a href={record.subUrl} target='_blank'>
                        <Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[this.state.searchText]}
                            autoEscape
                            textToHighlight={text.toString()}
                        />
                        {record.editorPick === 1 && dataIndex === 'subName' ? (
                            <Tag color='green-inverse'>编辑选择</Tag>
                        ) : (
                            <span></span>
                        )}
                    </a>
                )
            } else {
                return (
                    <a href={record.subUrl} target='_blank'>
                        {text}
                        {record.editorPick === 1 && dataIndex === 'subName' ? (
                            <Tag color='green-inverse'>编辑选择</Tag>
                        ) : (
                            <span></span>
                        )}
                    </a>
                )
            }
        }
    })

    handleSearch = (selectedKeys, confirm, dataIndex, e) => {
        confirm()
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        })
        if (dataIndex === 'subName') {
            this.setState(
                {
                    name: selectedKeys[0]
                },
                () => {
                    this.handleFetch()
                }
            )
        }
        if (dataIndex === 'subUrl') {
            this.setState(
                {
                    subUrl: selectedKeys[0]
                },
                () => {
                    this.handleFetch()
                }
            )
        }
    }

    handleFetch = () => {
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            name: this.state.name,
            subUrl: this.state.subUrl
        }
        getChannelList(request)
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }

    tabChange = key => {
        this.setState({
            defaultActiveKey: key
        })

        if (key === '1') {
            let request = {}
            getChannelList(request)
        } else if (key === '2') {
            let request = {
                minimalReputation: 10,
                excludeEditorPickChannel: 1
            }
            getChannelList(request)
        } else if (key === '3') {
            let request = {
                editorPick: 1
            }
            getChannelList(request)
        }
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '域名',
                dataIndex: 'domain_name',
                key: 'domain_name'
            },
            {
                title: '频率配置',
                dataIndex: 'cron',
                key: 'cron'
            },
            {
                title: '域名URL',
                dataIndex: 'domain_url',
                key: 'domain_url'
            },
            {
                title: '提前通知（天）',
                dataIndex: 'days_before_trigger',
                key: 'days_before_trigger'
            },
            {
                title: '下一次检查时间',
                dataIndex: 'next_trigger_time',
                key: 'next_trigger_time',
                render: text => <span>{moment.unix(parseInt(text) / 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '状态',
                dataIndex: 'sub_status',
                key: 'sub_status',
                filters: [
                    {
                        text: '正常',
                        value: '1'
                    },
                    {
                        text: '停止通知',
                        value: '0'
                    }
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                render: text => (text === 1 ? <span>{'正常'}</span> : <span>{'停止通知'}</span>)
            },
            {
                title: '编辑选择',
                dataIndex: 'editor_pick',
                key: 'editor_pick',
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
                    </span>
                )
            }
        ]

        let data = this.props.domain.domain.list
        let channel = this.props.domain.domain
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
            onChange: (current, e) => this.onPageChange(current, e)
        }

        const ChannelTabs = () => (
            <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={this.tabChange}>
                <TabPane tab='全部' key='1'>
                    <AllChannel />
                </TabPane>
            </Tabs>
        )

        const AllChannel = () => (
            <Row>
                <Col>
                    <div className='base-style'>
                        <h3 id='basic'>全部域名</h3>
                        <Divider />
                        <Table
                            columns={columns}
                            dataSource={data}
                            //onChange={this.onChange}
                            pagination={paginationProps}
                            rowKey='id'
                        />
                    </div>
                </Col>
            </Row>
        )

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cernitor', '域名']}></CustomBreadcrumb>
                </div>

                <ChannelTabs />
            </Layout>
        )
    }
}

export default withRouter(Domain)
