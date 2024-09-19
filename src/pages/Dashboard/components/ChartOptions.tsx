
const ChartOption = (type : any, responseData: any) => {

  const colors = ['#3398DB', '#FF5733', '#33FF57', '#FF33A1'];  // 定义一组颜色
  const getColorByIndex = (index: number) => {
    return colors[index % colors.length];  // 循环使用颜色
  }

  const getPieOption = () => {
    const xValues = responseData.xarrayData.values;  // X轴的AQI值
    const data = xValues.map((seriesItem: any, seriesIndex: any) => {
      return {
        name: seriesItem,
        value: responseData.seriesDataList[0].data[seriesIndex]
      }
    })
    console.log({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          data: data
        }
      ],
    })
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          data: data
        }
      ],
    }
  }

  const getScatterOption = () => {
    const xValues = responseData.xarrayData.values;  // X轴的AQI值

// 遍历 seriesDataList，为每个 series 构造数据和配置
    const series = responseData.seriesDataList.map((seriesItem: any, seriesIndex: any) => {
      const yValues = seriesItem.data;  // 当前数据集的Y轴记录总数

      // 构造散点数据，和之前一样过滤掉 null 值
      const scatterData = xValues
        .map((x: any, index: any) => (x !== null ? [Number(x), yValues[index]] : null))
        .filter((item: null) => item !== null);

      return {
        name: seriesItem.title,  // 当前 series 的标题
        type: 'scatter',
        data: scatterData,
        itemStyle: {
          color: getColorByIndex(seriesIndex)  // 可选择性使用不同颜色，getColorByIndex 是一个函数，返回颜色
        }
      };
    });

// ECharts 配置
    const option = {
      title: {
        text: responseData.xarrayData.title
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.value[0]}<br/>${params.seriesName}: ${params.value[1]}`;
        }
      },
      legend: {
        data: responseData.seriesDataList.map(item => item.title),  // 生成图例
        top: '10%'
      },
      xAxis: {
        name: responseData.xarrayData.title,
        type: 'value',
        min: 0
      },
      yAxis: {
        name: '记录总数',
        type: 'value',
        min: 0
      },
      series: series  // 多个 series
    };

    return option
  }
  // 获取存储在后端的配置文件
  const getOption = () => {
    switch (type) {
      // 柱状图
      case 'bar':
        return {
          tooltip: {},
          xAxis: {
            type: 'category',
            data: responseData.xarrayData.values.filter(Boolean),
          },
          legend: {
            data: responseData.xarrayData.values.filter(Boolean)
          },
          yAxis: {
            type: 'value',
          },
          series: responseData.seriesDataList.map((seriesItem: { title: any; data: any; }) => ({
            name: seriesItem.title,
            type: 'bar', // 假设这里是柱状图，如果是其他类型可以根据实际情况修改
            data: seriesItem.data
          })),
        };
      // 折线图
      case 'line':
        return {
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: responseData.xarrayData.values.filter(Boolean),
          },
          legend: {
            data: responseData.xarrayData.values.filter(Boolean)
          },
          yAxis: {
            type: 'value',
          },
          series: responseData.seriesDataList.map((seriesItem: { title: any; data: any; }) => ({
            name: seriesItem.title,
            type: 'line', // 假设这里是柱状图，如果是其他类型可以根据实际情况修改
            data: seriesItem.data
          })),
        };

      // 饼图
      case 'pie':
        return getPieOption();
      // 散点图
      case 'scatter':
        return getScatterOption();

      // 雷达图
      case 5:
        return {
          tooltip: {},
          radar: {
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'IT', max: 30000 },
              { name: 'Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 },
            ],
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget',
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending',
                },
              ],
            },
          ],
        };

      // 默认：柱状图
      default:
        return {
          tooltip: {},
          xAxis: {
            data: ['A', 'B', 'C', 'D', 'E'],
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10],
            },
          ],
        };
    }
  };

  return getOption();
};

export default ChartOption
