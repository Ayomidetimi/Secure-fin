import DashboardSideBar from "./dashboardSideBar";
import DashboardHeader from './dashboardHeader.jsx';
import './dashboardPage.css'

function DashboardPage() {
  return(
    <div className="dashboard-container">
    <DashboardSideBar />

    <div className="main-container">
      <DashboardHeader/>
    </div>

    </div>
  )
};
export default DashboardPage;