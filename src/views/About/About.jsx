import React from 'react'
import { Layout, Divider } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'

const AboutView = () => (
    <Layout>
        <div>
            <CustomBreadcrumb arr={['关于']}></CustomBreadcrumb>
        </div>
        <div className='base-style'>
            <h3>关于</h3>
            <Divider />
            <p>此后台系统管理红矮星所有产品</p>
        </div>
    </Layout>
)
export default AboutView
