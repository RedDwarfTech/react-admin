import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Row, Col, notification, Form } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'

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

    componentDidMount() {}

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let data = this.props.location.state

        if ((data && Object.keys(data).length === 0) || data === undefined) {
            return <div>No Data</div>
        }

        function createMarkup(data) {
            return { __html: data.article.content }
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
                            <div dangerouslySetInnerHTML={createMarkup(data)} />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default withRouter(Form.create()(ArticleDetail))
