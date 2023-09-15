import axios from 'axios';
import React, { useState } from 'react';

function AddProductModal({ isOpen, onClose, onAddProduct, getProducts }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productUnit, setProductUnit] = useState('');

  const modalStyle = isOpen ? '' : 'hidden';
  const modalContentStyle = 'bg-white mx-auto my-16 p-6 rounded-lg max-w-md shadow-2xl';

  const handleAddProduct = async () => {
    // Create a new product object
    const newProduct = {
      //   product_id: 90,
      //   product_name: ,
      //   product_price: parseFloat(productPrice),
      //   product_description: productDesc,
      //     unit_of_measure: productUnit,

      product_id: Math.random(20),
      product_name: productName,
      product_description: productDesc,
      unit_of_measure: productUnit,
      price_per_unit: parseFloat(productPrice),
    };

    const res = await axios
      .post(
        'http://localhost:5204/addProduct',
        {
          product_name: productName,
          product_description: productDesc,
          unit_of_measure: productUnit,
          price_per_unit: productPrice,
        },
        {
          withCredentials: false,
        }
      )
      .catch((e) => console.log(e));

    if (res.data !== null) {
      console.log(res.data);
    }

    // Call the onAddProduct function passed from the parent component
    
    getProducts();
    onAddProduct(); 

    // Close the modal
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${modalStyle}`}>
      <div className={modalContentStyle}>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <label htmlFor="productName" className="block text-gray-700 mb-1 text-sm">
          Product Name:
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <label htmlFor="productPrice" className="block text-gray-700 mb-1 text-sm">
          Product Price:
          <input
            type="text"
            placeholder="Product Name"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full px-3 py-2 border text-sm rounded focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <label htmlFor="productDesc" className="block text-sm text-gray-700 mb-1">
          Product Description:
          <input
            type="text"
            placeholder="Product Description"
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            className="w-full px-3 py-2 border text-sm rounded focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <label htmlFor="productUnit" className="block text-sm text-gray-700 mb-1">
          Product Unit:
          <input
            type="number"
            placeholder="Product Unit"
            value={productUnit}
            onChange={(e) => setProductUnit(e.target.value)}
            className="w-full px-3 py-2 border text-sm rounded focus:outline-none focus:border-blue-500 mb-2"
          />
        </label>

        <div className="flex justify-end">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 hover:shadow-gray-500 shadow-md text-white text-sm py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            Add Product
          </button>
          <button onClick={onClose} className="bg-gray-300 text-sm text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
