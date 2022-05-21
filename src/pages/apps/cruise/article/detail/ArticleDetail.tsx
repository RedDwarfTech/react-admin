import dayjs from 'dayjs';
import React from 'react';
import { useLocation} from 'react-router-dom';
import styles from './ArticleDetail.less';

import { ArticleDetailProps, connect, Dispatch, IArticleState, Loading } from 'umi';

const ArticleDetail: React.FC<ArticleDetailProps> = ({articles, dispatch, loading}) => {

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
      <div>实际发布时间：{articleData.pub_time}</div>
      <div>拉取时间：{articleData&&articleData.created_time?dayjs.unix(parseInt(articleData.created_time.toString()) / 1000).format('YYYY-MM-DD HH:mm:ss'):''}</div>
     <div className={styles.article} style={{fontSize:'16px'}} dangerouslySetInnerHTML={{__html: articleData.content}} />
   </div>
  );
};


const mapStateToProps = ({articles, loading}: {articles: IArticleState, loading: Loading}) => {
   return {
      articles,
      loading: loading.models.articles
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);



