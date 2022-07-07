import React, { useEffect } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import { Form } from 'antd';

export type FormValueType = {
  appName?: string;
  remark?: string;
  id?: number;
} & Partial<API.AppListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.AppListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm()

  useEffect(() => {
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
        initialValue={props.values.app_name}
        name="appName"
        label={intl.formatMessage({
          id: 'pages.apps.overview.list.searchTable.appName',
          defaultMessage: '应用名称',
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
      <ProFormTextArea
        initialValue={props.values.remark}
        name="remark"
        width="md"
        label={intl.formatMessage({
          id: 'pages.apps.overview.list.searchTable.remark',
          defaultMessage: '备注',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
          defaultMessage: '请输入至少1个字符',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleDesc.descRules"
                defaultMessage="请输入至少五个字符的规则描述！"
              />
            ),
            min: 1,
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;


