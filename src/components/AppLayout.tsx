import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-bg text-text">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden md:pl-66">
        <TopHeader />

        <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-24 sm:pt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
