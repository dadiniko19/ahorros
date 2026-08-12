import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function Dashboard({
  totalSalary = 0,
  expense = 0,
  availableBalance = 0,
  totalAccounts = 0,
  totalDebt = 0,
  netWorth = 0
}) {
  const safe = (value) => isNaN(value) ? 0 : value;

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Salario Total</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${safe(totalSalary).toLocaleString('es-CO')}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gastos del Mes</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${safe(expense).toLocaleString('es-CO')}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className={`${safe(availableBalance) >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} rounded-lg p-4 border ${safe(availableBalance) >= 0 ? 'border-blue-200 dark:border-blue-800' : 'border-orange-200 dark:border-orange-800'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Disponible</p>
              <p className={`text-2xl font-bold ${safe(availableBalance) >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                ${safe(availableBalance).toLocaleString('es-CO')}
              </p>
            </div>
            <Wallet className={`w-8 h-8 ${safe(availableBalance) >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Patrimonio Neto</p>
              <p className={`text-2xl font-bold ${safe(netWorth) >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`}>
                ${safe(netWorth).toLocaleString('es-CO')}
              </p>
            </div>
            <Wallet className={`w-8 h-8 ${safe(netWorth) >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
