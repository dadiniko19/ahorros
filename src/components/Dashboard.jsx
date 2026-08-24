import { TrendingUp, TrendingDown, Wallet, Edit2 } from 'lucide-react';
import { useState } from 'react';

export function Dashboard({
  totalSalary = 0,
  expense = 0,
  availableBalance = 0,
  totalAccounts = 0,
  totalDebt = 0,
  netWorth = 0,
  nuBankBalance = 0,
  motoExpense = 0,
  motoBudget = 0,
  dailyLimit = 0,
  totalYield = 0,
  colpatriaBalance = 0,
  fixedExpenses = {},
  onUpdateSalary,
  onUpdateCreditBalance,
  onDeductArriendo,
  onDeductFixedExpense,
}) {
  const [editingSalary, setEditingSalary] = useState(false);
  const [salaryValue, setSalaryValue] = useState(totalSalary.toString());
  const [editingDebt, setEditingDebt] = useState(false);
  const [debtValue, setDebtValue] = useState(totalDebt.toString());

  const safe = (value) => isNaN(value) ? 0 : value;

  const handleSalaryUpdate = () => {
    const value = parseFloat(salaryValue) || 0;
    onUpdateSalary(value, 0);
    setEditingSalary(false);
  };

  const handleDebtUpdate = () => {
    const value = parseFloat(debtValue) || 0;
    onUpdateCreditBalance(value);
    setEditingDebt(false);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Salario Total - Editable */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Salario Total</p>
            {!editingSalary && (
              <button
                onClick={() => {
                  setEditingSalary(true);
                  setSalaryValue(totalSalary.toString());
                }}
                className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded"
              >
                <Edit2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              </button>
            )}
          </div>
          {editingSalary ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={salaryValue}
                onChange={(e) => setSalaryValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                onClick={handleSalaryUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition"
              >
                OK
              </button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${safe(totalSalary).toLocaleString('es-CO')}
            </p>
          )}
        </div>

        {/* Lo que debes - Editable */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Lo que debes</p>
            {!editingDebt && (
              <button
                onClick={() => {
                  setEditingDebt(true);
                  setDebtValue(totalDebt.toString());
                }}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded"
              >
                <Edit2 className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            )}
          </div>
          {editingDebt ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={debtValue}
                onChange={(e) => setDebtValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-red-300 dark:border-red-600 rounded-lg dark:bg-gray-800 dark:text-white text-sm"
              />
              <button
                onClick={handleDebtUpdate}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
              >
                OK
              </button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${safe(totalDebt).toLocaleString('es-CO')}
            </p>
          )}
        </div>

        {/* Botón Arriendo */}
        <button
          onClick={onDeductArriendo}
          className="bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg p-4 transition text-center font-bold text-lg"
        >
          🏠 Arriendo
          <p className="text-sm opacity-90 mt-1">-$1.500.000</p>
        </button>

        {/* Gastos Fijos con botones */}
        <div className="grid grid-cols-2 gap-2">
          {fixedExpenses.cuotaPadres > 0 && (
            <button
              onClick={() => onDeductFixedExpense('cuotaPadres', fixedExpenses.cuotaPadres)}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-3 transition text-center text-sm"
            >
              <p className="text-xs opacity-90">Cuota Padres</p>
              <p className="font-bold">${fixedExpenses.cuotaPadres.toLocaleString('es-CO')}</p>
            </button>
          )}
          {fixedExpenses.spotify > 0 && (
            <button
              onClick={() => onDeductFixedExpense('spotify', fixedExpenses.spotify)}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-3 transition text-center text-sm"
            >
              <p className="text-xs opacity-90">Spotify</p>
              <p className="font-bold">${fixedExpenses.spotify.toLocaleString('es-CO')}</p>
            </button>
          )}
          {fixedExpenses.claro > 0 && (
            <button
              onClick={() => onDeductFixedExpense('claro', fixedExpenses.claro)}
              className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg p-3 transition text-center text-sm"
            >
              <p className="text-xs opacity-90">Claro</p>
              <p className="font-bold">${fixedExpenses.claro.toLocaleString('es-CO')}</p>
            </button>
          )}
          {fixedExpenses.didi > 0 && (
            <button
              onClick={() => onDeductFixedExpense('didi', fixedExpenses.didi)}
              className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg p-3 transition text-center text-sm"
            >
              <p className="text-xs opacity-90">Didi</p>
              <p className="font-bold">${fixedExpenses.didi.toLocaleString('es-CO')}</p>
            </button>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dinero Disponible (Nómina)</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${safe(colpatriaBalance).toLocaleString('es-CO')}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {safe(motoBudget) > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gasto de Moto</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  ${safe(motoExpense).toLocaleString('es-CO')}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
