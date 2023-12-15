import React, { useState, useRef, useEffect } from "react";
// import { GrUser } from "react-icons/gr";
// import { FcMindMap } from "react-icons/fc";
import { UserCircleIcon,ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";


const SlowText = (props) => {
  const { speed, text } = props;

  const [placeholder, setPlaceholder] = useState(text[0]);

  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

// .message_container {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     padding: 30px 0
// }
// .message_avatar_container {
//     width: 35px;
//     height: 35px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// .message_text {
//     width: 585px;
//     padding: 0;
//     margin: 8px 0;
//     margin-left: 20px;
//     word-wrap: break-word;
// }
// .message {
//     width: 640px;
//     display: flex;
// }
export default function Message ({ content, aiMessage, animate }) {
  return (
    <>
      <div className="container mx-auto flex  max-w-6xl bg-gray-100 border-b">
        <div
          className="flex w-full items-center justify-start px-2 py-6 "
          style={{ background: aiMessage ? "white" : "gray-100" }}
        >
          <div className="flex flex-col flex-shrink-0 items-end ">
            {aiMessage ? (
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-rose-500" />
            ) : (
              <UserCircleIcon className="h-6 w-6 text-blue-900" />
            )}
          </div>
          <p className="my-2 ml-6 text-base break-words ">
            {animate ? <SlowText speed={20} text={content} /> : content}
          </p>
        </div>
      </div>
    </>
  );
};

