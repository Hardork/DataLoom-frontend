import React from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

const BasicLayout = (props) => {
  return (
    <ProLayout
      {...props}
      contentStyle={{
        padding: 0, // 去掉内间距
        margin: 0,  // 去掉外间距
      }}
    >
      <PageContainer>
        {props.children}
      </PageContainer>
    </ProLayout>
  );
};

export default BasicLayout;
