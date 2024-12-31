import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import CVPage from './pages/CVPage/CVPage'
import RepositoriesListPage from './pages/RepositoriesListPage/RepositoriesListPage'
import RepositoryContentsPage from './pages/RepositoryContentsPage/RepositoryContentsPage';

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

  return <RepositoriesListPage username={username} onSelectRepo={handleSelectRepo} />;
};

const RepositoryContentsWrapper = ({ username }) => {
  const { repoName } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  
  const currentPath = location.pathname.replace(`/${repoName}`, '') || '';

  
  const handleBack = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    navigate(`/${repoName}/${parentPath || ''}`);
  };

  
  const handleRoot = () => {
    navigate(`/${repoName}`);
  };

  
  const handleFolderClick = (folderPath) => {
    const newPath = currentPath ? `${currentPath}/${folderPath}` : folderPath;
    navigate(`/${repoName}/${newPath}`);
  };

  return (
    <RepositoryContentsPage
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
