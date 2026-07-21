import { useEffect, useRef, useState } from "react";
import "../CSS/ChatInput.css";
import { haptic } from "../utils/haptic";

export default function ChatInput({
  onSendMessage,
  loadStatus,
  selectedChat,
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedChat]);

  const handleSend = () => {
    const message = input.trim();

    if (!message) return;

    haptic(15);
    onSendMessage(message);
    setInput("");
  };

  return (
    <div className="chat-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask Cortex anything..."
        value={input}
        disabled={loadStatus}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        disabled={loadStatus}
        onClick={handleSend}
      >
        {loadStatus ? "•••" : "↑"}
      </button>
    </div>
  );
}