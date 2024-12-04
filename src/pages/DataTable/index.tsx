// import {ActionType, EditableProTable} from '@ant-design/pro-components';
// import {
//   PageContainer
// } from '@ant-design/pro-components';
// import '@umijs/max';
// import {message, Space} from 'antd';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   listUserDataByPage
// } from "@/services/DataLoom/dataController";
// import {useParams} from "react-router";
// import Icon, {
//   CalendarOutlined,
//   DashboardOutlined,
//   FileOutlined,
//   FileTextOutlined,
//   NumberOutlined
// } from "@ant-design/icons";
//
//
// /**
//  * @en-US Add node
//  * @zh-CN 添加节点
//  * @param fields
//  */
//
// const DataTable: React.FC = () => {
//   /**
//    * @en-US Pop-up window of new window
//    * @zh-CN 新建窗口的弹窗
//    *  */
//   /**
//    * @en-US The pop-up window of the distribution update window
//    * @zh-CN 分布更新窗口的弹窗
//    * */
//
//   const actionRef = useRef<ActionType>();
//   const [dataId, setDataId] = useState<string>()
//   const dataParam = useParams();
//   /**
//    * @en-US Update node
//    * @zh-CN 更新节点
//    *
//    * @param fields
//    */
//
//
//
//   const [columns, setColumns] = useState([]);
//   const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
//
//
//   // 动态转换请求参数
//   const dynamicTransform : any = (originalObject : any) => {
//     const chartData = { data: {} };
//     const result = {
//       chartData: chartData,
//       current: originalObject.current,
//       dataId: 0,
//       pageSize: originalObject.pageSize,
//       sortField: "",
//       sortOrder: ""
//     };
//     console.log('数据2')
//     console.log(originalObject)
//     // 将除了 current 和 pageSize 以外的字段封装到 chartData.data 中
//     for (const key in originalObject) {
//       if (key === null) continue;
//       if (key !== 'current' && key !== 'pageSize') {
//           if (originalObject[key].length === 0) {
//             continue;
//           }
//           chartData.data[key] = originalObject[key];
//         } else {
//           result[key] = originalObject[key];
//         }
//     }
//     return result;
//
//   }
//
//   // 定义字段类型与图标的映射关系
//   const fieldTypeToIconMap = {
//     'DATETIME': <CalendarOutlined/>, // 日期时间类型对应日历图标
//     'LONG': <NumberOutlined/>,       // 长整型对应数字图标
//     'TEXT': <FileTextOutlined/>,     // 文本类型对应文本文件图标
//     'DOUBLE': <DashboardOutlined/>, // 双精度浮点型对应仪表盘图标
//     // ... 其他类型与图标的映射
//   };
//
//   // // 将字段信息转换为 columns 配置
//   // const generateColumns = (fields) => {
//   //   const columns = fields.map(field => {
//   //     const column = {
//   //         title: (
//   //           <Space>
//   //             {fieldTypeToIconMap[field.fieldType] || <FileOutlined />}
//   //             {field.originName}
//   //           </Space>
//   //         ), // 列标题
//   //       dataIndex: field.name,   // 列数据索引，对应数据对象的键
//   //       key: field.name,         // 列的唯一标识
//   //       // 根据字段类型设置适当的编辑组件
//   //       valueType: field.fieldType.toLowerCase() === 'datetime' ? 'date' : field.fieldType.toLowerCase(),
//   //     };
//   //     // 可以添加更多的配置选项，例如排序、过滤等
//   //     return column;
//   //   });
//   //   columns.push({
//   //     title: '操作',
//   //     dataIndex: 'option',
//   //     valueType: 'option',
//   //     render: (text, record, _, action) => [
//   //       <a
//   //         key="editable"
//   //         onClick={() => {
//   //           action?.startEditable?.(record.id);
//   //           // editRecord(record);
//   //         }}
//   //       >
//   //         编辑
//   //       </a>,
//   //       <a
//   //         key="getDetail"
//   //         onClick={async () => {
//   //           deleteRecord(record)
//   //         }}
//   //       >
//   //         删除
//   //       </a>
//   //     ],
//   //   })
//   //   console.log(columns)
//   //   return columns;
//   // };
//
//   // const deleteRecord = async (record) => {
//   //   const hide = message.loading('删除记录中');
//   //   // 删除记录
//   //   const deleteChartDataRecordRequest = {
//   //     dataId : dataParam.id,
//   //     id: record.id
//   //   }
//   //   const res = await deleteRecordById(deleteChartDataRecordRequest)
//   //   if (res.code === 0) {
//   //     hide();
//   //     message.success('删除成功');
//   //     actionRef.current?.reload();
//   //   } else {
//   //     message.error('删除失败');
//   //   }
//   // }
//   //
//   // const getRecordData = (record) => {
//   //   const data = {}
//   //   for (const key in record) {
//   //     if (key !== 'id') {
//   //       // @ts-ignore
//   //       data[key] = record[key]
//   //     }
//   //   }
//   //   return data
//   // }
//   //
//   // const editRecord = async (record) => {
//   //   const hide = message.loading('编辑记录中');
//   //
//   //   // 编辑记录
//   //   // 删除记录
//   //   const editChartDataRecordRequest = {
//   //     dataId : dataParam.id,
//   //     id: record.id,
//   //     data: getRecordData(record)
//   //   }
//   //   const res = await editRecordById(editChartDataRecordRequest)
//   //   if (res.code === 0) {
//   //     hide();
//   //     message.success('编辑成功');
//   //     actionRef.current?.reload();
//   //   } else {
//   //     message.error('编辑失败');
//   //   }
//   // }
//   //
//   // const addRecord = async (record : any) => {
//   //   const hide = message.loading('添加记录中');
//   //   // 编辑记录
//   //   // 删除记录
//   //   const addChartDataRecordRequest = {
//   //     dataId : dataParam.id,
//   //     data: getRecordData(record)
//   //   }
//   //   const res = await addOneRecord(addChartDataRecordRequest)
//   //   if (res.code === 0) {
//   //     hide();
//   //     message.success('添加成功');
//   //     actionRef.current?.reload();
//   //   } else {
//   //     message.error('添加失败');
//   //   }
//   // }
//
//   // 获取数据
//   const fetchData = async (values : any) => {
//     try {
//       const param = dynamicTransform(values)
//       param['dataId'] = dataParam.id
//       console.log(param)
//       const res = await listUserDataByPage(param);
//       if (res.code === 0) {
//         // 根据请求返回的数据动态生成列配置
//         const newColumns = generateColumns(res.data?.tableFieldInfosList);
//
//         // 更新列配置
//         setColumns(newColumns);
//         const a_data = res.data?.dataList?.map(item => ({
//           ...item.data,
//           id: item.id
//         }))
//         return {
//           data: a_data,
//           success: true,
//           current: res.data?.current,
//           pageSize: res.data?.size,
//           total: res.data?.total
//         };
//       }
//     } catch (error) {
//       // 处理请求错误
//       console.error('Error fetching data:', error);
//       return {
//         data: [],
//         success: false,
//       };
//     }
//   };
//
//   //
//
//   /**
//    * @en-US International configuration
//    * @zh-CN 国际化配置
//    * */
//
//   return (
//     <PageContainer>
//       <EditableProTable<API.ChartData, API.PageParams>
//         actionRef={actionRef}
//         rowKey="id"
//         scroll={{
//           x: 960,
//         }}
//         search={{
//           labelWidth: 120,
//         }}
//         recordCreatorProps={
//             {
//               position: 'bottom',
//               record: () => ({ id: -1})
//             }
//         }
//         request={fetchData}
//         columns={columns}
//         pagination={true}
//         editable={{
//           type: 'multiple',
//           editableKeys,
//           onSave: async (rowKey, data, row) => { // 保存
//             if ('index' in data) {
//               // 存在 index 字段，删除它
//               delete data.index;
//             }
//             console.log(data.id)
//             if (data?.id === -1) { // 新增操作
//               addRecord(data)
//             } else { // 修改操作
//               editRecord(data)
//             }
//             // data为修改后的数据
//             // 检查对象中是否存在 index 字段
//
//             // editRecordById()
//           },
//           onChange: setEditableRowKeys
//         }}
//       />
//     </PageContainer>
//   );
// };
// export default DataTable;
