import {Button, Card, Carousel, Col, Row, theme} from 'antd';

import React from 'react';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const contentStyle: React.CSSProperties = {
  height: '700px',
  color: '#fff',
  display: "flex",
  alignItems: "center",
  justifyContent: 'center',  // 垂直居中
  flexDirection: "column",
  background: 'no-repeat #004b9e',
  backgroundImage:
    "url('https://www.fit2cloud.com/dataease/images/banner/banner6.jpg')",
  backgroundSize: 'cover',  // 使背景图片覆盖盒子
  backgroundPosition: 'center',  // 使背景图片居中
};

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (


    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>

    </div>
  );
};

const Welcome: React.FC = () => {
  const {token} = theme.useToken();

  return (
    <div style={{
      margin: '-32px -40px'
    }}>
      <Carousel arrows infinite={false}>
        <div>
          <div style={contentStyle}>
            <h1>开源AI数据可视化分析工具</h1>
            <h2>让分析易如反掌！借助LLM大模型 + Agent，快速生成可视化分析图表。</h2>
            <Button type={'primary'} size={"large"} style={{
              fontWeight: "bold",
            }} href={'https://github.com/Hardork/hwqbi-backend'} target={'_blank'}>访问GitHub项目</Button>
          </div>
        </div>
      </Carousel>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage: 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 DataLoom 数据治理与分析平台
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            DataLoom 为用户分析大量数据，帮助您分析数据并数据中发现有价值的信息
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="/add_chart_mq"
              title="智能分析"
              desc="一键上传数据，即可获取数据的智能分析报告"
            />
            <InfoCard
              index={2}
              title="AI辅助分析"
              href="/ai_chat"
              desc="AI加持，支持随问随答，更快速、更准确地从大量数据中提取有价值的信息"
            />
            <InfoCard
              index={3}
              title="创建分析助手"
              href="/user_add_assistant"
              desc="创建属于自己的AI数据分析师"
            />
          </div>

          <div
          >
            <div style={{
              marginTop: '100px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h2>AI可视化分析，让分析易上手更迅速</h2>
            </div>

            <div style={{display: "flex", justifyContent: 'center'}}>
              <div style={{marginTop: '100px', backgroundColor: '#EAF6FD', color: '#333', width: '80%'}}>
                <Row>
                  <Col md={8}>
                    <div style={{
                      padding: '24px'
                    }}>
                      <p style={{
                        color: '#333',
                        fontSize: '26px',
                        lineHeight: '26px',
                        marginTop: '10px',
                        marginBottom: '30px'
                      }}>AI可视化分析</p>
                      <p style={{
                        color: "#666",
                        fontSize: '18px',
                        lineHeight: '32px'
                      }}>通过数据可视化，可以直观发现、分析、预警数据中所隐藏的问题，及时应对业务中的风险，发现增长点</p>
                    </div>
                  </Col>
                  <Col md={16}>
                    <div style={{
                      width: '100%'
                    }}>
                      <img src={'/assets/img_1.png'} style={{
                        width: '100%'
                      }}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div
          >
            <div style={{
              marginTop: '100px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h2>AI辅助分析，交互式挖掘数据的价值</h2>
            </div>

            <div style={{display: "flex", justifyContent: 'center'}}>
              <div style={{marginTop: '100px', backgroundColor: '#EAF6FD', color: '#333', width: '80%'}}>
                <Row>
                  <Col md={8}>
                    <div style={{
                      padding: '24px'
                    }}>
                      <p style={{
                        color: '#333',
                        fontSize: '26px',
                        lineHeight: '26px',
                        marginTop: '10px',
                        marginBottom: '30px'
                      }}>AI辅助分析</p>
                      <p style={{
                        color: "#666",
                        fontSize: '18px',
                        lineHeight: '32px'
                      }}>以上传的数据为基准，随问随答的方式更快速、更准确地从大量数据中提取有价值的信息</p>
                    </div>
                  </Col>
                  <Col md={16}>
                    <div style={{
                      width: '100%'
                    }}>
                      <img src={'/assets/img_2.png'} style={{
                        width: '100%'
                      }}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

  );
};

export default Welcome;
