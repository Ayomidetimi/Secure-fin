import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSideBar from '../dashboardpage/dashboardSideBar.jsx';
import TransferHeader from '../transferPage/transferHeader.jsx';
import './beneficiariesPage.css';

const initialBeneficiaries = [
  { id: 1, name: 'John Doe', bank: 'Access Bank', account: '0123456789', favorite: true, color: 'violet' },
  { id: 2, name: 'Mike Johnson', bank: 'GTBank', account: '0987654321', favorite: true, color: 'blue' },
  { id: 3, name: 'Emma Smith', bank: 'Zenith Bank', account: '0234567891', favorite: false, color: 'pink' },
  { id: 4, name: 'Jane Smith', bank: 'SecureFin', account: '1234567890', favorite: false, color: 'green' },
];

const banks = ['Access Bank', 'First Bank', 'GTBank', 'UBA', 'Zenith Bank', 'SecureFin', 'Other'];

function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [pendingDeletion, setPendingDeletion] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const formDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (isFormOpen && formDialogRef.current && !formDialogRef.current.open) {
      formDialogRef.current.showModal();
    }
  }, [isFormOpen]);

  useEffect(() => {
    if (pendingDeletion && deleteDialogRef.current && !deleteDialogRef.current.open) {
      deleteDialogRef.current.showModal();
    }
  }, [pendingDeletion]);

  const favoriteCount = beneficiaries.filter((beneficiary) => beneficiary.favorite).length;
  const visibleBeneficiaries = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return beneficiaries.filter((beneficiary) => {
      const matchesFilter = filter === 'all' || beneficiary.favorite;
      const matchesSearch = [beneficiary.name, beneficiary.bank, beneficiary.account]
        .some((value) => value.toLocaleLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [beneficiaries, filter, search]);

  function openForm(beneficiary = null) {
    setEditingBeneficiary(beneficiary);
    setName(beneficiary?.name ?? '');
    setBank(beneficiary?.bank ?? '');
    setAccount(beneficiary?.account ?? '');
    setFormError('');
    setIsFormOpen(true);
  }

  function closeForm() {
    formDialogRef.current?.close();
  }

  function saveBeneficiary(event) {
    event.preventDefault();
    if (!name.trim()) {
      setFormError('Enter the beneficiary’s name.');
      return;
    }

    const duplicate = beneficiaries.some((item) =>
      item.account === account && item.id !== editingBeneficiary?.id,
    );
    if (duplicate) {
      setFormError('A beneficiary with this account number already exists.');
      return;
    }

    if (editingBeneficiary) {
      setBeneficiaries((current) => current.map((item) => item.id === editingBeneficiary.id
        ? { ...item, name: name.trim(), bank, account }
        : item));
      setNotice(`${name.trim()} was updated.`);
    } else {
      setBeneficiaries((current) => [
        ...current,
        {
          id: Date.now(),
          name: name.trim(),
          bank,
          account,
          favorite: false,
          color: ['violet', 'blue', 'pink', 'green'][current.length % 4],
        },
      ]);
      setNotice(`${name.trim()} was added to your beneficiaries.`);
    }
    setIsFormOpen(false);
    formDialogRef.current?.close();
  }

  function toggleFavorite(id) {
    setBeneficiaries((current) => current.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item,
    ));
  }

  function deleteBeneficiary() {
    if (!pendingDeletion) return;
    setBeneficiaries((current) => current.filter((item) => item.id !== pendingDeletion.id));
    setNotice(`${pendingDeletion.name} was removed.`);
    setPendingDeletion(null);
    deleteDialogRef.current?.close();
  }

  return (
    <div className="dashboard-container beneficiaries-page">
      <aside className="app-sidebar-shell">
        <DashboardSideBar />
      </aside>
      <div className="beneficiaries-workspace">
        <TransferHeader
          beneficiarySearch={search}
          onBeneficiarySearchChange={setSearch}
          showBackButton
        />
        <main className="beneficiaries-content">
          <header className="beneficiaries-heading">
            <div>
              <p className="beneficiaries-eyebrow">PAYMENTS</p>
              <h1>Beneficiaries</h1>
              <p className="beneficiaries-subtitle">
                Keep your trusted people close for quick, easy transfers.
              </p>
            </div>
            <button className="beneficiary-primary-button" type="button" onClick={() => openForm()}>
              <span aria-hidden="true">＋</span> Add beneficiary
            </button>
          </header>

          <section className="beneficiaries-overview" aria-label="Beneficiary summary">
            <div className="beneficiaries-overview-copy">
              <span className="beneficiaries-overview-icon" aria-hidden="true">↗</span>
              <div>
                <strong>Your transfers, made simpler</strong>
                <p>Save the people you pay often and find them here whenever you need them.</p>
              </div>
            </div>
            <div className="beneficiaries-overview-stats">
              <span><strong>{beneficiaries.length.toString().padStart(2, '0')}</strong> saved</span>
              <span className="beneficiaries-stat-divider" aria-hidden="true" />
              <span><strong>{favoriteCount.toString().padStart(2, '0')}</strong> favorites</span>
            </div>
          </section>

          <section className="beneficiary-list-section" aria-labelledby="beneficiary-list-title">
            <div className="beneficiary-list-heading">
              <div>
                <h2 id="beneficiary-list-title">Your beneficiaries</h2>
                <p>{visibleBeneficiaries.length} {visibleBeneficiaries.length === 1 ? 'person' : 'people'}</p>
              </div>
              <div className="beneficiary-filters" role="group" aria-label="Filter beneficiaries">
                <button
                  type="button"
                  className={filter === 'all' ? 'beneficiary-filter active' : 'beneficiary-filter'}
                  aria-pressed={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={filter === 'favorites' ? 'beneficiary-filter active' : 'beneficiary-filter'}
                  aria-pressed={filter === 'favorites'}
                  onClick={() => setFilter('favorites')}
                >
                  <span aria-hidden="true">★</span> Favorites
                </button>
              </div>
            </div>

            {notice && (
              <p className="beneficiary-notice" role="status">
                {notice}
                <button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button>
              </p>
            )}

            {visibleBeneficiaries.length > 0 ? (
              <div className="beneficiary-grid">
                {visibleBeneficiaries.map((beneficiary) => (
                  <article className="beneficiary-card" key={beneficiary.id}>
                    <div className="beneficiary-card-top">
                      <span className={`beneficiary-avatar beneficiary-avatar-${beneficiary.color}`} aria-hidden="true">
                        {beneficiary.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                      </span>
                      <div className="beneficiary-identity">
                        <h3>{beneficiary.name}</h3>
                        <span>{beneficiary.bank}</span>
                      </div>
                      <button
                        className={`beneficiary-favorite${beneficiary.favorite ? ' is-favorite' : ''}`}
                        type="button"
                        aria-label={beneficiary.favorite ? `Remove ${beneficiary.name} from favorites` : `Add ${beneficiary.name} to favorites`}
                        aria-pressed={beneficiary.favorite}
                        onClick={() => toggleFavorite(beneficiary.id)}
                      >
                        {beneficiary.favorite ? '★' : '☆'}
                      </button>
                    </div>
                    <div className="beneficiary-account">
                      <span>ACCOUNT NUMBER</span>
                      <strong>{beneficiary.account}</strong>
                    </div>
                    <div className="beneficiary-card-actions">
                      <Link className="beneficiary-send-button" to="/transfer">
                        Send money <span aria-hidden="true">↗</span>
                      </Link>
                      <button type="button" onClick={() => openForm(beneficiary)}>Edit</button>
                      <button
                        type="button"
                        aria-label={`Remove ${beneficiary.name}`}
                        onClick={() => setPendingDeletion(beneficiary)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="beneficiaries-empty">
                <span aria-hidden="true">{filter === 'favorites' ? '☆' : '⌕'}</span>
                <h3>{filter === 'favorites' ? 'No favorites yet' : 'No beneficiaries found'}</h3>
                <p>
                  {filter === 'favorites'
                    ? 'Mark someone as a favorite to keep them close at hand.'
                    : search
                      ? 'Try another name, bank, or account number.'
                      : 'Add someone you pay often to make your next transfer quicker.'}
                </p>
                {filter === 'all' && !search && (
                  <button className="beneficiary-primary-button" type="button" onClick={() => openForm()}>
                    Add your first beneficiary
                  </button>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      <dialog
        className="beneficiary-dialog"
        ref={formDialogRef}
        aria-labelledby="beneficiary-dialog-title"
        onClose={() => {
          setIsFormOpen(false);
          setEditingBeneficiary(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeForm();
        }}
      >
        <form className="beneficiary-dialog-form" onSubmit={saveBeneficiary}>
          <div className="beneficiary-dialog-heading">
            <div>
              <p className="beneficiaries-eyebrow">{editingBeneficiary ? 'UPDATE DETAILS' : 'NEW CONTACT'}</p>
              <h2 id="beneficiary-dialog-title">{editingBeneficiary ? 'Edit beneficiary' : 'Add beneficiary'}</h2>
            </div>
            <button className="beneficiary-dialog-close" type="button" aria-label="Close" onClick={closeForm}>×</button>
          </div>
          <label>
            Full name
            <input
              autoComplete="name"
              maxLength={70}
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Alex Johnson"
            />
          </label>
          <label>
            Bank
            <select required value={bank} onChange={(event) => setBank(event.target.value)}>
              <option value="" disabled>Select a bank</option>
              {banks.map((bankName) => <option key={bankName} value={bankName}>{bankName}</option>)}
            </select>
          </label>
          <label>
            Account number
            <input
              inputMode="numeric"
              pattern="[0-9]{10}"
              required
              title="Enter a 10-digit account number."
              value={account}
              onChange={(event) => setAccount(event.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit account number"
            />
          </label>
          {formError && <p className="beneficiary-form-error" role="alert">{formError}</p>}
          <div className="beneficiary-dialog-actions">
            <button className="beneficiary-cancel-button" type="button" onClick={closeForm}>Cancel</button>
            <button className="beneficiary-primary-button" type="submit">
              {editingBeneficiary ? 'Save changes' : 'Add beneficiary'}
            </button>
          </div>
        </form>
      </dialog>

      <dialog
        className="beneficiary-dialog beneficiary-delete-dialog"
        ref={deleteDialogRef}
        aria-labelledby="delete-beneficiary-title"
        onClose={() => setPendingDeletion(null)}
      >
        <div className="beneficiary-dialog-form">
          <div className="beneficiary-dialog-heading">
            <div>
              <p className="beneficiaries-eyebrow">REMOVE CONTACT</p>
              <h2 id="delete-beneficiary-title">Remove beneficiary?</h2>
            </div>
            <button
              className="beneficiary-dialog-close"
              type="button"
              aria-label="Close"
              onClick={() => deleteDialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <p className="beneficiary-delete-copy">
            {pendingDeletion?.name} will be removed from your saved beneficiaries.
          </p>
          <div className="beneficiary-dialog-actions">
            <button
              className="beneficiary-cancel-button"
              type="button"
              onClick={() => deleteDialogRef.current?.close()}
            >
              Keep beneficiary
            </button>
            <button className="beneficiary-remove-button" type="button" onClick={deleteBeneficiary}>
              Remove
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default BeneficiariesPage;
