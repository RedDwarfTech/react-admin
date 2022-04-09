import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Divider } from 'antd';

const Welcome: React.FC = () => {

  return (
    <PageContainer>
      <Card>
        <div>
          <Button type="primary">绑定支付宝</Button>
        </div>
        <Divider></Divider>
        <div>
          <Button type="primary">绑定微信</Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
