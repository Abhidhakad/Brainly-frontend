import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import Cards from "./Cards";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopHeader />

        <main className="mx-auto px-8 sm:py-6 pt-28">
          <div className="
  flex flex-wrap
  gap-6
  justify-center md:justify-start
  max-w-7xl mx-auto
">
            <Cards />
          </div>

        </main>
      </div>

    </div>
  );
};

export default Dashboard;
