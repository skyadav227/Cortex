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

    if (!firstMessage || typeof firstMessage !== "string" || !firstMessage.trim()) {
      return res.status(400).json({
        message: "A valid first message is required.",
      });
    }

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
              role: "system",
              content:
                "You generate concise, meaningful titles for chat conversations. " +
                "Identify the main topic or intent of the user's message. " +
                "Return a relevant title of 2 to 6 words. " +
                "Do not copy the beginning of the message verbatim unless it is already an appropriate title. " +
                "Do not include quotation marks, explanations, or ending punctuation. " +
                "Return only the title.",
            },
            {
              role: "user",
              content: firstMessage.trim(),
            },
          ],
          max_tokens: 40,
          temperature: 0.3,
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

    if (typeof generatedTitle !== "string" || !generatedTitle.trim()) {
      console.error(
        "Title generation returned no usable title:",
        JSON.stringify({
          model: data.model,
          finish_reason: data.choices?.[0]?.finish_reason,
        })
      );

      return res.status(502).json({
        message: "The AI could not generate a title. Please try again.",
      });
    }

    const title = generatedTitle
      .trim()
      .replace(/^["'“”]+|["'“”]+$/g, "")
      .replace(/^title:\s*/i, "")
      .replace(/[.!?]+$/g, "")
      .trim();

    if (!title) {
      return res.status(502).json({
        message: "The AI returned an invalid title. Please try again.",
      });
    }

    return res.status(200).json({ title });
  } catch (error) {
    console.error("Title generation error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};
