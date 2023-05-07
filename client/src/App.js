import React, { useEffect, useState } from "react";
import {ImageUploader, ImageCard} from './components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/images`);
        setImages(response.data.map(({_id, ...rest}) => ({id: _id, ...rest})));
        console.error(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);
  
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setImages(reorderedItems);
  };

  const handleUpload = async (files) => {
    try {
      const file = files[0];
      if (!file) {
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result.replace(/^data:.+;base64,/, "");
          const dataUpload = {title: file.name, id: images[1].id + 1, ImgData: base64Data, description:'this card can be drag to change position.'} ;
  
          await axios.post("http://localhost:5000/api/images", dataUpload);
          setImages([...images, dataUpload]);
        } catch (error) {
          console.log(error);
          window.alert('Error: Failed to upload the file.');
        }
      }
  
      reader.onerror = () => {
        console.log(reader.error);
        window.alert('Error: Failed to read the file.');
      }
    } catch (error) {
      console.log(error);
      window.alert('Error: Something went wrong.');
    }
  }
  


  return (
    <div className="main_content">
      
      <div className="container mx-auto my-4 md:max-w-[800px] px-4">
         <ImageUploader onUpload={handleUpload} />
      </div>
      <h2 className='text-center text-2xl md:text-6xl my-6 capitalize font-extrabold'>Drag The Images</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`grid grid-cols-1 md:grid-cols-2 p-5 mx-auto  md:max-w-[1200px] gap-4 ${ snapshot.isDraggingOver ? 'bg-blue-300': 'bg-gray-100'}`}
            >
              {images.map(({id, title, description, ImgData}, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`${snapshot.isDragging ? 'border-green-400': 'border-yellow-200'} shadow rounded-lg  border-4`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <ImageCard title={title} ImgData={ImgData} description={description} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
