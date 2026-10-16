
import IncomingTransaction from "../../assets/add-money-icon.svg";
import outgoingTransaction from "../../assets/send-money-icon.svg";
import "./dashboardTransactions.css";

function DashboardTransactions() {
  const transactions = [
    {
      img: IncomingTransaction,
      title: "Salary from Acme Ltd",
      transactionType: "Credit",
      amount: "+₦500.00",
    },
    {
      img: outgoingTransaction,
      title: "Transfer to John Doe",
      transactionType: "Debit",
      amount: "-₦500.00",
    },
  ];

  return (
    <div className="dashboard-transactions">
      <p>Recent Transactions</p>

      <div className="transactions-container">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">

            <div className="transaction-details">
              <img src={transaction.img} alt="" />

              <div className="transaction-info">
                <p>{transaction.title}</p>
                <p>{transaction.transactionType}</p>
              </div>
            </div>

            <p className="transaction-amount">
              {transaction.amount}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardTransactions;
