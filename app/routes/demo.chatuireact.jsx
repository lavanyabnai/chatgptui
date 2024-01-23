/* eslint-disable no-undef */
import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Tab } from "@headlessui/react";
import {
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
  ArrowDownIcon,
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
  EyeIcon,
  ShareIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";

function formatText(text) {
  const formattedText = text
    .replace(/\*([^\*]+)\*/g, "<strong>$1</strong>") // Bold: *text*
    .replace(/_([^_]+)_/g, "<em>$1</em>") // Italics: _text_
    .replace(/- ([^\n]+)/g, "<li>$1</li>"); // Bullets: - item

  return formattedText.split("\n").map((item, index) => {
    if (item.startsWith("<li>")) {
      return (
        <ul key={index}>
          <li>{item.substring(4, item.length - 5)}</li>
        </ul>
      );
    } else {
      return <p key={index} dangerouslySetInnerHTML={{ __html: item }} />;
    }
  });
}

function handleChatGPTStream(prompt, onData) {
  const eventSource = new EventSource(
    `/demo/gpt?prompt=${encodeURIComponent(prompt)}`,
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "done") {
      eventSource.close();
    } else {
      let content = data?.choices?.[0]?.delta?.content;
      if (content) {
        onData(content);
      }
    }
  };

  eventSource.onerror = (event) => {
    console.error("EventSource failed:", event);
    eventSource.close();
  };
}

const tabs = [
  { name: "Conversations", href: "#", count: "52", current: false },
  { name: "Prompts", href: "#", count: "6", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyComponent() {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endOfMessagesRef = useRef(null);
  const textareaRef = useRef(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const appendToLastMessage = (newText) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.role === "gpt") {
        return [
          ...prevMessages.slice(0, -1),
          { ...lastMessage, content: lastMessage.content + newText },
        ];
      } else {
        return [...prevMessages, { role: "gpt", content: newText }];
      }
    });
  };

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

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex ${isSidebarOpen ? "" : "lg:flex"} h-screen`}>
      <div className="pt-4 flex h-screen w-full flex-col items-center bg-white">
        <div className="max-w-7xl flex-grow overflow-y-auto">
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
                today?, Hello! It's great to connect with you. How can I assist
                you today?, Hello! It's great to connect with you. How can I
                assist you today?, Hello! It's great to connect with you. How
                can I assist you today?, Hello! It's great to connect with you.
                How can I assist you today?
              </p>
            </div>
          </div>
          {/* chat */}
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
          w-full flex-col rounded-lg border p-4 bg-blue-50 text-gray-800 shadow-lg"
            >
              <div className="font-semibold text-blue-900">ChatGPT</div>
              <p className="break-words text-lg">
                Hello! It's great to connect with you. How can I assist you
                today?
              </p>
            </div>
          </div>
          {/* chat */}
          <div className="my-4 flex text-base">
            <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg">
              <img
                className="h-10 w-10 rounded-lg"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />
            </div>
            <div
              className="border-2 mx-2 flex
          w-full flex-col relative  bg-white p-4 shadow rounded-lg "
            >
              <h2 className="text-base font-medium text-gray-900">
                What would you have done differently if you ran Jurassic Park?
              </h2>
              <p className="mt-1 break-words text-lg">
                Hello! It great to connect with you. How can I assist you
                today?, Hello! It great to connect with you. How can I assist
                you today?, Hello! It great to connect with you. How can I
                assist you today?
              </p>

              <div className="mt-4 pt-2 flex justify-between border-t">
                <div className="flex space-x-4">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex  text-gray-400 hover:text-gray-500"
                    >
                      <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ChatBubbleLeftEllipsisIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ShareIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* chat */}

          <div className="my-4 flex text-base">
            <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg">
              <img
                className="h-10 w-10 rounded-lg"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />
            </div>

            <div
              // style={{ backgroundImage: `url('/assets/bgblue.jpg')` }}
              className="border-2 mx-2 flex w-full flex-col relative  bg-gray-200 p-4 shadow rounded-lg "
            >
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full text-white"
              >
                <defs>
                  <pattern
                    id=":S3:"
                    width="70"
                    height="62"
                    patternUnits="userSpaceOnUse"
                    x="50%"
                    patternTransform="translate(0 80)"
                  >
                    <path
                      d="M0 128V.5H128"
                      fill="none"
                      stroke="currentColor"
                    ></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#:S3:)"></rect>
              </svg>
              <h2 className="text-base font-medium text-gray-900">
                What would you have done differently if you ran Jurassic Park?
              </h2>
              <p className="mt-1 break-words text-lg ">
                Hello! It great to connect with you. How can I assist you
                today?, Hello! It great to connect with you. How can I assist
                you today?, Hello! It great to connect with you. How can I
                assist you today?
              </p>

              <div className="mt-4 pt-2 flex justify-between border-t">
                <div className="flex space-x-4">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex  text-gray-400 hover:text-gray-500"
                    >
                      <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ChatBubbleLeftEllipsisIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <ShareIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* rest */}
        </div>
        <button
          type="button"
          className="rounded-full p-2 text-black border shadow-lg"
        >
          <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-20 w-full max-w-7xl p-4"
        >
          <div className="flex flex-grow rounded-md bg-gray-200 p-2">
            <textarea
              required
              name="prompt"
              id="prompt"
              placeholder="Enter"
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
              <PaperAirplaneIcon className="h-5 w-5 text-gray-500" />
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
      <div className="bg-white flex justify-center items-center">
        <button
          type="button"
          className="cursor-pointer items-center justify-center
                rounded-l-lg p-2 text-sm font-semibold text-gray-900 hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={toggleSidebar}
        >
          <ChevronLeftIcon
            className="h-7 w-7 items-center"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        className={`sidebar bg-slate-50 px-2  ${
          isSidebarOpen ? "block" : "hidden lg:block"
        } lg:w-72 transition-all duration-300 shadow-lg`}
      >
        <div className="flex  w-72 h-screen flex-col gap-y-5 pb-4 mx-4 ">
          <div className="flex my-4 justify-between">
            <Link
              href="#"
              className="flex rounded-md p-2 mr-2 text-base font-semibold leading-6 bg-white text-blue-900 hover:bg-gray-800 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="flex-1 rounded-md px-2 py-2 text-base font-semibold leading-6 bg-white text-blue-900 hover:bg-gray-800 hover:text-gray-800"
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
          <nav className="mt-4 flex flex-1 flex-col gap-y-7">
            <div className="flex flex-1 flex-col ">
              <div className="bg-white  rounded-md p-4 font-semibold leading-6 ">
                <Link className="flex items-center justify-between text-base text-blue-900 hover:text-gray-700">
                  <span>Hello, World!</span>

                  <span className="flex items-center justify-between space-x-2 mr-2">
                    {" "}
                    <HeartIcon className=" h-4 w-4" />
                    <TrashIcon className="h-4 w-4" />
                  </span>
                </Link>
              </div>

              <div className="mt-auto m-2 rounded-md p-2 font-semibold leading-6 text-gray-400  hover:text-gray-500 ">
                <Link href="#" className="flex items-center justify-center">
                  <InformationCircleIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                  <span className="flex items-center ml-4 text-lg">
                    {" "}
                    Information
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
