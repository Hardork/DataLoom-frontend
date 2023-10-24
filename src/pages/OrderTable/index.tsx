import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import {listUserOrderByPageUsingPOST, userCancelOrderUsingPOST} from "@/services/hwqbi/orderController";
import {history} from "@@/core/history";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const OrderTable: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductOrder>();

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleCancel = async (fields: API.ProductOrder) => {
    const hide = message.loading('取消订单中');
    const res = await userCancelOrderUsingPOST({id: fields.id});
    if (res.code === 0) {
      hide();
      message.success('取消成功');
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
    return true;
  };

  const getDetail = (record: API.ProductOrder) => {
    history.push('/order_detail/' + record?.id);
  }


  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.ProductOrder>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '商品名称',
      dataIndex: 'orderName',
    },
    {
      title: '实际积分',
      dataIndex: 'addPoints',
    },
    {
      title: '价格',
      dataIndex: 'total',
      render: text => <a>{text} 元</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        'SUCCESS': {
          text: '已付款',
          status: 'success',
        },
        'NOT_PAY': {
          text: '未付款',
          status: 'default',
        },
        'CANCEL': {
          text: '已取消',
          status: 'default',
        }
      }
    },
    {
      title: '订单过期时间',
      dataIndex: 'expirationTime',
      valueType: 'dateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="editRecord"
          onClick={() => {
            setCurrentRow(record);
            handleCancel(record)
          }}
        >
          取消
        </a>
        ,
        <a
          key="getDetail"
          onClick={() => {
            setCurrentRow(record);
            getDetail(record)
          }}
        >
          详情
        </a>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ProductOrder, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (values) => {
          const res = await listUserOrderByPageUsingPOST({...values});
          return {
            data: res.data?.records,
          };
        }}
        columns={columns}
      />

    </PageContainer>
  );
};
export default OrderTable;
