import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const CVPage = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8,  // 80% of window width
    height: window.innerHeight * 0.8,  // 80% of window height
  });
  const [scale, setScale] = useState(1);  // Initial scale

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth * 0.8;
      const newHeight = window.innerHeight * 0.8;
      setDimensions({
        width: newWidth,
        height: newHeight,
      });

      // Dynamically calculate the scale based on PDF's standard dimensions (A4: 595.44 x 842.16)
      const newScale = Math.min(newWidth / 595.44, newHeight / 842.16);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial render to set the correct scale

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f4f6f9',
      margin: 0,
      boxSizing: 'border-box',
    }}>
      <h1 style={{ color: '#333' }}>CV</h1>
      <div 
        style={{
          display: 'inline-block',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/assets/CV.pdf"
            scale={scale}  // Dynamic scaling
          />
        </Worker>
      </div>
    </div>
  );
};

export default CVPage;
