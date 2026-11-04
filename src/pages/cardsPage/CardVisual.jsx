function CardVisual({ variant = 'preview', theme = 'violet', frozen = false, showDetails = false }) {
  const isPreview = variant === 'preview';

  return (
    <article
      className={`payment-card payment-card-${theme}${isPreview ? ' card-preview-graphic' : ''}${frozen ? ' payment-card-frozen' : ''}`}
      role={isPreview ? 'img' : undefined}
      aria-label={isPreview ? 'SecureFin virtual debit card illustration' : undefined}
    >
      {isPreview ? (
        <>
          <div className="payment-card-top">
            <span className="card-preview-brand">SecureFin</span>
            <span className="card-preview-shield" aria-hidden="true">S</span>
          </div>
          <span className="payment-card-chip" aria-hidden="true">
            <span />
          </span>
          <div className="card-preview-orbit" aria-hidden="true" />
          <div className="card-preview-footer">
            <span>SECUREFIN DEBIT</span>
            <span className="card-preview-network">VISA</span>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
      {frozen && (
        <div className="payment-card-frozen-label">
          <span aria-hidden="true">❄</span> Card frozen
        </div>
      )}
    </article>
  );
}

export default CardVisual;
