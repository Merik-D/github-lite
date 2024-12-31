import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getRepoContents } from '../../api/githubBackendRequests';
import ContentsList from '../../components/ContentsList/ContentsList';
import FileContent from '../../components/FileContent/FileContent';
import './RepositoryContentsPage.css';
import Loader from '../../components/Loader/Loader';

const RepositoryContentsPage = ({ username }) => {
  const { repoName, '*': currentPath = '' } = useParams();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [imageContent, setImageContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getRepoContents(username, repoName, currentPath);
        setContents(data);
      } catch (err) {
        setError('Unable to load contents.');
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [repoName, currentPath, username]);

  const handleFolderClick = (folderPath) => {
    const newPath = currentPath ? `${currentPath}/${folderPath}` : folderPath;
    navigate(`/${repoName}/${newPath}`);
  };

  const handleBackButtonClick = () => {
    if (!currentPath) {
      navigate('/');
    } else {
      const parentPath = currentPath.split('/').slice(0, -1).join('/');
      navigate(`/${repoName}/${parentPath}`);
    }
  };

  const handleFileClick = async (fileUrl, fileName) => {
    setLoading(true);
    setFileContent('');
    setImageContent(null);
    setError(null);

    try {
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        const response = await axios.get(fileUrl, { responseType: 'blob' });
        setImageContent(URL.createObjectURL(response.data));
      } else {
        const response = await axios.get(fileUrl);
        setFileContent(response.data);
      }
    } catch (err) {
      setError('Unable to load file content.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="repo-layout">
      <div className="repo-contents">
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
        <div className="relative-path">
          Current Path: /{currentPath}
        </div>
        <ContentsList contents={contents} onFolderClick={handleFolderClick} onFileClick={handleFileClick} />
      </div>

      <FileContent fileContent={fileContent} imageContent={imageContent} />
    </div>
  );
};

export default RepositoryContentsPage;
