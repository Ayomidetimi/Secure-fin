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
    return (
      <section className="transfer-card" aria-labelledby="transfer-form-title">
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
            <dt>Transfer type</dt>
            <dd>{selectedBeneficiary?.type === 'user' ? 'SecureFin User' : 'External Bank'}</dd>
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
            <dt>Note</dt>
            <dd>{description || 'No note added'}</dd>
          </div>
        </dl>
        <p className="review-notice">This is a preview. No money has been sent.</p>
        <button className="transfer-submit transfer-secondary-action" type="button" onClick={onEdit}>
          Edit transfer
        </button>
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
          <legend>Transfer to Type</legend>
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
          <label htmlFor="beneficiary">Recipient</label>
          <select
            id="beneficiary"
            value={beneficiaryId}
            onChange={(event) => onBeneficiaryChange(event.target.value)}
            required
          >
            <option value="">
              {transferType === 'user' ? 'Select a SecureFin user' : 'Select a bank recipient'}
            </option>
            {visibleBeneficiaries.map((beneficiary) => (
              <option key={beneficiary.id} value={beneficiary.id}>
                {beneficiary.name} · {beneficiary.bank} · {beneficiary.account}
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
