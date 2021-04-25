import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Icon, Input, Col, Table, Button, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class ArticleDetail extends Component {
    state = {
        loading: false
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        let dewre = this.props.location.state
        console.log('ddwgwegewg' + dewre)
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.article.article

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div>232</div>
        }

        function createMarkup() {
            return { __html: 'First &middot; Second' }
        }

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', 'Cruise', '文章', '详情']}></CustomBreadcrumb>
                </div>

                <Row>
                    <Col>
                        <div className='base-style'>
                            <h3 id='basic'>文章详情</h3>
                            <Divider />
                            <div dangerouslySetInnerHTML={createMarkup()} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(ArticleDetail))
