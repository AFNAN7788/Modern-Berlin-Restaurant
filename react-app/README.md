# Modern Berlin Restaurant — React Frontend

A modern, responsive restaurant website built with **React 18**, **Vite**, and **React Router**. This is the React conversion of the original vanilla HTML/CSS/JS project, with all identified issues fixed.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend API (port 5000)
```bash
cd backend
npm install
npm start
```

### 2. Start the React Frontend (port 3000)
```bash
cd react-app
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## 🛠️ Tech Stack
- **React 18** — UI library
- **Vite** — Build tool & dev server
- **React Router v6** — Client-side routing
- **Stripe.js** — Card payment processing
- **Express** — Backend API (port 5000)

## ✨ Features
- 🍽️ Responsive restaurant website
- 📋 Interactive food menu (Main Dish, Breakfast, Dessert, Fastfood)
- 🛒 Shopping cart with quantity management
- 💳 Stripe card payments + Cash on Delivery
- 📅 Table reservation with real-time time slot availability
- 🔐 User authentication (register/login/logout)
- 👤 User account with profile editing
- 💬 Contact form
- ❓ FAQ accordion
- 🍪 GDPR cookie consent banner
- 🔔 Toast notification system

## 🏗️ Project Structure
```
react-app/
├── src/
│   ├── api/           → Centralized API client
│   ├── components/    → Reusable UI components
│   ├── context/       → React contexts (Auth, Cart, Toast)
│   ├── data/          → Centralized menu data
│   ├── pages/         → Page components
│   └── styles/        → CSS styles
├── public/
│   ├── assets/        → Images and icons
│   └── fonts/         → Remix icon fonts
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Issues Fixed in This Conversion

1. **Duplicate API implementations** — Removed auth/booking duplication from `frontend/server.js`; all API calls now go through a single centralized client (`src/api/client.js`) to the backend on port 5000 via Vite proxy.

2. **Mixed authentication** — Home page is now **public**; only cart, booking, and account pages are protected via `ProtectedRoute` component.

3. **Hardcoded data** — All menu items, categories, featured dishes, services, and FAQs moved to a centralized data module (`src/data/menuData.js`).

4. **`clickedDish` flow** — When an unauthenticated user clicks "Add to Cart", the dish is saved to `localStorage.clickedDish`. After successful login, the `CartContext` automatically adds it to the cart and clears the pending dish.

5. **Mixed data origins** — Menu data now uses only Berlin-themed dishes; removed Pakistani/Desi dish remnants. Fixed "Lakry Da Dhaba" branding in privacy page.

6. **In-memory cart** — Backend cart API now persists to `backend/data/carts.json` using the same storage utility as users and bookings.