import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, fetchChatMessages } from "@/store/chatBoxSlice";
import { socket } from "@/App";


interface ChatBoxProps {
  chatId: string;
  userId: string;
  otherUserId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, userId, otherUserId }) => {
  const dispatch = useAppDispatch();
  const { messages, messageLoading,  } = useAppSelector((state)=>state.chat);
  const [content, setContent] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages and join room
  useEffect(() => {
    if (!chatId) return;

    dispatch(fetchChatMessages(chatId));
    socket.emit("joinChat", chatId);

    // Listen for new messages from socket
    socket.on("receiveMessage", (message:any) => {
      if (message.chatId === chatId) {
        dispatch(addMessage(message));
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId, dispatch]);

  const handleSend = () => {
    if (!content.trim()) return;

    const message = {
      chatId,
      senderId: userId,
      receiverId: otherUserId,
      content,
    };

    socket.emit("sendMessage", message);
    setContent("");
  };

  return (
    <div className="w-full max-w-md h-[420px] border rounded-lg flex flex-col shadow-lg bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 font-semibold text-sm text-gray-700">
        💬 Chat with Support
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3 text-sm">
        {messageLoading ? (
          <p className="text-center text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                  msg.senderId === userId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
                <div className="mt-1 text-[10px] text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            socket.emit("typing", { chatId, userId }); // optional typing feature
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;