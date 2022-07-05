import React, { useEffect } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import { Form } from 'antd';

export type FormValueType = {
  remark?: string;
  id?: number;
} & Partial<API.ProductListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.ProductListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm()

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
        initialValue={props.values.product_name}
        name="product_name"
        label={intl.formatMessage({
          id: 'pages.apps.overview.product.searchTable.productName',
          defaultMessage: '产品名称',
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
          id: 'pages.apps.overview.product.searchTable.remark',
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


