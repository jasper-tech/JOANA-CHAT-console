// components/chat/MessageBubble.tsx
import { Message } from "@/Types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageStyles = () => {
    switch (message.role) {
      case "user":
        return {
          container: "justify-end",
          bubble:
            "bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-br-sm max-w-[80%]",
        };
      case "assistant":
        return {
          container: "justify-start",
          bubble:
            "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-sm max-w-[80%]",
        };
      case "error":
        return {
          container: "justify-center",
          bubble:
            "bg-red-50 text-red-700 border border-red-200 rounded-lg max-w-[90%]",
        };
      default:
        return {
          container: "justify-start",
          bubble:
            "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-sm max-w-[80%]",
        };
    }
  };

  const styles = getMessageStyles();

  return (
    <div className={`flex animate-fade-in-up ${styles.container}`}>
      <div
        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${styles.bubble}`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: formatMessage(message.content),
          }}
        />
        <div className="text-xs opacity-70 mt-2">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
