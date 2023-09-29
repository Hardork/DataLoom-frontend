import { listMyChartByPageUsingPOST } from '@/services/hwqbi/chartController';

import { useModel } from '@@/exports';
import { Avatar, Card, List, message, Result } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';
import {Link} from "umi";
import './index.css'
import WebSocketComponent from "@/components/WebSocket";
import {listAiRoleVOByPageUsingPOST} from "@/services/hwqbi/aiRoleController";
import {useParams} from "react-router";
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

  const [searchParams, setSearchParams] = useState<API.AiRoleQueryRequest>({ ...initSearchParams });
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [aiRoleList, setAiRoleList] = useState<API.AiRole[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
      const res = await listAiRoleVOByPageUsingPOST(searchParams);
      if (res.data) {
        setAiRoleList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <div>
        <Search
          placeholder="请输入助手名称"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...initSearchParams,
              assistantName: value,
            });
          }}
        />
      </div>
      <div className="margin-16" />
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
            <Card title={item.assistantName} extra={<><Link to={'/chat_with_assistant/' + item.id}>chat</Link></>}>{'功能：' + item.functionDes}</Card>
          </List.Item>
        )}
      />
    </div>
  );
};


export default AssistantList;


