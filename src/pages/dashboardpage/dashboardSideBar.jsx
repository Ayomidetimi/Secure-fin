import './dashboardSideBar.css';
import homeIcon from '../../assets/home-icon.svg';
import transferIcon from '../../assets/transfer-icon.svg';
import transactionsIcon from '../../assets/transaction-icon.svg';
import cardsIcon from '../../assets/card-icon.svg';
import beneficiariesIcon from '../../assets/beneficiaries-icon.svg';
import savingsIcon from '../../assets/savings-icon.svg';
import billsIcon from '../../assets/bills-icon.svg';
import profileIcon from '../../assets/profile-icon.svg';
import settingsIcon from '../../assets/settings-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import { NavLink } from 'react-router-dom';


function DashboardSideBar() {
  const menuItems = [
    { name: "Dashboard", icon: homeIcon, path: "/dashboard" },
    { name: "Transfer", icon: transferIcon, path: "/transfer" },
    { name: "Transactions", icon: transactionsIcon },
    { name: "Cards", icon: cardsIcon },
    { name: "Beneficiaries", icon: beneficiariesIcon },
    { name: "Savings", icon: savingsIcon },
    { name: "Bills & Topups", icon: billsIcon },
    { name: "Profile", icon: profileIcon },
    { name: "Settings", icon: settingsIcon },
    { name:"Logout", icon: logoutIcon}
  ];

  return (
    <nav className="side-container">

      <div className="brand">
        <div className="brand-logo" aria-hidden="true" />
        <span>SecureFin</span>
      </div>

      <div className="sidebar-links">
        {menuItems.map((item) => {
          const linkContent = (
            <>
              <img className="item-icon" src={item.icon} alt="" />
              <p>{item.name}</p>
            </>
          );

          return item.path ? (
            <NavLink
              to={item.path}
              className={({ isActive }) => `sidebar${isActive ? ' sidebar-active' : ''}`}
              key={item.name}
            >
              {linkContent}
            </NavLink>
          ) : (
            <div className="sidebar" key={item.name}>
              {linkContent}
            </div>
          );
        })}
      </div>

    </nav>
  );
}

export default DashboardSideBar;
