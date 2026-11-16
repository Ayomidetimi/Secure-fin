import { Link } from 'react-router-dom';
import './backToDashboard.css';

function BackToDashboard() {
  return (
    <Link className="back-to-dashboard" to="/dashboard" aria-label="Back to dashboard">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
      </svg>
    </Link>
  );
}

export default BackToDashboard;
