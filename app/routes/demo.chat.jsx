/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, ArrowUpTrayIcon, AdjustmentsVerticalIcon,AdjustmentsHorizontalIcon,
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
    `/demo/gpt?prompt=${encodeURIComponent(prompt)}`
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
export default function Demo( ) {
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endOfMessagesRef = useRef(null);
  const textareaRef = useRef(null);

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
    <div className="">
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

      <div className=" flex h-screen flex-col items-center bg-gray-800">
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
                Hello! It great to connect with you. How can I assist you
                today?
              </p>
            </div>
          </div>

          <div className="mx-auto my-2 flex w-full max-w-7xl text-base">
            <div className="relative flex  h-10 w-10  items-center justify-center rounded-lg bg-blue-50  text-blue-900 ">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
            </div>
            <div className="relative mx-2 flex w-full flex-col rounded-lg bg-gray-800 p-4 text-white shadow-xl">
              <div className="font-semibold">ChatGPT</div>
              <p className="break-words">
                Hello! It great to connect with you. How can I assist you
                today?, Hello! It great to connect with you. How can I assist
                you today?, Hello! It great to connect with you. How can I
                assist you today?, Hello! It great to connect with you. How
                can I assist you today?, Hello! It great to connect with you.
                How can I assist you today?
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-20 w-full max-w-7xl p-4"
        >
          <div className="flex flex-grow rounded-md border border-gray-300 bg-white p-2 ">
            <textarea
              required
              name="prompt"
              id="prompt"
              ref={textareaRef}
              className="flex-grow text-lg"
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
      </div>
    </div>
  );
}
