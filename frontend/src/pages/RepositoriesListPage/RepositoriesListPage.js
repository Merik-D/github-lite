import React, { useState, useEffect } from 'react';
import './RepositoriesListPage.css';
import { getRepositories, getGitHubProfile} from '../../api/githubBackendRequests'
import RepositoryCard from '../../components//RepositoryCard/RepositoryCard';
import UserProfile from '../../components/UserProfile/UserProfile';
import Loader from '../../components/Loader/Loader';

const RepositoriesListPage = ({ username, onSelectRepo }) => {
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [reposResponse, userResponse] = await Promise.all([
          getRepositories(username),
          getGitHubProfile(username),
        ]);

        setRepositories(reposResponse);
        setUser(userResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load data.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="repositories-list">
      {user && <UserProfile user={user} />}
      <h1 className="header">Repositories</h1>
      <div className="repositories-grid">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} onSelectRepo={onSelectRepo} />
        ))}
      </div>
    </div>
  );
};

export default RepositoriesListPage;
