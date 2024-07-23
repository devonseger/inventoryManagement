import React from "react";
import { useNavigate } from "react-router-dom";

export default function InventoryItems({ item, onEdit, onDelete, onIncrease, onDecrease }) {
  const navigate = useNavigate();
  const imageSrc =
    item.photos.length > 0
      ? `https://inventorymanagement-xkjy.onrender.com${item.photos[0].filePath}`
      : "/No-Image-Placeholder.svg";

  console.log(`Image source for item ${item._id}:`, imageSrc);

  return (
    <div className="card glass w-96 grid">
      <figure onClick={() => navigate(`/inventory/edit/${item._id}`)}>
        <img
          crossOrigin="anonymous"
          src={imageSrc}
          alt={item.name}
          className="cursor-pointer"
        />
      </figure>
      <h2 className="text-xl font-bold mb-2 justify-self-center">
        {item.name}
      </h2>
      <p className="justify-self-center">
        <strong>Quantity:</strong> {item.quantity}
      </p>
      <p className="justify-self-center">
        <strong>Manufacturer:</strong> {item.manufacturer}
      </p>
      <p className="justify-self-center">
        <strong>Machine:</strong> {item.machine}
      </p>
      <p className="justify-self-center">
        <strong>Description:</strong>
      </p>
      <p className="justify-self-center px-4">{item.description}</p>
      <div className="flex justify-between items-center button container">
        <div className="flex mt-4 relative">
        <button className="btn mr-2 ml-2 mb-2" onClick={() => onIncrease(item)}>+</button>
        <button className="btn btn-success" onClick={() => onDecrease(item)}>-</button>
        </div>
        <div className="mt-4 relative">
          <button className="btn btn-primary mr-2 mb-2" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button
            className="btn btn-warning mr-2"
            onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
