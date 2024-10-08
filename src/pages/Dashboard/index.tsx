import React, {useState, useMemo, useEffect, useRef} from "react";
import GridLayout from "react-grid-layout";
import ReactEcharts from "echarts-for-react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Alert, Button, Dropdown, Input, Menu, message, Modal, Popover, Select, Spin, Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import ChartOption from "@/pages/Dashboard/components/ChartOptions";
import {
  addDashboard,
  addDashboardChart, deleteChart, editChart, getChartData, getChartDataById,
  getDashboardById,
  listAllChart,
  listAllDashboard, saveDashboard
} from "@/services/DataLoom/yibiaopanjiekou";
import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {
  getDataSource,
  getTableFieldsByDatasourceIdAndTableName,
  getTablesByDatasourceId,
  listUserDataSource
} from "@/services/DataLoom/coreDataSourceController";

const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout.Responsive);

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制对话框
  const [isEditVisible, setIsEditVisible] = useState(false); // 控制对话框
  const [selectedChartType, setSelectedChartType] = useState(null); // 选择的图表类型
  const [layouts, setLayouts] = useState(undefined);
  const [hoveredChart, setHoveredChart] = useState(null); // 跟踪当前悬停的图表
  const [selectedChart, setSelectedChart] = useState(null); // 追踪被点击的div
  const [open, setOpen] = useState(false);
  const [dashboards, setDashboards] = useState([])
  const [datasources, setDatasources] = useState([])
  const [selectedDashboard, setSelectedDashboard] = useState()
  const [handleAddModal, setHandleAddModal] = useState(false)
  const [charts, setCharts] = useState([]);
  const addFormIndex = [
    {
      name: 'datasourceId',
      required: true,
      label: '数据源',
      message: '数据源不得为空',
      type: 'select',
      selectItem: datasources
    },
    {
      name: 'name',
      required: true,
      label: '仪表盘名称',
      message: '仪表盘名称不得为空',
      type: 'text'
    }
  ];


  // 根据指定配置文件生成
  const GenChart = (option) => {
    // init
    return (
      <ReactEcharts
        option={option}
        style={{ width: "100%", height: "100%" }}
      />
    );
  };


  const loadAllDashboard = async () => {
    const res = await listAllDashboard()
    if (res.code === 0) {
      const dashboardsMap = res.data?.map(item => {
        return {
          ...item,
          key: item.id,
          label: <>
            <img src={'/chart/仪表盘.svg'}/>
            <span style={{
              marginLeft: '10px'
            }}>{item.name}</span>
          </>}
      })
      setDashboards(dashboardsMap)
    }
  }

  const loadAllDatasource = async () => {
    const res = await listUserDataSource()
    if (res.code === 0) {
      const datasourceMap = res.data?.map(item => {
        return {
          label: <>
            {item.type === 'excel' && <>
              <img src={'/assets/Excel.svg'}/>
              </>
           }
            {item.type === 'mysql' && <>
              <img src={'/assets/Mysql.svg'}/>
            </>}
            {item.type === 'api' && <>
              <img src={'/assets/API.svg'}/>
            </>}
            <span style={{
              marginLeft: '10px'
            }}>{item.name}</span>
          </>,
          value: item.id,
        }
      })
      setDatasources(datasourceMap)
    }
  }


  // 加载仪表盘所有图表
  const loadDashboardAndChart = async (selectedDashboard) => {
    const res2 = await listAllChart({dashboardId: selectedDashboard})
    const res1 = await getDashboardById({dashboardId: selectedDashboard})
    if (res2.code === 0) {
      // 将所有图表加载到charts中
      const chartsMapPromises = res2.data?.map(async (item) => {
        const chartDataRes = await getChartDataById({chartId: item.id});  // 直接使用 await 等待返回
        if (chartDataRes.code === 0 && chartDataRes.data) {
          return {
            i: item.id,
            type: item.chartName,
            component: <GenChart option={ChartOption(item.chartName, chartDataRes.data)}/>,
            dataOption: JSON.parse(item.dataOption)
          };
        }
        return undefined;  // 如果数据不满足条件，返回 undefined
      })
      const chartsMap = (await Promise.all(chartsMapPromises)).filter(item => item !== undefined);
      if (res1.code === 0) {
        if (res1.data?.snapshot) {
          setLayouts(JSON.parse(res1.data?.snapshot))
        }
      }
      console.log(chartsMap)
      setCharts(chartsMap)
    }
  }

  // 加载仪表盘
  useEffect(() => {
    loadAllDashboard()
    loadAllDatasource()
  }, []);

  useEffect(() => {
    if (selectedDashboard === undefined) {
      return;
    }
    loadDashboardAndChart(selectedDashboard)
    // 加载对应仪表盘配置（snap、charts）
  }, [selectedDashboard]);


  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };


  const onLayoutChange = (layout, allLayouts) => {
    setLayouts(allLayouts);
  };


