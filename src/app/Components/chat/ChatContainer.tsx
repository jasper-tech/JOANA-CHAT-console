interface ChatContainerProps {
  children: React.ReactNode;
}

export default function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="w-full max-w-2xl h-[80vh] bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden md:w-[90%]">
      {children}
    </div>
  );
}
