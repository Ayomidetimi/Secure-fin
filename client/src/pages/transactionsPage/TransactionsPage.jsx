import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import DashboardTransactions from './dashboardTransactions.jsx';
import BackToDashboard from '../../components/BackToDashboard.jsx';
import './transactionsPage.css';

function TransactionsPage() {
  return (
    <div className="dashboard-container transactions-page">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>
      <main className="main-container">
        <BackToDashboard />
        <DashboardTransactions
          title="Transaction History"
          showTransactionFilters
        />
      </main>
    </div>
  );
}

export default TransactionsPage;
