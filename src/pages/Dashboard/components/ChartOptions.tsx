
const ChartOption = (type) => {
  // 获取存储在后端的配置文件
  const getOption = () => {
    switch (type) {
      // 柱状图
      case 'bar':
        return {
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10],
            },
          ],
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '销量',
              type: 'line',
              data: [150, 230, 224, 218, 135, 147, 260],
            },
          ],
        };

      // 饼图
      case 'pie':
        return {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Category A', 'Category B', 'Category C', 'Category D'],
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 335, name: 'Category A' },
                { value: 310, name: 'Category B' },
                { value: 234, name: 'Category C' },
                { value: 135, name: 'Category D' },
              ],
            },
          ],
        };

      // 散点图
      case 'scatter':
        return {
          xAxis: {},
          yAxis: {},
          series: [
            {
              symbolSize: 20,
              data: [
                [10, 8.04],
                [8, 6.95],
                [13, 7.58],
                [9, 8.81],
              ],
              type: 'scatter',
            },
          ],
        };

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
