/* eslint-disable react/jsx-no-comment-textnodes */
import { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import {
  HomeIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  AdjustmentsVerticalIcon,
  AdjustmentsHorizontalIcon,
  InformationCircleIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
];

const tabs = [
  { name: "Conversations", href: "#", count: "52", current: false },
  { name: "Prompts", href: "#", count: "6", current: true },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endOfMessagesRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const prompt = formData.get("prompt");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
    ]);
    textareaRef.current.value = "";

    handleChatGPTStream(prompt, appendToLastMessage, () => {
      setIsSubmitting(false);
      console.log("Streaming complete");
    });
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          className="top-15 fixed right-0 flex cursor-pointer items-center 
                rounded-l-lg border bg-white px-2 py-4 text-sm font-semibold text-gray-900 shadow-xl hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <AdjustmentsHorizontalIcon
            className="h-5 w-5 items-center"
            aria-hidden="true"
          />
        </button>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="" />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className=" w-full lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col">
                <div className="bg-gray-200 px-2 shadow-lg">
                  <div className="flex  w-72 h-screen flex-col gap-y-5 pb-4 mx-4 ">
                    <div className="flex my-4 justify-between">
                      <Link
                        href="#"
                        className="flex rounded-md p-2 mr-2 text-base font-semibold leading-6 bg-gray-100 text-blue-900 hover:bg-gray-800 hover:text-white"
                      >
                        <XMarkIcon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                          onClick={() => setSidebarOpen(false)}
                        />
                      </Link>
                      <Link
                        href="#"
                        className="flex-1 rounded-md px-2 py-2 text-base font-semibold leading-6 bg-gray-100 text-blue-900 hover:bg-gray-800 hover:text-gray-800"
                      >
                        <div className="flex items-center">
                          <ChatBubbleOvalLeftIcon
                            className="h-6 w-6 mr-2"
                            aria-hidden="true"
                          />
                          <span className="flex items-center text-sm ">
                            New Conversation
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="rounded-lg">
                      <Tab.Group className="flex justify-between">
                        <Tab.List className="mx-2">
                          {tabs.map((tab) => (
                            <Tab
                              key={tab.name}
                              className={({ selected }) =>
                                classNames(
                                  "flex flex-col border-black p-2 text-center text-base font-semibold mx-1 outline-none",
                                  selected
                                    ? "border-b-2 text-blue-900"
                                    : "text-gray-400 hover:text-gray-700",
                                )
                              }
                            >
                              {tab.name}
                            </Tab>
                          ))}
                        </Tab.List>
                      </Tab.Group>
                    </div>
                    <nav className="mt-4 flex flex-1 flex-col">
                      <div className="flex flex-1 flex-col gap-y-7">
                        <div className="bg-gray-100 hover:bg-white rounded-md p-4  font-semibold leading-6 ">
                          <Link className="flex items-center justify-between text-base text-blue-900 hover:text-gray-700">
                            <span>Hello, World!</span>

                            <span className="flex items-center justify-between space-x-2 mr-2">
                              {" "}
                              <HeartIcon className=" h-4 w-4" />
                              <TrashIcon className="h-4 w-4" />
                            </span>
                          </Link>
                        </div>

                        <div className="mt-auto mx-2 justify-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400  hover:text-gray-500 items-center">
                          <Link
                            href="#"
                            className="flex justify-between items-center"
                          >
                            <InformationCircleIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="flex-1 ml-2 text-lg">
                              {" "}
                              Information
                            </span>
                          </Link>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="w-full lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col shadow-lg">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="bg-gray-200 px-2 shadow-lg">
          <div className="flex  w-72 h-screen flex-col gap-y-5 pb-4 mx-4 ">
            <div className="flex my-4 justify-between">
              <Link
                href="#"
                className="flex rounded-md p-2 mr-2 text-base font-semibold leading-6 bg-gray-100 text-blue-900 hover:bg-gray-800 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="flex-1 rounded-md px-2 py-2 text-base font-semibold leading-6 bg-gray-100 text-blue-900 hover:bg-gray-800 hover:text-gray-800"
              >
                <div className="flex items-center">
                  <ChatBubbleOvalLeftIcon
                    className="h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <span className="flex items-center text-sm ">
                    New Conversation
                  </span>
                </div>
              </Link>
            </div>
            <div className="rounded-lg">
              <Tab.Group className="flex justify-between">
                <Tab.List className="mx-2">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          "flex flex-col border-black p-2 text-center text-base font-semibold mx-1 outline-none",
                          selected
                            ? "border-b-2 text-blue-900"
                            : "text-gray-400 hover:text-gray-700",
                        )
                      }
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
            <nav className="mt-4 flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-y-7">
                <div className="bg-gray-100 hover:bg-white rounded-md p-4  font-semibold leading-6 ">
                  <Link className="flex items-center justify-between text-base text-blue-900 hover:text-gray-700">
                    <span>Hello, World!</span>

                    <span className="flex items-center justify-between space-x-2 mr-2">
                      {" "}
                      <HeartIcon className=" h-4 w-4" />
                      <TrashIcon className="h-4 w-4" />
                    </span>
                  </Link>
                </div>

                <div className="mt-auto mx-2 justify-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400  hover:text-gray-500 items-center">
                  <Link href="#" className="flex justify-between items-center">
                    <InformationCircleIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="flex-1 ml-2 text-lg"> Information</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="pt-4 flex h-screen w-full flex-col items-center bg-gray-100">
          <div className="max-w-7xl flex-grow md:mx-4">
            <div className="mx-auto my-2 flex w-full max-w-7xl text-base">
              <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg">
                <img
                  className="h-10 w-10 rounded-lg"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="profile"
                />
              </div>
              <div
                className="relative inset-0 mx-2 flex
          w-full flex-col rounded-lg border p-4 bg-gray-100 text-gray-800 shadow-lg"
              >
                <div className="font-semibold text-blue-900">ChatGPT</div>
                <p className="break-words text-lg">
                  Hello! It's great to connect with you. How can I assist you
                  today?
                </p>
              </div>
            </div>

            <div className="mx-auto my-4 flex w-full max-w-7xl text-base">
              <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg bg-gray-200  text-blue-900 ">
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
              </div>
              <div className="relative mx-2 flex w-full flex-col rounded-lg bg-gray-200 p-4 text-gray-800 shadow-xl">
                <div className="font-semibold text-blue-900">ChatGPT</div>
                <p className="break-words text-lg">
                  Hello! It's great to Connect with you. How can I assist you
                  today?, Hello! It's great to connect with you. How can I
                  assist you today?, Hello! It's great to connect with you. How
                  can I assist you today?, Hello! It's great to connect with
                  you. How can I assist you today?, Hello! It's great to connect
                  with you. How can I assist you today?
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex h-20 w-full max-w-7xl p-4"
          >
            <div className="flex flex-grow rounded-md bg-gray-200 p-2">
              <textarea
                required
                name="prompt"
                id="prompt"
                ref={textareaRef}
                className="flex-grow text-lg bg-gray-200 outline-none"
                style={{ resize: "none" }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-2 rounded-md text-white ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5 text-blue-900" />
              </button>
            </div>

            <div className="flex text-blue-900 ">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mx-2 flex items-center justify-center rounded-md bg-gray-200 p-2 ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center rounded-md bg-gray-200 p-2 ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                <AdjustmentsVerticalIcon className="h-5 w-5 " />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="lg:hidden pt-4 flex h-screen w-full flex-col items-center bg-gray-900">
        <div className="max-w-7xl flex-grow md:mx-4">
          <div className="mx-auto my-2 flex w-full max-w-7xl text-base">
            <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg  text-white ">
              <img
                className="h-10 w-10 rounded-lg"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />
            </div>
            <div
              className="relative inset-0 mx-2 flex
          w-full flex-col rounded-lg  p-2  text-white shadow-lg"
            >
              <div className="font-semibold">ChatGPT</div>
              <p className="break-words">
                Hello! It's great to connect with you. How can I assist you
                today?
              </p>
            </div>
          </div>

          <div className="mx-auto my-2 flex w-full max-w-7xl text-base">
            <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg bg-gray-800  text-gray-500 ">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
            </div>
            <div className="relative mx-2 flex w-full flex-col rounded-lg bg-gray-800 p-4 text-white shadow-xl">
              <div className="font-semibold text-blue-900">ChatGPT</div>
              <p className="break-words">
                Hello!It's great to connect with you. How can I assist you
                today?, Hello! It's great to connect with you. How can I assist
                you today?, Hello! It's great to connect with you. How can I
                assist you today?, Hello! It's great to connect with you. How
                can I assist you today?, Hello! It's great to connect with you.
                How can I assist you today?
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-20 w-full max-w-7xl p-4"
        >
          <div className="flex flex-grow rounded-md bg-gray-800 p-2">
            <textarea
              required
              name="prompt"
              id="prompt"
              ref={textareaRef}
              className="flex-grow text-lg bg-gray-800"
              style={{ resize: "none" }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`ml-2 rounded-md text-white ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <PaperAirplaneIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mx-2 flex items-center justify-center rounded-md bg-blue-500 p-2 ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 text-gray-100" />
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center rounded-md bg-blue-500 p-2 ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <AdjustmentsVerticalIcon className="h-5 w-5 text-gray-100" />
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
}
