import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ThreeDots } from 'react-loader-spinner';

// Fetch products function
const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Delete product function
const deleteProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};

const Card = () => {
  const queryClient = useQueryClient();

  // Query to fetch products
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProducts"],
    queryFn: fetchProducts,
  });

  // Mutation to delete a product
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(["getProducts"]);

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(["getProducts"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["getProducts"], (oldData) =>
        oldData.filter((product) => product.id !== id)
      );

      return { previousData };
    },
    onError: (error, id, context) => {
      // Rollback to the previous value in case of error
      queryClient.setQueryData(["getProducts"], context.previousData);
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    },
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  };

  const handleUpdate = async () => {
    if (editingProduct && formData) {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${editingProduct.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        const updatedProduct = await response.json();
        queryClient.setQueryData(["getProducts"], (oldData) =>
          oldData.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditingProduct(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots color="#0071DC" height={80} width={80} />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  if (!data) {
    return <div>No products available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-10 mx-10 gap-4 ">
      {data.map((item) => (
        <div
          key={item.id}
          className="w-[280px] bg-white rounded-lg m-4 border-[0.5px] border-gray-300 z-0  transition-all duration-300 hover:scale-110  hover:shadow-lg hover:shadow-gray-400"
        >
          <img
            className="h-52 object-cover pl-16 "
            src={item.image}
            alt={item.title}
          />
          <div className="p-4">
            <h1 className="text-sm font-semibold">{item.title}</h1>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, magnam!
            </p>
            <p className="text-green-500">${item.price}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 text-sm border border-black font-medium rounded hover:bg-red-500 hover:text-white hover:border-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 text-sm border border-black font-medium rounded hover:bg-red-500 hover:text-white hover:border-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl mb-4">Edit Product</h2>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border rounded-lg w-full p-2 mb-2"
            />
            <label className="block mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="border rounded-lg w-full p-2 mb-2"
            />
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="border rounded-lg w-full p-2 mb-2"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border rounded-lg w-full p-2 mb-2"
            />
            <label className="block mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border rounded-lg w-full p-2 mb-4"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
