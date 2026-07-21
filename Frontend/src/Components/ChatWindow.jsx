import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";

import "../CSS/ChatWindow.css";

import exportIcon from "../assets/export.png";
import copyDark from "../assets/copy-dark.png";
import copyLight from "../assets/copy-light.png";
import menuIcon from "../assets/menu.png";

import { haptic } from "../utils/haptic";

export default function ChatWindow({
  onSendMessage,
  selectedChat,
  loadingChatId,
  theme,
  openSidebar,
}) {
  const bottomRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedChat?.messages]);

  const handleExportChat = () => {
    if (!selectedChat) return;

    haptic(20);

    const content = selectedChat.messages
      .map(
        (msg) => `## ${msg.role.toUpperCase()}
${msg.text}`
      )
      .join("\n\n");

    const blob = new Blob([content], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedChat.title}.md`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const handleCopy = async (text, index) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="chat-window d-flex flex-column h-100">
      <div className="chat-header">
        <div className="header-left">
          <button
            className="menu-btn"
            onClick={() => {
              haptic(20);
              openSidebar();
            }}
          >
            <img className="menu-icon" src={menuIcon} alt="Menu" />
          </button>

          {selectedChat && <h6>{selectedChat.title}</h6>}
        </div>

        {selectedChat && (
          <button className="export-btn" onClick={handleExportChat}>
            Export
            <img
              className="export-icon"
              src={exportIcon}
              alt="Export chat"
            />
          </button>
        )}
      </div>

      <div className="messages flex-grow-1">
        {selectedChat?.messages?.length > 0 ? (
          <AnimatePresence>
            {selectedChat.messages.map((msg, index) => (
              <motion.div
                key={index}
                className={
                  msg.role === "user" ? "user-message" : "ai-message"
                }
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {msg.role === "user" ? (
                  msg.text
                ) : (
                  <div className="ai-content">
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(msg.text, index)}
                    >
                      {copiedIndex === index ? (
                        "✅"
                      ) : (
                        <img
                          className="export-icon"
                          src={theme === "dark" ? copyLight : copyDark}
                          alt="Copy"
                        />
                      )}
                    </button>

                    <ReactMarkdown
                      components={{
                        code({ className, children }) {
                          const match = /language-(\w+)/.exec(className || "");

                          return match ? (
                            <SyntaxHighlighter
                              language={match[1]}
                              style={oneDark}
                              wrapLongLines
                              customStyle={{
                                borderRadius: "12px",
                                padding: "18px",
                              }}
                            >
                              {String(children)}
                            </SyntaxHighlighter>
                          ) : (
                            <code>{children}</code>
                          );
                        },
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <WelcomeScreen onSendMessage={onSendMessage} />
        )}

        {loadingChatId === selectedChat?.id && (
          <div className="ai-message thinking">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSendMessage={onSendMessage}
        selectedChat={selectedChat}
        loadStatus={loadingChatId === selectedChat?.id}
      />
    </div>
  );
}