import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import CardVisual from './CardVisual.jsx';
import BackToDashboard from '../../components/BackToDashboard.jsx';
import './cardsPage.css';

const cardActivity = [
  { merchant: 'Amazon Prime', date: 'Today, 10:42 AM', amount: '-₦8,500.00', category: 'Shopping' },
  { merchant: 'Uber', date: 'Yesterday, 6:18 PM', amount: '-₦4,200.00', category: 'Transport' },
  { merchant: 'Netflix', date: 'Oct 28, 9:05 AM', amount: '-₦4,400.00', category: 'Entertainment' },
];

const cardActions = [
  { id: 'details', label: 'Details', description: 'View card information', icon: '••' },
  { id: 'settings', label: 'Card settings', description: 'Manage limits and payments', icon: '⚙' },
  { id: 'customize', label: 'Customize card', description: 'Choose a name and color', icon: '◈' },
  { id: 'transactions', label: 'Transactions', description: 'Review recent activity', icon: '↗' },
];

function CardsPage() {
  const [activeSection, setActiveSection] = useState(null);
  const cardDetailsDialogRef = useRef(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cardName, setCardName] = useState('Everyday card');
  const [cardTheme, setCardTheme] = useState('violet');
  const [monthlyLimit, setMonthlyLimit] = useState(150000);
  const [limitInput, setLimitInput] = useState('150000');
  const [limitError, setLimitError] = useState('');
  const [limitSaved, setLimitSaved] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    online: true,
    contactless: true,
    atm: true,
  });
  const monthlySpent = 42850;
  const spendingProgress = Math.min(100, Math.round((monthlySpent / monthlyLimit) * 100));
  const remainingAmount = Math.max(0, monthlyLimit - monthlySpent);

  useEffect(() => {
    if (activeSection === 'details' && cardDetailsDialogRef.current && !cardDetailsDialogRef.current.open) {
      cardDetailsDialogRef.current.showModal();
    }
  }, [activeSection]);

  function saveMonthlyLimit(event) {
    event.preventDefault();
    const newLimit = Number(limitInput);
    if (!Number.isFinite(newLimit) || newLimit <= 0) {
      setLimitError('Enter a monthly limit greater than zero.');
      setLimitSaved(false);
      return;
    }

    setMonthlyLimit(newLimit);
    setLimitInput(String(newLimit));
    setLimitError('');
    setLimitSaved(true);
  }

  function togglePaymentSetting(setting) {
    setPaymentSettings((current) => ({ ...current, [setting]: !current[setting] }));
  }

  return (
    <div className="dashboard-container cards-page">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>

      <main className="main-container cards-content">
        <BackToDashboard />
        <header className="cards-page-heading">
          <div>
            <p className="cards-eyebrow">YOUR FINANCES</p>
            <h1>Cards</h1>
            <p className="cards-subtitle">Manage your cards and keep track of your spending.</p>
          </div>
          <span className="cards-count">1 active card</span>
        </header>

        {!activeSection && (
          <section className="card-preview-section" aria-label="Card preview">
            <header className="card-preview-heading">
              <div>
                <p className="cards-eyebrow">YOUR SECUREFIN CARD</p>
                <h2>{cardName}</h2>
              </div>
              <span className="card-type-badge"><span /> Virtual debit</span>
            </header>
            <CardVisual theme={cardTheme} frozen={isFrozen} />
            <nav className="card-action-grid" aria-label="Card actions">
              {cardActions.map((action) => (
                <button
                  className="card-action-tile"
                  type="button"
                  key={action.id}
                  onClick={() => setActiveSection(action.id)}
                >
                  <span className={`card-action-icon card-action-icon-${action.id}`} aria-hidden="true">
                    {action.icon}
                  </span>
                  <span className="card-action-copy">
                    <strong>{action.label}</strong>
                    <small>{action.description}</small>
                  </span>
                  <span className="card-action-arrow" aria-hidden="true">›</span>
                </button>
              ))}
            </nav>
          </section>
        )}

        {activeSection === 'details' && (
          <dialog
            ref={cardDetailsDialogRef}
            className="card-details-dialog"
            aria-labelledby="card-details-dialog-title"
            onClose={() => setActiveSection(null)}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                event.currentTarget.close();
              }
            }}
          >
            <header className="card-details-dialog-heading">
              <h2 id="card-details-dialog-title">Card details</h2>
              <button
                className="card-details-close"
                type="button"
                aria-label="Close card details"
                onClick={() => cardDetailsDialogRef.current?.close()}
              >
                ×
              </button>
            </header>
        <section className="cards-overview" aria-label="Card overview">
          <CardVisual variant="details" theme={cardTheme} frozen={isFrozen} showDetails={showDetails} />

          <div className="card-controls">
            <div className="card-controls-heading">
              <div>
                <p className="cards-eyebrow">PRIMARY CARD</p>
                <h2>{cardName}</h2>
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
                <span>₦42,850 <span className="spending-limit-of">of ₦{monthlyLimit.toLocaleString('en-NG')}</span></span>
              </div>
              <div
                className="spending-progress"
                role="progressbar"
                aria-label="Monthly card spending"
                aria-valuenow={spendingProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span style={{ width: `${spendingProgress}%` }} />
              </div>
              <span className="spending-remaining">₦{remainingAmount.toLocaleString('en-NG')} remaining</span>
            </div>
          </div>
        </section>
          </dialog>
        )}

        {activeSection === 'settings' && (
        <section className="card-settings-section" aria-labelledby="card-settings-title">
          <div className="section-heading">
            <div>
              <p className="cards-eyebrow">MANAGE CARD</p>
              <h2 id="card-settings-title">Card settings</h2>
            </div>
          </div>

          <form className="card-limit-form" onSubmit={saveMonthlyLimit} noValidate>
            <div className="card-setting-copy">
              <label htmlFor="monthly-card-limit">Monthly spending limit</label>
              <span>Set the maximum amount you can spend with this card each month.</span>
            </div>
            <div className="card-limit-controls">
              <div className="card-limit-input-wrap">
                <span aria-hidden="true">₦</span>
                <input
                  id="monthly-card-limit"
                  name="monthlyLimit"
                  type="number"
                  min="1"
                  step="1000"
                  inputMode="numeric"
                  value={limitInput}
                  onChange={(event) => {
                    setLimitInput(event.target.value);
                    setLimitError('');
                    setLimitSaved(false);
                  }}
                  aria-invalid={Boolean(limitError)}
                  aria-describedby={limitError ? 'monthly-limit-error' : undefined}
                />
              </div>
              <button className="card-limit-save" type="submit">Save limit</button>
            </div>
            {limitError && <p className="card-limit-message card-limit-error" id="monthly-limit-error" role="alert">{limitError}</p>}
            {limitSaved && <p className="card-limit-message" role="status">Monthly spending limit updated.</p>}
          </form>

          <div className="card-payment-settings">
            {[
              { key: 'online', title: 'Online payments', description: 'Allow purchases on websites and apps.' },
              { key: 'contactless', title: 'Contactless payments', description: 'Allow tap-to-pay purchases in stores.' },
              { key: 'atm', title: 'ATM withdrawals', description: 'Allow cash withdrawals at ATMs.' },
            ].map((setting) => (
              <div className="card-setting-row" key={setting.key}>
                <div className="card-setting-copy">
                  <span className="card-setting-title">{setting.title}</span>
                  <span>{setting.description}</span>
                </div>
                <button
                  className={`card-setting-switch${paymentSettings[setting.key] ? ' card-setting-switch-on' : ''}`}
                  type="button"
                  role="switch"
                  aria-checked={paymentSettings[setting.key]}
                  aria-label={setting.title}
                  onClick={() => togglePaymentSetting(setting.key)}
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
          <p className="card-settings-note">Settings apply to this demo card for this session.</p>
        </section>
        )}

        {activeSection === 'customize' && (
          <section className="card-customize-section" aria-labelledby="customize-card-title">
            <div className="section-heading">
              <div>
                <p className="cards-eyebrow">MAKE IT YOURS</p>
                <h2 id="customize-card-title">Customize card</h2>
              </div>
            </div>
            <label className="card-customize-name" htmlFor="card-nickname">
              Card name
              <input
                id="card-nickname"
                type="text"
                maxLength="24"
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                placeholder="Give your card a name"
              />
            </label>
            <div className="card-theme-picker">
              <span className="card-theme-label">Card color</span>
              <div className="card-theme-options" role="group" aria-label="Card color">
                {[
                  { id: 'violet', label: 'Violet' },
                  { id: 'emerald', label: 'Emerald' },
                  { id: 'ocean', label: 'Ocean' },
                  { id: 'sunset', label: 'Sunset' },
                  { id: 'midnight', label: 'Midnight' },
                ].map((theme) => (
                  <button
                    className={`card-theme-option card-theme-option-${theme.id}${cardTheme === theme.id ? ' card-theme-option-selected' : ''}`}
                    type="button"
                    key={theme.id}
                    aria-pressed={cardTheme === theme.id}
                    onClick={() => setCardTheme(theme.id)}
                  >
                    <span className="card-theme-swatch" aria-hidden="true" />
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="card-settings-note">Your changes update the card preview immediately and last for this session.</p>
          </section>
        )}

        {activeSection === 'transactions' && (
        <section className="card-activity-section" aria-labelledby="activity-title">
          <div className="section-heading">
            <div>
              <p className="cards-eyebrow">YOUR CARD</p>
              <h2 id="activity-title">Transactions</h2>
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
        )}

      </main>
    </div>
  );
}

export default CardsPage;
