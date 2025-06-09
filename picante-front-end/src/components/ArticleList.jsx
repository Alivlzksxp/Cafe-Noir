import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';

function ArticleList({ articles }) {
    return (
        <div className="article-list-container">
            <div className="article-cards">
                {articles.map((a) => (
                    <Link key={a.name} to={`/articles/${a.name}`} className="article-card">
                        <h3>{a.title}</h3>
                        <p>{a.content[0].substring(0, 150)}...</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ArticleList;
