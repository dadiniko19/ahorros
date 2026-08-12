import { useState, useEffect } from 'react';

const STORAGE_KEY = 'finance_data';

const DEFAULT_STATE = {
  transactions: [],
  salary: {
    base: 2600000,
    bonus: 1000000,
  },
  accounts: {
    savings: 0,
    companyLoan: {
      name: 'Préstamo Empresa',
      balance: 0,
      concept: '',
    },
    nubank: {
      name: 'Nu Bank',
      type: 'credit',
      creditBalance: 0,
      creditLimit: 0,
      savingsBoxes: [
        { name: 'Caja de Ahorros 1', balance: 0, interestRate: 0 },
        { name: 'Caja de Ahorros 2', balance: 0, interestRate: 0 },
      ],
    },
    colpatria: [
      { name: 'Colpatria Cuenta 1', balance: 0 },
      { name: 'Colpatria Cuenta 2', balance: 0 },
      { name: 'Colpatria Cuenta 3', balance: 0 },
    ],
  },
  fixedExpenses: {
    rent: 1500000,
  },
  monthlyDispensed: 0,
};

export const useFinance = () => {
  const [data, setData] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge con datos por defecto para asegurar que tiene la estructura correcta
        setData(prev => ({
          ...DEFAULT_STATE,
          ...parsed,
          accounts: {
            ...DEFAULT_STATE.accounts,
            ...(parsed.accounts || {}),
            colpatria: parsed.accounts?.colpatria || DEFAULT_STATE.accounts.colpatria,
            nubank: {
              ...DEFAULT_STATE.accounts.nubank,
              ...(parsed.accounts?.nubank || {}),
              savingsBoxes: parsed.accounts?.nubank?.savingsBoxes || DEFAULT_STATE.accounts.nubank.savingsBoxes,
            },
          },
          fixedExpenses: {
            ...DEFAULT_STATE.fixedExpenses,
            ...(parsed.fixedExpenses || {}),
          },
          salary: {
            ...DEFAULT_STATE.salary,
            ...(parsed.salary || {}),
          },
        }));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, loading]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...transaction,
    };
    setData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  const deleteTransaction = (id) => {
    setData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  };

  const editTransaction = (id, updates) => {
    setData(prev => ({
      ...prev,
      transactions: prev.transactions.map(t =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  };

  const updateAccount = (accountType, value, index = null, concept = null) => {
    setData(prev => {
      const newData = { ...prev };
      if (accountType === 'savings') {
        newData.accounts.savings = value;
      } else if (accountType === 'nubank-credit') {
        newData.accounts.nubank.creditBalance = value;
      } else if (accountType === 'nubank-box' && index !== null) {
        newData.accounts.nubank.savingsBoxes[index].balance = value;
      } else if (accountType === 'company-loan') {
        newData.accounts.companyLoan.balance = value;
        if (concept) {
          newData.accounts.companyLoan.concept = concept;
        }
      } else if (accountType === 'colpatria' && index !== null) {
        newData.accounts.colpatria[index].balance = value;
      } else if (accountType === 'rent') {
        newData.fixedExpenses.rent = value;
      }
      return newData;
    });
  };

  const updateMonthlyDispensed = (amount) => {
    setData(prev => ({
      ...prev,
      monthlyDispensed: amount,
    }));
  };

  const getTotalSalary = () => {
    return data.salary.base + data.salary.bonus;
  };

  const getTotalIncome = () => {
    if (!data.transactions || !Array.isArray(data.transactions)) return 0;
    return data.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getTotalExpense = () => {
    if (!data.transactions || !Array.isArray(data.transactions)) return 0;
    return data.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getTotalFixedExpenses = () => {
    if (!data.fixedExpenses) return 0;
    return Object.values(data.fixedExpenses).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0);
  };

  const getAvailableBalance = () => {
    return getTotalSalary() - getTotalExpense() - getTotalFixedExpenses() - data.monthlyDispensed;
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpense();
  };

  const getTotalAccounts = () => {
    return (
      data.accounts.savings +
      data.accounts.colpatria.reduce((sum, acc) => sum + acc.balance, 0)
    );
  };

  const getTotalDebt = () => {
    return data.accounts.nubank.creditBalance + data.accounts.companyLoan.balance;
  };

  const getTotalNuBankSavings = () => {
    return data.accounts.nubank.savingsBoxes.reduce((sum, box) => sum + box.balance, 0);
  };

  const getNetWorth = () => {
    return getTotalAccounts() - getTotalDebt();
  };

  const getExpensesByCategory = () => {
    const categories = {};
    data.transactions
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
    const data_map = {};
    data.transactions.forEach(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!data_map[month]) {
        data_map[month] = { month, income: 0, expense: 0 };
      }
      const amount = parseFloat(t.amount || 0);
      if (t.type === 'income') {
        data_map[month].income += amount;
      } else {
        data_map[month].expense += amount;
      }
    });
    return Object.values(data_map).sort((a, b) => a.month.localeCompare(b.month));
  };

  return {
    transactions: data.transactions,
    salary: data.salary,
    accounts: data.accounts,
    fixedExpenses: data.fixedExpenses,
    monthlyDispensed: data.monthlyDispensed,
    loading,
    addTransaction,
    deleteTransaction,
    editTransaction,
    updateAccount,
    updateMonthlyDispensed,
    getTotalSalary,
    getTotalIncome,
    getTotalExpense,
    getTotalFixedExpenses,
    getAvailableBalance,
    getBalance,
    getTotalAccounts,
    getTotalDebt,
    getTotalNuBankSavings,
    getNetWorth,
    getExpensesByCategory,
    getMonthlyData,
  };
};
