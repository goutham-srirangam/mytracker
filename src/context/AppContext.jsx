import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [debts, setDebts] = useState(() => {
        const saved = localStorage.getItem('debts');
        return saved ? JSON.parse(saved) : [];
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('debts', JSON.stringify(debts));
    }, [debts]);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addDebt = (debt) => {
        // debt: { name, initialAmount, currentAmount }
        const newDebt = {
            ...debt,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            paidAmount: 0
        };
        setDebts([...debts, newDebt]);
    };

    const deleteDebt = (id) => {
        setDebts(debts.filter(d => d.id !== id));
    };

    const addTransaction = (transaction) => {
        // transaction: { type: 'income' | 'expense' | 'payment', amount, description, debtId? }
        const newTransaction = {
            ...transaction,
            id: Date.now(),
            date: new Date().toISOString()
        };
        setTransactions([newTransaction, ...transactions]);

        // Update debt if payment
        if (transaction.type === 'payment' && transaction.debtId) {
            setDebts(debts.map(d => {
                if (d.id === parseInt(transaction.debtId)) {
                    return {
                        ...d,
                        currentAmount: Math.max(0, d.currentAmount - parseFloat(transaction.amount)),
                        paidAmount: d.paidAmount + parseFloat(transaction.amount)
                    };
                }
                return d;
            }));
        }
    };

    // Helper to calculate totals
    const totalDebt = debts.reduce((sum, d) => sum + parseFloat(d.currentAmount), 0);
    const totalPaid = debts.reduce((sum, d) => sum + parseFloat(d.paidAmount), 0);
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return (
        <AppContext.Provider value={{
            debts,
            transactions,
            addDebt,
            deleteDebt,
            addTransaction,
            totalDebt,
            totalPaid,
            totalIncome,
            totalExpenses
        }}>
            {children}
        </AppContext.Provider>
    );
};
