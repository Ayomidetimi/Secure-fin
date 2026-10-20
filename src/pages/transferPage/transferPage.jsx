import { useState } from 'react';
import DashboardHeader from '../dashboardpage/dashboardHeader.jsx';
import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import './transferPage.css';

const beneficiaries = [
  { id: 'amara', name: 'Amara Okafor', bank: 'Access Bank', account: '0123456789', initials: 'AO' },
  { id: 'tunde', name: 'Tunde Bello', bank: 'GTBank', account: '0987654321', initials: 'TB' },
  { id: 'zainab', name: 'Zainab Musa', bank: 'Zenith Bank', account: '0234567891', initials: 'ZM' },
];

function TransferPage() {
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  const selectedBeneficiary = beneficiaries.find(
    (beneficiary) => beneficiary.id === beneficiaryId,
  );

  const reviewTransfer = (event) => {
    event.preventDefault();
    setIsReviewing(true);
  };

  return (
    <div className="dashboard-container transfer-page">
      <div className="sidebar-container">
        <DashboardSideBar />
      </div>

      <main className="main-container transfer-main">
        <DashboardHeader />
        <div className="transfer-content">
          <div className="transfer-page-heading">
            <div>
              <p className="transfer-eyebrow">PAYMENTS</p>
              <h1>Transfer</h1>
              <p className="transfer-intro">Send money to someone you know.</p>
            </div>
            <div className="transfer-secure-note">
              <span aria-hidden="true">✓</span>
              Secure transfer
            </div>
          </div>

          <section className="transfer-card" aria-labelledby="transfer-form-title">
            {isReviewing ? (
              <div className="transfer-review">
                <div className="transfer-section-heading">
                  <div className="transfer-heading-icon" aria-hidden="true">✓</div>
                  <div>
                    <h2 id="transfer-form-title">Review transfer</h2>
                    <p>Make sure the details below are correct.</p>
                  </div>
                </div>

                <div className="review-amount">
                  <span>Transfer amount</span>
                  <strong>₦{Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                </div>
                <dl className="review-details">
                  <div>
                    <dt>Beneficiary</dt>
                    <dd>{selectedBeneficiary?.name}</dd>
                  </div>
                  <div>
                    <dt>Bank</dt>
                    <dd>{selectedBeneficiary?.bank}</dd>
                  </div>
                  <div>
                    <dt>Account number</dt>
                    <dd>{selectedBeneficiary?.account}</dd>
                  </div>
                  <div>
                    <dt>Description</dt>
                    <dd>{description || 'No description'}</dd>
                  </div>
                </dl>
                <p className="review-notice">This is a preview. No money has been sent.</p>
                <button
                  className="transfer-submit"
                  type="button"
                  onClick={() => setIsReviewing(false)}
                >
                  Edit transfer
                </button>
              </div>
            ) : (
              <form onSubmit={reviewTransfer}>
                <div className="transfer-section-heading">
                  <div className="transfer-heading-icon" aria-hidden="true">↗</div>
                  <div>
                    <h2 id="transfer-form-title">Transfer details</h2>
                    <p>Choose a beneficiary and enter the amount to send.</p>
                  </div>
                </div>

                <div className="transfer-field">
                  <label htmlFor="beneficiary">Beneficiary</label>
                  <select
                    id="beneficiary"
                    value={beneficiaryId}
                    onChange={(event) => setBeneficiaryId(event.target.value)}
                    required
                  >
                    <option value="">Select a beneficiary</option>
                    {beneficiaries.map((beneficiary) => (
                      <option key={beneficiary.id} value={beneficiary.id}>
                        {beneficiary.name} · {beneficiary.bank} · {beneficiary.account}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transfer-field">
                  <label htmlFor="amount">Amount</label>
                  <div className="amount-input-wrap">
                    <span aria-hidden="true">₦</span>
                    <input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="transfer-field">
                  <label htmlFor="description">
                    Description <span className="optional-label">Optional</span>
                  </label>
                  <input
                    id="description"
                    type="text"
                    maxLength="100"
                    placeholder="What is this transfer for?"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                <button className="transfer-submit" type="submit">
                  Review transfer <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </section>

          <section className="recent-beneficiaries" aria-labelledby="recent-beneficiaries-title">
            <div className="recent-heading">
              <div>
                <h2 id="recent-beneficiaries-title">Recent beneficiaries</h2>
                <p>Choose someone you have transferred to before.</p>
              </div>
            </div>
            <div className="beneficiary-list">
              {beneficiaries.map((beneficiary) => (
                <button
                  className={`beneficiary-card${beneficiaryId === beneficiary.id ? ' selected' : ''}`}
                  key={beneficiary.id}
                  type="button"
                  aria-pressed={beneficiaryId === beneficiary.id}
                  onClick={() => {
                    setBeneficiaryId(beneficiary.id);
                    setIsReviewing(false);
                  }}
                >
                  <span className="beneficiary-avatar">{beneficiary.initials}</span>
                  <span className="beneficiary-info">
                    <strong>{beneficiary.name}</strong>
                    <span>{beneficiary.bank}</span>
                  </span>
                  <span className="beneficiary-arrow" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TransferPage;
