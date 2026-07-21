const API_URL = import.meta.env.VITE_API_URL

export async function createChat(title) {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(title),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getChats(userData) {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function sendMessage(chatId, messages) {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats/${chatId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messages)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function updateTitle(chatId, title) {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats/${chatId}/title`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function deleteChat(chatId) {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats/${chatId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}

export async function clearChats() {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}/chats`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }
  return data
}