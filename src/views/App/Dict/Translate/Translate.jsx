import React, { Component } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Input, Button, notification, Form, Tag, Tabs, Card } from 'antd'
import '@/style/view-style/table.scss'
import { withRouter } from 'react-router-dom'
import { getTranslate, addGlossary } from '@/service/app/dict/translate/TranslateService'

const { Search } = Input
const { TabPane } = Tabs

class Translate extends Component {
    state = {
        loading: false,
        word: ''
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

    handleSearch = () => {
        let currentWord = this.state.word
        if (currentWord == '') {
            return
        }
        let request = {
            word: this.state.word.toLowerCase(),
            userId: 15
        }
        getTranslate(request)
    }

    handleAddGlossary = () => {
        let currentWord = this.state.word
        if (currentWord == '') {
            return
        }
        let request = {
            word: this.state.word.toLowerCase(),
            userId: 15
        }
        addGlossary(request)
    }

    handleSearchOnChange = ({ target: { value } }) => {
        this.setState({
            word: value
        })
    }

    renderSearchResult = data => {
        if (data == null || data == undefined || Object.keys(data).length == 0) {
            return <div>Nodata</div>
        }
        return (
            <div>
                <Card title='基础释义'>
                    <Button onClick={this.handleAddGlossary}>Add Glossary</Button>
                    <Card type='inner' title='Inner Card title' extra={<a href='#'>More</a>}>
                        {data[0].translation}
                    </Card>
                    <Card style={{ marginTop: 16 }} type='inner' title='Inner Card title' extra={<a href='#'>More</a>}>
                        Inner Card content
                    </Card>
                </Card>
            </div>
        )
    }

    render() {
        let data = this.props.translate.translate

        return (
            <Layout className='animated fadeIn'>
                <div>
                    <CustomBreadcrumb arr={['应用', '红矮星词典', '翻译']}></CustomBreadcrumb>
                </div>
                <Search
                    placeholder='input search text'
                    onSearch={this.handleSearch}
                    onChange={this.handleSearchOnChange}
                    enterButton='Search'
                    size='large'
                />
                {this.renderSearchResult(data)}
            </Layout>
        )
    }
}

export default withRouter(Translate)
