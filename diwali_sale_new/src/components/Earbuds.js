// src/components/Earbuds.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsList.css";

const Earbuds = () => {
  const [earbuds, setEarbuds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setEarbuds(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching earbuds:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/cart/add/", {
        product_id: productId,
      });
      alert("Earbud added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item to cart");
    }
  };

  if (loading) return <p>Loading Earbuds...</p>;

  return (
    <div className="product-container">
      <h2>🎧 Earbuds</h2>
      <div className="product-list">
        {earbuds.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.brand} />
            <h3>{item.brand}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Earbuds;
