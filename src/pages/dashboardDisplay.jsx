import EyeSolidIcon from '../assets/eye-solid-full.svg';
import EyeSlashIcon from '../assets/eye-slash-icon.png';
import NairaIcon from '../assets/naira-icon.svg';
import { useState } from 'react';
import './dashboardDisplay.css'

function DashboardDisplay() {

  const [viewBalance, setViewBlance] = useState(true)

  const seeBalance = () => {
    setViewBlance(!viewBalance)
  }

  return (
    <div className="dashboard-display-container">
      <div className="left-display">
        <div className="total-balance">
        <p>Total Balance</p>
        <img
          className="hide-balance-icon"
          onClick={seeBalance}
          src={viewBalance ? EyeSolidIcon : EyeSlashIcon} alt=""
        />
      </div>

      <div className="amount">
        <img
          className="total-naira"
          src={NairaIcon}
          alt=""
        />
        {
          viewBalance ?
            <div className="total-balance-amount">
              <p>250,000.00</p>
            </div> :
            <div className="hide-balance">
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
            </div>
        }
      </div>

      <div className="available-balance">
        <p>Available Balance</p>
        <div className="available-amount">
          <img
          className="available-naira"
          src={NairaIcon}
          alt=""
        />

        {
          viewBalance ?
            <div className="available-balance-amount">
              <p>250,000.00</p>
            </div> :
            <div className="hide-balance">
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
              <img src={EyeSlashIcon} alt="" />
            </div>
        }
        </div>
        
      </div>
      </div>

      <div className="right-display">
        <div className="add-money">
          Add Money
        </div>
        <div className="send-money">
          Send Money
        </div>
      </div>
    </div>
  )
}

export default DashboardDisplay;