import {
  ModalForm, ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {addAiRoleUsingPost} from "@/services/hwqbi/aiRoleController";
import {ProFormSwitch} from "@ant-design/pro-form";
export type Props = {
  columns: ProColumns<API.AiRole>[];
  onCancel: () => void;
  onSubmit: (values: API.AiRole) => Promise<void>;
  visible: boolean,
  values: API.AiRole
};

const AssistantUpdateForm: React.FC<Props> = (props) => {
  const { columns ,visible, onCancel, onSubmit, values} = props;

  const formRef = useRef<any>()

  // 监听values
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values)
    }
  }, [values])

  return <Modal open={visible} onCancel={() => {onCancel?.()}} footer={null}>
    <ProTable type="form" columns={columns}  formRef={formRef} onSubmit={async (value) => {
      onSubmit?.(value)
    }}
    />
  </Modal>

};

export default AssistantUpdateForm;
