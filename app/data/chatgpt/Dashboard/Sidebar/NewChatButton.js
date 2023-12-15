import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";


export default function NewChatButton({ handleSetSelectedChat }) {
  const handleChooseNewChat = () => {
    handleSetSelectedChat("new");
  };

  return (
    <div
      className="flex h-10 items-center rounded-lg border border-solid transition-[0.4s] hover:bg-gray-100 bg-white"
      onClick={handleChooseNewChat}
    >
      <div className="m-1">
        <PlusIcon className="h-6 w-6 mx-1 text-gray-800" />
      </div>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap p-0 text-base text-gray-800">
        New Chat
      </p>
    </div>
  );
}
