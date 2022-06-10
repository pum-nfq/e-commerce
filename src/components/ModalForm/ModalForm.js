import { Form, Modal } from 'antd';
import React, { useEffect } from 'react';

const ModalForm = (props) => {
  const {
    form,
    modalTitle,
    formName,
    isVisible,
    handleOk,
    handleCancel,
    defaultValue,
    children,
    ...prop
  } = props;

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        ...defaultValue,
      });
    }
  }, [defaultValue, form]);

  return (
    <Modal
      title={modalTitle}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Cancel"
      {...prop}
    >
      <Form form={form} layout="vertical" name={formName}>
        {children}
      </Form>
    </Modal>
  );
};

export default ModalForm;
