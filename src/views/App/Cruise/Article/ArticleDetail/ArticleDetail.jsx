import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getArticleDetail } from '../../../../../service/cruise/ArticleService'
import queryString from 'query-string'
import { formatTime } from '../../../../../api/StringUtil'

class ArticleDetail extends Component {
    state = {
        loading: false,
        article: {}
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    componentDidMount() {
        let id = this.props.match.params.id
        getArticleDetail(id)
    }

    UNSAFE_componentWillMount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.article.articleDetail

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div>No Data</div>
        }

        function createMarkup(data) {
            return { __html: data.content }
        }

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '文章', '详情']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>{data.title}</h3>
                            <Divider />
                            <div>作者：{data.author}</div>
                            <div>日期：{formatTime(data.pubTime)}</div>
                            <div dangerouslySetInnerHTML={createMarkup(data)} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(ArticleDetail)
