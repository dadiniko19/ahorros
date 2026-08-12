import { Trash2 } from 'lucide-react';

const CATEGORY_ICONS = {
  'Comida con Natha': '🍽️',
  'Deporte': '⚽',
  'Lunch de oficina': '🍱',
  'Combustible': '⛽',
  'Viaje': '✈️',
  'Transferencia a padres': '👨‍👩‍👧',
  'Ofrenda': '🙏',
  'Salud': '⚕️',
  'Motocicleta': '🏍️',
  'Temu': '📦',
  'Rushbet': '🎲',
  'Amazon': '📦',
  'Celular': '📱',
  'Abono padres': '👨‍👩‍👧',
  'Spotify': '🎵',
  'Apple': '🍎',
};

const PAYMENT_METHOD_ICONS = {
  'NU': '💜',
  'Colpatria': '🏦',
  'Efectivo': '💵',
};

export function TransactionList({ transactions, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No hay transacciones aún</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Agrega una para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`flex items-center justify-between p-4 rounded-lg hover:opacity-90 transition ${
            transaction.type === 'loan'
              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
              : 'bg-gray-50 dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">
              {transaction.type === 'loan' ? '🤝' : CATEGORY_ICONS[transaction.category] || '📌'}
            </span>
            <div className="flex-1">
              {transaction.type === 'loan' ? (
                <>
                  <p className="font-medium dark:text-white">Préstamo a {transaction.recipient}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium dark:text-white">{transaction.category}</p>
                  {transaction.paymentMethod && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {PAYMENT_METHOD_ICONS[transaction.paymentMethod]} {transaction.paymentMethod}
                    </p>
                  )}
                  {transaction.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p
              className={`font-bold text-right min-w-24 ${
                transaction.type === 'income' || transaction.type === 'loan'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {transaction.type === 'income' || transaction.type === 'loan' ? '-' : '-'}$
              {transaction.amount.toLocaleString('es-CO')}
            </p>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
