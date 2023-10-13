import {history, useModel} from '@@/exports';
import { Button, Card, Col, List, message, Row, Tabs} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.css'
import WebSocketComponent from "@/components/WebSocket";
import {listAiRoleVOByPageUsingPOST} from "@/services/hwqbi/aiRoleController";
import {
  addUserChatHistoryUsingPOST,
  getUserChatHistoryUsingGET,
  userAddChatUsingPOST
} from "@/services/hwqbi/aiController";
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {listUserAiRoleVOByPageUsingPOST} from "@/services/hwqbi/userCreateAssistantController";
/**
 * 我的图表页面
 * @constructor
 */
const AssistantList: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<API.AiRoleQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [aiRoleList, setAiRoleList] = useState<API.AiRole[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<API.GetUserChatHistoryVO[]>()
  const [selectItem, setSelectItem] = useState([])

  const [selectKey, setSelectKey] = useState<number>(0)

  const addFormIndex = [
    {
      name: 'modelId',
      required: true,
      label: '助手',
      message: '助手名称不得为空',
      type: 'select',
      selectItem: selectItem
    },
  ];

  const loadData = async () => {
    setLoading(true);
    setSelectItem([])
      if (selectKey == 0) {
        const res = await listAiRoleVOByPageUsingPOST(searchParams);
        if (res.data) {
          setAiRoleList(res.data.records ?? []);
          for (const item of res.data.records ?? []) {
            const cur = {
              label: item.assistantName,
              value: item.id,
            }
            // @ts-ignore
            setSelectItem(result => [...result, cur])
          }

          setTotal(res.data.total ?? 0);
        }
      }

      if (selectKey == 1) {
        const res = await listUserAiRoleVOByPageUsingPOST(searchParams);
        if (res.data) {
          setAiRoleList(res.data.records ?? []);
          for (const item of res.data.records ?? []) {
            const cur = {
              label: item.assistantName,
              value: item.id,
            }
            // @ts-ignore
            setSelectItem(result => [...result, cur])
          }

          setTotal(res.data.total ?? 0);
        }
      }

    const historyRes = await getUserChatHistoryUsingGET();
    if (historyRes.data) {
      setChatHistory(historyRes.data);
    }
    setLoading(false);
  };


  const onChange = (key: string) => {
    // @ts-ignore
    setSelectKey(key)
  };

  const items = [
    {
      key: "0",
      label: '热门助手',
      children: '',
    },
    {
      key: "1",
      label: '我的助手',
      children: '',
    }
  ];


  useEffect(() => {
    loadData();
  }, [searchParams, selectKey]);

  return (
    <div className="my-chart-page">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      {/*<div>*/}
      {/*  <Search*/}
      {/*    placeholder="请输入助手名称"*/}
      {/*    enterButton*/}
      {/*    loading={loading}*/}
      {/*    onSearch={(value) => {*/}
      {/*      // 设置搜索条件*/}
      {/*      setSearchParams({*/}
      {/*        ...initSearchParams*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="margin-16" />
      <div>
        <h2 style={{color: '#4e8ffe'}}>助手中心</h2>
        <Button type={"primary"} onClick={() => {
          history.push( '/user_add_assistant');
        }}>创建我的助手</Button>
      </div>

      <Row>
        <Tabs defaultActiveKey="0" items={items} onChange={onChange} />
        <Col span={24}>
          <List
            grid={{ gutter: 16, column: 4 }}
            pagination={{
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...searchParams,
                  current: page,
                  pageSize,
                });
              },
              current: searchParams.current,
              pageSize: searchParams.pageSize,
              total: total,
            }}
            loading={loading}
            dataSource={aiRoleList}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.assistantName} extra={<><a onClick={async () => {
                  // 请求查询
                  const param = {
                    modelId: item.id
                  }
                  const res = await userAddChatUsingPOST(param)
                  if (res.data) {
                    history.push({pathname: '/ai_chat', search: res.data + ''})
                  }
                }}>chat</a></>}>{'功能：' + item.functionDes}</Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <ModalForm
        title={'新建对话'}
        width="600px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(value);
          const res = await addUserChatHistoryUsingPOST({ ...value });
          if (res.code === 0) {
            message.success('新建成功');
            handleModalOpen(false);
            loadData()
          } else {
            message.error(res.message);
          }
        }}
      >
        {addFormIndex.map((item, index) => (
          <div key={index}>
            {item.type === 'text' && (
              <>
                <ProFormText
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}

            {item.type === 'textArea' && (
              <>
                <ProFormTextArea
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}
            {item.type === 'select' && (
              <>
                <ProFormSelect
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                  request={async () => item.selectItem ?? []}
                  width="md"
                  name={item.name}
                  label={item.label}
                />
              </>
            )}
          </div>
        ))}
      </ModalForm>
    </div>
  );
};


export default AssistantList;


