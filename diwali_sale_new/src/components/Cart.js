// src/components/Cart.js
import React, { useEffect, useState } from "react";
import { updateCartItem, deleteCartItem } from "../api";

/*
 Expected cart prop shape (backend): [
   { id: 1, product: { id, name, price, image }, quantity: 2 },
   ...
 ]
*/

const Cart = ({ cart = [], setCart }) => {
  // track selection by cart item id
  const [selected, setSelected] = useState([]);
  // local quantities mirror backend quantities (keyed by cartId)
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // initialize quantities map from cart
    const qMap = {};
    cart.forEach((ci) => (qMap[ci.id] = ci.quantity || 1));
    setQuantities(qMap);
  }, [cart]);

  const toggleSelect = (cartId) => {
    setSelected((prev) =>
      prev.includes(cartId) ? prev.filter((c) => c !== cartId) : [...prev, cartId]
    );
  };

  const changeQty = async (cartId, delta) => {
    const newQty = Math.max(1, (quantities[cartId] || 1) + delta);
    setQuantities((prev) => ({ ...prev, [cartId]: newQty }));

    // Update backend
    try {
      const resp = await updateCartItem(cartId, { quantity: newQty });
      // update local cart state
      const updated = cart.map((it) => (it.id === cartId ? resp.data : it));
      setCart(updated);
    } catch (err) {
      console.error("Failed to update cart item:", err);
      // fallback: still update local copy
      setCart(cart.map((it) => (it.id === cartId ? { ...it, quantity: newQty } : it)));
    }
  };

  const removeItem = async (cartId) => {
    try {
      await deleteCartItem(cartId);
      const updated = cart.filter((it) => it.id !== cartId);
      setCart(updated);
    } catch (err) {
      console.error("Failed to delete cart item:", err);
      // fallback
      setCart(cart.filter((it) => it.id !== cartId));
    }
  };

  const total = cart
    .filter((ci) => selected.includes(ci.id))
    .reduce((sum, ci) => sum + Number(ci.product.price) * (quantities[ci.id] || ci.quantity || 1), 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map((ci) => (
              <div key={ci.id} style={{ display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={selected.includes(ci.id)}
                  onChange={() => toggleSelect(ci.id)}
                />
                <img src={ci.product.image || "/placeholder.png"} alt={ci.product.name} style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{ci.product.name}</div>
                  <div>₹{ci.product.price}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => changeQty(ci.id, -1)}>-</button>
                  <div>{quantities[ci.id] || ci.quantity}</div>
                  <button onClick={() => changeQty(ci.id, +1)}>+</button>
                </div>

                <div>
                  <button onClick={() => removeItem(ci.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 20 }}>Total Amount: ₹{total}</h3>
          <button disabled={total === 0}>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
