import {Card, Col} from "antd";
import React from "react";

const Show = () => {

  return (
    <>
      <Col span={24}>
        <Card style={{ height: '93vh', position: 'relative', backgroundColor: '#F6F7F9' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                maxWidth: '800px',
                minWidth: '500px',
                marginTop: '10vh',
                height: '100%',
                flexShrink: 1,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  maxWidth: '700px',
                  textAlign: 'left',
                  padding: '0 16px 0 16px',
                  marginBottom: '32px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    marginBottom: '4px !important',
                    lineHeight: '42px !important',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <p>
                            <span
                              style={{
                                color: 'rgb(36, 84, 255)',
                              }}
                            >
                              <strong>问数</strong>
                            </span>
                    <span
                      style={{
                        color: 'rgb(0, 0, 0)',
                      }}
                    >
                              用
                            </span>
                    <span
                      style={{
                        color: 'rgb(36, 84, 255)',
                      }}
                    >
                              <strong>DATALOOM</strong>
                            </span>
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '16px !important',
                    lineHeight: '26px !important',
                    color: 'var(--txt_icon_black_1, #1a2029)',
                  }}
                >
                  <p
                    style={{
                      lineHeight: 1,
                    }}
                  >
                    <strong>数据检索无需复杂！试问LOOM，他会给你所有数据🚀</strong>
                  </p>
                </div>
              </div>
              <div
                style={{
                  paddingBottom: '400px',
                }}
              >
                <Card style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'inlineBlock',
                      color: 'var(--txt_icon_black_1, #1a2029)',
                      fontFamily: 'PingFang SC',
                      fontWeight: 600,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '22px',
                      textAlign: 'left',
                      flex: 1,
                      maxHeight: '40px',
                      overflowY: 'hidden',
                    }}
                  >
                            <span
                              style={{
                                color: 'var(--txt_stroke_blue_1, #386fff)',
                              }}
                            >
                              数据矿工
                            </span>
                    ⚒️：提前有价值数据
                  </div>
                </Card>
                <Card style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      display: 'inlineBlock',
                      color: 'var(--txt_icon_black_1, #1a2029)',
                      fontFamily: 'PingFang SC',
                      fontWeight: 600,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '22px',
                      textAlign: 'left',
                      flex: 1,
                      maxHeight: '40px',
                      overflowY: 'hidden',
                    }}
                  >
                            <span
                              style={{
                                color: 'var(--txt_stroke_blue_1, #386fff)',
                              }}
                            >
                              实时观察
                            </span>
                    👀：请给我最近一周数据📊
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </>
  )
};

export default Show;
