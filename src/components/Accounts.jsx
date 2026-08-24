import { CreditCard, TrendingUp, DollarSign, Plus, Edit2 } from 'lucide-react';
import { useState } from 'react';

export function Accounts({
  salary,
  accounts,
  fixedExpenses,
  budgets,
  dailyLimit,
  totalExpense,
  onUpdateFixedExpense,
  onUpdateBudget,
  onUpdateDailyLimit,
  onUpdateNequi,
  onUpdateCash,
  onUpdateColpatria,
  onUpdateSalary,
  onUpdateCreditBalance,
  onDeductArriendo,
  onDeductFixedExpense,
}) {
  const [editingAccount, setEditingAccount] = useState(null);
  const [editValue, setEditValue] = useState('');

  const totalSalary = salary.base + salary.bonus;
  const totalFixedExpenses = Object.values(fixedExpenses).reduce((sum, amount) => sum + amount, 0);
  const nuBankTotal = accounts.nubank.savingsBoxes.reduce((sum, box) => sum + box.balance, 0);
  const totalAccounts = accounts.savings + (accounts.nequi?.balance || 0) + nuBankTotal + accounts.colpatria.reduce((sum, acc) => sum + acc.balance, 0) + (accounts.cash?.balance || 0);
  const totalDebt = accounts.nubank.creditBalance + accounts.companyLoan.balance;
  const netWorth = totalAccounts - totalDebt;
  const totalYield = accounts.nubank.savingsBoxes.reduce((sum, box) => sum + (box.yield || 0), 0);

  const handleEditStart = (type, value) => {
    setEditingAccount(type);
    setEditValue(value.toString());
  };

  const handleSave = (type) => {
    const value = parseFloat(editValue) || 0;
    if (type.startsWith('fixed_')) {
      const expenseKey = type.replace('fixed_', '');
      onUpdateFixedExpense(expenseKey, value);
    } else if (type === 'budget_moto') {
      onUpdateBudget('moto', value);
    } else if (type === 'daily_limit') {
      onUpdateDailyLimit(value);
    } else if (type === 'nequi') {
      onUpdateNequi(value);
    } else if (type === 'cash') {
      onUpdateCash(value);
    } else if (type.startsWith('colpatria_')) {
      const index = parseInt(type.replace('colpatria_', ''));
      onUpdateColpatria(index, value);
    }
    setEditingAccount(null);
  };

  const FIXED_EXPENSE_LABELS = {
    rent: 'Arriendo',
    cuotaPadres: 'Cuota Padres',
    spotify: 'Spotify',
    claro: 'Claro',
    icloud: 'iCloud',
    didi: 'Didi',
    rappi: 'Rappi',
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Salario */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm opacity-90">Salario Base</p>
            <p className="text-lg font-bold">${salary.base.toLocaleString('es-CO')}</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Bono</p>
            <p className="text-lg font-bold">${salary.bonus.toLocaleString('es-CO')}</p>
          </div>
          <div className="border-t border-green-400 pt-3">
            <p className="text-sm opacity-90">Total Disponible</p>
            <p className="text-2xl font-bold">${totalSalary.toLocaleString('es-CO')}</p>
          </div>
        </div>
      </div>

      {/* Saldo de Nu Bank */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5" />
          <p className="text-sm opacity-90">Saldo Total Nu Bank</p>
        </div>
        <p className="text-3xl font-bold">${nuBankTotal.toLocaleString('es-CO')}</p>
        <p className="text-sm opacity-90 mt-2">Rendimiento: ${totalYield.toLocaleString('es-CO')}</p>
      </div>

      {/* Dinero Disponible */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Dinero Disponible</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${(totalSalary - totalExpense - totalFixedExpenses).toLocaleString('es-CO')}
        </p>
      </div>

      {/* Límite Diario */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold dark:text-white">Límite Diario</h3>
          <button
            onClick={() => handleEditStart('daily_limit', dailyLimit)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {editingAccount === 'daily_limit' ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Monto diario"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleSave('daily_limit')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingAccount(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            ${dailyLimit.toLocaleString('es-CO')}
          </p>
        )}
      </div>

      {/* Gastos Fijos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold mb-4 dark:text-white">Gastos Fijos</h3>
        <div className="space-y-3">
          {Object.entries(fixedExpenses).map(([key, value]) => (
            <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{FIXED_EXPENSE_LABELS[key]}</p>
                  {editingAccount === `fixed_${key}` ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Monto"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={() => handleSave(`fixed_${key}`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingAccount(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                      ${value.toLocaleString('es-CO')}
                    </p>
                  )}
                </div>
                {editingAccount !== `fixed_${key}` && (
                  <button
                    onClick={() => handleEditStart(`fixed_${key}`, value)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">
          Total Fijo: <span className="font-bold">${totalFixedExpenses.toLocaleString('es-CO')}</span>
        </p>
      </div>

      {/* Fijos con botones de deducción rápida */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold mb-4 dark:text-white">Fijos con Deducción Rápida</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Cuota Padres */}
          {fixedExpenses.cuotaPadres > 0 && (
            <button
              onClick={() => onDeductFixedExpense('cuotaPadres', fixedExpenses.cuotaPadres)}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition text-center"
            >
              <p className="text-sm opacity-90">Cuota Padres</p>
              <p className="text-lg font-bold mt-1">${fixedExpenses.cuotaPadres.toLocaleString('es-CO')}</p>
            </button>
          )}

          {/* Spotify */}
          {fixedExpenses.spotify > 0 && (
            <button
              onClick={() => onDeductFixedExpense('spotify', fixedExpenses.spotify)}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-4 transition text-center"
            >
              <p className="text-sm opacity-90">Spotify</p>
              <p className="text-lg font-bold mt-1">${fixedExpenses.spotify.toLocaleString('es-CO')}</p>
            </button>
          )}

          {/* Claro */}
          {fixedExpenses.claro > 0 && (
            <button
              onClick={() => onDeductFixedExpense('claro', fixedExpenses.claro)}
              className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg p-4 transition text-center"
            >
              <p className="text-sm opacity-90">Claro</p>
              <p className="text-lg font-bold mt-1">${fixedExpenses.claro.toLocaleString('es-CO')}</p>
            </button>
          )}

          {/* Didi */}
          {fixedExpenses.didi > 0 && (
            <button
              onClick={() => onDeductFixedExpense('didi', fixedExpenses.didi)}
              className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg p-4 transition text-center"
            >
              <p className="text-sm opacity-90">Didi</p>
              <p className="text-lg font-bold mt-1">${fixedExpenses.didi.toLocaleString('es-CO')}</p>
            </button>
          )}
        </div>
      </div>

      {/* Presupuesto de Moto */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold dark:text-white">Presupuesto de Moto</h3>
          <button
            onClick={() => handleEditStart('budget_moto', budgets.moto)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {editingAccount === 'budget_moto' ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Presupuesto"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleSave('budget_moto')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingAccount(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            ${budgets.moto.toLocaleString('es-CO')}
          </p>
        )}
      </div>

      {/* Nu Bank Cajas */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold">Cajas de Ahorros</h3>
          </div>

          {/* Crédito */}
          <div className="bg-black/20 rounded-lg p-3 mb-3">
            <p className="text-sm opacity-90">Deuda de Crédito</p>
            <p className="text-xl font-bold">${accounts.nubank.creditBalance.toLocaleString('es-CO')}</p>
          </div>

          {/* Cajas de Ahorros */}
          <div className="space-y-2">
            {accounts.nubank.savingsBoxes.map((box, idx) => (
              <div key={idx} className="bg-black/20 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs opacity-90">{box.name}</p>
                    <p className="font-bold">${box.balance.toLocaleString('es-CO')}</p>
                    <p className="text-xs text-green-300">Rendimiento: ${box.yield.toLocaleString('es-CO')} ({box.yieldRate}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nequi */}
      {accounts.nequi && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">N</div>
              <h3 className="font-bold dark:text-white">Nequi</h3>
            </div>
            {editingAccount !== 'nequi' && (
              <button
                onClick={() => handleEditStart('nequi', accounts.nequi.balance)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          {editingAccount === 'nequi' ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Monto"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => handleSave('nequi')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingAccount(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${accounts.nequi.balance.toLocaleString('es-CO')}
            </p>
          )}
        </div>
      )}

      {/* Efectivo */}
      {accounts.cash && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <h3 className="font-bold dark:text-white">Efectivo</h3>
            </div>
            {editingAccount !== 'cash' && (
              <button
                onClick={() => handleEditStart('cash', accounts.cash.balance)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          {editingAccount === 'cash' ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Monto"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => handleSave('cash')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingAccount(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${accounts.cash.balance.toLocaleString('es-CO')}
            </p>
          )}
        </div>
      )}

      {/* Colpatria */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold dark:text-white">Colpatria</h3>
        </div>

        <div className="space-y-3">
          {accounts.colpatria.map((account, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">{account.name}</p>
                {editingAccount !== `colpatria_${idx}` && (
                  <button
                    onClick={() => handleEditStart(`colpatria_${idx}`, account.balance)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
              {editingAccount === `colpatria_${idx}` ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Monto"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={() => handleSave(`colpatria_${idx}`)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingAccount(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${account.balance.toLocaleString('es-CO')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Préstamo Empresa */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold dark:text-white">Préstamo Empresa</h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Concepto</p>
        <p className="text-sm dark:text-white mb-3">{accounts.companyLoan.concept || 'No especificado'}</p>
        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          ${accounts.companyLoan.balance.toLocaleString('es-CO')}
        </p>
      </div>

      {/* Resumen Patrimonial */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Cuentas</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${totalAccounts.toLocaleString('es-CO')}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Deuda</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            ${totalDebt.toLocaleString('es-CO')}
          </p>
        </div>

        <div className={`${netWorth >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} rounded-lg p-4 border ${netWorth >= 0 ? 'border-green-200 dark:border-green-800' : 'border-orange-200 dark:border-orange-800'} col-span-2`}>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Patrimonio Neto</p>
          <p className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
            ${netWorth.toLocaleString('es-CO')}
          </p>
        </div>
      </div>
    </div>
  );
}
