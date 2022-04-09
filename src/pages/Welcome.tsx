import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';

const Welcome: React.FC = () => {

  return (
    <PageContainer>
      <Card>
        <Typography>
          <Title level={3}>欢迎使用红矮星后台</Title>
          <Paragraph>
            此后台系统设计用于管理红矮星开发的所有产品。要查看当前的产品和应用概览，请到应用-》应用概览页。同级目录下包含每个应用的管理功能。

            所有产品的生命周期遵循孵化(Incubator)-》运营(Promotion)-》迭代(Optimization)，或者是下线(Give Up)。当然我们永远不希望任何一款产品下线，因为每一款上线产品都包含有很多人的时间，期望每一款产品都是具备长期价值。逐步的我们会以不同的颜色来体现产品对应的生命周期。

          </Paragraph>
          <Title level={4}>Cruise</Title>
          <Paragraph>
            Cruise本身的含义是船只或飞机巡航，也可以表示游览，旅行，周游。它是一款RSS阅读类应用，我们期望通过Cruise能够阅读到感兴趣的、高质量的信息，期望它在专业信息领域有所建树。不过目前的境况是，RSS会涉及到内容版权问题，信息质量低频，信息良莠不齐。C端我们使用Flutter实现，这样就可以以最低成本适配iOS生态和Android生态，更进一步的macOS、Windows、甚至Linux也能够适配。
          </Paragraph>
          <Title level={4}>求职管理</Title>
          <Paragraph>
            不知道为什么招聘平台不提供需要的过滤功能。找到投递的岗位是个技术活儿。
          </Paragraph>
          <Title level={4}>更多.....</Title>
          <Paragraph>
            我们想要设计一款词典，足够方便的那种。我们也想设计一款公有领域的阅读类应用。
          </Paragraph>
        </Typography>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
