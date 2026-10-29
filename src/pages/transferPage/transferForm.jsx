import './transferForm.css';

function TransferForm({
  beneficiaries,
  beneficiaryId,
  selectedBeneficiary,
  bankName,
  accountNumber,
  accountName,
  verificationMessage,
  amount,
  description,
  isReviewing,
  transferType,
  onTransferTypeChange,
  onBeneficiaryChange,
  onBankChange,
  onAccountNumberChange,
  onVerifyAccount,
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
            <dd>{bankName || selectedBeneficiary?.bank || '—'}</dd>
          </div>
          <div className="review-detail-row">
            <span className="review-detail-icon" aria-hidden="true">♙</span>
            <dt>Account Number</dt>
            <dd>{accountNumber || selectedBeneficiary?.account || '—'}</dd>
          </div>
          <div className="review-detail-row account-name-row">
            <span className="review-detail-icon" aria-hidden="true">♙</span>
            <dt>Account Name</dt>
            <dd>
              {accountName || selectedBeneficiary?.name || 'Not verified'}
              {accountName && <small className="verified-badge"><span aria-hidden="true">●</span> Account verified</small>}
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

  const matchingBeneficiaries = beneficiaries.filter(
    (beneficiary) => beneficiary.type === transferType,
  );
  const availableBanks = [...new Set(
    beneficiaries
      .filter((beneficiary) => beneficiary.type === 'bank')
      .map((beneficiary) => beneficiary.bank),
  )];

  return (
    <section className="transfer-card" aria-labelledby="transfer-form-title">
      <div className="transfer-card-heading">
        <h2 id="transfer-form-title">Transfer Money</h2>
        <p>Send money securely to other SecureFin users or external bank accounts.</p>
      </div>
      <form onSubmit={onReview}>
        <fieldset className="transfer-types">
          <legend>Transfer Type</legend>
          <label className={`transfer-type-option${transferType === 'user' ? ' selected' : ''}`}>
            <input
              type="radio"
              name="transfer-type"
              value="user"
              checked={transferType === 'user'}
              onChange={() => onTransferTypeChange('user')}
            />
            <span className="transfer-type-icon" aria-hidden="true">♙</span>
            <span>
              <strong>SecureFin User</strong>
              <small>Send to another SecureFin account</small>
            </span>
          </label>
          <label className={`transfer-type-option${transferType === 'bank' ? ' selected' : ''}`}>
            <input
              type="radio"
              name="transfer-type"
              value="bank"
              checked={transferType === 'bank'}
              onChange={() => onTransferTypeChange('bank')}
            />
            <span className="transfer-type-icon bank-icon" aria-hidden="true">▤</span>
            <span>
              <strong>External Bank</strong>
              <small>Send to another bank account</small>
            </span>
          </label>
        </fieldset>

        <div className="transfer-field">
          <label htmlFor="beneficiary">Beneficiary</label>
          <div className="icon-field-wrap">
            <span className="field-leading-icon search-field-icon" aria-hidden="true">⌕</span>
            <select
              id="beneficiary"
              value={beneficiaryId}
              onChange={(event) => onBeneficiaryChange(event.target.value)}
            >
              <option value="">
                {matchingBeneficiaries.length
                  ? 'Search existing beneficiary (optional)'
                  : 'No matching beneficiaries'}
              </option>
              {matchingBeneficiaries.map((beneficiary) => (
                <option key={beneficiary.id} value={beneficiary.id}>
                  {beneficiary.name} · {beneficiary.bank} · {beneficiary.account}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="transfer-or-divider"><span>OR</span></div>

        {transferType === 'bank' && (
          <div className="transfer-field">
            <label htmlFor="bank-name">Select Bank</label>
            <div className="icon-field-wrap">
              <span className="field-leading-icon" aria-hidden="true">▤</span>
              <select
                id="bank-name"
                value={bankName}
                onChange={(event) => onBankChange(event.target.value)}
                required
              >
                <option value="">Select bank</option>
                {availableBanks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="transfer-field">
          <label htmlFor="account-number">Account Number</label>
          <div className="account-number-row">
            <div className="icon-field-wrap">
              <span className="field-leading-icon" aria-hidden="true">♙</span>
              <input
                id="account-number"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter 10-digit account number"
                value={accountNumber}
                onChange={(event) => onAccountNumberChange(event.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <button type="button" className="verify-account-button" onClick={onVerifyAccount}>
              Verify
            </button>
          </div>
        </div>

        <div className="transfer-field">
          <label htmlFor="account-name">Account Name</label>
          <div className="icon-field-wrap account-name-wrap">
            <span className="field-leading-icon" aria-hidden="true">♙</span>
            <input
              id="account-name"
              type="text"
              placeholder="Account name will appear here"
              value={accountName}
              readOnly
            />
          </div>
          {verificationMessage && <small className="verification-message" role="status">{verificationMessage}</small>}
        </div>

        <div className="transfer-field-grid">
          <div className="transfer-field amount-field">
            <label htmlFor="amount">Amount</label>
            <div className="icon-field-wrap amount-input-wrap">
              <span className="field-leading-icon" aria-hidden="true">₦</span>
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
            <small className="available-balance">Available balance: ₦250,000.00</small>
          </div>

          <div className="transfer-field description-field">
            <label htmlFor="description">Description (Optional)</label>
            <div className="icon-field-wrap">
              <span className="field-leading-icon" aria-hidden="true">▤</span>
              <input
                id="description"
                type="text"
                maxLength="100"
                placeholder="e.g. Payment for services"
                value={description}
                onChange={(event) => onDescriptionChange(event.target.value)}
              />
            </div>
            <small className="character-count">{description.length}/100</small>
          </div>
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
