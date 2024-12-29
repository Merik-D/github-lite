import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RepositoriesList.css';

const RepositoriesList = ({ onSelectRepo }) => {
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const reposResponse = await axios.get('http://localhost:5173/repos/Merik-D');
        setRepositories(reposResponse.data);

        const userResponse = await axios.get('http://localhost:5173/Merik-D');
        setUser(userResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="repositories-list">
      {user && (
        <div className="user-profile">
          <img
            src={user.avatar_url || 'https://via.placeholder.com/150'}
            alt={`${user.name || user.login}'s avatar`}
            className="user-avatar"
          />
          <h2 className="user-name">{user.name || user.login}</h2>
          <p className="user-bio">{user.bio || 'No bio available.'}</p>
          <p><strong>Location:</strong> {user.location || 'Not provided'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-profile-link">
            Visit Profile
          </a>
        </div>
      )}

      <h1 className="header">Repositories</h1>
      <div className="repositories-grid">
        {repositories.map((repo) => (
          <div key={repo.id} className="repository-card">
            <button onClick={() => onSelectRepo(repo.name)} className="repo-link">
              <strong>{repo.name}</strong>
            </button>
            <p className="repo-description">{repo.description || 'No description provided.'}</p>
            <div className="repo-details">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoriesList;
