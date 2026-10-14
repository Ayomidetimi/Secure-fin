import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/registerPage';
import DashboardPage from './pages/dashboardPage/DashboardPage';

function App() {
  return(
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='dashboard' element={<DashboardPage />} />
    </Routes>
  )
}

export default App;