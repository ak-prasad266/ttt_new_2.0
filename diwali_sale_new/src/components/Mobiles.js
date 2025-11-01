// src/components/Mobiles.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsList.css";

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        setMobiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mobiles:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/cart/add/", {
        product_id: productId,
      });
      alert("Mobile added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item to cart");
    }
  };

  if (loading) return <p>Loading Mobiles...</p>;

  return (
    <div className="product-container">
      <h2>📱 Mobiles</h2>
      <div className="product-list">
        {mobiles.map((item) => (
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

export default Mobiles;
