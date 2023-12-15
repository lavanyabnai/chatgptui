import React from "react";
import Dashboard from "../data/chatgpt/Dashboard/Dashboard";
import { connectWithSocketServer } from "../data/chatgpt/socketConnection/socketConn";

export default function Chat() {
  React.useEffect(() => {
    connectWithSocketServer();
  }, []);

  return <Dashboard />
}
