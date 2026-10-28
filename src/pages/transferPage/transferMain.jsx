import { useState } from 'react';
import RecentRecipients from './recentRecipients.jsx';
import TransferForm from './transferForm.jsx';
import TransferInformation from './transferInformation.jsx';
import './transferMain.css';

const beneficiaries = [
  { id: 'amara', name: 'Amara Okafor', bank: 'Access Bank', account: '0123456789', initials: 'AO', color: 'purple', type: 'bank' },
  { id: 'tunde', name: 'Tunde Bello', bank: 'GTBank', account: '0987654321', initials: 'TB', color: 'green', type: 'bank' },
  { id: 'zainab', name: 'Zainab Musa', bank: 'Zenith Bank', account: '0234567891', initials: 'ZM', color: 'blue', type: 'bank' },
  { id: 'sarah', name: 'Sarah Johnson', bank: 'SecureFin', account: '1234567890', initials: 'SJ', color: 'orange', type: 'user' },
];

function TransferMain() {
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [transferType, setTransferType] = useState('user');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const selectedBeneficiary = beneficiaries.find(
    (beneficiary) => beneficiary.id === beneficiaryId,
  );

  const reviewTransfer = (event) => {
    event.preventDefault();
    setIsReviewing(true);
  };

  const selectBeneficiary = (id) => {
    setBeneficiaryId(id);
    const beneficiary = beneficiaries.find((item) => item.id === id);
    if (beneficiary) setTransferType(beneficiary.type);
    setIsReviewing(false);
    setConfirmationMessage('');
  };

  const changeTransferType = (type) => {
    setTransferType(type);
    setBeneficiaryId('');
    setIsReviewing(false);
    setConfirmationMessage('');
  };

  const cancelReview = () => {
    setIsReviewing(false);
    setConfirmationMessage('');
  };

  return (
    <main className={`transfer-main${isReviewing ? ' transfer-main-review' : ''}`}>
      {isReviewing && (
        <div className="review-page-heading">
          <button type="button" className="review-back" onClick={cancelReview}>
            <span aria-hidden="true">←</span> Back
          </button>
          <h1>Review Transfer</h1>
          <p>Please confirm the details below before completing your transfer.</p>
        </div>
      )}
      <div className={`transfer-content${isReviewing ? ' review-content' : ''}`}>
        <TransferForm
          beneficiaries={beneficiaries}
          beneficiaryId={beneficiaryId}
          selectedBeneficiary={selectedBeneficiary}
          amount={amount}
          description={description}
          isReviewing={isReviewing}
          transferType={transferType}
          onTransferTypeChange={changeTransferType}
          onBeneficiaryChange={selectBeneficiary}
          onAmountChange={setAmount}
          onDescriptionChange={setDescription}
          onReview={reviewTransfer}
          onEdit={cancelReview}
        />
        {isReviewing ? (
          <div className="transfer-aside review-aside">
            <section className="transfer-panel paying-from" aria-labelledby="paying-from-title">
              <div className="paying-from-heading">
                <h2 id="paying-from-title">Paying From</h2>
                <button type="button" onClick={cancelReview}>Edit</button>
              </div>
              <div className="paying-from-account">
                <span className="paying-from-icon" aria-hidden="true">▣</span>
                <span className="paying-from-name">
                  <strong>Main Account</strong>
                  <small>Available balance</small>
                </span>
                <span className="paying-from-balance">
                  <strong>₦12,450.75</strong>
                  <small>•••• 6789</small>
                </span>
              </div>
            </section>
            <TransferInformation isReviewing />
          </div>
        ) : (
          <div className="transfer-aside">
            <RecentRecipients
              beneficiaries={beneficiaries}
              beneficiaryId={beneficiaryId}
              onSelect={selectBeneficiary}
            />
            <TransferInformation />
          </div>
        )}
      </div>
      {isReviewing && (
        <div className="review-actions">
          <button type="button" className="review-cancel" onClick={cancelReview}>
            Cancel
          </button>
          <button
            type="button"
            className="review-confirm"
            onClick={() => setConfirmationMessage('Transfer confirmation is not available yet. No money has been sent.')}
          >
            <span aria-hidden="true">↗</span> Confirm Transfer
          </button>
          {confirmationMessage && (
            <p className="review-confirmation-message" role="status" aria-live="polite">
              {confirmationMessage}
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default TransferMain;
