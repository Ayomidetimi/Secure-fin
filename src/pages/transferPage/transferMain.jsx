import { useState } from 'react';
import RecentRecipients from './recentRecipients.jsx';
import TransferForm from './transferForm.jsx';
import TransferInformation from './transferInformation.jsx';
import './transferMain.css';

const beneficiaries = [
  { id: 'john', name: 'John Doe', bank: 'Access Bank', account: '0123456789', initials: 'JD', color: 'purple', type: 'bank' },
  { id: 'mike', name: 'Mike Johnson', bank: 'GTBank', account: '0987654321', initials: 'MJ', color: 'pink', type: 'bank' },
  { id: 'emma', name: 'Emma Smith', bank: 'Zenith Bank', account: '0234567891', initials: 'ES', color: 'blue', type: 'bank' },
  { id: 'jane', name: 'Jane Smith', bank: 'SecureFin', account: '1234567890', initials: 'JS', color: 'green', type: 'user' },
];

function TransferMain({ beneficiarySearch }) {
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [transferType, setTransferType] = useState('user');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const selectedBeneficiary = beneficiaries.find(
    (beneficiary) => beneficiary.id === beneficiaryId,
  );
  const normalizedSearch = beneficiarySearch.trim().toLocaleLowerCase();
  const searchedBeneficiaries = beneficiaries.filter((beneficiary) =>
    [beneficiary.name, beneficiary.bank, beneficiary.account]
      .some((value) => value.toLocaleLowerCase().includes(normalizedSearch)),
  );

  const reviewTransfer = (event) => {
    event.preventDefault();
    setIsReviewing(true);
  };

  const selectBeneficiary = (id) => {
    setBeneficiaryId(id);
    const beneficiary = beneficiaries.find((item) => item.id === id);
    if (beneficiary) {
      setTransferType(beneficiary.type);
      setBankName(beneficiary.bank);
      setAccountNumber(beneficiary.account);
      setAccountName(beneficiary.name);
    } else {
      setBankName('');
      setAccountNumber('');
      setAccountName('');
    }
    setVerificationMessage('');
    setIsReviewing(false);
    setConfirmationMessage('');
  };

  const changeTransferType = (type) => {
    setTransferType(type);
    setBeneficiaryId('');
    setBankName('');
    setAccountNumber('');
    setAccountName('');
    setVerificationMessage('');
    setIsReviewing(false);
    setConfirmationMessage('');
  };

  const verifyAccount = () => {
    const matchedBeneficiary = beneficiaries.find(
      (beneficiary) => beneficiary.bank === bankName && beneficiary.account === accountNumber,
    );
    if (matchedBeneficiary) {
      setAccountName(matchedBeneficiary.name);
      setVerificationMessage('Account verified');
    } else {
      setAccountName('');
      setVerificationMessage('Account verification is not available for this account.');
    }
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
          beneficiaries={searchedBeneficiaries}
          beneficiaryId={beneficiaryId}
          selectedBeneficiary={selectedBeneficiary}
          bankName={bankName}
          accountNumber={accountNumber}
          accountName={accountName}
          verificationMessage={verificationMessage}
          amount={amount}
          description={description}
          isReviewing={isReviewing}
          transferType={transferType}
          onTransferTypeChange={changeTransferType}
          onBeneficiaryChange={selectBeneficiary}
          onBankChange={(value) => {
            setBankName(value);
            setAccountName('');
            setVerificationMessage('');
          }}
          onAccountNumberChange={(value) => {
            setAccountNumber(value);
            setAccountName('');
            setVerificationMessage('');
          }}
          onVerifyAccount={verifyAccount}
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
              beneficiaries={searchedBeneficiaries}
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
