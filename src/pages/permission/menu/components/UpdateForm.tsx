import React, { useEffect } from 'react';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { Form } from 'antd';

export type FormValueType = {
  sort: number;
} & Partial<API.MenuItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.MenuItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm()
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    // https://stackoverflow.com/questions/71523100/how-to-refresh-the-antd-pro-proformtext-initialvalue
    if(props.updateModalVisible){
      form.resetFields();
      form.setFieldsValue(props.values);
    }
  },[form,props.updateModalVisible]);

  return (
    <ModalForm
    form = {form}
    title={intl.formatMessage({
      id: 'pages.apps.jobs.interview.updateInterview',
      defaultMessage: 'New rule',
    })}
    width="400px"
    visible={props.updateModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        props.onCancel();
      }
    }}
    onFinish={props.onSubmit}
    >
      <ProFormText
        initialValue={props.values.sort}
        name="sort"
        label={intl.formatMessage({
          id: 'pages.permission.menu.searchTable.sort',
          defaultMessage: '排序',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleName.nameRules"
                defaultMessage="请输入规则名称！"
              />
            ),
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;


