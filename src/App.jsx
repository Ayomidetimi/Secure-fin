import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/registerPage';
import DashboardPage from './pages/dashboardpage/DashboardPage';
import TransferPage from './pages/transferPage/transferPage.jsx';
import TransactionsPage from './pages/transactionsPage/TransactionsPage.jsx';
function App() {
  return(
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='dashboard' element={<DashboardPage />} />
      <Route path='transactions' element={<TransactionsPage />} />
      <Route path='transfer' element={<TransferPage />} />
    </Routes>
  )
}

export default App;