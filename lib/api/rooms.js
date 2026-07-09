const BASE_URL = "http://localhost:5000/api/rooms";
const IMAGE_URL = "http://localhost:5000/api/upload";

// GET all rooms (optionally filtered, e.g. { status: "available" })
export async function getRooms(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}${params ? `?${params}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}

// Get single room ko id
export async function getRoomById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch room");
  return res.json();
}

// creating a room
export async function createRoom(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to create room");
  return result;
}

// updating a room
export async function updateRoom(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to update room");
  return result;
}

//deleting a room
export async function deleteRoom(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to delete room");
  return result;
}
 //uploading image 
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('IMAGE_URL', {
    method: 'POST',
    body: formData, // no Content-Type header — browser sets it automatically for FormData
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Image upload failed');
  return result.imageUrl;
}