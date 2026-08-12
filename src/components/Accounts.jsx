import { CreditCard, TrendingUp, DollarSign, Plus, Edit2, X } from 'lucide-react';
import { useState } from 'react';

export function Accounts({
  salary,
  accounts,
  fixedExpenses,
  monthlyDispensed,
  totalExpense,
  onUpdateAccount,
  onUpdateMonthlyDispensed
}) {
  const [editingAccount, setEditingAccount] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editConcept, setEditConcept] = useState('');
  const [showSalaryForm, setShowSalaryForm] = useState(false);

  const totalSalary = salary.base + salary.bonus;
  const totalFixedExpenses = Object.values(fixedExpenses).reduce((sum, amount) => sum + amount, 0);
  const availableBalance = totalSalary - totalExpense - totalFixedExpenses - monthlyDispensed;
  const totalAccounts = accounts.savings + accounts.colpatria.reduce((sum, acc) => sum + acc.balance, 0) + accounts.nubank.savingsBoxes.reduce((sum, box) => sum + box.balance, 0);
  const totalDebt = accounts.nubank.creditBalance + accounts.companyLoan.balance;
  const netWorth = totalAccounts - totalDebt;

  const handleEditStart = (type, index = null, value) => {
    setEditingAccount({ type, index });
    setEditValue(value.toString());
  };

  const handleSave = () => {
    const value = parseFloat(editValue) || 0;
    const { type, index } = editingAccount;
    onUpdateAccount(type, value, index, editConcept);
    setEditingAccount(null);
    setEditConcept('');
  };

  const handleAddDispensed = () => {
    const newDispensed = parseFloat(editValue) || 0;
    onUpdateMonthlyDispensed(monthlyDispensed + newDispensed);
    setEditValue('');
    setShowSalaryForm(false);
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

      {/* Balance Disponible */}
      <div className={`${availableBalance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-red-50 dark:bg-red-900/20'} rounded-lg p-4 border ${availableBalance >= 0 ? 'border-blue-200 dark:border-blue-800' : 'border-red-200 dark:border-red-800'}`}>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Dinero Disponible Mes</p>
        <p className={`text-2xl font-bold ${availableBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
          ${availableBalance.toLocaleString('es-CO')}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          (${totalSalary.toLocaleString('es-CO')} - ${totalExpense.toLocaleString('es-CO')} gastos - ${totalFixedExpenses.toLocaleString('es-CO')} fijos - ${monthlyDispensed.toLocaleString('es-CO')} dispensado)
        </p>

        {!showSalaryForm && (
          <button
            onClick={() => setShowSalaryForm(true)}
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Dispensar Dinero
          </button>
        )}

        {showSalaryForm && (
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Monto"
              className="flex-1 px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={handleAddDispensed}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
            >
              Agregar
            </button>
            <button
              onClick={() => {
                setShowSalaryForm(false);
                setEditValue('');
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Ahorros Personales */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold dark:text-white">Ahorros Personales</h3>
          </div>
          <button
            onClick={() => handleEditStart('savings', null, accounts.savings)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {editingAccount?.type === 'savings' ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Monto"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSave}
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
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            ${accounts.savings.toLocaleString('es-CO')}
          </p>
        )}
      </div>

      {/* Gastos Fijos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold mb-4 dark:text-white">Gastos Fijos</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Arriendo</p>
                {editingAccount?.type === 'rent' ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Monto"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                    />
                    <button
                      onClick={handleSave}
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
                    ${fixedExpenses.rent.toLocaleString('es-CO')}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleEditStart('rent', null, fixedExpenses.rent)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
              >
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Préstamo a Empresa */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold dark:text-white">Préstamo Empresa</h3>
          </div>
          <button
            onClick={() => {
              handleEditStart('company-loan', null, accounts.companyLoan.balance);
              setEditConcept(accounts.companyLoan.concept);
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {editingAccount?.type === 'company-loan' ? (
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Concepto</label>
              <input
                type="text"
                value={editConcept}
                onChange={(e) => setEditConcept(e.target.value)}
                placeholder="Ej: Préstamo personal, equipos..."
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Monto</label>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Monto"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setEditingAccount(null);
                  setEditConcept('');
                }}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Concepto</p>
              <p className="text-sm dark:text-white">{accounts.companyLoan.concept || 'No especificado'}</p>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${accounts.companyLoan.balance.toLocaleString('es-CO')}
            </p>
          </div>
        )}
      </div>

      {/* Nu Bank */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold">Nu Bank</h3>
          </div>

          {/* Crédito */}
          <div className="bg-black/20 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Deuda de Crédito</p>
                <p className="text-xl font-bold">${accounts.nubank.creditBalance.toLocaleString('es-CO')}</p>
              </div>
              <button
                onClick={() => handleEditStart('nubank-credit', null, accounts.nubank.creditBalance)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            {editingAccount?.type === 'nubank-credit' && (
              <div className="flex gap-2 mt-3">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Monto"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-black"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingAccount(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Cajas de Ahorros */}
          <div>
            <p className="text-sm opacity-90 mb-2">Cajas de Ahorros</p>
            <div className="space-y-2">
              {accounts.nubank.savingsBoxes.map((box, idx) => (
                <div key={idx} className="bg-black/20 rounded-lg p-2 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs opacity-90">{box.name}</p>
                    <p className="font-bold">${box.balance.toLocaleString('es-CO')}</p>
                    {box.interestRate > 0 && (
                      <p className="text-xs text-green-300">Interés: {box.interestRate}%</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditStart('nubank-box', idx, box.balance)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {editingAccount?.type === 'nubank-box' && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Monto"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-black"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingAccount(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Colpatria */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold dark:text-white">Colpatria</h3>
        </div>

        <div className="space-y-3">
          {accounts.colpatria.map((account, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{account.name}</p>
                  {editingAccount?.type === 'colpatria' && editingAccount?.index === idx ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Monto"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={handleSave}
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
                <button
                  onClick={() => handleEditStart('colpatria', idx, account.balance)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen Patrimonial */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total en Cuentas</p>
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
