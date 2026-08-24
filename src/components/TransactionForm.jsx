import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useFinance } from '../hooks/useFinance';

const CATEGORIES_INCOME = [
  'Celular',
  'Abono padres',
  'Spotify',
  'Apple',
];

const PAYMENT_METHODS = [
  'NU',
  'Nequi',
  'Colpatria',
  'Efectivo',
];

export function TransactionForm({ onAdd, isOpen, onClose }) {
  const finance = useFinance();
  const { EXPENSE_CATEGORIES, accounts } = finance;
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [description, setDescription] = useState('');
  const [noShowUpdates, setNoShowUpdates] = useState(false);

  // Para préstamos
  const [loanRecipient, setLoanRecipient] = useState('');

  // Para transferencias entre cuentas
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const expenseCategories = Object.entries(EXPENSE_CATEGORIES).map(([key, val]) => ({
    key,
    ...val,
  }));

  const isTransfer = transactionType === 'transfer';
  const isLoan = transactionType === 'loan';
  const categories = transactionType === 'income' ? CATEGORIES_INCOME : expenseCategories;
  const showPaymentMethod = !isTransfer && !isLoan;

  const currentSubcategories = category && transactionType === 'expense'
    ? EXPENSE_CATEGORIES[category]?.subcategories || []
    : [];

  // Obtener lista de cuentas disponibles
  const getAvailableAccounts = () => {
    const accs = [];

    if (accounts.nubank?.savingsBoxes) {
      accounts.nubank.savingsBoxes.forEach((box, idx) => {
        accs.push({
          id: `nu_${idx}`,
          name: box.name,
          balance: box.balance,
        });
      });
    }

    if (accounts.nequi?.balance >= 0) {
      accs.push({
        id: 'nequi',
        name: 'Nequi',
        balance: accounts.nequi.balance,
      });
    }

    if (accounts.cash?.balance >= 0) {
      accs.push({
        id: 'cash',
        name: 'Efectivo',
        balance: accounts.cash.balance,
      });
    }

    if (accounts.colpatria) {
      accounts.colpatria.forEach((acc, idx) => {
        accs.push({
          id: `colpatria_${idx}`,
          name: acc.name,
          balance: acc.balance,
        });
      });
    }

    return accs;
  };

  const availableAccounts = getAvailableAccounts();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert('Por favor ingresa el monto');
      return;
    }

    if (isTransfer) {
      if (!fromAccount) {
        alert('Selecciona cuenta de origen');
        return;
      }
      if (!toAccount) {
        alert('Selecciona cuenta de destino');
        return;
      }
      if (fromAccount === toAccount) {
        alert('La cuenta origen y destino deben ser diferentes');
        return;
      }

      onAdd({
        type: 'transfer',
        amount: parseFloat(amount),
        fromAccount,
        toAccount,
        description,
      });
    } else if (isLoan) {
      if (!loanRecipient) {
        alert('Por favor especifica a quién le prestaste');
        return;
      }
      onAdd({
        type: 'loan',
        amount: parseFloat(amount),
        recipient: loanRecipient,
      });
    } else {
      if (!category) {
        alert('Por favor selecciona una categoría');
        return;
      }
      if (transactionType === 'expense' && !subcategory) {
        alert('Por favor selecciona una subcategoría');
        return;
      }
      if (!paymentMethod) {
        alert('Por favor selecciona el método de pago');
        return;
      }

      onAdd({
        type: transactionType,
        amount: parseFloat(amount),
        category: transactionType === 'expense' ? category : category,
        subcategory: transactionType === 'expense' ? subcategory : undefined,
        paymentMethod,
        description,
      });
    }

    setAmount('');
    setCategory('');
    setSubcategory('');
    setPaymentMethod('');
    setDescription('');
    setLoanRecipient('');
    setFromAccount('');
    setToAccount('');
    setNoShowUpdates(false);
    setTransactionType('expense');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-white dark:bg-gray-900 rounded-t-2xl p-6 max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Nueva Transacción</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setTransactionType('income');
                setCategory('');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                transactionType === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Ingreso
            </button>
            <button
              type="button"
              onClick={() => {
                setTransactionType('expense');
                setCategory('');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                transactionType === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Gasto
            </button>
            <button
              type="button"
              onClick={() => {
                setTransactionType('transfer');
                setCategory('');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                transactionType === 'transfer'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Transferir
            </button>
            <button
              type="button"
              onClick={() => {
                setTransactionType('loan');
                setCategory('');
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                transactionType === 'loan'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Préstamo
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Monto *
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isTransfer ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Cuenta de Origen *
                </label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona cuenta</option>
                  {availableAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} (${acc.balance.toLocaleString('es-CO')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Cuenta de Destino *
                </label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona cuenta</option>
                  {availableAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} (${acc.balance.toLocaleString('es-CO')})
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : isLoan ? (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                ¿A quién le prestaste? *
              </label>
              <input
                type="text"
                value={loanRecipient}
                onChange={(e) => setLoanRecipient(e.target.value)}
                placeholder="Nombre de la persona"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  {transactionType === 'income' ? 'Tipo de Ingreso' : 'Categoría Principal'} *
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una opción</option>
                  {transactionType === 'income' ? (
                    CATEGORIES_INCOME.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))
                  ) : (
                    expenseCategories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {transactionType === 'expense' && currentSubcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Subcategoría *
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una opción</option>
                    {currentSubcategories.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {showPaymentMethod && (
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                    Método de Pago *
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona método</option>
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Detalles adicionales"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noShowUpdates"
                  checked={noShowUpdates}
                  onChange={(e) => setNoShowUpdates(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="noShowUpdates" className="text-sm text-gray-600 dark:text-gray-400">
                  No mostrar en historial
                </label>
              </div>
            </>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
            >
              Agregar {isTransfer ? 'Transferencia' : isLoan ? 'Préstamo' : 'Transacción'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
