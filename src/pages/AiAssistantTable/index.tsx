import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addAiRole,
  deleteAiRole,
  listAiRoleVoByPage,
  updateAiRole,
} from '@/services/DataLoom/aiRoleController';
import { ProFormSwitch } from '@ant-design/pro-form';
import AssistantUpdateForm from '@/pages/AiAssistantTable/components/AssistantUpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const AiAssistantTable: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.AiRole>();
  const [selectedRowsState, setSelectedRows] = useState<API.AiRole[]>([]);

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.AiRole) => {
    const hide = message.loading('更新中');
    console.log(fields);
    const param = {
      id: currentRow?.id,
      ...fields,
    };
    const res = await updateAiRole(param);

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
  const handleRemove = async (record: API.AiRole) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    const param = {
      id: record.id,
    };
    const res = await deleteAiRole(param);
    if (res.code === 0) {
      hide();
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

  const updateFormColumns: ProColumns<API.AiRole>[] = [
    {
      title: '助手名称',
      dataIndex: 'assistantName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '助手名称不得为空',
          },
        ],
      },
    },
    {
      title: '功能描述',
      dataIndex: 'functionDes',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '功能描述不得为空',
          },
        ],
      },
    },
    {
      title: '输入模板',
      dataIndex: 'inputModel',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '输入模板不得为空',
          },
        ],
      },
    },
  ];

  const addFormIndex = [
    {
      name: 'assistantName',
      required: true,
      label: '助手名称',
      message: '助手名称不得为空',
      type: 'text',
    },
    {
      name: 'type',
      required: true,
      label: '助手类型',
      message: '助手类型不得为空',
      type: 'select',
      selectItem: [
        {
          value: '编程',
          label: '编程',
        },
        {
          value: '创作',
          label: '创作',
        },
        {
          value: '健康',
          label: '健康',
        },
        {
          value: '歌手',
          label: '歌手',
        },
        {
          value: '文书',
          label: '文书',
        },
        {
          value: '职场',
          label: '职场',
        },
        {
          value: '情感',
          label: '情感',
        },
        {
          value: '脑暴',
          label: '脑暴',
        },
        {
          value: '其它',
          label: '其它',
        },
      ],
    },
    {
      name: 'historyTalk',
      label: '历史对话',
      type: 'switch',
      checkedChildren: (
        <>
          <CheckOutlined />
        </>
      ),
      unCheckedChildren: (
        <>
          <CloseOutlined />
        </>
      ),
    },
    {
      name: 'inputModel',
      required: true,
      label: '输入模板',
      message: '输入模板不得为空',
      type: 'textArea',
    },
    {
      name: 'functionDes',
      required: true,
      label: '功能描述',
      message: '功能描述不得为空',
      type: 'textArea',
    },
    {
      name: 'roleDesign',
      required: false,
      label: '角色设定',
      message: '',
      type: 'text',
    },
    {
      name: 'targetWork',
      required: false,
      label: '目标任务',
      message: '',
      type: 'text',
    },
    {
      name: 'requirement',
      required: false,
      label: '需求说明',
      message: '',
      type: 'textArea',
    },
    {
      name: 'style',
      required: false,
      label: '风格设定',
      message: '',
      type: 'text',
    },
  ];

  const columns: ProColumns<API.AiRole>[] = [
    {
      title: '助手名称',
      dataIndex: 'assistantName',
    },
    {
      title: '功能描述',
      dataIndex: 'functionDes',
      valueType: 'textarea',
    },
    {
      title: '助手类型',
      dataIndex: 'type',
    },
    {
      title: '创建时间',
      sorter: true,
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
      <ProTable<API.AiRole, API.PageParams>
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
            <PlusOutlined /> 新增助手
          </Button>,
        ]}
        request={async (values) => {
          const res = await listAiRoleVoByPage({...values});
          return {
            data: res.data?.records,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <ModalForm
        title={'新增助手'}
        width="600px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log(value);
          const res = await addAiRole({ ...value });
          if (res.code === 0) {
            message.success('新增助手成功');
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
            {item.type === 'switch' && (
              <>
                <div style={{ marginBottom: '10px' }}>历史对话:</div>
                <ProFormSwitch
                  noStyle
                  checkedChildren={item.checkedChildren}
                  unCheckedChildren={item.unCheckedChildren}
                  width="md"
                  required={true}
                  name={item.name}
                  label={item.label}
                />
                <>
                  <div style={{ marginBottom: '16px' }}></div>
                </>
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

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.assistantName && (
          <ProDescriptions<API.AiRole>
            column={2}
            title={currentRow?.assistantName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.AiRole>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default AiAssistantTable;
