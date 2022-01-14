import React, { useState } from 'react';
import { Modal, Button,Input } from 'antd';

export default function AddApp(props) {

    const {
        visible,
        rowData: data = {},
        onVisibleChange,
        dispatch,
    } = props;

    function onConfirm() {
        onVisibleChange();
    }

  return (
    <>
      <Modal title="添加应用" visible={visible} onOk={onConfirm} onCancel={onConfirm}>
        <p><Input placeholder="Basic usage" /></p>
        <p><Input placeholder="Basic usage" /></p>
        <p><Input placeholder="Basic usage" /></p>
      </Modal>
    </>
  );
};

