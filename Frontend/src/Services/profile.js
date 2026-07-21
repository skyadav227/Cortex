const API_URL = import.meta.env.VITE_AUTH_API_URL;

export async function getProfile() {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data

}