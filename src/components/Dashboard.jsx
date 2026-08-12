import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function Dashboard({ income, expense, balance }) {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${income.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gastos</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${expense.toFixed(2)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className={`${balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} rounded-lg p-4 border ${balance >= 0 ? 'border-blue-200 dark:border-blue-800' : 'border-orange-200 dark:border-orange-800'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saldo</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                ${balance.toFixed(2)}
              </p>
            </div>
            <Wallet className={`w-8 h-8 ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
