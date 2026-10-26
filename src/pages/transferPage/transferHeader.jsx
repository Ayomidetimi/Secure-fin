import bellIcon from '../../assets/bell-icon.svg';
import './transferHeader.css';

function TransferHeader() {
  return (
    <header className="transfer-header">
      <div className="transfer-toolbar">
        <label className="transfer-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Search"
            placeholder="Search for transactions, accounts or help..."
          />
        </label>
        <div className="transfer-user">
          <button className="transfer-notification" type="button" aria-label="Notifications">
            <img src={bellIcon} alt="" />
            <span />
          </button>
          <span className="transfer-user-avatar" aria-hidden="true">AR</span>
          <span className="transfer-user-name">Abdul Rahman</span>
          
        </div>
      </div>

      
    </header>
  );
}

export default TransferHeader;
