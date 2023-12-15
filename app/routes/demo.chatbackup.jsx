import { useState, useEffect, useRef } from "react";
import {
  UserCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  AdjustmentsVerticalIcon
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
export default function Demo({ aiMessage }) {
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
    <div className="flex h-screen flex-col items-center p-4">
      <div className="w-full max-w-7xl flex-grow overflow-auto">
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div
              key={index}
              className="h-15 my-2 flex self-end rounded-lg border bg-blue-500 p-4 text-gray-200"
            >
              <div className="mr-2 flex flex-shrink-0 flex-col items-start">
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-rose-500" />
              </div>
              {formatText(msg.content)} 
            </div>
          ) : (
            <div
              key={index}
              className="my-2 flex self-end rounded-lg border bg-blue-500/50 p-4 text-gray-200"
            >
              <div className="mr-2 flex flex-shrink-0 flex-col items-start">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
              </div>
              {formatText(msg.content)}
            </div>
          )
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-4xl">
        <div className="flex-grow rounded-md border border-gray-300 p-2 ">
          <textarea
            required
            name="prompt"
            id="prompt"
            ref={textareaRef}
            className="text-lg"
            style={{ resize: "none" }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`ml-2  rounded-md p-2 text-white ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`m-1 flex items-center justify-center rounded-md bg-blue-500 p-2 ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            <ArrowUpTrayIcon className="h-5 w-5 text-gray-100" />
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`m-1 flex items-center justify-center rounded-md bg-blue-500 p-2 ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            <AdjustmentsVerticalIcon className="h-5 w-5 text-gray-100" />
          </button>
        </div>
      </form>
    </div>
  );
}
