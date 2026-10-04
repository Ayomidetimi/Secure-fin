import bellIcon from '../assets/bell-icon.svg';
import './dashboardHeader.css';

function DashboardHeader() {
  return(
    <div className="dashboard-header-container">
      <div className="left-section">
        <div>Good morning,</div>
        <p>Abdul Rahman</p>
      </div>

      <div className="right-section">
        <img src={bellIcon} alt="" />
        <div>AR</div>
      </div>
    </div>
  )
}

export default DashboardHeader;