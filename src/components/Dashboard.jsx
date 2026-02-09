import React from 'react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
    const { totalDebt, totalPaid, totalIncome, totalExpenses } = useAppContext();

    const totalTracked = totalDebt + totalPaid;
    const progress = totalTracked > 0 ? (totalPaid / totalTracked) * 100 : 0;

    return (
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Debt</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>
                    ₹{Math.floor(totalDebt).toLocaleString()}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>Remaining to pay</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Paid Off</h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                    ₹{Math.floor(totalPaid).toLocaleString()}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>Good job!</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h3 style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Progress</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {progress.toFixed(1)}%
                    </div>
                </div>
                <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: `conic-gradient(var(--primary-color) ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--card-bg)', borderRadius: '50%' }}></div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Net Balance</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <span style={{ color: 'var(--success-color)' }}>+₹{totalIncome}</span> / <span style={{ color: 'var(--danger-color)' }}>-₹{totalExpenses}</span>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>Income vs Expenses</div>
            </div>
        </div>
    );
};

export default Dashboard;
