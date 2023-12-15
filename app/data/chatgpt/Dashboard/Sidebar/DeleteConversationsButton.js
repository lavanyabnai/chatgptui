import React from "react";
import { useDispatch } from "react-redux";
import { deleteConversations as deleteConversationsFromStore } from "../dashboardSlice";
import { deleteConversations } from "../../socketConnection/socketConn";

import { TrashIcon } from "@heroicons/react/20/solid";

export default function DeleteConversationsButton () {
  const dispatch = useDispatch();

  const handleDeleteConversations = () => {
    dispatch(deleteConversationsFromStore([]));

    deleteConversations();
    //
  };

 
  return (

      <div
        className="absolute bottom-0 m-4 flex h-6 items-center rounded-md border bg-rose-500 p-4 transition-[0.4s] hover:bg-rose-600"
        onClick={handleDeleteConversations}
      >
        <div className="m-1">
          <TrashIcon className="h-4 w-4 text-white" />
        </div>
        <p className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap text-base text-white">
          Delete conversations
        </p>
      </div>

  );
};

