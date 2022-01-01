import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Input, Col, Table, Button, notification, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getFavMusicPage } from '@/service/app/fav/FavMusicService'
import Highlighter from 'react-highlight-words'
import queryString from 'query-string'
import moment from 'moment'
import { Link } from 'react-router-dom'

class FavMusic extends Component {
    state = {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        channelId: null,
        title: null
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
            pageNum: current,
            title: this.state.title,
            channelId: this.state.channelId
        }
        getFavMusicPage(request)
    }

    changePageSize(pageSize, current) {
        this.setState({
            pageSize: pageSize
        })
        let request = {
            pageSize: pageSize,
            pageNum: this.state.pageNum
        }
        getFavMusicPage(request)
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
        getFavMusicPage(request)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    showChannels = record => {
        let navUrl = '/app/cruise/channel?channelId=' + encodeURIComponent(record.subSourceId)
        this.props.history.push(navUrl)
    }

    showArticleDetail = record => {
        let navUrl = '/app/cruise/article/detail'
        this.props.history.push({
            navUrl,
            state: {
                article: record
            }
        })
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
            title: dataIndex === 'title' ? selectedKeys[0] : ''
        })
        let request = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            title: dataIndex === 'title' ? selectedKeys[0] : '',
            subUrl: dataIndex === 'link' ? selectedKeys[0] : ''
        }
        getFavMusicPage(request)
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
                    style={{ width: 90, marginRight: 8 }}></Button>
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
        render: (text, record) =>
            this.state.searchedColumn === dataIndex ? (
                <a href={record.link} target='_blank' rel='noopener noreferrer'>
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={record.music.title.toString()}
                    />
                </a>
            ) : (
                <a href={record.link} target='_blank' rel='noopener noreferrer'>
                    {record.music.title}
                </a>
            )
    })

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ title: '' })
    }

    parseArtists = record => {
        let value = JSON.parse(record.music.artists)
        let names = value.map(item => item.name).join(',')
        return names
    }

    parseAlbum = record => {
        let value = JSON.parse(record.music.album)
        let name = value.name
        return name
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '歌曲名',
                width: 400,
                render: record => {
                    return <span>{record.music.name}</span>
                }
            },
            {
                title: '歌手',
                key: 'author',
                render: record => {
                    return <span>{this.parseArtists(record)}</span>
                }
            },
            {
                title: '创建时间',
                dataIndex: 'created_time',
                key: 'created_time',
                render: text => <span>{moment.unix(parseInt(text) / 1000).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '专辑',
                key: 'album',
                render: record => {
                    return <span>{this.parseAlbum(record)}</span>
                }
            },
            {
                title: '评分',
                dataIndex: 'author',
                key: 'author'
            },
            {
                title: '用户ID',
                dataIndex: 'user_id',
                key: 'user_id'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Link
                            target='_blank'
                            rel='noopener noreferrer'
                            to={{
                                pathname: '/app/cruise/article/detail/' + record.id,
                                state: {
                                    article: record
                                }
                            }}>
                            详情
                        </Link>
                    </span>
                )
            }
        ]

        let data = this.props.favMusic.favMusic

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
                            <h3 id='basic'>收藏音乐</h3>
                            <Divider />
                            <Table columns={columns} dataSource={data.list} pagination={paginationProps} rowKey='id' />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(FavMusic)
