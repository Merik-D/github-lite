import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import CVPage from './pages/CVPage/CVPage';
import RepositoriesListPage from './pages/RepositoriesListPage/RepositoriesListPage';
import RepositoryContentsPage from './pages/RepositoryContentsPage/RepositoryContentsPage';

const App = () => {
  const [username, setUsername] = useState('Merik-D');
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/cv" element={<CVPage />} />
        <Route path="/" element={<RepositoriesListPage username={username} />} />
        <Route path="/:repoName/*" element={<RepositoryContentsPage username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
