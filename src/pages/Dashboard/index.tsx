import React, { useState, useMemo } from "react";
import GridLayout from "react-grid-layout";
import ReactEcharts from "echarts-for-react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Button} from "antd";

const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout.Responsive);

// 初始布局
const initialLayouts = {
  lg: [
    { i: "chart1", x: 0, y: 0, w: 3, h: 2 },
    { i: "chart2", x: 3, y: 0, w: 3, h: 2 },
    { i: "chart3", x: 6, y: 0, w: 3, h: 2 },
    { i: "chart4", x: 9, y: 0, w: 3, h: 2 },
  ],
};

// 图表组件
const Chart = ({ id }) => {
  const getOption = () => ({
    tooltip: {},
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10],
      },
    ],
  });

  return (
    <ReactEcharts
      option={getOption()}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const Dashboard = () => {
  const [layouts, setLayouts] = useState(() => {
    // 页面加载时从 localStorage 加载布局
    const savedLayouts = localStorage.getItem("dashboard-layout");
    return savedLayouts ? JSON.parse(savedLayouts) : initialLayouts;
  });
  const [hoveredChart, setHoveredChart] = useState(null); // 跟踪当前悬停的图表
  const [selectedChart, setSelectedChart] = useState(null); // 追踪被点击的div

  const [charts, setCharts] = useState(() => {
    // 页面加载时从 localStorage 加载图表数据
    return  [
      { i: "chart1", component: <Chart id="1" /> },
      { i: "chart2", component: <Chart id="2" /> },
      { i: "chart3", component: <Chart id="3" /> },
      { i: "chart4", component: <Chart id="4" /> },
    ];
  });

  const onLayoutChange = (layout, allLayouts) => {
    setLayouts(allLayouts);
  };

  // 动态添加图表
  const addChart = () => {
    const newChartId = `chart${charts.length + 1}`;
    const newChart = { i: newChartId, component: <Chart id={newChartId} /> };

    // 获取当前最大 y 坐标，确保新图表放在新行
    // const maxY = layouts.lg.reduce((max, layout) => Math.max(max, layout.y + layout.h), 0);

    // 假设 newChartW 是新图表的宽度，cols 是列数（如 lg: 12 列）
    const newChartW = 3; // 新图表宽度为 4 列

// 获取当前最大 y 坐标，以及布局的最大列数
    const maxY = layouts.lg.reduce((max, layout) => Math.max(max, layout.y + layout.h), 0);

// 查找插入空隙
    let newChartX = null;
    let newChartY = null;

// 遍历所有 y 坐标，查找每一行的空余空间
    for (let rowY = 0; rowY <= maxY; rowY++) {
      // 计算每一行已占用的列数
      const occupiedInRow = layouts.lg
        .filter(layout => layout.y === rowY)
        .reduce((sum, layout) => sum + layout.w, 0);

      // 如果当前行有足够的空隙插入新图表
      if (occupiedInRow + newChartW <= 12) {
        newChartX = occupiedInRow;
        newChartY = rowY;
        break;
      }
    }

// 如果没有找到合适的空隙，则将新图表插入到下一行
    if (newChartX === null) {
      newChartX = 0; // 新行从第 0 列开始
      newChartY = maxY + 1; // 插入到最大 y 坐标的下一行
    }

    setCharts((prevCharts) => [...prevCharts, newChart]);
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, { i: newChartId, x: newChartX, y: newChartY, w: 3, h: 2 }],
    }));
  };

  // 保存布局到 localStorage
  const saveLayout = () => {
    localStorage.setItem("dashboard-layout", JSON.stringify(layouts));
    localStorage.setItem("dashboard-charts", JSON.stringify(charts));
    alert("仪表盘布局已保存！");
  };

  const renderCharts = useMemo(() => charts, [charts]);

  return (
    <div>
      <div style={{
        display: "flex"
      }}>
        <Button onClick={addChart} style={{
          backgroundColor: '#1456F0',
          color: '#ffffff'
        }}>+添加图表
        </Button>
        <Button onClick={saveLayout} style={{
          marginLeft: "10px"
        }}>保存仪表盘</Button>
      </div>


      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={150}
        onLayoutStop={onLayoutChange}
        margin={[10, 10]}
      >
        {renderCharts.map((chart) => (
          <div key={chart.i} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxSizing: "border-box", // 确保边框不会改变元素的大小
            border:
            selectedChart === chart.i
            ? "2px solid #1456F0" // 设置选中时的边框样式
            : hoveredChart === chart.i
            ? "2px solid #C2D4FF" // 设置悬停时的边框样式
            : "2px solid transparent", // 默认无边框
          }}
          onClick={() => setSelectedChart(chart.i)} // 点击时设置当前div为选中状态
          onMouseEnter={() => setHoveredChart(chart.i)} // 鼠标进入时设置当前图表为悬停状态
          onMouseLeave={() => setHoveredChart(null)}    // 鼠标离开时清除悬停状态
          >
            <div style={{
              boxSizing: "border-box",
              height: "40px",
              maxHeight: "40px",
              minHeight: "14px",
              padding: "14px 12px 4px 16px",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "100%",
                minWidth: "5px",
                width: "100%",
                boxSizing: "border-box" // 确保边框不会改变元素的大小
              }}>
                <div>图表</div>
                <div>
                  {(hoveredChart === chart.i || selectedChart === chart.i) && (  // 只有当当前图表被悬停时，显示按钮
                    <>
                      <Button size={"small"} style={{ marginRight: "4px" }}>
                        💡 智能分析
                      </Button>
                      <Button size={"small"}>
                        <img src={"/系统配置.svg"} alt="系统配置" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {chart.component}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
