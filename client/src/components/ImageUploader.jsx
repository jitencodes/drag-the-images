import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUploader(props) {
  const onDrop = useCallback((acceptedFiles) => {
    props.onUpload(acceptedFiles);
  }, [props]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg ${
        isDragActive ? 'border-blue-500' : 'border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-700">Drop the files here ...</p>
      ) : (
        <p className="text-gray-700">Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default ImageUploader;
