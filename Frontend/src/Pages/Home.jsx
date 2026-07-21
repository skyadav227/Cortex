import '../CSS/Home.css'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import ChatWindow from '../Components/ChatWindow'
import { getAIResponse, getAITitle } from '../Services/openrouter'
import { clearChats, createChat, deleteChat, getChats, sendMessage, updateTitle } from '../Services/chat'
import { toast } from 'sonner'
import PageWrapper from '../Components/PageWrapper'
import { haptic } from '../utils/haptic'

export default function Home() {

  const [chatHistory, setChatHistory] = useState([])

  const [activeChatId, setActiveChatId] = useState(() => {
    return JSON.parse(localStorage.getItem("activeChatId")) || null
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  const [loadingChatId, setLoadingChatId] = useState(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showClearModal, setShowClearModal] = useState(false)

  const isMobileScreen = () =>
    window.innerWidth <= 768 ||
    (
      window.matchMedia("(orientation: landscape)").matches &&
      window.innerHeight <= 500
    );

  const [isMobile, setIsMobile] = useState(isMobileScreen())

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await getChats()
        const chats = response.chats.map(chat => ({
          ...chat,
          id: chat._id
        }))
        setChatHistory(chats)
      }
      catch (error) {
        toast.error(error.message)
      }
    }
    loadChats()
  }, [])

  useEffect(() => {
    localStorage.setItem("activeChatId", JSON.stringify(activeChatId))
  }, [activeChatId])

  useEffect(() => {
    if (activeChatId !== null && !chatHistory.some(chat => chat.id === activeChatId)) {
      setActiveChatId(null)
    }
  }, [chatHistory, activeChatId])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(isMobileScreen())
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)

    return () => {
      window.removeEventListener("resize", checkScreen)
    }
  }, [])


  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const toggleTheme = () => {
    haptic(15)
    setTheme(prev =>
      prev === "dark" ? "light" : "dark"
    )
  }

  const handleSendMessage = async (text) => {
    haptic(15)
    const cleanText = text.trim();
    let currentChatId = activeChatId;
    let conversation = [];

    const isNewChat = activeChatId === null;

    if (isNewChat) {
      const response = await createChat({
        title: "New Chat"
      });

      const newChat = {
        ...response.chat,
        id: response.chat._id,
        messages: [
          {
            role: "user",
            text
          }
        ]
      };

      currentChatId = newChat.id;

      setChatHistory(prev => [newChat, ...prev]);
      setActiveChatId(currentChatId);

      conversation = [
        {
          role: "user",
          content: text
        }
      ];

    }

    else {
      const currentChat = chatHistory.find(
        chat => chat.id === currentChatId
      );

      conversation = [
        ...currentChat.messages.map(msg => ({
          role: msg.role,
          content: msg.text
        })),
        {
          role: "user",
          content: text
        }
      ];

      setChatHistory(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  role: "user",
                  text
                }
              ]
            }
            : chat
        )
      );

    }

    setLoadingChatId(currentChatId);

    try {
      await sendMessage(currentChatId, {
        role: "user",
        text
      });

      if (isNewChat) {
        const aiTitle = await getAITitle(cleanText);

        const cleanTitle = aiTitle
          .replace(/^Title:\s*/i, "")
          .replace(/^["']|["']$/g, "")
          .replace(/\.$/, "")
          .trim();

        await updateTitle(currentChatId, cleanTitle)

        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === currentChatId
              ? {
                ...chat,
                title: cleanTitle
              }
              : chat
          )
        );

      }

      const aiReply = await getAIResponse(conversation);

      await sendMessage(currentChatId, {
        role: "assistant",
        text: aiReply
      });

      setChatHistory(prev =>
        prev.map(chat =>
          chat.id === currentChatId
            ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  role: "assistant",
                  text: aiReply
                }
              ]
            }
            : chat
        )
      );



    }

    catch (error) {
      console.error(error);
    }

    finally {
      setLoadingChatId(null);
    }
  };

  const handleChatSelect = (chatId) => {
    haptic(15)
    setActiveChatId(chatId)
  }

  const selectedChat = chatHistory.find(chat =>
    chat.id === activeChatId
  )

  const handleNewChat = () => {
    haptic(20)
    setActiveChatId(null)
  }

  const handleDeleteChat = async (conId) => {
    try {
      await deleteChat(conId)
      if (activeChatId === conId) {
        setActiveChatId(null)
      }
      setChatHistory(prev => prev.filter(chat => chat.id !== conId))
    }

    catch (error) {
      toast.error(error.message)
    }
  }

  const handleClearAllChats = () => {
    haptic(30)
    setShowClearModal(true)
  }

  const confirmClearAllChats = async () => {
    try {
      await clearChats()
      setChatHistory([])
      setActiveChatId(null)
      toast.success("All chats deleted!")
    }

    catch (error) {
      toast.error(error.message)
    }

    finally {
      setShowClearModal(false)
    }
  }

  return (
    <>
      <PageWrapper>
        <div className={`cortex-container ${theme}`}>
          {sidebarOpen && (
            <div className='sidebar-overlay' onClick={() => setSidebarOpen(false)}></div>
          )}
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <Sidebar chatHistory={chatHistory} activeChatId={activeChatId} onChatSelect={handleChatSelect} handleNewChat={handleNewChat} delChat={handleDeleteChat} clearAllChat={handleClearAllChats} theme={theme} toggleTheme={toggleTheme} setSidebarOpen={setSidebarOpen} isMobile={isMobile} loadStatus={loadingChatId === selectedChat?.id} />
          </div>
          <div className="chat-area flex-grow-1 d-flex flex-column">
            <ChatWindow chatHistory={chatHistory} activeChatId={activeChatId} onSendMessage={handleSendMessage} selectedChat={selectedChat} loadingChatId={loadingChatId} theme={theme} openSidebar={() => setSidebarOpen(true)} isMobile={isMobile} />
          </div>
        </div>

        {showClearModal && (
          <div className="logout-overlay">
            <div className="logout-modal">
              <h3>Delete All Chats?</h3>
              <p>
                This action cannot be undone.
              </p>
              <div className="logout-actions">
                <button className="cancel-btn" onClick={() => setShowClearModal(false)}>
                  Cancel
                </button>

                <button className="confirm-btn" onClick={confirmClearAllChats}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  )
}
