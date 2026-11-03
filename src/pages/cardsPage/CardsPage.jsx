import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import './cardsPage.css';

const cardActivity = [
  { merchant: 'Amazon Prime', date: 'Today, 10:42 AM', amount: '-₦8,500.00', category: 'Shopping' },
  { merchant: 'Uber', date: 'Yesterday, 6:18 PM', amount: '-₦4,200.00', category: 'Transport' },
  { merchant: 'Netflix', date: 'Oct 28, 9:05 AM', amount: '-₦4,400.00', category: 'Entertainment' },
];

function CardsPage() {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="dashboard-container cards-page">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>

      <main className="main-container cards-content">
        <header className="cards-page-heading">
          <div>
            <p className="cards-eyebrow">YOUR FINANCES</p>
            <h1>Cards</h1>
            <p className="cards-subtitle">Manage your cards and keep track of your spending.</p>
          </div>
          <span className="cards-count">1 active card</span>
        </header>

        <section className="cards-overview" aria-label="Card overview">
          <article className={`payment-card${isFrozen ? ' payment-card-frozen' : ''}`}>
            <div className="payment-card-top">
              <span className="payment-card-chip" aria-hidden="true">
                <span />
              </span>
              <span className="payment-card-type">VISA</span>
            </div>
            <p className="payment-card-label">SECUREFIN DEBIT</p>
            <p className="payment-card-number">
              {showDetails ? '5399 1234 5678 4821' : '••••  ••••  ••••  4821'}
            </p>
            <div className="payment-card-bottom">
              <div>
                <span className="payment-card-caption">CARD HOLDER</span>
                <span className="payment-card-value">ABDUL RAHMAN</span>
              </div>
              <div>
                <span className="payment-card-caption">EXPIRES</span>
                <span className="payment-card-value">12/28</span>
              </div>
              <span className="payment-card-mark" aria-hidden="true">
                <i />
                <i />
              </span>
            </div>
            {isFrozen && (
              <div className="payment-card-frozen-label">
                <span aria-hidden="true">❄</span> Card frozen
              </div>
            )}
          </article>

          <div className="card-controls">
            <div className="card-controls-heading">
              <div>
                <p className="cards-eyebrow">PRIMARY CARD</p>
                <h2>Everyday card</h2>
                <p className="card-status">
                  <span className={isFrozen ? 'status-dot status-dot-frozen' : 'status-dot'} />
                  {isFrozen ? 'Frozen' : 'Active'} · Virtual debit
                </p>
              </div>
              <span className="card-network">VISA</span>
            </div>
            <div className="card-actions">
              <button
                className="card-action-button"
                type="button"
                onClick={() => setShowDetails((current) => !current)}
                aria-pressed={showDetails}
              >
                <span aria-hidden="true">{showDetails ? '◉' : '◎'}</span>
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
              <button
                className={`card-action-button${isFrozen ? ' card-action-unfreeze' : ' card-action-freeze'}`}
                type="button"
                onClick={() => setIsFrozen((current) => !current)}
                aria-pressed={isFrozen}
              >
                <span aria-hidden="true">{isFrozen ? '↻' : '❄'}</span>
                {isFrozen ? 'Unfreeze card' : 'Freeze card'}
              </button>
            </div>
            {showDetails && (
              <p className="card-details-note" role="status">
                Demo card details are shown for preview only.
              </p>
            )}
          </div>
        </section>

        <section className="spending-section" aria-labelledby="spending-title">
          <div className="section-heading">
            <div>
              <p className="cards-eyebrow">THIS MONTH</p>
              <h2 id="spending-title">Card spending</h2>
            </div>
            <span className="spending-period">November 2026</span>
          </div>
          <div className="spending-summary">
            <div>
              <span className="spending-caption">Total spent</span>
              <p className="spending-total">₦42,850.00</p>
            </div>
            <div className="spending-limit">
              <div className="spending-limit-label">
                <span>Monthly limit</span>
                <span>₦42,850 <span className="spending-limit-of">of ₦150,000</span></span>
              </div>
              <div
                className="spending-progress"
                role="progressbar"
                aria-label="Monthly card spending"
                aria-valuenow="29"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span />
              </div>
              <span className="spending-remaining">₦107,150 remaining</span>
            </div>
          </div>
        </section>

        <section className="card-activity-section" aria-labelledby="activity-title">
          <div className="section-heading">
            <div>
              <p className="cards-eyebrow">YOUR CARD</p>
              <h2 id="activity-title">Recent activity</h2>
            </div>
            <Link to="/transactions" className="card-activity-link">View all transactions</Link>
          </div>
          <div className="card-activity-list">
            {cardActivity.map((item) => (
              <article className="card-activity-item" key={item.merchant}>
                <span className="activity-avatar" aria-hidden="true">{item.merchant.charAt(0)}</span>
                <div className="activity-description">
                  <p>{item.merchant}</p>
                  <span>{item.date} · {item.category}</span>
                </div>
                <span className="activity-amount">{item.amount}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CardsPage;
