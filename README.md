# Finance App 💰

Una aplicación moderna y móvil-first para gestionar tus finanzas de forma sencilla y visual.

## Características ✨

✅ **Dashboard Intuitivo** - Visualiza tus ingresos, gastos y saldo en tiempo real  
✅ **Agregar Transacciones** - Registro rápido de ingresos y gastos con categorías  
✅ **Historial Completo** - Visualiza todas tus transacciones ordenadas por fecha  
✅ **Gráficos Visuales** - Gráfico de pastel de gastos por categoría y gráfico de barras mensual  
✅ **Tema Oscuro/Claro** - Cambia entre temas según prefieras  
✅ **Exportar Datos** - Descarga tus transacciones en formato CSV  
✅ **Almacenamiento Local** - Tus datos se guardan en tu dispositivo, sin servidores  
✅ **Responsive** - Funciona perfectamente en móvil, tablet y escritorio  
✅ **Progressive Web App (PWA)** - Úsalo como una app nativa, funciona offline  

## Instalación 🚀

### Requisitos previos
- Node.js 16+ instalado

### Pasos de instalación

```bash
# 1. Navega a la carpeta del proyecto
cd finance-app

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## Uso 📱

### Agregar una transacción

1. Haz clic en el botón flotante **+** azul en la esquina inferior derecha
2. Selecciona el tipo: **Ingreso** o **Gasto**
3. Ingresa el monto
4. Selecciona una categoría
5. Agrega una descripción (opcional)
6. Haz clic en "Agregar Transacción"

### Categorías disponibles

**Gastos:**
- Comida
- Transporte
- Entretenimiento
- Servicios
- Salud
- Educación
- Compras
- Otros

**Ingresos:**
- Salario
- Freelance
- Inversiones
- Regalo
- Venta
- Otros

### Navegar por la app

- **Inicio** (🏠) - Dashboard y historial de transacciones
- **Gráficos** (📊) - Visualización de gastos por categoría e ingresos vs gastos mensuales
- **Ajustes** (⚙️) - Cambiar tema, exportar datos o eliminar todo

### Eliminar una transacción

Haz clic en el ícono de basura rojo al lado de cualquier transacción para eliminarla.

## Tecnologías utilizadas 🛠️

- **React 18** - Framework frontend
- **Vite** - Bundler ultrarrápido
- **Tailwind CSS v4** - Estilos responsive
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos modernos
- **LocalStorage API** - Almacenamiento de datos

## Estructura del proyecto 📁

```
finance-app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Dashboard.jsx    # Panel de resumen
│   │   ├── TransactionForm.jsx # Formulario de transacciones
│   │   ├── TransactionList.jsx # Lista de transacciones
│   │   ├── Charts.jsx       # Gráficos
│   │   ├── Navigation.jsx   # Navegación inferior
│   │   └── Settings.jsx     # Configuración
│   ├── hooks/
│   │   └── useFinance.js    # Hook personalizado para gestionar finanzas
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos Tailwind
├── public/
│   ├── manifest.json        # Manifest de PWA
│   └── sw.js                # Service Worker
├── .claude/
│   └── launch.json          # Configuración del dev server
├── index.html               # HTML principal
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
└── postcss.config.js        # Configuración de PostCSS
```

## Almacenamiento de datos 🔒

Todos tus datos se guardan **localmente en tu navegador** usando localStorage. Esto significa:
- ✅ Tu información nunca se envía a servidores
- ✅ Tus datos persisten incluso si cierras la app
- ✅ Funciona completamente offline
- ⚠️ Los datos se pierden si limpias el almacenamiento del navegador

## Exportar tus datos 📥

1. Ve a **Ajustes**
2. Haz clic en **Exportar a CSV**
3. Se descargará un archivo CSV que puedes abrir en Excel o importar a otra aplicación

## Scripts disponibles 🖥️

```bash
# Inicia el servidor de desarrollo
npm run dev

# Compila para producción
npm run build

# Previsualiza la compilación
npm run preview
```

## Instalar como PWA 📲

### En Android
1. Abre la app en Chrome
2. Toca el menú (⋮)
3. Selecciona "Instalar aplicación"

### En iOS
1. Abre la app en Safari
2. Toca Compartir
3. Selecciona "Agregar a pantalla de inicio"

## Próximas mejoras potenciales 🚀

- Sincronización con Google Drive o Dropbox
- Presupuestos y alertas
- Múltiples cuentas/usuarios
- Filtros avanzados
- Reportes mensuales
- Autenticación biométrica

## Licencia 📄

Proyecto libre para uso personal.

## ¿Preguntas? 💬

Si tienes dudas o sugerencias, siéntete libre de modificar el código según tus necesidades.

---

**Finance App v1.0.0** - Hecho con ❤️ para ayudarte a gestionar tus finanzas
