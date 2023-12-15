import React from "react";
// import { useSelector } from "react-redux";

import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";
// .chat_gpt_logo_container {
//     flex-grow: 1;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// .chat_gpt_logo {
//     color: rgb(217,217,227);
//     font-weight: bold;
//     font-size: 50px;
// }

// const ChatLogo = () => {
//   return (
//     <>
//         <div className="flex grow h-full w-full items-center justify-center">
//           <p className="text-5xl font-bold text-slate-100">ChatGPT</p>
//         </div>

//     </>
//   );
// };

export default function Chat() {
  // const selectedConversationId = useSelector(
  //   (state) => state.dashboard.selectedConversationId
  // );

  // .chat_container {
  //     flex-grow: 1;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  // }

  // (min-width:950px)
  //     .chat_container {
  //         max-width: calc(100% - 250px);
  // }
  // (max-width: 950px)
  //         .chat_container {
  //         max-width: calc(100% - 50px);
  //     }
  // .chat_selected_container {
  //     width: 100%;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  // }
  // return (
  //   <div className="flex h-full w-full flex-col items-center justify-end ">
  //     {!selectedConversationId ? (
  //       <div className="flex h-full w-full grow items-center justify-center">
  //         <p className="text-5xl font-bold text-slate-100">ChatGPT</p>
  //       </div>
  //     ) : (
  //       <div className="flex h-full w-full flex-col">
  //         <Messages />
  //         <NewMessageInput />
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    // flex h-full w-full flex-col items-center justify-end
    <div className="flex flex-col h-full">
      {/* flex h-full w-full flex-col */}
      <div className="overflow-hidden">
        <Messages />
      </div>
      <div className="">
        <NewMessageInput />
      </div>
    </div>
  );
}
