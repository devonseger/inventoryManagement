import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem, updateItem } from '../api';
import EditItemForm from '../components/EditItemForm';
import api from '../api'; // Import your API instance

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    price: '',
    category: '',
    manufacturer: '',
    machine: '',
    description: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItem(id);
        setItem({
          name: data.name || '',
          quantity: data.quantity || '',
          price: data.price || '',
          category: data.category || '',
          manufacturer: data.manufacturer || '',
          machine: data.machine || '',
          description: data.description || ''
        });
        if (data.photos) {
          setUploadedImages(data.photos);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    console.log('Sending itemId:', id); // Log for debugging

    try {
      const response = await fetch(`https://inventorymanagement-api-u16f.onrender.com/upload/${id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setUploadedImages(prevImages => [...prevImages, ...data.files]);
      } else {
        console.error('Error uploading files:', data.message);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await api.delete(`/images/${imageId}`);
      setUploadedImages(prevImages => prevImages.filter(image => image._id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(id, item);
      navigate('/inventory');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <EditItemForm
        item={item}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        handleSubmit={handleSubmit}
        handleDeleteImage={handleDeleteImage}
      />
    </div>
  );
};

export default EditItem;
