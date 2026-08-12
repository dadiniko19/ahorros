import { Home, BarChart3, Settings, Plus, Wallet } from 'lucide-react';

export function Navigation({ currentPage, onPageChange, onAddClick }) {
  return (
    <>
      <button
        onClick={onAddClick}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 overflow-x-auto">
        <div className="flex justify-around min-w-max sm:min-w-0">
          <button
            onClick={() => onPageChange('home')}
            className={`flex-1 py-3 px-3 flex flex-col items-center gap-1 transition whitespace-nowrap ${
              currentPage === 'home'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
          <button
            onClick={() => onPageChange('accounts')}
            className={`flex-1 py-3 px-3 flex flex-col items-center gap-1 transition whitespace-nowrap ${
              currentPage === 'accounts'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-medium">Cuentas</span>
          </button>
          <button
            onClick={() => onPageChange('charts')}
            className={`flex-1 py-3 px-3 flex flex-col items-center gap-1 transition whitespace-nowrap ${
              currentPage === 'charts'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Gráficos</span>
          </button>
          <button
            onClick={() => onPageChange('settings')}
            className={`flex-1 py-3 px-3 flex flex-col items-center gap-1 transition whitespace-nowrap ${
              currentPage === 'settings'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium">Ajustes</span>
          </button>
        </div>
      </nav>
    </>
  );
}
