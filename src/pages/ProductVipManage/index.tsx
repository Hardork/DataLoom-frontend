import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import AssistantUpdateForm from '@/pages/AiAssistantTable/components/AssistantUpdateForm';
import {
  addProductVipInfoUsingPost,
  deleteProductVipInfoUsingPost,
  listProductVipInfoByPageUsingGet,
  updateProductVipInfoUsingPost
} from "@/services/hwqbi/productInfoController";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const ProductVipManage: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductVip>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductVip[]>([]);

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.ProductVip) => {
    const hide = message.loading('更新中');
    const param = {
      id: currentRow?.id,
      ...fields,
    };
    const res = await updateProductVipInfoUsingPost(param);

    if (res.code === 0) {
      hide();
      message.success('更新成功');
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
    return true;
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.ProductVip) => {
    if (!record) return true;
    const param = {
      id: record.id,
    };
    const res = await deleteProductVipInfoUsingPost(param);
    if (res.code === 0) {
      actionRef.current?.reload();
      message.success('删除成功');
    } else {
      message.error(res.message);
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const updateFormColumns: ProColumns<API.ProductVip>[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '商品名称不得为空',
          },
        ],
      },
    },
    {
      title: '添加积分',
      dataIndex: 'addPoints',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '添加积分不得为空',
          },
        ],
      },
    },
    {
      title: '商品描述',
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '商品描述不得为空',
          },
        ],
      },
    },
    {
      title: '有效期',
      dataIndex: 'duration',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '有效期不得为空',
          }
        ],
      },
    },
    {
      title: '现价',
      dataIndex: 'total',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '价格不得为空',
          }
        ],
      },
    },
    {
      title: '原价',
      dataIndex: 'originalTotal',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '原价不得为空',
          }
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '上线中',
          status: 'success',
        },
        1: {
          text: '已下线',
          status: 'Error',
        }
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '状态不得为空',
          }
        ],
      },
    },
  ];


  const addFormIndex = [
    {
      name: 'name',
      required: true,
      label: '商品名称',
      message: '商品名称不得为空',
      type: 'text',
    },
    {
      name: 'description',
      required: true,
      label: '商品描述',
      message: '商品描述不得为空',
      type: 'text'
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      selectItem: [
        {
          value: '0',
          label: '上线',
        },
        {
          value: '1',
          label: '下线',
        }
      ],
    },
    {
      name: 'duration',
      required: true,
      label: '有效期（天）',
      message: '有效期不得为空',
      type: 'text',
    },
    {
      name: 'productTye',
      label: '类型',
      type: 'select',
      selectItem: [
        {
          value: '0',
          label: 'Vip',
        },
        {
          value: '1',
          label: 'SVip',
        }
      ],
      required: true,
      message: '类型不得为空'
    },
    {
      name: 'total',
      required: true,
      label: '现价',
      message: '现价不得为空',
      type: 'text',
    },
    {
      name: 'originalTotal',
      required: true,
      label: '原价',
      message: '原价不得为空',
      type: 'text',
    },
    {
      name: 'addPoints',
      required: true,
      label: '添加积分',
      message: '添加积分不得为空',
      type: 'text',
    }
  ];

  const columns: ProColumns<API.ProductVip>[] = [
    {
      title: '商品id',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '类型',
      dataIndex: 'productType',
      valueEnum: {
        0: {
          text: 'Vip',
          status: 'success',
        },
        1: {
          text: 'SVip',
          status: 'success',
        }
      }
    },
    {
      title: '有效期',
      dataIndex: 'duration',
      render: text => <>{text + '天'}</>
    },
    {
      title: '添加积分',
      dataIndex: 'addPoints',
    },
    {
      title: '现价',
      dataIndex: 'total',
      render: text => <a> {text} 元</a>
    },
    {
      title: '原价',
      dataIndex: 'originalTotal',
      render: text => <s>{text} 元</s>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '上线中',
          status: 'success',
        },
        1: {
          text: '已下线',
          status: 'Error',
        }
      }
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
            handleUpdateModalOpen(true);
          }}
        >
          编辑
        </a>,
        <a
          key="deleteRecord"
          onClick={() => {
            setCurrentRow(record);
            handleRemove(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ProductVip, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新增商品
          </Button>,
        ]}
        request={async (values) => {
          console.log(values)
          const res = await listProductVipInfoByPageUsingGet({...values});
          return {
            data: res.data?.records,
          };
        }}
        columns={columns}
      />
      <ModalForm
        title={'新增商品'}
        width="600px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(value);
          const res = await addProductVipInfoUsingPost({ ...value });
          if (res.code === 0) {
            message.success('新增商品成功');
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(res.message);
          }
        }}
      >
        {addFormIndex.map((item, index) => (
          <div key={index}>
            {/*text textArea select*/}
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

            {item.type === 'textArea' && (
              <>
                <ProFormTextArea
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
      <AssistantUpdateForm
        columns={updateFormColumns}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (values) => {
          console.log(values);
          const res = await handleUpdate(values);
          if (res) {
            // 关闭模态框
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current?.reload();
            }
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />


    </PageContainer>
  );
};
export default ProductVipManage;
