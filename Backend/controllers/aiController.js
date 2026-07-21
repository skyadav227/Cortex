export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages,
          max_tokens: 2000,
          temperature: 0.6 
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.error?.message || "OpenRouter Error",
      });
    }

    res.status(200).json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const generateTitle = async (req, res) => {
  try {
    const { firstMessage } = req.body;

    const prompt = `
Generate a short chat title.

Rules:
- Maximum 5 words.
- Do not use quotes.
- Do not use punctuation at the end.
- Return ONLY the title.

User message: ${firstMessage}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 20,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.error?.message || "OpenRouter Error",
      });
    }

    res.status(200).json({
      title: data.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};