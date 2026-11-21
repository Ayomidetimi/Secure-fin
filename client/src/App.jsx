import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/Registerpage/registerPage';
import DashboardPage from './pages/dashboardpage/DashboardPage';
import TransferPage from './pages/transferPage/transferPage.jsx';
import TransactionsPage from './pages/transactionsPage/TransactionsPage.jsx';
import CardsPage from './pages/cardsPage/CardsPage.jsx';
import BeneficiariesPage from './pages/beneficiariesPage/BeneficiariesPage.jsx';
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  return(
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='dashboard' element={
        <ProtectedRoute>
           <DashboardPage />
        </ProtectedRoute>   
        } />
      <Route path='transactions' element={<TransactionsPage />} 
    />
      <Route path='cards' element={<CardsPage />} />
      <Route path='beneficiaries' element={<BeneficiariesPage />} />
      <Route path='transfer' element={<TransferPage />} />
    </Routes>
  )
}

export default App;