import './transferInformation.css';

const transferBenefits = [
  { icon: '⌑', tone: 'green', title: 'Secure Transfers', description: 'All transfers are encrypted and securely processed.' },
  { icon: 'ϟ', tone: 'gold', title: 'Typically Instant', description: 'Transfers between SecureFin users are usually instant.' },
  { icon: '%', tone: 'purple', title: 'Low Fees', description: 'Enjoy low transfer fees with transparent pricing.' },
  { icon: '▤', tone: 'blue', title: 'Transaction History', description: 'All your transfers are saved in your transaction history.' },
];

function TransferInformation() {
  return (
    <section className="transfer-panel transfer-information" aria-labelledby="transfer-information-title">
      <div className="information-heading">
        <span className="information-badge" aria-hidden="true">i</span>
        <h2 id="transfer-information-title">Transfer Information</h2>
      </div>
      <ul>
        {transferBenefits.map((benefit) => (
          <li key={benefit.title}>
            <span className={`benefit-icon benefit-${benefit.tone}`} aria-hidden="true">
              {benefit.icon}
            </span>
            <span>
              <strong>{benefit.title}</strong>
              <small>{benefit.description}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TransferInformation;
