import './transferInformation.css';

const transferBenefits = [
  { icon: '⌑', tone: 'green', title: 'Secure Transfers', description: 'All transfers are encrypted and securely processed.' },
  { icon: 'ϟ', tone: 'gold', title: 'Typically Instant', description: 'Transfers between SecureFin users are usually instant.' },
  { icon: '%', tone: 'purple', title: 'Low Fees', description: 'Enjoy low transfer fees with transparent pricing.' },
  { icon: '▤', tone: 'blue', title: 'Transaction History', description: 'All your transfers are saved in your transaction history.' },
];

const reviewDescriptions = [
  'All transfers are encrypted and securely processed.',
  'Transfers are usually instant between SecureFin users.',
  'Enjoy low transfer fees with transparent pricing.',
  'You will receive a notification once the transfer is completed.',
];

function TransferInformation({ isReviewing = false }) {
  return (
    <section className="transfer-panel transfer-information" aria-labelledby="transfer-information-title">
      <div className="information-heading">
        <span className="information-badge" aria-hidden="true">{isReviewing ? '⬟' : 'i'}</span>
        <h2 id="transfer-information-title">{isReviewing ? 'Security Notice' : 'Transfer Information'}</h2>
      </div>
      <ul>
        {transferBenefits.map((benefit, index) => (
          <li key={benefit.title}>
            <span className={`benefit-icon benefit-${benefit.tone}`} aria-hidden="true">
              {benefit.icon}
            </span>
            <span>
              {!isReviewing && <strong>{benefit.title}</strong>}
              <small>
                {isReviewing ? reviewDescriptions[index] : benefit.description}
              </small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TransferInformation;
