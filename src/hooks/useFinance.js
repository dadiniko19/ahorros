import { useState, useEffect } from 'react';

const STORAGE_KEY = 'finance_transactions';

export const useFinance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading transactions:', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...transaction,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (id, updates) => {
    setTransactions(transactions.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ));
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpense();
  };

  const getExpensesByCategory = () => {
    const categories = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const cat = t.category || 'Otros';
        categories[cat] = (categories[cat] || 0) + parseFloat(t.amount || 0);
      });
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const getMonthlyData = () => {
    const data = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!data[month]) {
        data[month] = { month, income: 0, expense: 0 };
      }
      const amount = parseFloat(t.amount || 0);
      if (t.type === 'income') {
        data[month].income += amount;
      } else {
        data[month].expense += amount;
      }
    });
    return Object.values(data).sort((a, b) => a.month.localeCompare(b.month));
  };

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTotalIncome,
    getTotalExpense,
    getBalance,
    getExpensesByCategory,
    getMonthlyData,
  };
};
