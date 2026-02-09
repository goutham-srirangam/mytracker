import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import DebtList from './components/DebtList'
import TransactionManager from './components/TransactionManager'
import Login from './components/Login'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth_code') === '0103';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('auth_code', '0103');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout>
      <Dashboard />
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <DebtList />
        <TransactionManager />
      </div>
    </Layout>
  )
}

export default App
