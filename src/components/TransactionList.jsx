import { Trash2 } from 'lucide-react';

const CATEGORY_ICONS = {
  'Comida': '🍔',
  'Transporte': '🚗',
  'Entretenimiento': '🎬',
  'Servicios': '🏠',
  'Salud': '⚕️',
  'Educación': '📚',
  'Compras': '🛍️',
  'Salario': '💼',
  'Freelance': '💻',
  'Inversiones': '📈',
  'Regalo': '🎁',
  'Venta': '💰',
  'Otros': '📌',
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
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">
              {CATEGORY_ICONS[transaction.category] || '📌'}
            </span>
            <div className="flex-1">
              <p className="font-medium dark:text-white">{transaction.category}</p>
              {transaction.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.description}
                </p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {formatDate(transaction.date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p
              className={`font-bold text-right min-w-20 ${
                transaction.type === 'income'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
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
