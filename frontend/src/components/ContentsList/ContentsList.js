import React from 'react';
import './ContentsList.css';

const ContentsList = ({ contents, onFolderClick, onFileClick }) => {
  return (
    <ul className="contents-list">
      {contents.map((item) => (
        <li key={item.sha} className="contents-item">
          {item.type === 'file' ? (
            <button onClick={() => onFileClick(item.download_url, item.name)}>
              📄 {item.name}
            </button>
          ) : (
            <button onClick={() => onFolderClick(item.name)}>
              📁 {item.name}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContentsList;