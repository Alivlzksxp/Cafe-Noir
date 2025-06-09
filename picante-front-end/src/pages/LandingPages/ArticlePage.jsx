import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/ArticlePage.css';
import articles from '../../article-content.js'

function ArticlePage() {
  const {name} = useParams();
  const article = articles.find(article => article.name === name);

  return (
    <>
    <h1>{article.title}</h1>
    <h2>{article.name}</h2>
    {article.content.map(p => <p key={p}> {p} </p>)}
    </>
  );
}

export default ArticlePage;
