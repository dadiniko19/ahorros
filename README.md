# Finance App 💰

Una aplicación moderna y móvil-first para gestionar tus finanzas personales de forma sencilla y visual. Diseñada especialmente para gestionar múltiples cuentas bancarias, ahorros, deudas y préstamos.

## Características ✨

### 💼 Gestión de Salario
✅ **Salario Base + Bono** - Configurable  
✅ **Gastos Fijos** - Arriendo y otros gastos mensuales  
✅ **Dinero Disponible** - Calcula automáticamente el dinero que puedes dispensar  
✅ **Dispensar Dinero** - Controla cuánto dinero usas cada mes  

### 🏦 Gestión de Cuentas
✅ **Ahorros Personales** - Saldo independiente  
✅ **Colpatria** - 3 cuentas con saldos diferentes  
✅ **Nu Bank** - Deuda de crédito + 2 cajas de ahorros con interés  
✅ **Préstamo a Empresa** - Con concepto especificado  

### 💳 Transacciones y Análisis
✅ **Dashboard Intuitivo** - Salario, gastos, disponible y patrimonio neto en tiempo real  
✅ **Agregar Transacciones** - Registro rápido de ingresos y gastos con categorías  
✅ **Historial Completo** - Visualiza todas tus transacciones ordenadas por fecha  
✅ **Gráficos Visuales** - Gastos por categoría y comparativa ingresos vs gastos  

### 🎨 Características Generales
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

### Gestionar Cuentas

1. Ve a la sección **Cuentas** en la navegación inferior
2. **Salario:** Visualiza tu salario base + bono (configurable)
3. **Dinero Disponible:** Ver cuánto dinero tienes sin usar
4. **Dispensar Dinero:** Agrega dinero que gastes para que se descuente automáticamente
5. **Ahorros Personales:** Edita haciendo clic en el lápiz
6. **Gastos Fijos:** Personaliza el arriendo u otros gastos fijos
7. **Préstamo Empresa:** Especifica el concepto (Ej: Equipos) y monto
8. **Nu Bank:** Gestiona deuda de crédito y cajas de ahorros (2 cajas)
9. **Colpatria:** Gestiona 3 cuentas independientes con saldos diferentes
10. **Patrimonio Neto:** Se calcula automáticamente (Cuentas - Deudas)

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
