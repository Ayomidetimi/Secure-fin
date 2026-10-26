import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import TransferHeader from './transferHeader.jsx';
import TransferMain from './transferMain.jsx';
import './transferPage.css';

function TransferPage() {
  return (
    <div className="transfer-page">
      <aside className="transfer-sidebar">
        <DashboardSideBar />
      </aside>
      <div className="transfer-workspace">
        <TransferHeader />
        <TransferMain />
      </div>
    </div>
  );
}

export default TransferPage;
