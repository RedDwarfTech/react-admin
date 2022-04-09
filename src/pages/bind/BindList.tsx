import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';

const Welcome: React.FC = () => {

  return (
    <PageContainer>
      <Card>
        <Button type="primary">绑定支付宝</Button>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
