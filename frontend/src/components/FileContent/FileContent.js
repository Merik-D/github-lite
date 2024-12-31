import React from 'react';

const FileContent = ({ fileContent, imageContent }) => {
  const addLineNumbers = (content) => {
    return content
      .split('\n')
      .map((line, index) => `${index + 1}\t ${line}`)
      .join('\n');
  };

  const numberedContent = addLineNumbers(fileContent);

  return (
    <div className="file-content">
      {imageContent ? (
        <img src={imageContent} alt="File content" className="image-file" />
      ) : fileContent ? (
        <pre>{numberedContent}</pre>
      ) : (
        <p>Select a file to view its content.</p>
      )}
    </div>
  );
};

export default FileContent;