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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DashboardSideBar() {
  const menuItems = [
    { name: "Dashboard", icon: homeIcon, path: "/dashboard" },
    { name: "Transfer", icon: transferIcon, path: "/transfer" },
    { name: "Transactions", icon: transactionsIcon, path: "/transactions" },
    { name: "Cards", icon: cardsIcon, path: "/cards" },
    { name: "Beneficiaries", icon: beneficiariesIcon, path: "/beneficiaries" },
    { name: "Savings", icon: savingsIcon },
    { name: "Bills & Topups", icon: billsIcon },
    { name: "Profile", icon: profileIcon },
    { name: "Settings", icon: settingsIcon },
    { name: "Logout", icon: logoutIcon }
  ];

  const navigate = useNavigate();

  const  handleLogout = async ()=> {

    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

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

          return item.name === "Logout" ? (
            <button
              className="sidebar"
              key={item.name}
              onClick={handleLogout}
              type="button"
            >
              {linkContent}
            </button>
          ) : item.path ? (
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
