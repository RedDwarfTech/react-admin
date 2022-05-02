import React, { useEffect } from 'react';
import {
  ModalForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useIntl, ITagState, Dispatch, connect, Loading } from 'umi';
import { Form } from 'antd';
import BaseMethods from 'js-wheel/dist/src/utils/data/BaseMethods';

export type FormValueType = {
  tags?: string[];
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

  const getTags = () => {
    dispatch({
      type: 'tags/getAppTagList',
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
        tags: selectTagArray
      });
    }
  }; 

  const handleSubmit = async (formData: any) => {
    debugger
    return onSubmit(formData);
  };

  function handleChange(values: any) {
    
  }

  useEffect(() => {
    // https://stackoverflow.com/questions/71523100/how-to-refresh-the-antd-pro-proformtext-initialvalue
    if(updateModalVisible){
      form.resetFields();
      getTags();
    }
  },[form,updateModalVisible]);

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



