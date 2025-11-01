// src/components/ProductsList.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../api";

const ProductsList = ({ updateLocalCart }) => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const resp = await getProductsByCategory(category);
        setItems(resp.data); // expected array of products
      } catch (err) {
        // fallback: show empty
        setItems([]);
        console.error("Failed to load products:", err);
      }
    }
    load();
  }, [category]);

  if (!category) return <div style={{ padding: 20 }}>Select a category.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {items.map((p) => (
          <div key={p.id} style={{
            width: 220,
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 8,
            background: "#fff",
            color: "#000"
          }}>
            <Link to={`/product/${p.id}`}>
              <img src={p.image || "/placeholder.png"} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }} />
              <h4 style={{ margin: "8px 0" }}>{p.name}</h4>
            </Link>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>₹{p.price}</div>
              <button onClick={() => {
                // If not logged in, redirect to login
                const token = localStorage.getItem("token");
                if (!token) return navigate("/login");
                // else open product page to add
                navigate(`/product/${p.id}`);
              }}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
