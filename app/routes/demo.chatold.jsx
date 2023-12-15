import React from "react";
import { Provider } from "react-redux";
import Chat from "../components/Chat";
import { store } from "../data/chatgpt/store";

// import styles from "../data/chatgpt/index.css";

export default function ChatRender() {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
}
