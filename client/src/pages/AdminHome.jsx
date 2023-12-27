import React from 'react';

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800 border border-gray-300 rounded-lg p-4'>Hey Admin 👾</h1>
      <div style={{ width: '100%', height: 0, paddingBottom: '75%', position: 'relative' }}>
        <iframe
          src="https://giphy.com/embed/qgQUggAC3Pfv687qPC"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          title="Embedded Giphy"
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/dommespace-domme-space-programador-qgQUggAC3Pfv687qPC">via GIPHY</a>
      </p>
    </div>
  );
}
