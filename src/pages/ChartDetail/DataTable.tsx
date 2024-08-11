import {Table} from "antd";

const DataTable = (tableData) => {
  // 组件传过来的都是一个对象, 而不是一个字符串
  try {
    const lines = tableData.tableData.trim().split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map((line) => {
      const values = line.split(',');
      const entry = {};
      for (let i = 0; i < headers.length; i++) {
        entry[headers[i]] = values[i];
      }
      console.log(entry)
      return entry;
    });

    // 获取数据源的所有键作为表格的列
    const columns = data.length > 0 ? Object.keys(data[0]).map(key => ({
      title: key,
      dataIndex: key,
      key: key
    })) : [];

    return (
      <Table dataSource={data} columns={columns} />
    );
  } catch (e) {
    return <Table dataSource={[]} columns={[]} />
  }


};

export default DataTable;
