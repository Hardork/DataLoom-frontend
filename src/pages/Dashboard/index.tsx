import React, { useState, useMemo } from "react";
import GridLayout from "react-grid-layout";
import ReactEcharts from "echarts-for-react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Button, Modal, Popover, Select, Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";

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
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制对话框
  const [selectedChartType, setSelectedChartType] = useState(null); // 选择的图表类型
  const [layouts, setLayouts] = useState(() => {
    // 页面加载时从 localStorage 加载布局
    const savedLayouts = localStorage.getItem("dashboard-layout");
    return savedLayouts ? JSON.parse(savedLayouts) : initialLayouts;
  });
  const [hoveredChart, setHoveredChart] = useState(null); // 跟踪当前悬停的图表
  const [selectedChart, setSelectedChart] = useState(null); // 追踪被点击的div
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const [charts, setCharts] = useState(() => {
    // 页面加载时从 localStorage 加载图表数据
    return  [
      { i: "chart1", component: <Chart id="1" /> }];
  });

  // 显示对话框
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 关闭对话框
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 选择图表类型
  const handleSelectChart = (value) => {
    setSelectedChartType(value);
  };

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
  // 根据图表类型生成图表组件
  const renderChartComponent = (type) => {
    switch (type) {
      case "bar":
        return <div>柱状图</div>;
      case "line":
        return <div>折线图</div>;
      case "pie":
        return <div>饼图</div>;
      case "scatter":
        return <div>散点图</div>;
      case "horizontal-bar":
        return <div>条形图</div>;
      default:
        return null;
    }
  };

  const EchartsSelectCard = () => {
    const chartTypes = [
      { name: "柱状图", imgSrc: "/chart/柱状图.png", type: "bar" },
      { name: "折线图", imgSrc: "/chart/折线图.png", type: "line" },
      { name: "饼图", imgSrc: "/chart/饼图.png" , type: "pie"},
      { name: "条形图", imgSrc: "/chart/条形图.png", type: "horizontalBar" },
      { name: "散点图", imgSrc: "/chart/散点图.png" , type: "scatter"},
      { name: "组合图", imgSrc: "/chart/堆叠组合图.png" , type: "bar"},
      { name: "漏斗图", imgSrc: "/chart/漏斗图.png", type: "bar" },
      { name: "词云", imgSrc: "/chart/词云图.png", type: "bar" },
    ];

    const cardStyle = {
      width: "92px",
      height: "120px", // 增加高度以容纳图表和文字
      backgroundColor: "#f0f0f0", // 设置卡片背景色
      borderRadius: "8px", // 卡片圆角
      display: "flex",
      flexDirection: "column", // 使内容垂直排列
      justifyContent: "center",
      alignItems: "center",
      margin: "8px", // 卡片之间的间距
      textAlign: "center", // 文字居中
      cursor: "pointer", // 手型指针
    };

    const containerStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(4, 92px)", // 每行 4 个卡片
      justifyContent: "center", // 卡片居中
      gap: "16px", // 卡片之间的间距
    };

    const imageStyle = {
      width: "20px", // 图表图片宽度
      height: "20px", // 图表图片高度
      marginBottom: "8px", // 图片和文字之间的间距
    };

    const textStyle = {
      fontSize: "12px", // 图表文字大小
      color: "#333", // 文字颜色
    };

    return (
      <div style={{
        padding: "20px"
      }}>
        {/* 添加图表标签 */}
        <div style={{ fontSize: "12px", marginBottom: "16px" }}>图表</div>

        {/* 卡片容器 */}
        <div style={containerStyle}>
          {chartTypes.map((chart, index) => (
            <div key={index} style={cardStyle} onClick={() => {
              hide()
              handleChartSelect(chart.type)
            }}>
              {/* 图表图片 */}
              <img src={chart.imgSrc} alt={chart.name} style={imageStyle} />
              {/* 图表名称 */}
              <div style={textStyle}>{chart.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 用户选择图表类型时，弹出Modal并生成初始配置
  const [chartOption, setChartOption] = useState(null); // 初始option配置
  const handleChartSelect = (type) => {
    setSelectedChartType(type);
    setChartOption(generateInitialOption(type));
    setIsModalVisible(true);
  };

  // 生成初始的option配置
  const generateInitialOption = (type) => {
    switch (type) {
      case "bar":
        return {
          xAxis: { type: "category", data: ["A", "B", "C"] },
          yAxis: { type: "value" },
          series: [{ type: "bar", data: [10, 20, 30] }],
        };
      case "line":
        return {
          xAxis: { type: "category", data: ["A", "B", "C"] },
          yAxis: { type: "value" },
          series: [{ type: "line", data: [15, 25, 35] }],
        };
      case "pie":
        return {
          series: [{ type: "pie", data: [{ value: 30, name: "A" }, { value: 40, name: "B" }, { value: 50, name: "C" }] }],
        };
      default:
        return {};
    }
  };

  // 处理用户修改配置，动态更新图表option
  const handleOptionChange = (newOption) => {
    setChartOption((prevOption) => ({
      ...prevOption,
      ...newOption, // 更新用户自定义的配置
    }));
  };

  return (
    <div>
      <div style={{
        display: "flex"
      }}>
        <Popover
          content={<><EchartsSelectCard></EchartsSelectCard></>}
          title=""
          placement="rightBottom"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button style={{
            backgroundColor: '#1456F0',
            color: '#ffffff'
          }}>+添加图表
          </Button>
        </Popover>

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


      {/* 弹出 Modal */}
      <Modal
        visible={isModalVisible}
        title="自定义图表"
        width="80%"
        onCancel={() => setIsModalVisible(false)} // 关闭Modal
        footer={[
          <Button key="submit" type="primary" onClick={() => setIsModalVisible(false)}>
            确定
          </Button>,
        ]}
      >
        <div style={{ display: "flex", width: "100%", height: "500px" }}>
          {/* 左侧80%区域显示图表 */}
          <div style={{ flex: "80%", borderRight: "1px solid #f0f0f0", paddingRight: "20px" }}>
            <div style={{
              height: "100%",
              width: "100%"
            }}>
              <ReactEcharts option={chartOption} style={{ height: "100%", width: "100%" }} />
            </div>
          </div>

          {/* 右侧20%区域显示选项卡 + 选择框 */}
          <div style={{ flex: "20%", paddingLeft: "20px" }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="轴配置" key="1">
                <div style={{ marginBottom: "16px" }}>选择X轴类型</div>
                <Select
                  defaultValue="category"
                  style={{ width: "100%" }}
                  onChange={(value) => handleOptionChange({ xAxis: { type: value } })}
                >
                  <Option value="category">类目轴</Option>
                  <Option value="value">数值轴</Option>
                </Select>

                <div style={{ marginTop: "16px" }}>选择Y轴类型</div>
                <Select
                  defaultValue="value"
                  style={{ width: "100%" }}
                  onChange={(value) => handleOptionChange({ yAxis: { type: value } })}
                >
                  <Option value="value">数值轴</Option>
                  <Option value="log">对数轴</Option>
                </Select>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
