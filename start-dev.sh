#!/bin/bash

# Script para ejecutar el backend y frontend en paralelo

echo "🚀 Iniciando el e-commerce..."

# Verificar si las dependencias del backend están instaladas
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

# Verificar si las dependencias del frontend están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm install
fi

# Ejecutar backend y frontend en paralelo
echo "🔧 Iniciando backend en puerto 3001..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "🎨 Iniciando frontend en puerto 5173..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo "✅ Ambos servicios iniciados!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔗 Backend: http://localhost:3001"
echo ""
echo "Presiona Ctrl+C para detener ambos servicios"

# Función para manejar la terminación
cleanup() {
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Esperar a que terminen los procesos
wait
