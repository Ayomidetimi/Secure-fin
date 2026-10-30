import DashboardSideBar from "./dashboardSideBar";
import DashboardHeader from './dashboardHeader.jsx';
import DashboardDisplay from "./dashboardDisplay.jsx";
import './dashboardPage.css'
import DashboardQuickActions from "./dashboardQuickActions.jsx";
import DashboardTransactions from "./dashboardTransactions.jsx";

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>

      <div className="main-container">
        <DashboardHeader />
        <DashboardDisplay />
        <DashboardQuickActions />
        <DashboardTransactions limit={3} showViewAll />
      </div>

    </div>
  )
};
export default DashboardPage;