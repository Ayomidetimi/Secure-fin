import './transferForm.css';

function TransferForm({
  beneficiaries,
  beneficiaryId,
  selectedBeneficiary,
  amount,
  description,
  isReviewing,
  transferType,
  onTransferTypeChange,
  onBeneficiaryChange,
  onAmountChange,
  onDescriptionChange,
  onReview,
  onEdit,
}) {
  if (isReviewing) {
    const formattedAmount = Number(amount).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const totalAmount = (Number(amount) + 10).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <section className="transfer-card" aria-labelledby="transfer-form-title">
        <div className="review-card-heading">
          <h2 id="transfer-form-title">Transfer Details</h2>
          <button type="button" onClick={onEdit}><span aria-hidden="true">✎</span> Edit</button>
        </div>
        <dl className="review-details">
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">♙</span>
            <dt>Transfer Type</dt>
            <dd>{selectedBeneficiary?.type === 'user' ? 'SecureFin User' : 'External Bank'}</dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">▤</span>
            <dt>Bank</dt>
            <dd>{selectedBeneficiary?.bank}</dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">♙</span>
            <dt>Account Number</dt>
            <dd>{selectedBeneficiary?.account}</dd>
          </div>
          <div className="review-detail-row account-name-row">
            <span className="review-detail-icon" aria-hidden="true">♙</span>
            <dt>Account Name</dt>
            <dd>
              {selectedBeneficiary?.name}
              <small className="verified-badge"><span aria-hidden="true">●</span> Account verified</small>
            </dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">₦</span>
            <dt>Amount</dt>
            <dd>₦{formattedAmount}</dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">▤</span>
            <dt>Description</dt>
            <dd>{description || 'No description'}</dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon review-percent" aria-hidden="true">%</span>
            <dt>Transaction Fee</dt>
            <dd>₦10.00</dd>
          </div>
        </dl>
        <div className="review-total">
          <span className="review-total-icon" aria-hidden="true">▣</span>
          <strong>Total Amount</strong>
          <strong>₦{totalAmount}</strong>
        </div>
      </section>
    );
  }

  const visibleBeneficiaries = beneficiaries.filter(
    (beneficiary) => beneficiary.type === transferType,
  );

 

  return (
    <section className="transfer-card" aria-labelledby="transfer-form-title">
      <div className="transfer-card-heading">
        <h2 id="transfer-form-title">Transfer Money</h2>
        <p>Send Money Securely to other SecureFin users or external banks</p>
      </div>
      <form onSubmit={onReview}>
        <fieldset className="transfer-types">
          <legend>Transfer Type</legend>
          <label className={`transfer-type-option${transferType === 'user' ? ' selected' : ''}`}>
            <span className="transfer-type-icon" aria-hidden="true">♙</span>
            <span>
              <strong>SecureFin User</strong>
              <small>Send to another SecureFin account</small>
            </span>
            <input
              type="radio"
              name="transfer-type"
              value="user"
              checked={transferType === 'user'}
              onChange={() => onTransferTypeChange('user')}
            />
          </label>
          <label className={`transfer-type-option${transferType === 'bank' ? ' selected' : ''}`}>
            <span className="transfer-type-icon bank-icon" aria-hidden="true">▤</span>
            <span>
              <strong>External Bank</strong>
              <small>Send to another bank account</small>
            </span>
            <input
              type="radio"
              name="transfer-type"
              value="bank"
              checked={transferType === 'bank'}
              onChange={() => onTransferTypeChange('bank')}
            />
          </label>
        </fieldset>

        <div className="transfer-field">
          <label htmlFor="beneficiary">Beneficiary</label>
          <select
            id="beneficiary"
            value={beneficiaryId}
            onChange={(event) => {onBeneficiaryChange(event.target.value); 
            event.target.blur();  }}
            required
          >
            <option value="">
              {transferType === 'user' ? 'Select a SecureFin user' : 'Select a bank recipient'}
            </option>
            {visibleBeneficiaries.map((beneficiary) => (
              <option 
                key={beneficiary.id} 
                value={beneficiary.id}>
                {beneficiary.name} · 
                {beneficiary.bank} · 
                {beneficiary.account}
              </option>
            ))}
          </select>
        </div>

        {selectedBeneficiary && (
          <div className="transfer-recipient-summary">
            <span className="summary-icon" aria-hidden="true">♙</span>
            <span>
              <strong>{selectedBeneficiary.name}</strong>
              <small>{selectedBeneficiary.bank} · {selectedBeneficiary.account}</small>
            </span>
          </div>
        )}

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
              onChange={(event) => onAmountChange(event.target.value)}
              required
            />
          </div>
          <small className="available-balance">Available balance: ₦12,450.75</small>
        </div>

        <div className="transfer-field">
          <label htmlFor="description">Note <span className="optional-label">Optional</span></label>
          <textarea
            id="description"
            maxLength="100"
            placeholder="Add a note for this transfer (e.g. Rent, Gift, etc.)"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
          <small className="character-count">{description.length}/100</small>
        </div>

        <button className="transfer-submit" type="submit">
          <span aria-hidden="true">↗</span>
          Review Transfer
        </button>
      </form>
    </section>
  );
}

export default TransferForm;
