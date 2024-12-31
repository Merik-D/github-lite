import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './CVPage.css';

const CVPage = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth * 0.8;
      const newHeight = window.innerHeight * 0.8;
      setDimensions({
        width: newWidth,
        height: newHeight,
      });

      const newScale = Math.min(newWidth / 595.44, newHeight / 842.16);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="cv-container">
      <h1 className="cv-header">CV</h1>
      <div
        className="cv-viewer-wrapper"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl="/assets/CV.pdf" scale={scale} />
        </Worker>
      </div>
    </div>
  );
};

export default CVPage;
