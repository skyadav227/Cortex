const AI_URL = import.meta.env.VITE_AI_API_URL;

export async function getAIResponse(messages) {
  const response = await fetch(`${AI_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.reply;
}


export async function getAITitle(firstMessage) {
  const response = await fetch(`${AI_URL}/title`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstMessage }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.title;
}