// 保存布局到 localStorage
  const saveLayout = async () => {
    console.log(layouts)
    const res = await saveDashboard({id: selectedDashboard, snapshot: JSON.stringify(layouts)})
    if (res.code === 0) {
      message.success('保存成功')
    } else {
      message.error('保存失败' + res.message)
    }
  };

  const saveLayoutAfterAddChart = async (curLayout) => {
    const res = await saveDashboard({id: selectedDashboard, snapshot: JSON.stringify(curLayout)})
    if (res.code === 0) {
      message.success('保存成功')
    } else {
      message.error('保存失败' + res.message)
    }
  }


  // 动态添加图表
  const addChart = async () => {
    // TODO: 将图表的配置存入后端
    const res = await addDashboardChart({dashboardId: selectedDashboard, chartName: selectedChartType, chartOption: JSON.stringify(chartOption), dataOption: JSON.stringify(dataOption)})
    if (res.code === 0) {
      // res.data 图表的唯一标识
      const newChartId = res.data;
      const newChart = { i: newChartId, component: <GenChart option={chartOption}/> };

      // 假设 newChartW 是新图表的宽度，cols 是列数（如 lg: 12 列）
      const newChartW = 3; // 新图表宽度为 4 列

      // 查找插入空隙
      let newChartX = null;
      let newChartY = null;
      let maxY = null;

      // 获取当前最大 y 坐标，以及布局的最大列数
      if (layouts === undefined) {
        newChartX = 0;
        newChartY = 0;
      } else {
        maxY = layouts.lg.reduce((max, layout) => Math.max(max, layout.y + layout.h), 0);
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
      }


// 如果没有找到合适的空隙，则将新图表插入到下一行
      if (newChartX === null) {
        newChartX = 0; // 新行从第 0 列开始
        newChartY = maxY === null ? 0: maxY + 1; // 插入到最大 y 坐标的下一行
      }

      if (layouts === undefined) {
        setCharts([newChart]);
        setLayouts({
          lg: [{ i: newChartId, x: newChartX, y: newChartY, w: 3, h: 2 }]
        });
      } else {
        setCharts((prevCharts) => [...prevCharts, newChart]);
        // 添加完成后自动保存
        setLayouts((prevLayouts) => {
          saveLayoutAfterAddChart({
            ...prevLayouts,
            lg: [...prevLayouts.lg, { i: newChartId, x: newChartX, y: newChartY, w: 3, h: 2 }]
          })
          return {
            ...prevLayouts,
            lg: [...prevLayouts.lg, { i: newChartId, x: newChartX, y: newChartY, w: 3, h: 2 }],
          }
        });
      }
    }
  };

  // 监听layouts变化，实时保存
  useEffect(() => {
    if (layouts) {
      // saveLayout();
    }
  }, [layouts]);


  const renderCharts = useMemo(() => charts, [charts]);

  const [tables, setTables] = useState<API.CoreDatasetTable[]>([])
  const [fields, setFields] = useState<API.CoreDatasetTableField[]>([])
  const [addChartDefaultDatasource, setAddChartDefaultDatasource] = useState<API.CoreDatasource>()
  const [addChartDefaultTable, setAddChartDefaultTable] = useState<API.CoreDatasetTable>()
  const [addChartDefaultField, setAddChartDefaultField] = useState<API.CoreDatasetTableField>()

  const getTableFieldAndSetDefaultByTableId = async ({datasourceId, tableName}) => {
    const parma: API.GetTableFieldsDTO = {datasourceId: datasourceId, tableName: tableName}
    const res = await getTableFieldsByDatasourceIdAndTableName(parma)
    if (res.code === 0 && res.data) {
      setFields(res.data)
      // 找出第一个字段
      if (res.data.length > 0) {
        setAddChartDefaultField(res.data[0].originName)
        return res.data[0]
      }
    }
    return null;
  }

  const setEditDataOption = async (chart) => {
    if (chart === undefined) return;
    console.log(chart)
    console.log(chart.type)
    setSelectedChartType(chart.type)
    console.log(chart.dataOption)
    const datasourceId = chart.dataOption.datasourceId
    setAddChartDefaultDatasource(datasourceId)
    setAddChartDefaultTable(chart.dataOption.dataTableName)
    setAddChartDefaultField(chart.dataOption.group[0].fieldName)
    const datasourceTables = await getTablesByDatasourceId({datasourceId: datasourceId || ''});
    if (datasourceTables.code === 0 && datasourceTables.data) {
      setTables(datasourceTables.data)
      // 获取第一个表所有的字段
      if (datasourceTables.data.length > 0) {
        setAddChartDefaultTable(datasourceTables.data[0].tableName)
        const parma: API.GetTableFieldsDTO = {datasourceId: datasourceId, tableName: datasourceTables.data[0].tableName}
        const res = await getTableFieldsByDatasourceIdAndTableName(parma)
        if (res.code === 0 && res.data) {
          setFields(res.data)
        }
      }
    }
    setChartOption(chart.component.props.option)
  }

  // 设置默认配置
  const setDefaultDataOption = async (type) => {
    // 获取默认数据源的信息
    if (selectedDashboard === undefined) return;
    const dashboardInfo = dashboards.filter(item => item.id === selectedDashboard).pop()
    const res = await getDataSource({datasourceId: dashboardInfo.datasourceId})
    // 获取当前数据源所有的表
    let tableInfo;
    let fieldInfo;
    if (res.code === 0 && res.data) {
      setAddChartDefaultDatasource(res.data.id)
      const datasourceTables = await getTablesByDatasourceId({datasourceId: res.data.id || ''});
      if (datasourceTables.code === 0 && datasourceTables.data) {
        setTables(datasourceTables.data)
        // 获取第一个表所有的字段
        if (datasourceTables.data.length > 0) {
          tableInfo = datasourceTables.data[0]
          setAddChartDefaultTable(datasourceTables.data[0].tableName)
          fieldInfo = await getTableFieldAndSetDefaultByTableId({datasourceId: res.data.id, tableName: datasourceTables.data[0].tableName})
        }
      }
    }
    // 获取数据源配置
    if (tableInfo !== undefined && fieldInfo !== undefined) {
      const dataOption= {
        dashboardId: selectedDashboard?.id,
        datasourceId: dashboardInfo?.datasourceId,
        dataTableName: tableInfo?.tableName,
        seriesArrayType: 0,
        // 数值列字段
        seriesArray: [
          { fieldName: fieldInfo?.originName, rollup: "COUNT" }
        ],
        // 分组字段
        group: [
          { fieldName: fieldInfo?.originName, mode: "integrated" }
        ],
        source: { type: "ALL", filterInfo: null },
        includeRecordIds: false,
        includeArchiveTable: false
      };
      // 请求数据
      setDataOption(dataOption)
    }

  }

  // 用户选择图表类型时，弹出Modal并生成初始配置
  const [addChartDataLoading, setAddChartDataLoading] = useState(false)
  const [dataOption, setDataOption] = useState()
  const [chartOption, setChartOption] = useState(null); // 初始option配置

  useEffect(() => {
    // 请求数据
    if (dataOption === undefined) return;
    getChartData({dataOption: JSON.stringify(dataOption)})
      .then(res => {
        console.log(selectedChartType)
        console.log(ChartOption(selectedChartType, res.data))
        setChartOption(ChartOption(selectedChartType, res.data))
    }).finally(() => {
      setAddChartDataLoading(false)
    })

  }, [dataOption]);



  // 点击图表选择框触发
  const handleChartSelect = (type) => {
    setDefaultDataOption(type)
    setSelectedChartType(type);
    setAddChartDataLoading(true)
    setIsModalVisible(true);
    // 请求数据
    loadAllDatasource()
  };

  useEffect(() => {
    if (addChartDefaultDatasource === undefined || addChartDefaultTable === undefined || addChartDefaultField === undefined) return;
    // 构造请求数据
    // seriesArrayType === 0代表是统计记录总数

  }, [addChartDefaultDatasource, addChartDefaultField, addChartDefaultTable]);

  // 图表选择框
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
            <div key={index} style={cardStyle} onClick={() =>  {
              hide()
              // todo: 加载数据源
              // loadAllDatasource()
              // todo: 选择当前仪表盘默认的数据源
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


  // 处理数据源变化
  const handleDatasourceChange = async (newDatasource) => {
    setAddChartDataLoading(true)
    setAddChartDefaultDatasource(newDatasource)
    if (newDatasource === undefined) return;

    // 获取当前数据源所有的表
    let tableInfo;
    let fieldInfo;
    const datasourceTables = await getTablesByDatasourceId({datasourceId: newDatasource || ''});
    if (datasourceTables.code === 0 && datasourceTables.data) {
      setTables(datasourceTables.data)
      // 获取第一个表所有的字段
      if (datasourceTables.data.length > 0) {
        tableInfo = datasourceTables.data[0]
        setAddChartDefaultTable(datasourceTables.data[0].tableName)
        fieldInfo = await getTableFieldAndSetDefaultByTableId({datasourceId: newDatasource, tableName: datasourceTables.data[0].tableName})
      }
    }
    // 获取数据源配置
    if (tableInfo !== undefined && fieldInfo !== undefined) {
      const dataOption= {
        dashboardId: selectedDashboard?.id,
        datasourceId: newDatasource,
        dataTableName: tableInfo?.tableName,
        seriesArrayType: 0,
        // 数值列字段
        seriesArray: [
          { fieldName: fieldInfo?.originName, rollup: "COUNT" }
        ],
        // 分组字段
        group: [
          { fieldName: fieldInfo?.originName, mode: "integrated" }
        ],
        source: { type: "ALL", filterInfo: null },
        includeRecordIds: false,
        includeArchiveTable: false
      };
      // 请求数据
      setDataOption(dataOption)
    }
  }

  // 处理表变化
  const handleTableChange = async (newTable) => {
    // 展示新的
    if (newTable === undefined) return;
    setAddChartDataLoading(true)
    setAddChartDefaultTable(newTable)
    // 获取第一个表所有的字段
    const fieldInfo = await getTableFieldAndSetDefaultByTableId({datasourceId: addChartDefaultDatasource, tableName: newTable})
    // 获取数据源配置
    if (fieldInfo !== undefined) {
      const dataOption= {
        dashboardId: selectedDashboard?.id,
        datasourceId: addChartDefaultDatasource,
        dataTableName: newTable,
        seriesArrayType: 0,
        // 数值列字段
        seriesArray: [
          { fieldName: fieldInfo?.originName, rollup: "COUNT" }
        ],
        // 分组字段
        group: [
          { fieldName: fieldInfo?.originName, mode: "integrated" }
        ],
        source: { type: "ALL", filterInfo: null },
        includeRecordIds: false,
        includeArchiveTable: false
      };
      // 请求数据
      setDataOption(dataOption)
    }
  };

  // 处理字段变化
  const handleFieldChange = async (newField) => {
    if (newField === undefined) return;
    setAddChartDataLoading(true)
    setAddChartDefaultField(newField)
    const dataOption= {
      dashboardId: selectedDashboard?.id,
      datasourceId: addChartDefaultDatasource,
      dataTableName: addChartDefaultTable,
      seriesArrayType: 0,
      // 数值列字段
      seriesArray: [
        { fieldName: newField, rollup: "COUNT" }
      ],
      // 分组字段
      group: [
        { fieldName: newField, mode: "integrated" }
      ],
      source: { type: "ALL", filterInfo: null },
      includeRecordIds: false,
      includeArchiveTable: false
    };
    // 请求数据
    setDataOption(dataOption)
  }


  // 处理用户修改配置，动态更新图表option
  const handleOptionChange = async (newOption) => {
    // 展示新的
    setChartOption((prevOption) => ({
      ...prevOption,
      ...newOption, // 更新用户自定义的配置
    }));
  };

  const chartRef = useRef(null); // 初始值为 null，稍后将指向图表实例
  const editChartRef = useRef(null); // 初始值为 null，稍后将指向图表实例

  useEffect(() => {
    if (isModalVisible) {
      // 检查 chartRef.current 是否已经赋值为图表实例
      const chartInstance = chartRef.current?.getEchartsInstance();
      if (chartInstance) {
        setTimeout(() => chartInstance.resize(), 0); // 延迟调用 resize
      }
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (isEditVisible) {
      // 检查 chartRef.current 是否已经赋值为图表实例
      const chartInstance = editChartRef.current?.getEchartsInstance();
      if (chartInstance) {
        setTimeout(() => chartInstance.resize(), 0); // 延迟调用 resize
      }
    }
  }, [isEditVisible]);



  const[readToEditChart, setReadToEditChart] = useState(null)

  const handleEditChartItemByKey = (chart) => {
    if (chart === undefined) return;
      // todo: 编辑
      loadAllDatasource()
      setEditDataOption(chart)
      setIsEditVisible(true)
  }

  const warning = async (chart) => {
    Modal.confirm({
      title: '删除图表',
      content: '删除图表后，系统不提供数据恢复的功能！',
      onOk: async () => {
        const res = await deleteChart({dashboardId: chart.i})
        if (res.code === 0) {
          message.success('删除成功')
          // 重新加载
          loadDashboardAndChart(selectedDashboard)
        } else {
          message.error('删除失败')
        }

      }
    });
  };

  const editChartItems = (chart) => [
    {
      label: <a onClick={() => {
        setReadToEditChart(chart)
        handleEditChartItemByKey(chart)
      }}>
        编辑
      </a>,
      key: 'edit',
    },
    {
      label: <a onClick={() => {
        // renameEchart()
      }}>
        重命名
      </a>,
      key: 'rename',
    },
    {
      label: <a onClick={() => {
        warning(chart)
      }}>
    删除
  </a>,
      key: 'delete',
    }
  ]


  const updateChartById = async (chart) => {
    const res = await editChart({id: chart.i, chartOption: JSON.stringify(chart.props.option)})
    if (res.code === 0) {
      message.success('更新成功')
    } else {
      message.error('更新失败')
    }
  }


  return (
    <div style={{ display: "flex", width: "100%" , margin: '-32px -40px'}}>
      {/* 左侧搜索框和仪表盘信息列表 */}
      <div style={{
        width: "15%", // 左侧占15%宽度
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #eee", // 添加右侧边框来分隔左右区域
        height: "100vh", // 左侧高度占满整个页面
        boxSizing: "border-box",
        backgroundColor: "#fff"
      }}>
        <div style={{padding: '16px'}}>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <h4 style={{paddingBottom: '10px'}}>仪表盘</h4>
            <a onClick={() => {
              setHandleAddModal(true)
            }}><PlusOutlined/></a>
          </div>
          <Input placeholder={'搜索'} addonBefore={<SearchOutlined/>}></Input>
        </div>

        <div style={{overflow: 'auto', padding: '16px'}}>
          <Menu
            style={{width: '100%'}}
            onClick={(record) => {
              setSelectedDashboard(record.key)
            }}
            mode="inline"
            items={dashboards}
          />
        </div>
      </div>

      {/* 右侧详细的仪表盘布局 */}
      <div style={{width: "85%", padding: "10px"}}>
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
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4}}
            rowHeight={150}
            onLayoutChange={onLayoutChange}
            // onLayoutStop={onLayoutChange}
            margin={[10, 10]}
          >

            {renderCharts.length > 0 && renderCharts.map((chart) => (
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
                          <div>
                            <Button size={"small"} style={{marginRight: "4px"}}>
                              💡 智能分析
                            </Button>

                            <Dropdown menu={{ items: editChartItems(chart)}}>
                              <Button size={"small"} onClick={(event) => {
                                event.preventDefault()
                              }}>
                                {/*TODO: 编辑、删除、重命名图表*/}
                                <img src={"/系统配置.svg"} alt="系统配置"/>
                              </Button>
                            </Dropdown>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{
                  height: "100%",
                  width: "100%"
                }}>
                  {chart.component.props.option ? (
                    <div style={{ height: "100%", width: "100%" }}>
                      <ReactEcharts option={chart.component.props.option}></ReactEcharts>
                    </div>
                  ) : (
                    <Spin tip="Loading...">
                      <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                      />
                    </Spin>  // 如果没有 component 显示其他内容
                  )}
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>


          {/* 弹出 新增图表 Modal */}
          <Modal
            visible={isModalVisible}
            title="自定义图表"
            width="80%"
            onCancel={() => setIsModalVisible(false)} // 关闭Modal
            footer={[
              <Button key="submit" type="primary" onClick={() => {
                // 添加图表
                addChart()
                setIsModalVisible(false)
              }}>
                确定
              </Button>,
            ]}
          >
            {
              chartOption !== null && <>
                <div style={{display: "flex", width: "100%", height: "500px"}}>
                  {/* 左侧80%区域显示图表 */}
                  <div style={{flex: "80%", borderRight: "1px solid #f0f0f0", paddingRight: "20px"}}>
                    <div style={{
                      height: "500px",
                      width: "100%"
                    }}>
                      {
                        addChartDataLoading ? <>
                          <Spin tip="Loading...">
                            <Alert
                              message="Alert message title"
                              description="Further details about the context of this alert."
                              type="info"
                            />
                          </Spin>
                        </> : <>
                          <ReactEcharts ref={chartRef} option={chartOption} style={{height: "100%", width: "100%"}}/>
                        </>
                      }
                    </div>
                  </div>

                  {/* 右侧20%区域显示选项卡 + 选择框 */}
                  <div style={{flex: "20%", paddingLeft: "20px"}}>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="类型与数据" key="1">
                        {
                          addChartDefaultDatasource && <>
                            <div style={{marginBottom: "6px"}}>数据源</div>
                            <Select
                              defaultValue={addChartDefaultDatasource}
                              style={{width: "100%", marginBottom: "16px"}}
                              onChange={(value) => {
                                handleDatasourceChange(value)
                              }}
                            >
                              {/* TODO: 动态显示数据源 */}
                              {datasources && datasources.map(item => {
                                return <Option value={item.value}>{item.label}</Option>
                              })}
                            </Select>
                          </>
                        }

                        {
                          addChartDefaultTable && <>
                            <div style={{marginBottom: "6px"}}>数据表</div>
                            <Select
                              value={addChartDefaultTable}
                              style={{width: "100%", marginBottom: "16px"}}
                              onChange={(value) => handleTableChange(value)}
                            >
                              {/* TODO: 动态显示数据表 */}
                              {
                              tables && tables.map(item => {
                                  return <Option value={item.tableName}>{item.tableName}</Option>
                                })
                              }
                            </Select>
                          </>
                        }

                        {
                          addChartDefaultField && <>
                            <div style={{marginBottom: "6px"}}>横轴</div>
                            <Select
                              value={addChartDefaultField}
                              style={{width: "100%", marginBottom: "16px"}}
                              onChange={(value) => handleFieldChange(value)}
                            >
                              {
                                fields && fields.map(item => {
                                  return <Option value={item.originName}>{item.originName}</Option>
                                })
                              }
                              {/* 展示横轴字段 */}
                            </Select>
                          </>
                        }

                        <div style={{marginTop: "6px"}}>纵轴</div>
                        <Select
                          value="value"
                          style={{width: "100%", marginBottom: "16px"}}
                          onChange={(value) => handleOptionChange({yAxis: {type: value}})}
                        >
                          <Option value="value">统计记录总数</Option>
                          <Option value="log">统计字段数值</Option>
                        </Select>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </>
            }
          </Modal>

          {/* 弹出 编辑图表Modal */}
          <Modal
            visible={isEditVisible}
            title="编辑图表"
            width="80%"
            onCancel={() => setIsEditVisible(false)} // 关闭Modal
            footer={[
              <Button key="submit" type="primary" onClick={() => {
                // todo: 更新图表
                updateChartById(readToEditChart)
                setIsEditVisible(false)
              }}>
                确定
              </Button>,
            ]}
          >
            {
              chartOption !== null && <>
                <div style={{display: "flex", width: "100%", height: "500px"}}>
                  {/* 左侧80%区域显示图表 */}
                  <div style={{flex: "80%", borderRight: "1px solid #f0f0f0", paddingRight: "20px"}}>
                    <div style={{
                      height: "500px",
                      width: "100%"
                    }}>
                      {
                        addChartDataLoading ? <>
                          <Spin tip="Loading...">
                            <Alert
                              message="Alert message title"
                              description="Further details about the context of this alert."
                              type="info"
                            />
                          </Spin>
                        </> : <>
                          <ReactEcharts ref={editChartRef} option={chartOption} style={{height: "100%", width: "100%"}}/>
                        </>
                      }
                    </div>
                  </div>

                  {/* 右侧20%区域显示选项卡 + 选择框 */}
                  <div style={{flex: "20%", paddingLeft: "20px"}}>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="类型与数据" key="1">
                        <div style={{marginBottom: "6px"}}>数据源</div>
                        <Select
                          value={addChartDefaultDatasource}
                          style={{width: "100%", marginBottom: "16px"}}
                          onChange={(value) => handleDatasourceChange(value)}
                        >
                          {/* TODO: 动态显示数据源 */}
                          {datasources && datasources.map(item => {
                            return <Option value={item.value}>{item.label}</Option>
                          })}
                        </Select>

                        <div style={{marginBottom: "6px"}}>数据表</div>
                        <Select
                          value={addChartDefaultTable}
                          style={{width: "100%", marginBottom: "16px"}}
                          onChange={(value) => handleTableChange(value)}
                        >
                          {/* TODO: 动态显示数据表 */}
                          {
                            tables && tables.map(item => {
                              return <Option value={item.tableName}>{item.tableName}</Option>
                            })
                          }
                        </Select>

                        <div style={{marginBottom: "6px"}}>横轴字段</div>
                        <Select
                          value={addChartDefaultField}
                          style={{width: "100%", marginBottom: "16px"}}
                          onChange={(value) => handleFieldChange(value)}
                        >
                          {/* 展示横轴字段 */}
                          {
                            fields && fields.map(item => {
                              return <Option value={item.originName}>{item.originName}</Option>
                            })
                          }
                        </Select>

                        <div style={{marginTop: "6px"}}>纵轴数据</div>
                        <Select
                          defaultValue="value"
                          style={{width: "100%", marginBottom: "16px"}}
                          onChange={(value) => handleOptionChange({yAxis: {type: value}})}
                        >
                          <Option value="value">统计记录总数</Option>
                          <Option value="log">统计字段数值</Option>
                        </Select>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </>
            }
          </Modal>


          <ModalForm
            title={'添加仪表盘'}
            width="600px"
            modalProps={{
              destroyOnClose: true,
            }}
            open={handleAddModal}
            onOpenChange={setHandleAddModal}
            onFinish={async (value) => {
              const res = await addDashboard({...value, pid: 0});
              if (res.code === 0) {
                message.success('新建成功');
                setHandleAddModal(false);
                loadAllDashboard()
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

      </div>
    </div>
  );
};

export default Dashboard;
