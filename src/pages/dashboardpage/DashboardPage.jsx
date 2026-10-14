import DashboardSideBar from "./dashboardSideBar";
import DashboardHeader from './dashboardHeader.jsx';
import DashboardDisplay from "./dashboardDisplay.jsx";
import './dashboardPage.css'
import DashboardQuickActions from "./dashboardQuickActions.jsx";

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <DashboardSideBar />
      </div>

      <div className="main-container">
        <DashboardHeader />
        <DashboardDisplay />
        <DashboardQuickActions />
      </div>

    </div>
  )
};
export default DashboardPage;