import React from 'react';
import { useLocation } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { connect, Dispatch, IArticleState, Loading } from 'umi';

interface ArticleDetailProps {
  articles: IArticleState
  dispatch: Dispatch
  channelListLoading: boolean
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({articles, dispatch, channelListLoading}) => {

  const location: Location = useLocation();
  const stateData: any = location.state;

  React.useEffect(()=>{
    if(stateData){
      dispatch({
        type: 'articles/getArticleDetail',
        payload: stateData.record.id
      });
    }
  },[]);

  let articleData = articles.data;
  
  return (
   <div>
     <div dangerouslySetInnerHTML={{__html: articleData.content}} />
   </div>
  );
};


const mapStateToProps = ({articles, loading}: {articles: IArticleState, loading: Loading}) => {
   return {
      articles,
      userListLoading: loading.models.articles
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);



