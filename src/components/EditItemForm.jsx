import React from 'react';

export default function EditItemForm({ item, handleChange, handleFileChange, uploadedImages, handleSubmit, handleDeleteImage }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">Item Information</h2>
          <p className="mt-1 text-sm leading-6 text-white">
            Edit the details of the inventory item.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={item.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-white">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                Category
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={item.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="manufacturer" className="block text-sm font-medium leading-6 text-white">
                Manufacturer
              </label>
              <div className="mt-2">
                <input
                  id="manufacturer"
                  name="manufacturer"
                  type="text"
                  value={item.manufacturer}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="machine" className="block text-sm font-medium leading-6 text-white">
                Machine
              </label>
              <div className="mt-2">
                <input
                  id="machine"
                  name="machine"
                  type="text"
                  value={item.machine}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={item.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-white bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="photos" className="block text-sm font-medium leading-6 text-white">
                Photos
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                />
              </div>
            </div>

            <div className="col-span-full mt-4">
              <h3 className="text-base font-semibold leading-7 text-white">Uploaded Photos</h3>
              {/* Display existing photos */}
              {item.photos && item.photos.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {item.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        crossOrigin="anonymous"
                        src={`https://inventorymanagement-xkjy.onrender.com${photo.filePath}`}
                        alt={`Existing ${index + 1}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(photo._id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Display newly uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        crossOrigin="anonymous"
                        src={`https://inventorymanagement-xkjy.onrender.com${image.filePath}`}
                        alt={`Uploaded ${index + 1}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image._id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white" onClick={() => window.history.back()}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
