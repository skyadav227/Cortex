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
          model: "openrouter/free",
          messages,
          max_tokens: 2000,
          temperature: 0.6,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter chat error:", data);
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

    if (!firstMessage || typeof firstMessage !== "string") {
      return res.status(400).json({
        message: "A valid first message is required.",
      });
    }

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
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 40,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter title error:", data);

      return res.status(response.status).json({
        message: data.error?.message || "OpenRouter Error",
      });
    }

    const generatedTitle = data.choices?.[0]?.message?.content;

    // A free model may return an empty or null content field.
    // Use the original message as a safe fallback.
    const title =
      typeof generatedTitle === "string" && generatedTitle.trim()
        ? generatedTitle.trim().replace(/^["']|["']$/g, "")
        : firstMessage.trim().split(/\s+/).slice(0, 5).join(" ");

    return res.status(200).json({
      title: title || "New Chat",
    });
  } catch (error) {
    console.error("Title generation error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};