import React, { useEffect } from 'react';
import {
  ModalForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useIntl, ITagState, Dispatch, connect, Loading, useModel } from 'umi';
import { Form } from 'antd';
import { getDictArray } from '@/utils/data/dictionary';
import { BaseMethods } from 'rdjs-wheel';

export type FormValueType = {
  tags?: string[];
  comment_rss?: number;
  part_output?: number;
} & Partial<API.ChannelListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.ChannelListItem>;
};

interface TagProps {
  tags: ITagState
  dispatch: Dispatch
  loading: boolean
}

const UpdateForm: React.FC<UpdateFormProps & TagProps> = ({updateModalVisible,values,onCancel,onSubmit,dispatch,tags}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');

  const getTags = () => {
    dispatch({
      type: 'tags/getTagList',
      payload: {
        appId: 1,
        tagType: 4
      }
    });
  };

  const setSelectedTags = () => {
    if(values&&values.tags!==undefined&&!BaseMethods.isNull(values.tags)) {
      let selectTagArray = values?.tags?.map((item: { code: any; })=>item.code);
      form.setFieldsValue({
        id: tags,
        tags: selectTagArray,
        sub_status: values.sub_status
      });
    }
  }; 

  const handleSubmit = async (formData: any) => {
    return onSubmit(formData);
  };

  const handleFormChange = async (formData: any) => {
  };

  function handleChange(values: any) {
    
  }

  useEffect(() => {
    // https://stackoverflow.com/questions/71523100/how-to-refresh-the-antd-pro-proformtext-initialvalue
    if(updateModalVisible){
      form.resetFields();
      form.setFieldsValue({
        sub_status: values.sub_status,
        comment_rss: values.comment_rss,
        part_output: values.part_output
      });
      getTags();
    }
  },[form,updateModalVisible]);

  let subStatusArray = getDictArray("RSS_SUB_STATUS",initialState);
  let yesNoArray = getDictArray("YES_NO",initialState);
  //debugger

  let tagData = tags.tags;
  if(!BaseMethods.isNull(tagData)){
    setSelectedTags();
  }

  return (
    <ModalForm
    form = {form}
    title={intl.formatMessage({
      id: 'pages.apps.jobs.interview.updateInterview',
      defaultMessage: 'New rule',
    })}
    width="400px"
    onValuesChange={handleFormChange}
    visible={updateModalVisible}
    onVisibleChange={(value)=>{
      if(!value){
        onCancel();
      }
    }}
    onFinish={handleSubmit}>
      <ProFormSelect
          name="tags"
          width="md"
          fieldProps={{
            mode: 'multiple',
            onChange: handleChange
          }}
          //valueEnum={getTagPair(tagData)}
          options={tagData?.map((item: { code: any; tag_name: any; })=>({
            label: item.tag_name,
            value: item.code,
          }))}
          label={
            intl.formatMessage({
              id: 'pages.apps.cruise.channel.searchTable.tag',
              defaultMessage: '标签',
            })
          }
        >
        </ProFormSelect>
        <ProFormSelect
          name="sub_status"
          width="md"
          options={subStatusArray?.map((item: { key: any; show_value: any; })=>({
            label: item.show_value,
            value: item.key,
          }))}
          label={
            intl.formatMessage({
              id: 'pages.apps.cruise.channel.searchTable.subStatus',
              defaultMessage: '订阅状态',
            })
          }
        >
        </ProFormSelect>
        <ProFormSelect
          name="comment_rss"
          width="md"
          options={yesNoArray?.map((item: { key: any; show_value: any; })=>({
            label: item.show_value,
            value: item.key,
          }))}
          label={
            intl.formatMessage({
              id: 'pages.apps.cruise.channel.searchTable.commentRss',
              defaultMessage: '评论',
            })
          }
        >
        </ProFormSelect>
        <ProFormSelect
          name="part_output"
          width="md"
          options={yesNoArray?.map((item: { key: any; show_value: any; })=>({
            label: item.show_value,
            value: item.key,
          }))}
          label={
            intl.formatMessage({
              id: 'pages.apps.cruise.channel.searchTable.partOutput',
              defaultMessage: '部分输出',
            })
          }
        >
        </ProFormSelect>
    </ModalForm>
  );
};

const mapStateToProps = ({ tags, loading }: { tags: ITagState, loading: Loading }) => {
  return {
    tags,
    loading: loading.models.tags
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);



