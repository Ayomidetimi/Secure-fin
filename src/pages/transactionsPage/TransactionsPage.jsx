import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import DashboardTransactions from '../dashboardpage/dashboardTransactions.jsx';
import '../dashboardpage/dashboardPage.css';
import './transactionsPage.css';

function TransactionsPage() {
  return (
    <div className="dashboard-container transactions-page">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>

      <main className="main-container">
        <DashboardTransactions title="Transaction History" />
      </main>
    </div>
  );
}

export default TransactionsPage;
