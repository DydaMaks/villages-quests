@echo off
chcp 65001
echo 🚀 Встановлення всіх залежностей Villages Quests...
echo.

echo 📦 Встановлення та збірка Shared package...
cd packages\shared
npm install
if %errorlevel% neq 0 (
    echo ❌ Помилка встановлення Shared package
    pause
    exit /b 1
)

echo 🔨 Збірка Shared package...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Помилка збірки Shared package
    pause
    exit /b 1
)

echo 📦 Встановлення Backend...
cd ..\backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Помилка встановлення Backend
    pause
    exit /b 1
)

echo 📦 Встановлення Web frontend...
cd ..\web
npm install
if %errorlevel% neq 0 (
    echo ❌ Помилка встановлення Web
    pause
    exit /b 1
)

echo 📦 Встановлення Mobile app...
cd ..\mobile
npm install
if %errorlevel% neq 0 (
    echo ❌ Помилка встановлення Mobile
    pause
    exit /b 1
)

echo ✅ Всі залежності успішно встановлено та зібрано!
echo.
echo 🎯 Тепер ви можете запустити всі сервіси командою: start.bat
pause