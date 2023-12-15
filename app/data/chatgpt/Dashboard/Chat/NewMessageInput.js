import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { v4 as uuid } from "uuid";
import { addMessage, setSelectedConversationId } from "../dashboardSlice";
import { sendConversationMessage } from "../../socketConnection/socketConn";

export default function NewMessageInput () {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );

  const conversations = useSelector((state) => state.dashboard.conversations);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const proceedMessage = () => {
    const message = {
      aiMessage: false,
      content,
      id: uuid(),
      animate: false,
    };

    console.log(message);

    const conversationId =
      selectedConversationId === "new" ? uuid() : selectedConversationId;

    // append this message to our local store
    dispatch(
      addMessage({
        conversationId,
        message,
      })
    );

    dispatch(setSelectedConversationId(conversationId));

    // send message to the server
    sendConversationMessage(message, conversationId);

    // reset value of the input
    setContent("");
  };

  const handleSendMessage = () => {
    if (content.length > 0) {
      proceedMessage();
    }
  };

  const handleKeyPressed = (event) => {
    if (event.code === "Enter" && content.length > 0) {
      proceedMessage();
    }
  };

//   .new_message_input_container {
//     width: 100%;
//     height: 100px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
// }
// .new_message_input {
//     width: 650px;
//     border: 1px solid rgb(217,217,227);
//     border-radius: 8px;
//     height: 40px;
//     outline: none;
//     box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
//     font-size: 14px;
//     padding: 0 10px;
//     position: relative;
//     transition: 0.4s;
// }

// .new_message_input:focus {
//     border: 1px solid rgb(217,217,227);
//     box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.3);
// }
// .new_message_icon_container {
//     position: absolute;
//     transition: 0.4s;
// }

// .new_message_icon_container:hover {
//     opacity: 0.5;
// }
  //   @media only screen and (min-width:950px) {
  //   .new_message_icon_container {
  //       left: calc(50% + 300px);
  //   }
  // }
  
//    @media only screen and (max-width: 950px) {
//     .new_message_input {
//         width: 95%;
//     }

//     .new_message_icon_container {
//         right: 10px;
//     }
// }

  // return (
  //   <div className="flex relative bottom-0 m-4 h-44 flex-row items-center justify-end gap-3">
  //     <input
  //       className="relative  h-10 w-fit rounded-lg border border-solid p-2 text-base  shadow outline-none transition-[0.4s] focus:border focus:border-solid "
  //       placeholder="Send a Message"
  //       value={content}
  //       onChange={(e) => setContent(e.target.value)}
  //       onKeyDown={handleKeyPressed}
  //       disabled={
  //         selectedConversation &&
  //         !selectedConversation.messages[
  //           selectedConversation.messages.length - 1
  //         ].aiMessage
  //       }
  //     />
  //     <div
  //       className="absolute  mr-4 transition-[0.4s] "
  //       onClick={handleSendMessage}
  //     >
  //       <PaperAirplaneIcon className="h-4 w-4 text-gray-800 hover:text-gray-700" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative bottom-0 left-0 p-4 max-w-7xl conatiner mx-auto">
      <div className="flex items-center justify-end">
        <input
          className="shadow-xs w-full rounded-xl border border-black/10 bg-white p-2"
          placeholder="Send a Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPressed}
          disabled={
            selectedConversation &&
            !selectedConversation.messages[
              selectedConversation.messages.length - 1
            ].aiMessage
          }
        />
        <div
          className="absolute mr-4 transition-[0.4s] "
          onClick={handleSendMessage}
        >
          <PaperAirplaneIcon className="h-4 w-4 text-gray-800 hover:text-gray-700" />
        </div>
      </div>
    </div>
  );
};