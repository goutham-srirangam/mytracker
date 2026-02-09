import React from 'react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
    const { totalDebt, totalPaid, totalIncome, totalExpenses, debts, transactions, importData } = useAppContext();

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

            <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>Data Management</h3>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', opacity: 0.6 }}>Backup your data or restore from another device.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="btn"
                        style={{ background: 'rgba(255,255,255,0.1)', fontSize: '0.9rem' }}
                        onClick={() => {
                            const data = JSON.stringify({ debts, transactions });
                            const blob = new Blob([data], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'debt-tracker-backup.json';
                            a.click();
                        }}
                    >
                        Export Data
                    </button>
                    <label className="btn btn-primary" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                        Import Data
                        <input
                            type="file"
                            accept=".json"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    try {
                                        const data = JSON.parse(e.target.result);
                                        if (data.debts && data.transactions) {
                                            importData(data);
                                            alert('Data imported successfully!');
                                        } else {
                                            alert('Invalid data file.');
                                        }
                                    } catch (err) {
                                        alert('Error reading file');
                                    }
                                };
                                reader.readAsText(file);
                            }}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
