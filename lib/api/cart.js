const BASE_URL = "http://localhost:5000/api/cart";

export async function addToCart(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to add to cart");
  return result;
}

export async function getCart(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to remove item");
  return result;
}

export async function checkoutCart(userId) {
  const res = await fetch(`${BASE_URL}/checkout/${userId}`, { method: "POST" });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Checkout failed");
  return result;
}