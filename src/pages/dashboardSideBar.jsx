import './dashboardSideBar.css';
import homeIcon from '../assets/home-icon.svg';
import transferIcon from '../assets/transfer-icon.svg';
import transactionsIcon from '../assets/transaction-icon.svg';
import cardsIcon from '../assets/card-icon.svg';
import beneficiariesIcon from '../assets/beneficiaries-icon.svg';
import savingsIcon from '../assets/savings-icon.svg';
import billsIcon from '../assets/bills-icon.svg';
import profileIcon from '../assets/profile-icon.svg';
import settingsIcon from '../assets/settings-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';


function DashboardSideBar() {
  const menuItems = [
    { name: "Dashboard", icon: homeIcon },
    { name: "Transfer", icon: transferIcon },
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
      {menuItems.map((item) => (
        <div className="sidebar" key={item.name}>
          <img className="item-icon" src={item.icon} alt="" />
          <p>{item.name}</p>
        </div>
      ))}
    </nav>
  );
}

export default DashboardSideBar;
