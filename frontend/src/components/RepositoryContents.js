import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RepositoryContents.css';

const RepositoryContents = ({ username}) => {
  const { repoName, '*': currentPath = '' } = useParams(); // Поточний шлях
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5173/repo/${username}/${repoName}`,
          { params: { path: currentPath } }
        );
        setContents(response.data);
      } catch (err) {
        setError('Unable to load contents.');
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [repoName, currentPath]);

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

  const renderContents = (contents) => {
    return contents.map((item) => (
      <li key={item.sha} className="contents-item">
        {item.type === 'file' ? (
          <button onClick={() => handleFileClick(item.download_url)}>
            📄 {item.name}
          </button>
        ) : (
          <button onClick={() => handleFolderClick(item.name)}>
            📁 {item.name}
          </button>
        )}
      </li>
    ));
  };

  const handleFileClick = async (fileUrl) => {
    setLoading(true);
    setFileContent('');
    setError(null);

    try {
      const response = await axios.get(fileUrl);
      setFileContent(response.data);
    } catch (err) {
      setError('Unable to load file content.');
    } finally {
      setLoading(false);
    }
  };

  const addLineNumbers = (content) => {
    return content
      .split('\n')
      .map((line, index) => `${index + 1}\t ${line}`)
      .join('\n');
  };

  const numberedContent = addLineNumbers(fileContent);

  if (loading) return <p>Loading contents...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="repo-layout">
      <div className="repo-contents">
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
        <div className="relative-path">
          Current Path: /
          {currentPath.split('/').map((segment, index, array) => (
            <span key={index}>
              {segment}
              {index < array.length - 1 && '/'}
            </span>
          ))}
        </div>
        <ul className="contents-list">{renderContents(contents)}</ul>
      </div>

      <div className="file-content">
        {fileContent ? (
          <pre>{numberedContent}</pre>
        ) : (
          <p>Select a file to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default RepositoryContents;
