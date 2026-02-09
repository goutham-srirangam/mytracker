import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TransactionManager = () => {
    const { debts, addTransaction, transactions } = useAppContext();
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDebtId, setSelectedDebtId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description) return;
        if (type === 'payment' && !selectedDebtId) return;

        addTransaction({
            type,
            amount: parseFloat(amount),
            description,
            debtId: type === 'payment' ? selectedDebtId : null
        });

        setAmount('');
        setDescription('');
        setSelectedDebtId('');
        if (type === 'payment') setType('expense'); // Reset to default
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                New Transaction
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                        type="button"
                        className={`btn ${type === 'expense' ? 'btn-primary' : ''}`}
                        onClick={() => setType('expense')}
                        style={{ flex: 1, background: type === 'expense' ? undefined : 'rgba(255,255,255,0.1)' }}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        className={`btn ${type === 'income' ? 'btn-primary' : ''}`}
                        onClick={() => setType('income')}
                        style={{ flex: 1, background: type === 'income' ? undefined : 'rgba(255,255,255,0.1)' }}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        className={`btn ${type === 'payment' ? 'btn-primary' : ''}`}
                        onClick={() => setType('payment')}
                        style={{ flex: 1, background: type === 'payment' ? undefined : 'rgba(255,255,255,0.1)' }}
                    >
                        Debt Pay
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ gridColumn: '1 / 2' }}
                />

                <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    style={{ gridColumn: '2 / 3' }}
                />

                {type === 'payment' && (
                    <select
                        value={selectedDebtId}
                        onChange={(e) => setSelectedDebtId(e.target.value)}
                        required
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <option value="">Select Debt to Pay...</option>
                        {debts.map(debt => (
                            <option key={debt.id} value={debt.id}>
                                {debt.name} (Rem: ₹{debt.currentAmount})
                            </option>
                        ))}
                    </select>
                )}

                <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            </form>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Activity</h3>
                <div className="transaction-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {transactions.length === 0 ? (
                        <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No transactions yet.</p>
                    ) : (
                        transactions.map(t => (
                            <div key={t.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${t.type === 'income' ? 'var(--success-color)' :
                                    t.type === 'expense' ? 'var(--danger-color)' : 'var(--primary-color)'
                                    }`
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{t.description}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{new Date(t.date).toLocaleDateString()}</div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: t.type === 'income' ? 'var(--success-color)' : 'inherit' }}>
                                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionManager;
