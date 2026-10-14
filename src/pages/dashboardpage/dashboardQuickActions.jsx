import transferIcon from "../../assets/transfer-icon.svg";
import addMoneyIcon from "../../assets/add-money-icon.svg";
import airtimeIcon from "../../assets/airtime-icon.svg";
import dataIcon from "../../assets/data-icon.svg";
import billsIcon from "../../assets/bills-icon.svg";
import './dashboardQuickActions.css';

function DashboardQuickActions() {
  return (
    <div className="dashboard-quick-actions">
      <p>Quick Actions</p>
      <div className="quick-actions-container">
        <div className="transfer-section">
          <img src={transferIcon} alt="Transfer" />
          <p>Transfer</p>
        </div>
        <div className="add-money-section">
          <img src={addMoneyIcon} alt="Add Money" />
          <p>Add Money</p>
        </div>
        <div className="airtime-section">
          <img src={airtimeIcon} alt="Airtime" />
          <p>Airtime</p>
        </div>
        <div className="data-section">
          <img src={dataIcon} alt="Data" />
          <p>Data</p>
        </div>
        <div className="bill-section">
          <img src={billsIcon} alt="Bills" />
          <p>Bills</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardQuickActions;