import React from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

export type FormValueType = {
  company?: string;
  address?: string;
  city?: string;
} & Partial<API.InterviewListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.InterviewListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();

  return (
    <ModalForm
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
        initialValue={props.values.company}
        name="company"
        label={intl.formatMessage({
          id: 'pages.apps.jobs.interview.searchTable.company',
          defaultMessage: '公司名称',
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
        initialValue={props.values.address}
        name="address"
        width="md"
        label={intl.formatMessage({
          id: 'pages.apps.jobs.interview.searchTable.address',
          defaultMessage: '公司地址',
        })}
        placeholder={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
          defaultMessage: '请输入至少五个字符',
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
            min: 5,
          },
        ]}
      />
      <ProFormText
        initialValue={props.values.city}
        name="city"
        label={intl.formatMessage({
          id: 'pages.apps.jobs.interview.searchTable.city',
          defaultMessage: '工作城市',
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
