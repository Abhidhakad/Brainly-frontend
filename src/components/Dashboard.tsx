import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader"
// import Cards from "./Cards";


const Dashboard = () => {
  return (
   <>
  <div className="h-full w-full bg-[#F7F9FB]">
     <Sidebar />

     <TopHeader />

     {/* <Cards /> */}


     {/* <Card
  title="How to Build a Second Brain"
  tags={["productivity", "learning"]}
  addedDate="09/03/2024"
/> */}


  </div>
   </>
  )
}

export default Dashboard;