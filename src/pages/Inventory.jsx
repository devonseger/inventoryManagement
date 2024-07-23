import React, { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../api';
import InventoryItems from '../components/InventoryItems';
import InventoryForm from '../components/InventoryForm';
import { isAuthenticated } from '../util/auth';

export default function Inventory({ authToken }) {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      console.log('Fetched items:', data);
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setItems([]);
    }
  };

  const handleAdd = async (item) => {
    try {
      await addItem(item);
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
  };

  const handleUpdate = async (item) => {
    try {
      await updateItem(item._id, item);
      fetchItems();
      setCurrentItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await updateItem(item._id, { quantity: item.quantity + 1 });
      fetchItems();
    } catch (error) {
      console.error('Error increasing item quantity:', error);
    }
  };

  const handleDecrease = async (item) => {
    try {
      await updateItem(item._id, { quantity: item.quantity - 1 });
      fetchItems();
    } catch (error) {
      console.error('Error decreasing item quantity:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!isAuthenticated()) {
    return <p>You must be logged in to view this page!</p>;
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Inventory</h1>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded text-gray-900"
      />
      <InventoryForm
        currentItem={currentItem}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredItems.map(item => (
          <InventoryItems 
            key={item._id} 
            item={item} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onIncrease={handleIncrease} 
            onDecrease={handleDecrease} 
          />
        ))}
      </div>
    </div>
  );
}
