const BASE_URL = "http://localhost:5000/api/bookings";

// CREATE a booking
export async function createBooking(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Booking failed");
  return result;
}

// GET all bookings (for admin)
export async function getAllBookings() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

// GET bookings for a specific user (for customer dashboard)
export async function getUserBookings(userId) {
  const res = await fetch(`${BASE_URL}/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

// UPDATE booking status (confirm, cancel, check-in, check-out, payment status)
export async function updateBookingStatus(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Failed to update booking");
  return result;
}