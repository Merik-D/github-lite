import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import CVPage from './components/CVPage';
import RepositoriesList from './components/RepositoriesList';
import RepositoryContents from './components/RepositoryContents';

const App = () => {
  const [username, setUsername] = useState('Merik-D');
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/cv" element={<CVPage />} />
        <Route path="/" element={<RepositoriesListWrapper username={username} />} />
        <Route path="/:repoName/*" element={<RepositoryContentsWrapper username={username} />} />
      </Routes>
    </Router>
  );
};

const RepositoriesListWrapper = ({ username }) => {
  const navigate = useNavigate();

  const handleSelectRepo = (repoName) => {
    navigate(`/${repoName}`);
  };

  return <RepositoriesList username={username} onSelectRepo={handleSelectRepo} />;
};

const RepositoryContentsWrapper = ({ username }) => {
  const { repoName } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  
  const currentPath = location.pathname.replace(`/${repoName}`, '') || ''; // Clean the path

  
  const handleBack = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/'); // Get parent path
    navigate(`/${repoName}/${parentPath || ''}`); // Navigate to parent
  };

  
  const handleRoot = () => {
    navigate(`/${repoName}`);
  };

  
  const handleFolderClick = (folderPath) => {
    const newPath = currentPath ? `${currentPath}/${folderPath}` : folderPath;
    navigate(`/${repoName}/${newPath}`); // Navigate to the folder
  };

  return (
    <RepositoryContents
      username={username}
      repoName={repoName}
      path={currentPath}
      onBack={handleBack}
      onRoot={handleRoot}
      onFolderClick={handleFolderClick}
    />
  );
};


export default App;
