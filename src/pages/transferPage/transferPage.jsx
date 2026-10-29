import { useState } from 'react';
import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import TransferHeader from './transferHeader.jsx';
import TransferMain from './transferMain.jsx';
import './transferPage.css';

function TransferPage() {
  const [beneficiarySearch, setBeneficiarySearch] = useState('');

  return (
    <div className="transfer-page">
      <aside className="transfer-sidebar">
        <DashboardSideBar variant="transfer" />
      </aside>
      <div className="transfer-workspace">
        <TransferHeader
          beneficiarySearch={beneficiarySearch}
          onBeneficiarySearchChange={setBeneficiarySearch}
        />
        <TransferMain beneficiarySearch={beneficiarySearch} />
      </div>
    </div>
  );
}

export default TransferPage;
