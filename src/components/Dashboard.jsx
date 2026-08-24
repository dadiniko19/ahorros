import { TrendingUp, TrendingDown, Wallet, Zap } from 'lucide-react';

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
              <p className="text-sm text-gray-600 dark:text-gray-400">Lo que debes</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${safe(totalDebt).toLocaleString('es-CO')}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>


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

        {safe(motoBudget) > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Presupuesto de Moto</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                ${safe(motoBudget).toLocaleString('es-CO')}
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Disponible: ${Math.max(0, safe(motoBudget) - safe(motoExpense)).toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dinero Disponible</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${safe(colpatriaBalance).toLocaleString('es-CO')}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {safe(dailyLimit) > 0 && (
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Límite Diario</p>
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                ${safe(dailyLimit).toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
