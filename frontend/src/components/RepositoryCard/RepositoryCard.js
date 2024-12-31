import React from 'react';
import './RepositoryCard.css';

const RepositoryCard = ({ repo, onSelectRepo }) => {
  return (
    <div className="repository-card">
      <button onClick={() => onSelectRepo(repo.name)} className="repo-link">
        <strong>{repo.name}</strong>
      </button>
      <p className="repo-description">{repo.description || 'No description provided.'}</p>
      <div className="repo-details">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </div>
  );
};

export default RepositoryCard;