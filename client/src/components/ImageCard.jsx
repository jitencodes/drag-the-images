import React from 'react';

function ImageCard({ title, ImgData, description }) {
  return (
    <div className="bg-white h-full rounded-lg shadow-lg overflow-hidden flex">
      <img src={`data:image/png;base64,${ImgData}`} alt={title} className="w-[100px] select-none h-auto object-cover" />
      <div className="p-6">
      <h2 className="text-xl font-bold capitalize select-none mb-2">{title}</h2>
        <h2 className="text-sm font-medium capitalize select-none mb-2">{description}</h2>
      </div>
    </div>
  );
}

export default ImageCard;