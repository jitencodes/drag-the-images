import React from 'react';
import ImageUploader from './ImageUploader';

function ImageUploadModal(props) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 ${props.visible ? 'block' : 'hidden'}`}>
      <div className="w-full max-w-lg p-6 mx-auto mt-16 rounded-lg bg-white shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-black">Upload Image</h2>
        <ImageUploader onUpload={props.onUpload} />
        <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ImageUploadModal;
