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
  };

  const changeTransferType = (type) => {
    setTransferType(type);
    setBeneficiaryId('');
    setIsReviewing(false);
  };

  return (
    <main className="transfer-main">
      <div className="transfer-content">
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
          onEdit={() => setIsReviewing(false)}
        />
        <div className="transfer-aside">
          <RecentRecipients
            beneficiaries={beneficiaries}
            beneficiaryId={beneficiaryId}
            onSelect={selectBeneficiary}
          />
          <TransferInformation />
        </div>
      </div>
    </main>
  );
}

export default TransferMain;
