import transferIcon from "../../assets/transfer-icon.svg";
import addMoneyIcon from "../../assets/add-money-icon.svg";
import airtimeIcon from "../../assets/airtime-icon.svg";
import dataIcon from "../../assets/data-icon.svg";
import billsIcon from "../../assets/bills-icon.svg";
import { Link } from "react-router-dom";
import './dashboardQuickActions.css';

function DashboardQuickActions() {
  const actions = [
    { name: "Transfer", icon: transferIcon, path: "/transfer" },
    { name: "Add Money", icon: addMoneyIcon, path: "/add-money" },
    { name: "Airtime", icon: airtimeIcon, path: "/airtime" },
    { name: "Data", icon: dataIcon, path: "/data" },
    { name: "Bills", icon: billsIcon, path: "/bills" },
  ];

  return (
    <div className="dashboard-quick-actions">
      <p>Quick Actions</p>
      <div className="quick-actions-container">
        {actions.map((action) => (
          <Link className="quick-action-card" to={action.path} key={action.name}>
            <span className="quick-action-icon">
              <img src={action.icon} alt="" />
            </span>
            <span className="quick-action-label">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardQuickActions;