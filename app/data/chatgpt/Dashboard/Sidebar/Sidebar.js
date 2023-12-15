import React, { Fragment, useState } from "react";
import NewChatButton from "./NewChatButton";
import ListItem from "./ListItem";
import DeleteConversationsButton from "./DeleteConversationsButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversationId } from "../dashboardSlice";
import { Dialog, Transition } from "@headlessui/react";

import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";

export default function Sidebar() {
  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.dashboard.conversations);

  const handleSetSelectedChat = (id) => {
    dispatch(setSelectedConversationId(id));
  };
  const [chatopen, setchatOpen] = useState(true);

  return (
    <>
      <button
        type="button"
        className="top-15 fixed right-0 flex cursor-pointer items-center 
                rounded-l-lg border bg-white px-2 py-4 text-sm font-semibold text-gray-900 shadow-xl hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => setchatOpen(!chatopen)}
      >
        <AdjustmentsHorizontalIcon
          className="h-5 w-5 items-center"
          aria-hidden="true"
        />
      </button>

      <Transition.Root show={chatopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setchatOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-xs pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto ">
                        <div className="px-2 py-2">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="flex-1">
                              <NewChatButton
                                handleSetSelectedChat={handleSetSelectedChat}
                              />
                            </Dialog.Title>

                            <div className="ml-2 flex h-10 items-center rounded-md border hover:bg-gray-100 p-2 ">
                              <button
                                type="button"
                                className="outline-none"
                                onClick={() => setchatOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <ArrowLeftOnRectangleIcon
                                  className="h-4 w-4 text-gray-800"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Slide over */}
                        <div className="relative mt-1 flex-1 px-2 ">
                          {conversations.map((c) => (
                            <ListItem
                              key={c.id}
                              title={c.messages[0].content}
                              conversationId={c.id}
                              handleSetSelectedChat={handleSetSelectedChat}
                            />
                          ))}
                        </div>

                        <div className="flex justify-center">
                          <DeleteConversationsButton />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
