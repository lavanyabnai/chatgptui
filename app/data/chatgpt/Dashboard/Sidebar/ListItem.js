import React from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function ListItem (props)  {
  const { title, handleSetSelectedChat, conversationId } = props;

  return (
    <div
      className="flex mt-1 py-4 items-center hover:bg-gray-200 rounded-md transition-[0.4s] border bg-gray-100 "
      onClick={() => handleSetSelectedChat(conversationId)}
    >
      <div className="mx-4">
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-gray-800" />
      </div>
      <p className="text-ellipsis flex-wrap whitespace-nowrap break-words text-base text-gray-800 ">
        {title}
      </p>
    </div>
  );
};