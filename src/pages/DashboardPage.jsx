import DashboardSideBar from "./dashboardSideBar";
import DashboardHeader from './dashboardHeader.jsx';
import DashboardDisplay from "./dashboardDisplay.jsx";
import './dashboardPage.css'

function DashboardPage() {
  return(
    <div className="dashboard-container">
    <DashboardSideBar />

    <div className="main-container">
      <DashboardHeader />
      <DashboardDisplay />
    </div>

    </div>
  )
};
export default DashboardPage;