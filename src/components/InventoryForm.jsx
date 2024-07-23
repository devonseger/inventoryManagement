import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InventoryForm({ currentItem, onAdd, onUpdate }) {
  const defaultItem = {
    name: '',
    quantity: '',
    price: '',
    category: '',
    manufacturer: '',
    machine: '',
    description: ''
  };

  const [item, setItem] = useState(defaultItem);

  const [options, setOptions] = useState({
    category: [],
    manufacturer: [],
    machine: []
  });

  const [newOption, setNewOption] = useState({
    category: '',
    manufacturer: '',
    machine: ''
  });

  const [isAddingNew, setIsAddingNew] = useState({
    category: false,
    manufacturer: false,
    machine: false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('https://inventorymanagement-api-u16f.onrender.com/api/options');
        console.log('API response:', response.data); // Log API response
        const optionsData = response.data.reduce((acc, option) => {
          acc[option.type] = option.values || [];
          return acc;
        }, {});
        console.log('Processed options data:', optionsData); // Log processed options data
        setOptions(optionsData);
      } catch (error) {
        console.error('Error fetching options:', error);
        setError('Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();

    if (currentItem) {
      setItem(currentItem);
    } else {
      setItem(defaultItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === 'add-new') {
      toggleAddNew(name);
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      onUpdate(item);
    } else {
      onAdd(item);
    }
    setItem(defaultItem); // Reset form to default values
  };

  const handleNewOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption({ ...newOption, [name]: value });
  };

  const addNewOption = async (type) => {
    if (newOption[type].trim() !== '') {
      try {
        await axios.post('https://inventorymanagement-api-u16f.onrender.com/api/options', {
          type,
          value: newOption[type]
        });

        setOptions((prevOptions) => ({
          ...prevOptions,
          [type]: [...(prevOptions[type] || []), newOption[type]]
        }));

        setItem({ ...item, [type]: newOption[type] });
        setNewOption({ ...newOption, [type]: '' });
        setIsAddingNew({ ...isAddingNew, [type]: false });
      } catch (error) {
        console.error('Error adding new option:', error);
      }
    }
  };

  const toggleAddNew = (type) => {
    setIsAddingNew((prevState) => ({ ...prevState, [type]: true }));
    setItem((prevState) => ({ ...prevState, [type]: '' }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={item.name}
          onChange={handleChange}
          className="border p-2 rounded text-black col-span-1"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={item.quantity}
          onChange={handleChange}
          className="border p-2 rounded text-black col-span-1"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          className="border p-2 rounded text-black col-span-1"
        />

        <div className="col-span-1">
          {isAddingNew.category ? (
            <div className="flex">
              <input
                type="text"
                name="category"
                placeholder="New Category"
                value={newOption.category}
                onChange={handleNewOptionChange}
                className="border p-2 rounded text-black flex-grow"
              />
              <button
                type="button"
                onClick={() => addNewOption('category')}
                className="btn btn-primary ml-2"
              >
                Add
              </button>
            </div>
          ) : (
            <select
              name="category"
              value={item.category}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Select Category</option>
              {Array.isArray(options.category) && options.category.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
              <option value="add-new">Add New...</option>
            </select>
          )}
        </div>

        <div className="col-span-1">
          {isAddingNew.manufacturer ? (
            <div className="flex">
              <input
                type="text"
                name="manufacturer"
                placeholder="New Manufacturer"
                value={newOption.manufacturer}
                onChange={handleNewOptionChange}
                className="border p-2 rounded text-black flex-grow"
              />
              <button
                type="button"
                onClick={() => addNewOption('manufacturer')}
                className="btn btn-primary ml-2"
              >
                Add
              </button>
            </div>
          ) : (
            <select
              name="manufacturer"
              value={item.manufacturer}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Select Manufacturer</option>
              {Array.isArray(options.manufacturer) && options.manufacturer.map((man, index) => (
                <option key={index} value={man}>{man}</option>
              ))}
              <option value="add-new">Add New...</option>
            </select>
          )}
        </div>

        <div className="col-span-1">
          {isAddingNew.machine ? (
            <div className="flex">
              <input
                type="text"
                name="machine"
                placeholder="New Machine"
                value={newOption.machine}
                onChange={handleNewOptionChange}
                className="border p-2 rounded text-black flex-grow"
              />
              <button
                type="button"
                onClick={() => addNewOption('machine')}
                className="btn btn-primary ml-2"
              >
                Add
              </button>
            </div>
          ) : (
            <select
              name="machine"
              value={item.machine}
              onChange={handleChange}
              className="border p-2 rounded text-black w-full"
            >
              <option value="">Select Machine</option>
              {Array.isArray(options.machine) && options.machine.map((mac, index) => (
                <option key={index} value={mac}>{mac}</option>
              ))}
              <option value="add-new">Add New...</option>
            </select>
          )}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
          className="border p-2 rounded text-black col-span-1 md:col-span-2"
        />

        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-2 mt-4"
        >
          {currentItem ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
}
