@echo off
chcp 65001
title 🏞️ Villages Quests - Full Stack
echo 🚀 Запуск всіх сервісів Villages Quests...
echo.

echo 🔄 Перевірка MongoDB підключення...
timeout /t 2 /nobreak >nul

echo.
echo 📊 Запуск Backend API (порт 5000)...
start "Backend API" cmd /k "cd packages\backend && npm run dev"

echo 📱 Запуск Web Frontend (порт 3000)...
timeout /t 3 /nobreak >nul
start "Web Frontend" cmd /k "cd packages\web && npm run dev"

echo 📱 Запуск Mobile Development (порт 8081)...
timeout /t 3 /nobreak >nul
start "Mobile Expo" cmd /k "cd packages\mobile && npm start"

echo.
echo ⏳ Зачекайте 10-15 секунд для повного запуску...
timeout /t 10 /nobreak >nul

echo.
echo 🌐 ============================================
echo 🌐 Villages Quests - Усі сервіси запускаються!
echo 🌐 ============================================
echo.
echo 📊 Backend API:    http://localhost:5000
echo 📊 Health Check:   http://localhost:5000/api/health
echo 📊 Seed Data:      http://localhost:5000/api/seed (POST)
echo.
echo 🌐 Web Frontend:   http://localhost:3000
echo.
echo 📱 Mobile App:     exp://localhost:8081
echo 📱 QR Code:        Відкриється в Expo Dev Tools
echo.
echo ⚠️  Переконайтеся, що MongoDB працює!
echo ⚠️  Для Mobile: Встановіть Expo Go на телефон
echo.
echo 🎯 Використовуйте Ctrl+C в кожному вікні для зупинки
echo.

pause