import { useState, useEffect } from 'react';
import { useFinance } from './hooks/useFinance';
import { Dashboard } from './components/Dashboard';
import { Accounts } from './components/Accounts';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ExpenseChart, MonthlyChart } from './components/Charts';
import { Navigation } from './components/Navigation';
import { Settings } from './components/Settings';

export default function App() {
  const finance = useFinance();
  const [currentPage, setCurrentPage] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleClearData = () => {
    localStorage.removeItem('finance_data');
    window.location.reload();
  };

  if (finance.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-6 sticky top-0 z-30">
          <h1 className="text-2xl font-bold">Finance App</h1>
          <p className="text-blue-100 text-sm">Gestiona tus finanzas</p>
        </div>

        {/* Content */}
        <div className="p-4">
          {currentPage === 'home' && (
            <>
              <Dashboard
                totalSalary={finance.getTotalSalary()}
                expense={finance.getTotalExpense() + finance.getTotalFixedExpenses()}
                availableBalance={finance.getAvailableBalance()}
                totalAccounts={finance.getTotalAccounts()}
                totalDebt={finance.getTotalDebt()}
                netWorth={finance.getNetWorth()}
                nuBankBalance={finance.accounts.nubank.savingsBoxes.reduce((sum, box) => sum + box.balance, 0)}
                motoExpense={finance.getMotoExpense()}
                motoBudget={finance.budgets.moto}
                dailyLimit={finance.dailyLimit}
                totalYield={finance.getTotalYield()}
                colpatriaBalance={finance.accounts.colpatria[0]?.balance || 0}
                fixedExpenses={finance.fixedExpenses}
                onUpdateSalary={finance.updateSalary}
                onUpdateCreditBalance={finance.updateCreditBalance}
                onDeductArriendo={finance.deductArriendo}
                onDeductFixedExpense={finance.deductFixedExpense}
              />
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-4 dark:text-white">Últimas Transacciones</h2>
                <TransactionList
                  transactions={finance.transactions}
                  onDelete={finance.deleteTransaction}
                />
              </div>
            </>
          )}

          {currentPage === 'accounts' && (
            <Accounts
              salary={finance.salary}
              accounts={finance.accounts}
              fixedExpenses={finance.fixedExpenses}
              budgets={finance.budgets}
              dailyLimit={finance.dailyLimit}
              totalExpense={finance.getTotalExpense()}
              onUpdateFixedExpense={finance.updateFixedExpense}
              onUpdateBudget={finance.updateBudget}
              onUpdateDailyLimit={finance.updateDailyLimit}
              onUpdateNequi={finance.updateNequi}
              onUpdateCash={finance.updateCash}
              onUpdateColpatria={finance.updateColpatria}
              onUpdateSalary={finance.updateSalary}
              onUpdateCreditBalance={finance.updateCreditBalance}
              onDeductArriendo={finance.deductArriendo}
              onDeductFixedExpense={finance.deductFixedExpense}
            />
          )}

          {currentPage === 'charts' && (
            <>
              <div className="mb-4">
                <ExpenseChart data={finance.getExpensesByCategory()} />
              </div>
              <div>
                <MonthlyChart data={finance.getMonthlyData()} />
              </div>
            </>
          )}

          {currentPage === 'settings' && (
            <Settings
              isDark={isDark}
              onThemeChange={() => setIsDark(!isDark)}
              transactions={finance.transactions}
              onClearData={handleClearData}
            />
          )}
        </div>
      </div>

      {/* Components */}
      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onAdd={finance.addTransaction}
      />
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAddClick={() => setShowForm(true)}
      />
    </div>
  );
}
