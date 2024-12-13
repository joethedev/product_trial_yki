"use client";

import { useEffect, useState } from "react";
import API from "@/utils/axiosInstance";
import { useUser } from "@/utils/UserContext";
import "./style.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { user, isLoading } = useUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleShowProduct = (product: Product) => {
    console.log(product);
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        <h1>
          Welcome, {user.email}!{" "}
          <button className="p-4 bg-amber-600">Logout</button>
        </h1>
      </h1>
      <div className="flex flex-col gap-3">
        {products.map((product: any) => (
          <div key={product.id} className="flex gap-3 items-center">
            <p>{product.name}</p>:
            <button
              className="bg-green-400 p-2"
              onClick={() => handleShowProduct(product)}
            >
              show product
            </button>
            {user.role === "admin" || user.role === "superadmin" ? (
              <button className="bg-yellow-300 p-2">Edit</button>
            ) : null}
            {user.role === "admin" || user.role === "superadmin" ? (
              <button className="bg-red-500 p-2">Delete</button>
            ) : null}
          </div>
        ))}
      </div>
      {isPopupOpen && selectedProduct && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePopup} className="close-btn">
              Close
            </button>
            <h2>{selectedProduct.name}</h2>
            <img
              src="https://media.gettyimages.com/id/821046372/photo/fake-counterfeit-wristwatch-bangkok-thailand.jpg?s=612x612&w=gi&k=20&c=8tyUUsPAjG02FxygS0WjAw-EvTuaowjK4DXVx5uBv2Q="
              alt={selectedProduct.name}
            />
            <p>{selectedProduct.description}</p>
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
