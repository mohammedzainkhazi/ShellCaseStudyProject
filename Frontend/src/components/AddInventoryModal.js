import axios from 'axios';
import React, { useState } from 'react';

function AddInventoryModal({ isOpen, onClose, onAddInventory }) {
  const [inventoryLocation, setinventoryLocation] = useState('');
  const [productName, setproductName] = useState('');
  const [inventoryQty, setinventoryQty] = useState('');
  const [lastUpdated, setlastUpdated] = useState('');

  const modalStyle = isOpen ? '' : 'hidden';
  const modalContentStyle = 'bg-white mx-auto my-16 p-6 rounded-lg max-w-md shadow-2xl';

  const handleAddInventory = async () => {
    const newInventory = {
      inventory_id: 9,
      product_name: productName,
      location: inventoryLocation,
      quantity_available: inventoryQty,
      last_Updated: lastUpdated,
    };

    const res = await axios
      .post(
        'http://localhost:5204/addInventory',
        {
          product_name: productName,
          location: inventoryLocation,
          quantity_available: inventoryQty,
          last_Updated: lastUpdated,
        },
        {
          withCredentials: false,
        }
      )
      .catch((e) => console.log(e));

    if (res.data !== null) {
      console.log(res.data);
    }

    onAddInventory(newInventory);

    // Clear the form inputs
    setproductName('');
    setinventoryLocation('');
    setinventoryQty('');
    setlastUpdated('');
    // Close the modal
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${modalStyle}`}>
      <div className={modalContentStyle}>
        <h2 className="text-xl font-semibold mb-4">Add New Inventory</h2>
        <label htmlFor="location" className="block text-gray-700 mb-1 text-sm">
          Inventory Location:
          <input
            type="text"
            placeholder="Inventory Location"
            value={inventoryLocation}
            onChange={(e) => setinventoryLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <label htmlFor="product_name" className="block text-gray-700 mb-1 text-sm">
          Product Name:
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setproductName(e.target.value)}
            className="w-full px-3 py-2 border text-sm rounded focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <label htmlFor="quantity_available" className="block text-sm text-gray-700 mb-1">
          Quantity Available
          <input
            type="text"
            placeholder="Quantity Available"
            value={inventoryQty}
            onChange={(e) => setinventoryQty(e.target.value)}
            className="w-full px-3 py-2 border text-sm rounded focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <div className="flex justify-end">
          <button
            onClick={handleAddInventory}
            className="bg-blue-500 hover:shadow-gray-500 shadow-md text-white text-sm py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            Add Inventory
          </button>
          <button onClick={onClose} className="bg-gray-300 text-sm text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInventoryModal;
