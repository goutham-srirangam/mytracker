import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const DebtList = () => {
    const { debts, addDebt, deleteDebt } = useAppContext();
    const [newDebtName, setNewDebtName] = useState('');
    const [newDebtAmount, setNewDebtAmount] = useState('');

    const handleAddDebt = (e) => {
        e.preventDefault();
        if (!newDebtName || !newDebtAmount) return;

        addDebt({
            name: newDebtName,
            initialAmount: parseFloat(newDebtAmount),
            currentAmount: parseFloat(newDebtAmount)
        });

        setNewDebtName('');
        setNewDebtAmount('');
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                Active Debts
            </h2>

            <form onSubmit={handleAddDebt} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 2fr) minmax(100px, 1fr) auto', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Debt Name (e.g. Credit Card)"
                    value={newDebtName}
                    onChange={(e) => setNewDebtName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newDebtAmount}
                    onChange={(e) => setNewDebtAmount(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                />
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>

            <div className="debt-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {debts.length === 0 ? (
                    <p style={{ opacity: 0.5, textAlign: 'center', fontStyle: 'italic' }}>No debts tracked yet. Add one above!</p>
                ) : (
                    debts.map(debt => {
                        const paid = debt.initialAmount - debt.currentAmount;
                        const progress = (paid / debt.initialAmount) * 100;
                        return (
                            <div key={debt.id} className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{debt.name}</h3>
                                    <button
                                        onClick={() => deleteDebt(debt.id)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                                    <span>Remaining: <strong>₹{debt.currentAmount.toLocaleString()}</strong></span>
                                    <span>Total: ₹{debt.initialAmount.toLocaleString()}</span>
                                </div>

                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${Math.min(progress, 100)}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--secondary-color), var(--success-color))',
                                        borderRadius: '4px',
                                        transition: 'width 0.5s ease-out'
                                    }} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DebtList;
