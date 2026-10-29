import './recentRecipients.css';

function RecentRecipients({ beneficiaries, beneficiaryId, onSelect }) {
  return (
    <section className="transfer-panel recent-recipients" aria-labelledby="recent-recipients-title">
      <div className="panel-heading">
        <h2 id="recent-recipients-title">Saved Beneficiaries</h2>
        <button type="button" className="view-all-recipients">View all</button>
      </div>
      <div className="recipient-list">
        {beneficiaries.length === 0 && (
          <p className="no-beneficiaries">No matching beneficiaries found.</p>
        )}
        {beneficiaries.map((beneficiary) => (
          <div className="recipient-row" key={beneficiary.id}>
            <span className={`recipient-avatar avatar-${beneficiary.color}`} aria-hidden="true">
              {beneficiary.initials}
            </span>
            <span className="recipient-info">
              <strong>{beneficiary.name}</strong>
              <small>{beneficiary.bank} · {beneficiary.account}</small>
            </span>
            <button
              className={`recipient-send${beneficiaryId === beneficiary.id ? ' chosen' : ''}`}
              type="button"
              aria-pressed={beneficiaryId === beneficiary.id}
              onClick={() => onSelect(beneficiary.id)}
            >
              {beneficiaryId === beneficiary.id ? 'Selected' : 'Send'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentRecipients;
