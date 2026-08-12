import { Moon, Sun, Download, Trash2 } from 'lucide-react';

export function Settings({ isDark, onThemeChange, transactions, onClearData }) {
  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('No hay transacciones para exportar');
      return;
    }

    const headers = ['Fecha', 'Tipo', 'Categoría', 'Monto', 'Descripción'];
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString('es-ES'),
      t.type === 'income' ? 'Ingreso' : 'Gasto',
      t.category,
      t.amount,
      t.description || '',
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finanzas-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleClearData = () => {
    if (window.confirm('¿Estás seguro? Esto eliminará TODAS las transacciones permanentemente.')) {
      onClearData();
      alert('Datos eliminados');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold dark:text-white">Tema</h3>
          <button
            onClick={onThemeChange}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Actual: {isDark ? 'Oscuro' : 'Claro'}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-bold mb-3 dark:text-white">Datos</h3>
        <button
          onClick={exportToCSV}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition mb-2"
        >
          <Download className="w-4 h-4" />
          Exportar a CSV
        </button>
        <button
          onClick={handleClearData}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar Todos los Datos
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Nota:</strong> Los datos se guardan localmente en tu dispositivo. No se sincroniza con servidores.
        </p>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        <p>Finance App v1.0.0</p>
      </div>
    </div>
  );
}
