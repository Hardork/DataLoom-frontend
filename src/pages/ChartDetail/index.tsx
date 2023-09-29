import {getChartByIdUsingGET, listMyChartByPageUsingPOST} from '@/services/hwqbi/chartController';

import {history, Link, useModel} from '@@/exports';
import {Avatar, Button, Card, Divider, List, message, Result} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Search from "antd/es/input/Search";
import {Params, useParams} from "react-router";
import WebSocketComponent from "@/components/WebSocket";

/**
 * 我的图表页面
 * @constructor
 */
const ChartDetail: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [chart, setChart] = useState<API.Chart>();
  const [loading, setLoading] = useState<boolean>(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};


  const params = useParams();

  const loadData = async (params: Readonly<Params<string>>) => {
    setLoading(true);
    try {
      const res = await getChartByIdUsingGET(params);
      setChart(res.data);
      if (res.data) {
        if (res.data.status === 'succeed') {
          console.log(res.data)
          res.data.genResult = res.data.genResult?.replace('\\g', "<br>")
          console.log(res.data.genResult)
          const chartOption = JSON.parse(res.data.genChart ?? '{}');
          res.data.genChart = JSON.stringify(chartOption);
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败，' + e.message);
    }
    setLoading(false);
  };


  useEffect(() => {
    loadData(params);
  }, [params]);
  return (
    <Card loading={loading}>
      <WebSocketComponent userId={currentUser?.id}></WebSocketComponent>
      <div style={{ marginBottom: 16 }} />
      <h2>{'分析目标：' + chart?.goal}</h2>
      <div style={{ marginBottom: 16 }} />
      <div style={{width: '100%', height: '400px', padding: '20px'}}>
        <ReactECharts option={chart?.genChart && JSON.parse(chart?.genChart)} />
      </div>
      <Divider />
      <h2>{'分析结果：'}</h2>
      <div style={{padding: '40px', whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{ __html: chart?.genResult ?? '' }}></div>

    </Card>
  );
};
export default ChartDetail;
