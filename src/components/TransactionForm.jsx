import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CATEGORIES_INCOME = [
  'Celular',
  'Abono padres',
  'Spotify',
  'Apple',
];

const CATEGORIES_EXPENSE = [
  'Comida con Natha',
  'Deporte',
  'Lunch de oficina',
  'Combustible',
  'Viaje',
  'Transferencia a padres',
  'Ofrenda',
  'Salud',
  'Motocicleta',
  'Temu',
  'Rushbet',
  'Amazon',
];

const PAYMENT_METHODS = [
  'NU',
  'Colpatria',
  'Efectivo',
];

export function TransactionForm({ onAdd, isOpen, onClose }) {
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [description, setDescription] = useState('');

  // Para préstamos
  const [loanRecipient, setLoanRecipient] = useState('');

  const categories = transactionType === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;
  const showPaymentMethod = transactionType !== 'loan';
  const isLoan = transactionType === 'loan';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert('Por favor ingresa el monto');
      return;
    }

    if (isLoan) {
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
      if (!paymentMethod) {
        alert('Por favor selecciona el método de pago');
        return;
      }

      onAdd({
        type: transactionType,
        amount: parseFloat(amount),
        category,
        paymentMethod,
        description,
      });
    }

    setAmount('');
    setCategory('');
    setPaymentMethod('');
    setDescription('');
    setLoanRecipient('');
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

          {isLoan ? (
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
                  {transactionType === 'income' ? 'Tipo de Ingreso' : 'Concepto de Gasto'} *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una opción</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

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
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            Agregar {isLoan ? 'Préstamo' : 'Transacción'}
          </button>
        </form>
      </div>
    </div>
  );
}
