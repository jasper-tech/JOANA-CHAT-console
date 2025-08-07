import { ServerStatus } from "@/Types/chat";

interface ChatHeaderProps {
  title: string;
  status: ServerStatus;
}

export default function ChatHeader({ title, status }: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-5 text-center shadow-lg">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <div
        className={`text-sm opacity-90 ${
          status.connected ? "text-green-200" : "text-red-200"
        }`}
      >
        {status.message}
      </div>
    </div>
  );
}
