import { useState, useEffect } from 'react';

const STORAGE_KEY = 'finance_data';

const EXPENSE_CATEGORIES = {
  alimentacion: {
    name: '🍔 Alimentación',
    subcategories: [
      'Restaurantes',
      'Domicilios',
      'Comida con Natha',
      'Snacks trabajo',
      'Snacks fuera del trabajo',
    ],
  },
  transporte: {
    name: '🚗 Transporte',
    subcategories: [
      'Uber',
      'TransMilenio',
      'Gasolina',
    ],
  },
  moto: {
    name: '🏍️ Moto',
    subcategories: [
      'Mantenimiento',
      'Repuestos',
      'Lavado',
      'Accesorios',
      'SOAT',
      'Tecnomecánica',
    ],
  },
  diversión: {
    name: '🎮 Diversión',
    subcategories: [
      'Fútbol',
      'Salidas con amigos',
      'Bolirana',
      'Playland',
      'Rodadas',
    ],
  },
  futbol: {
    name: '⚽ Fútbol',
    subcategories: [
      'Estadio',
      'Partido',
      'Equipamiento',
      'Suscripciones',
    ],
  },
  rushbet: {
    name: '🎰 RushBet',
    subcategories: [
      'Depósitos',
      'Pérdidas',
      'Ganancias',
    ],
  },
};

const DEFAULT_STATE = {
  transactions: [],
  salary: {
    base: 2600000,
    bonus: 1000000,
  },
  accounts: {
    savings: 0,
    nequi: {
      name: 'Nequi',
      balance: 0,
    },
    nubank: {
      name: 'Nu Bank',
      type: 'credit',
      creditBalance: 0,
      creditLimit: 0,
      savingsBoxes: [
        { name: 'Caja de Ahorros 1', balance: 2267846.69, yield: 512349.69, yieldRate: 9.3 },
        { name: 'Caja de Ahorros 2', balance: 5367578.34, yield: 575187.44, yieldRate: 9.3 },
        { name: 'Caja de Ahorros 3', balance: 12296056.24, yield: 390056.24, yieldRate: 9.3 },
        { name: 'Caja de Natha', balance: 1493467.86, yield: 642798.89, yieldRate: 9.3 },
      ],
    },
    colpatria: [
      { name: 'Colpatria Cuenta 1', balance: 0 },
      { name: 'Colpatria Cuenta 2', balance: 0 },
      { name: 'Colpatria Cuenta 3', balance: 0 },
    ],
    cash: {
      name: 'Efectivo',
      balance: 0,
    },
    companyLoan: {
      name: 'Préstamo Empresa',
      balance: 0,
      concept: '',
    },
  },
  fixedExpenses: {
    rent: 1500000,
    spotify: 0,
    claro: 0,
    icloud: 0,
    didi: 0,
    rappi: 0,
  },
  budgets: {
    moto: 0,
  },
  monthlyDispensed: 0,
  dailyLimit: 0,
};

