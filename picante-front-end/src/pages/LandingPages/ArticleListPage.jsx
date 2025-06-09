import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { fetchArticles } from '../../services/ArticleService';
import '../../styles/ArticleList.css';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      const activeArticles = data.articles.filter(article => article.isActive);
      setArticles(activeArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  if (loading) {
    return <div className="loading-container"><CircularProgress /></div>;
  }

  return (
    <div className="article-list-container">
      <div className="article-content-wrapper">
        <h1 className="article-heading">Articles</h1>
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="article-grid">
            {articles.map(article => (
              <div className="article-card" key={article._id}>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-subtext">{article.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleListPage;
