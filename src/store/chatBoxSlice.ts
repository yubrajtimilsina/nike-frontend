import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { APIS } from "@/globals/http";

// TYPES
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

interface ChatState {
  chatId: string;
  adminId: string;
  loading: boolean;
  error: string | null;

  messages: Message[];
  messageLoading: boolean;
}

const initialState: ChatState = {
  chatId: "",
  adminId: "4c264ede-84b4-4455-adc1-801fc169e95e", // Default for now
  loading: false,
  error: null,

  messages: [],
  messageLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId(state, action: PayloadAction<string>) {
      state.chatId = action.payload;
    },
    setAdminId(state, action: PayloadAction<string>) {
      state.adminId = action.payload;
    },

    // Status
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // Messages
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    resetMessages(state) {
      state.messages = [];
    },
    setMessageLoading(state, action: PayloadAction<boolean>) {
      state.messageLoading = action.payload;
    },
  },
});

// ✅ Export Actions
export const {
  setChatId,
  setAdminId,
  setLoading,
  setError,
  setMessages,
  addMessage,
  resetMessages,
  setMessageLoading,
} = chatSlice.actions;

export default chatSlice.reducer;

export const selectChatState = (state: RootState) => state.chatMessages;


export const getOrCreateChat = (customerId: string, adminId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const res = await APIS.post("/chats/get-or-create", {
        customerId,
        adminId,
      });

      if (res.status === 200) {
        dispatch(setChatId(res.data.chat.id));
        dispatch(setAdminId(adminId));
      } else {
        dispatch(setError("Failed to create chat"));
      }
    } catch (err: any) {
      dispatch(setError(err.message || "Chat request failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Fetch all messages for a given chat
export const fetchChatMessages = (chatId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setMessageLoading(true));

    try {
      const res = await APIS.get(`/chat/${chatId}/messages`);
      dispatch(setMessages(res.data.data));
    } catch (err: any) {
      console.error("Fetch messages error", err);
      dispatch(setError("Failed to load messages"));
    } finally {
      dispatch(setMessageLoading(false));
    }
  };
};