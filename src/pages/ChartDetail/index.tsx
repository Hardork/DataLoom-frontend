import {getChartById} from '@/services/DataLoom/chartController';

import { useModel} from '@@/exports';
import { Card, Divider, message} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import {Params, useParams} from "react-router";
import WebSocketComponent from "@/components/WebSocket";
import './index.css';
import DataTable from "@/pages/ChartDetail/DataTable";
import OmsViewMarkdown from "@/components/OmsViewMarkdown";

/**
 * 我的图表页面
 * @constructor
 */
const ChartDetail: React.FC = () => {

  const [chart, setChart] = useState<API.Chart>();
  const [loading, setLoading] = useState<boolean>(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [csvData, setCsvData] = useState<string>()



  const params = useParams();

  const loadData = async (params: Readonly<Params<string>>) => {
    setLoading(true);
    try {
      const res = await getChartById(params);
      if (res.data) {
        if (res.data.status === 'succeed') {
          // 构建表格数据
          console.log(res.data.chartData)
          if (res.data.chartData === undefined || res.data.chartData.length === 0) {
            setCsvData('')
            setLoading(false);
          } else {
            const str = res.data.chartData ?? ''
            const lines = str.split("\n")
            while(lines[0].split(",").length<lines[1].split(",").length){
              lines.shift()
            }
            // 拼接字符串
            const tableData = lines.join("\n")
            setCsvData(tableData)
          }
          res.data.genResult = res.data.genResult?.replace('\\g', "<br>")
          let chartOption;
          try {
            chartOption = JSON.parse(res.data.genChart ?? '{}');
            res.data.genChart = JSON.stringify(chartOption);
          } catch (e) { // 生成失败
            const option = {
              title: {
                text: '生成失败',
                subtext: '请稍后重试或联系管理员',
                left: 'center',
                top: 'middle',
                textStyle: {
                  color: 'red',
                  fontSize: 16,
                },
              },
              series: [],
              // 其他配置项...
            };
            res.data.genChart = JSON.stringify(option);
          } finally {
            setChart(res.data);
          }

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
      <div style={{marginBottom: 16}}/>
      <h2>{'分析目标：' + chart?.goal}</h2>
      <div style={{marginBottom: 16}}/>
      <div style={{width: '100%', height: '400px', padding: '20px'}}>
        <ReactECharts option={chart?.genChart && JSON.parse(chart?.genChart)}/>
      </div>
      <Divider/>
      <h2>{'分析结果：'}</h2>
      <div style={{padding: '40px', whiteSpace: 'pre-wrap'}}>
        <OmsViewMarkdown textContent={chart?.genResult ?? ''} darkMode></OmsViewMarkdown>
      </div>
      <Divider/>
      <div>
        <h2>{'原始数据：'}</h2>
        <>
          {csvData === '' ? <>
            <div>
              <p>数据集被删除</p>
            </div>
          </> : <DataTable tableData={csvData}></DataTable>}
        </>
      </div>

    </Card>
  );
};
export default ChartDetail;
