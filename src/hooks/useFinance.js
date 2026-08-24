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
  viajes_revoo: {
    name: '✈️ Viajes Revoo',
    subcategories: [
      'Impuesto hoteles',
      'Compras en ara',
      'D1',
      'Oxxo',
    ],
  },
  entre_cuentas: {
    name: '🔄 Entre Cuentas',
    subcategories: [],
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
      { name: 'Nómina', balance: 0 },
      { name: 'Bolsillo 1', balance: 0 },
      { name: 'Bolsillo 2', balance: 0 },
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
    cuotaPadres: 70000,
    spotify: 10100,
    claro: 49077,
    icloud: 0,
    didi: 18900,
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

    setData(prev => {
      let newData = { ...prev, transactions: [newTransfer, ...prev.transactions] };

      // Update account balances
      const updateBalance = (accountId, amount) => {
        const [type, index] = accountId.split('_');

        if (type === 'nu') {
          newData.accounts.nubank.savingsBoxes[parseInt(index)].balance += amount;
        } else if (type === 'nequi') {
          newData.accounts.nequi.balance += amount;
        } else if (type === 'colpatria') {
          newData.accounts.colpatria[parseInt(index)].balance += amount;
        } else if (type === 'cash') {
          newData.accounts.cash.balance += amount;
        }
      };

      updateBalance(transfer.fromAccount, -transfer.amount);
      updateBalance(transfer.toAccount, transfer.amount);

      return newData;
    });
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

  const updateNequi = (amount) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        nequi: {
          ...prev.accounts.nequi,
          balance: amount,
        },
      },
    }));
  };

  const updateCash = (amount) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        cash: {
          ...prev.accounts.cash,
          balance: amount,
        },
      },
    }));
  };

  const updateColpatria = (index, amount) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        colpatria: prev.accounts.colpatria.map((acc, i) =>
          i === index ? { ...acc, balance: amount } : acc
        ),
      },
    }));
  };

  const updateSalary = (base, bonus) => {
    setData(prev => ({
      ...prev,
      salary: {
        base: parseFloat(base) || 0,
        bonus: parseFloat(bonus) || 0,
      },
      accounts: {
        ...prev.accounts,
        colpatria: prev.accounts.colpatria.map((acc, i) =>
          i === 0 ? { ...acc, balance: (parseFloat(base) || 0) + (parseFloat(bonus) || 0) } : acc
        ),
      },
    }));
  };

  const updateCreditBalance = (amount) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        nubank: {
          ...prev.accounts.nubank,
          creditBalance: amount,
        },
      },
    }));
  };

  const deductArriendo = () => {
    setData(prev => ({
      ...prev,
      transactions: [{
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'expense',
        category: 'otros',
        subcategory: 'Arriendo',
        amount: 1500000,
        paymentMethod: 'Colpatria',
        description: 'Pago automático de arriendo',
      }, ...prev.transactions],
      accounts: {
        ...prev.accounts,
        colpatria: prev.accounts.colpatria.map((acc, i) =>
          i === 0 ? { ...acc, balance: acc.balance - 1500000 } : acc
        ),
      },
    }));
  };

  const deductFixedExpense = (expenseKey, amount) => {
    setData(prev => ({
      ...prev,
      transactions: [{
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'expense',
        category: 'otros',
        subcategory: expenseKey.charAt(0).toUpperCase() + expenseKey.slice(1),
        amount,
        paymentMethod: 'Colpatria',
        description: `Pago automático de ${expenseKey}`,
      }, ...prev.transactions],
      accounts: {
        ...prev.accounts,
        colpatria: prev.accounts.colpatria.map((acc, i) =>
          i === 0 ? { ...acc, balance: acc.balance - amount } : acc
        ),
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
    updateNequi,
    updateCash,
    updateColpatria,
    updateSalary,
    updateCreditBalance,
    deductArriendo,
    deductFixedExpense,
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
