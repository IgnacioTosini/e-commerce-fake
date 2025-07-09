@echo off
title E-commerce Development

echo 🚀 Iniciando el e-commerce...

REM Verificar si las dependencias del backend están instaladas
if not exist "backend\node_modules\" (
    echo 📦 Instalando dependencias del backend...
    cd backend && npm install && cd ..
)

REM Verificar si las dependencias del frontend están instaladas
if not exist "node_modules\" (
    echo 📦 Instalando dependencias del frontend...
    npm install
)

echo 🔧 Iniciando backend en puerto 3001...
start "Backend" cmd /c "cd backend && npm run dev"

echo 🎨 Iniciando frontend en puerto 5173...
start "Frontend" cmd /c "npm run dev"

echo ✅ Ambos servicios iniciados!
echo 🌐 Frontend: http://localhost:5173
echo 🔗 Backend: http://localhost:3001
echo.
echo Presiona cualquier tecla para continuar...
pause >nul