export const useFinance = () => {
  const [data, setData] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
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
          budgets: {
            ...DEFAULT_STATE.budgets,
            ...(parsed.budgets || {}),
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

  const addTransfer = (transfer) => {
    const newTransfer = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: 'transfer',
      ...transfer,
    };
    setData(prev => ({
      ...prev,
      transactions: [newTransfer, ...prev.transactions],
    }));

    // Update account balances
    updateAccountBalance(transfer.fromAccount, -transfer.amount);
    updateAccountBalance(transfer.toAccount, transfer.amount);
  };

  const updateAccountBalance = (accountId, amount) => {
    setData(prev => {
      const newData = { ...prev };
      const [type, index] = accountId.split('_');

      if (type === 'nubank') {
        newData.accounts.nubank.creditBalance += amount;
      } else if (type === 'nequi') {
        newData.accounts.nequi.balance += amount;
      } else if (type === 'colpatria') {
        newData.accounts.colpatria[parseInt(index)].balance += amount;
      } else if (type === 'cash') {
        newData.accounts.cash.balance += amount;
      }

      return newData;
    });
  };

  const updateBudget = (category, amount) => {
    setData(prev => ({
      ...prev,
      budgets: {
        ...prev.budgets,
        [category]: amount,
      },
    }));
  };

  const updateDailyLimit = (limit) => {
    setData(prev => ({
      ...prev,
      dailyLimit: limit,
    }));
  };

  const updateFixedExpense = (expense, amount) => {
    setData(prev => ({
      ...prev,
      fixedExpenses: {
        ...prev.fixedExpenses,
        [expense]: amount,
      },
    }));
  };

  const getTotalSalary = () => {
    return data.salary.base + data.salary.bonus;
  };

  const getTotalIncome = () => {
    if (!data.transactions || !Array.isArray(data.transactions)) return 0;
    return data.transactions
      .filter(t => t.type === 'income' || (t.type === 'expense' && t.category === 'rushbet' && t.subcategory === 'Ganancias'))
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getTotalExpense = () => {
    if (!data.transactions || !Array.isArray(data.transactions)) return 0;
    return data.transactions
      .filter(t => t.type === 'expense' && t.category !== 'rushbet')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getTotalFixedExpenses = () => {
    if (!data.fixedExpenses) return 0;
    return Object.values(data.fixedExpenses).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0);
  };

  const getTotalYield = () => {
    return data.accounts.nubank.savingsBoxes.reduce((sum, box) => sum + (box.yield || 0), 0);
  };

  const getMotoExpense = () => {
    if (!data.transactions || !Array.isArray(data.transactions)) return 0;
    return data.transactions
      .filter(t => t.type === 'expense' && t.category === 'moto')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const getAvailableBalance = () => {
    return getTotalSalary() - getTotalExpense() - getTotalFixedExpenses() - data.monthlyDispensed;
  };

  const getTotalAccounts = () => {
    const nuBankTotal = data.accounts.nubank.savingsBoxes.reduce((sum, box) => sum + box.balance, 0);
    return (
      data.accounts.savings +
      data.accounts.nequi.balance +
      nuBankTotal +
      data.accounts.colpatria.reduce((sum, acc) => sum + acc.balance, 0) +
      data.accounts.cash.balance
    );
  };

  const getTotalDebt = () => {
    return data.accounts.nubank.creditBalance + data.accounts.companyLoan.balance;
  };

  const getNetWorth = () => {
    return getTotalAccounts() - getTotalDebt();
  };

  const getExpensesByCategory = () => {
    const categories = {};
    if (!data.transactions || !Array.isArray(data.transactions)) return [];

    data.transactions
      .filter(t => t.type === 'expense' && t.category !== 'rushbet')
      .forEach(t => {
        const catObj = EXPENSE_CATEGORIES[t.category];
        const catName = catObj ? catObj.name : 'Otros';
        categories[catName] = (categories[catName] || 0) + parseFloat(t.amount || 0);
      });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const getMonthlyData = () => {
    const data_map = {};
    if (!data.transactions || !Array.isArray(data.transactions)) return [];

    data.transactions.forEach(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!data_map[month]) {
        data_map[month] = { month, income: 0, expense: 0 };
      }
      const amount = parseFloat(t.amount || 0);
      if (t.type === 'income' || (t.category === 'rushbet' && t.subcategory === 'Ganancias')) {
        data_map[month].income += amount;
      } else if (t.type === 'expense') {
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
    budgets: data.budgets,
    dailyLimit: data.dailyLimit,
    monthlyDispensed: data.monthlyDispensed,
    loading,
    addTransaction,
    deleteTransaction,
    addTransfer,
    updateAccountBalance,
    updateBudget,
    updateDailyLimit,
    updateFixedExpense,
    getTotalSalary,
    getTotalIncome,
    getTotalExpense,
    getTotalFixedExpenses,
    getTotalYield,
    getMotoExpense,
    getAvailableBalance,
    getTotalAccounts,
    getTotalDebt,
    getNetWorth,
    getExpensesByCategory,
    getMonthlyData,
    EXPENSE_CATEGORIES,
  };
};
