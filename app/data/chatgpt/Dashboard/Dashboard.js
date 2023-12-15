import React from "react";
// import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

// import DashboardStyles from "./dashboard.css";
// import LoadingSpinner from "./LoadingSpinner";

export default function Dashboard () {
  // const sessionEstablished = useSelector(
  //   (state) => state.dashboard.sessionEstablished
  // );

//   .dashboard_container {
//     width: 100%;
//     height: 100vh;
//     display: flex;
// }

  return (
    <>
      <div className="fixed w-full bg-sky-500">
        <div className="ml-4 flex h-16 items-center justify-start">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white">
                Chat ChatGPT
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Sidebar />
        <div className="h-screen w-full">
          <Chat />
        </div>
        {/* {!sessionEstablished && <LoadingSpinner />} */}
      </div>
    </>
  );
};


