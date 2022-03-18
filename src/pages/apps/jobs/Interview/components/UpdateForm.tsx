import React, { useEffect } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { getDictPair, getDictRenderText } from '@/utils/data/dictionary';
import { Form } from 'antd';

export type FormValueType = {
  company?: string;
  address?: string;
  city?: string;
  status?: number;
} & Partial<API.InterviewListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.InterviewListItem>;
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
      <ProFormSelect
          name="status"
          width="md"
          initialValue={getDictRenderText("JOB_STATUS",Number(props.values.status),initialState)}
          valueEnum={getDictPair("JOB_STATUS",initialState)}
        >
        </ProFormSelect>
        <ProFormText
        initialValue={props.values.salary_range}
        name="salary_range"
        label={intl.formatMessage({
          id: 'pages.apps.jobs.interview.searchTable.salaryRange',
          defaultMessage: '薪资范围',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleName.nameRules"
                defaultMessage="请输入薪资范围！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        initialValue={props.values.salary_range}
        name="job_link"
        label={intl.formatMessage({
          id: 'pages.apps.jobs.interview.searchTable.jobLink',
          defaultMessage: '职位链接',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.ruleName.nameRules"
                defaultMessage="请输入薪资范围！"
              />
            ),
          },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateForm;


