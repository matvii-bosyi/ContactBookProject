# 📒 Contact Book

Контактна книга — це веб-додаток, який дозволяє зберігати, редагувати, видаляти та шукати контакти. Простий, інтуїтивний інтерфейс і зручність у використанні.

## ⚙️ Функціонал

- ✅ Додавання нового контакту
- ✅ Перегляд списку контактів
- ✅ Редагування існуючих контактів
- ✅ Видалення контактів

## 🧱 Технології

- Frontend: **HTML / CSS / Tailwind / TypeScript** 
- Backend: **Express**
- База даних: **MongoDB**
- Пакетний менеджер: **Bun**

## 🚀 Як запустити

> Переконайся що встановлений пакетний менеджер **[bun](https://bun.sh/)**

### 1. Клонуй репозиторій

```bash
https://github.com/matvii-bosyi/ContactBookProject/tree/main
cd contact-book
````

### 2. Встанови залежності

```bash
bun install
```

### 3. Запусти локальний сервер

```bash
bun dev
```

### 4. Відкрий у браузері

```
http://localhost:5173
```

## 🧾 Структура проєкту

```bash
contact-book/
├── public/             # Статичні файли
├── src/
│   ├── components/     # UI-компоненти
│   ├── types/          # Типи TypeScript
│   ├── utils/          # Хелпери (наприклад, робота з localStorage)
│   ├── App.tsx         # Головний компонент
│   └── main.ts         # Точка входу
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── bun.lock
└── README.md
```
