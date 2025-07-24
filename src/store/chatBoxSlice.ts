import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {APIS} from '../globals/http/index'
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
  adminId: "4c264ede-84b4-4455-adc1-801fc169e95e", // Default adminId
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
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

export const selectChatState = (state: RootState) => state.chat;

// Thunk: Get or create chat
export const getOrCreateChat = (customerId: string, adminId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await APIS.post("/chats/get-or-create", {
        customerId,
        adminId,
      });
      if (res.status === 200 && res.data.chat) {
        dispatch(setChatId(res.data.chat.id));
        dispatch(setAdminId(adminId));
      } else {
        dispatch(setError("Failed to create chat"));
      }
    } catch (err: any) {
      dispatch(setError(err?.response?.data?.message || err.message || "Chat request failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Thunk: Fetch all messages for a given chat
export const fetchChatMessages = (chatId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setMessageLoading(true));
    try {
      const res = await APIS.get(`/chats/${chatId}/messages`);
      if (res.status === 200 && res.data.data) {
        dispatch(setMessages(res.data.data));
      } else {
        dispatch(setError("Failed to load messages"));
      }
    } catch (err: any) {
      dispatch(setError(err?.response?.data?.message || err.message || "Failed to load messages"));
    } finally {
      dispatch(setMessageLoading(false));
    }
  };
};

// Thunk: Send a message (for REST API, not Socket.io)
export const sendMessage = (
  chatId: string,
  senderId: string,
  receiverId: string,
  content: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await APIS.post("/chats/send-message", {
        chatId,
        senderId,
        receiverId,
        content,
      });
      if (res.status === 200 && res.data.data) {
        dispatch(addMessage(res.data.data));
      } else {
        dispatch(setError("Failed to send message"));
      }
    } catch (err: any) {
      dispatch(setError(err?.response?.data?.message || err.message || "Failed to send message"));
    }
  };
};