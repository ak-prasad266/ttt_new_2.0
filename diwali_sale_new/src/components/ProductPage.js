// src/components/ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, addCartItem } from "../api";

const ProductPage = ({ updateLocalCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const resp = await getProduct(id);
        setProduct(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  const handleAddToCart = async () => {
    // require login
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = { product: product.id, quantity: qty };
      const resp = await addCartItem(payload);
      // resp.data should be the created cart item; let's reload local view:
      // simplest approach: fetch cart in App (we stored it in localStorage in App load).
      // We'll update localStorage fallback:
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = [...stored, resp.data];
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated")); // optional signal
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart (see console).");
    }
  };

  if (!product) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 24 }}>
        <img src={product.image || "/placeholder.png"} alt={product.name} style={{ width: 320, height: 320, objectFit: "cover", borderRadius: 8 }} />
        <div>
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p>{product.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
