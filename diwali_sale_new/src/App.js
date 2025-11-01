// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductsList from "./components/ProductsList";
import ProductPage from "./components/ProductPage";
import Mobiles from "./components/Mobiles";
import Earbuds from "./components/Earbuds";
import Watches from "./components/Watches";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { getCart } from "./api";

function App() {
  const [cart, setCart] = useState([]); // cart items from backend or localStorage
  const navigate = useNavigate();

  // load cart from backend (or fallback to localStorage)
  useEffect(() => {
    async function loadCart() {
      try {
        const resp = await getCart();
        setCart(resp.data); // expected a list of cart items: {id, product: {id,name,price}, quantity}
        localStorage.setItem("cart", JSON.stringify(resp.data));
      } catch (err) {
        // fallback: read localStorage
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
      }
    }
    loadCart();
  }, []);

  // helper to update cart state + localStorage
  const updateLocalCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // when user logs in, reload cart from server
  useEffect(() => {
    const handleLoginReload = () => {
      // simple approach: force reload app so getCart runs again
      // or call getCart and setCart
      // For now, we'll just reload the page
      window.location.reload();
    };

    window.addEventListener("userLoggedIn", handleLoginReload);
    return () => window.removeEventListener("userLoggedIn", handleLoginReload);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:category"
          element={<ProductsList updateLocalCart={updateLocalCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductPage updateLocalCart={updateLocalCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={updateLocalCart} />}
        />
        <Route path="/mobiles" element={<Mobiles />} />
        <Route path="/earbuds" element={<Earbuds />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
