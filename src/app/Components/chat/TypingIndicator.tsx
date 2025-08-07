// components/chat/TypingIndicator.tsx
export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm max-w-20">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
