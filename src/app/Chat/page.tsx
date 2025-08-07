"use client";

import { useState, useEffect } from "react";
import ChatContainer from "../Components/chat/ChatContainer";
import ChatHeader from "../Components/chat/ChatHeader";
import ChatMessages from "../Components/chat/ChatMessages";
import ChatInput from "../Components/chat/ChatInput";
import { Message, ServerStatus } from "@/Types/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm JOANA your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    connected: false,
    provider: null,
    message: "Connecting...",
  });
  // const [conversationId, setConversationId] = useState<string | null>(null);

  // Check server status on mount
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      // console.log("Checking server status...");
      const response = await fetch("/api/status");
      // console.log("Status response:", response.status, response.statusText);

      const data = await response.json();
      // console.log("Status data:", data);

      if (data.success) {
        setServerStatus({
          connected: true,
          provider: data.data.provider.name,
          message: `Connected • ${data.data.provider.name}`,
        });
      } else {
        setServerStatus({
          connected: false,
          provider: null,
          message: data.error?.message || "Connection failed",
        });
      }
    } catch (error) {
      // console.error("Status check error:", error);
      setServerStatus({
        connected: false,
        provider: null,
        message: `Server offline: ${error.message}`,
      });
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // console.log("Sending message:", content);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          // conversationId,
        }),
      });

      // console.log(
      //   "Chat response status:",
      //   response.status,
      //   response.statusText
      // );
      const data = await response.json();
      // console.log("Chat response data:", data);

      if (data.success) {
        // setConversationId(data.data.conversationId);

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Add error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "error",
          content: data.error?.message || "Failed to get response",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // console.error("Send message error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "error",
        content: `Network error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <ChatContainer>
        <ChatHeader title="JOANA" status={serverStatus} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </ChatContainer>
    </main>
  );
}
