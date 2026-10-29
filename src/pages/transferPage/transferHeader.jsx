import bellIcon from '../../assets/bell-icon.svg';
import './transferHeader.css';

function TransferHeader({ beneficiarySearch, onBeneficiarySearchChange }) {
  return (
    <header className="transfer-header">
      <div className="transfer-toolbar">
        <label className="transfer-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Search beneficiaries"
            placeholder="Search beneficiaries by name, bank, or account..."
            value={beneficiarySearch}
            onChange={(event) => onBeneficiarySearchChange(event.target.value)}
          />
        </label>
        <div className="transfer-user">
          <button className="transfer-notification" type="button" aria-label="Notifications">
            <img src={bellIcon} alt="" />
            <span />
          </button>
          <span className="transfer-user-avatar" aria-hidden="true">AR</span>
          <span className="transfer-user-name">Abdul Rahman</span>
          <span className="transfer-user-chevron" aria-hidden="true">⌄</span>
        </div>
      </div>

      
    </header>
  );
}

export default TransferHeader;
