import { Trash2 } from 'lucide-react';
import { useFinance } from '../hooks/useFinance';

const PAYMENT_METHOD_ICONS = {
  'NU': '💜',
  'Nequi': '📱',
  'Colpatria': '🏦',
  'Efectivo': '💵',
};

const INCOME_CATEGORY_ICONS = {
  'Celular': '📱',
  'Abono padres': '👨‍👩‍👧',
  'Spotify': '🎵',
  'Apple': '🍎',
};

export function TransactionList({ transactions, onDelete }) {
  const { EXPENSE_CATEGORIES } = useFinance();
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

  const getCategoryIcon = (transaction) => {
    if (transaction.type === 'loan') return '🤝';
    if (transaction.type === 'transfer') return '🔄';
    if (transaction.type === 'income') return INCOME_CATEGORY_ICONS[transaction.category] || '📊';

    const categoryObj = EXPENSE_CATEGORIES[transaction.category];
    return categoryObj?.name.charAt(0) || '📌';
  };

  const getCategoryDisplay = (transaction) => {
    if (transaction.type === 'loan') return `Préstamo a ${transaction.recipient}`;
    if (transaction.type === 'transfer') return `Transferencia`;
    if (transaction.type === 'income') return transaction.category;

    const categoryObj = EXPENSE_CATEGORIES[transaction.category];
    const catName = categoryObj?.name.split(' ')[0] || 'Gasto';
    return `${catName} - ${transaction.subcategory || 'Sin especificar'}`;
  };

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`flex items-center justify-between p-4 rounded-lg hover:opacity-90 transition ${
            transaction.type === 'loan'
              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
              : transaction.type === 'transfer'
              ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
              : 'bg-gray-50 dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">
              {getCategoryIcon(transaction)}
            </span>
            <div className="flex-1">
              <p className="font-medium dark:text-white">{getCategoryDisplay(transaction)}</p>
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
              {transaction.type === 'income' || transaction.type === 'loan' ? '+' : '-'}$
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
