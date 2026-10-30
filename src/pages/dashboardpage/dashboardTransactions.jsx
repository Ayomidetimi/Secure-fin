
import IncomingTransaction from "../../assets/add-money-icon.svg";
import outgoingTransaction from "../../assets/send-money-icon.svg";
import { Link } from "react-router-dom";
import "./dashboardTransactions.css";

function DashboardTransactions({
  title = "Recent Transactions",
  limit,
  showViewAll = false,
}) {
  const transactions = [
    {
      id: "salary",
      img: IncomingTransaction,
      title: "Salary from Acme Ltd",
      transactionType: "Credit",
      amount: "+₦250,000.00",
    },
    {
      id: "john-transfer",
      img: outgoingTransaction,
      title: "Transfer to John Doe",
      transactionType: "Debit",
      amount: "-₦12,500.00",
    },
    {
      id: "electricity",
      img: outgoingTransaction,
      title: "Electricity bill",
      transactionType: "Debit",
      amount: "-₦18,000.00",
    },
    {
      id: "jane-transfer",
      img: IncomingTransaction,
      title: "Transfer from Jane Smith",
      transactionType: "Credit",
      amount: "+₦35,000.00",
    },
    {
      id: "airtime",
      img: outgoingTransaction,
      title: "Airtime purchase",
      transactionType: "Debit",
      amount: "-₦2,000.00",
    },
    {
      id: "cashback",
      img: IncomingTransaction,
      title: "Cashback reward",
      transactionType: "Credit",
      amount: "+₦750.00",
    },
  ];

  const visibleTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  return (
    <div className="dashboard-transactions">
      <div className="transactions-heading">
        <p>{title}</p>
        {showViewAll && (
          <Link className="transactions-view-all" to="/transactions">
            View all
          </Link>
        )}
      </div>

      <div className="transactions-container">
        {visibleTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <span className={`transaction-icon transaction-icon-${transaction.transactionType.toLowerCase()}`}>
              <img src={transaction.img} alt="" />
            </span>
            <p className="transaction-title">{transaction.title}</p>
            <span className={`transaction-type transaction-type-${transaction.transactionType.toLowerCase()}`}>
              {transaction.transactionType}
            </span>
            <p className={`transaction-amount transaction-amount-${transaction.transactionType.toLowerCase()}`}>
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardTransactions;
