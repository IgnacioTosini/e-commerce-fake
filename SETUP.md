# E-commerce con MercadoPago

## Estructura del proyecto

```
e-commerce-fake/
├── src/                    # Frontend React
├── backend/               # Backend Node.js + Express
│   ├── server.js         # Servidor API
│   ├── package.json      # Dependencias backend
│   └── .env              # Variables backend
├── package.json          # Dependencias frontend
└── .env                  # Variables frontend
```

## Configuración

### 1. Backend (MercadoPago)

1. Ve a [MercadoPago Developers](https://www.mercadopago.com/developers)
2. Crea una aplicación
3. Copia el access token de TEST
4. Edita `backend/.env` y reemplaza `TEST-tu-access-token-aqui`

### 2. Frontend (Firebase)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un proyecto
3. Copia las credenciales
4. Edita `.env` y reemplaza los valores

## Instalación

```bash
# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd backend && npm install
```

## Ejecución

### Opción 1: Script automático (Windows)
```cmd
start-dev.bat
```

### Opción 2: Script automático (Linux/Mac)
```bash
./start-dev.sh
```

### Opción 3: Manual

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

## URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **API MercadoPago**: http://localhost:3001/api/mercadopago/create-preference

## Flujo de pago

1. Usuario agrega productos al carrito
2. Hace clic en "Proceder al Pago"
3. Se crea una orden en Firebase
4. Se genera una preferencia de pago en MercadoPago
5. Usuario es redirigido a MercadoPago
6. Después del pago, regresa a la aplicación

## Variables de entorno

### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=tu-api-key
# ... otras variables de Firebase
```

### Backend (`backend/.env`)
```env
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-access-token-aqui
PORT=3001
FRONTEND_URL=http://localhost:5173
```
