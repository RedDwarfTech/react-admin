import React from 'react';
import { useLocation} from 'react-router-dom';

import { ArticleDetailProps, connect, Dispatch, IArticleState, Loading } from 'umi';

const ArticleDetail: React.FC<ArticleDetailProps> = ({articles, dispatch, channelListLoading}) => {

  const location = useLocation();

  React.useEffect(()=>{
      dispatch({
        type: 'articles/getArticleDetail',
        payload: (location as any).query.id
      });
  },[]);

  let articleData = articles.article;
  return (
   <div>
      <h2>{articleData.title}</h2>
     <div style={{fontSize:'16px'}} dangerouslySetInnerHTML={{__html: articleData.content}} />
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



