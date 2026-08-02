# Modern Berlin Restaurant

A modern, responsive restaurant web application built with **React 18** and **Express**. This project delivers a premium dining experience with an interactive menu, cart, table reservations, user authentication, and secure payments.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)

---

## Description

Modern Berlin Restaurant is a full-stack web application inspired by Berlin’s culinary scene. It features a dark luxury theme with gold accents, offering customers an immersive way to browse the menu, reserve tables, manage their cart, and place orders — all from a smooth, single-page React interface backed by a lightweight Express API with file-based JSON storage.

### Key Features
- Interactive food menu with categories (Main Dish, Breakfast, Dessert, Fastfood)
- Shopping cart with quantity management
- Table reservation with real-time time slot availability
- Secure user authentication (register / login / logout)
- Online payments via Stripe + Cash on Delivery fallback
- User account page with profile editing
- Contact form and FAQ accordion
- GDPR cookie consent banner
- Toast notification system

---

## Tech Stack

### Frontend (`react-app/`)
| Tool / Library | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI library |
| React Router | 6.26.2 | Client-side routing |
| Vite | 5.4.8 | Build tool & dev server |
| Stripe.js | 4.4.0 | Card payment processing |

### Backend (`backend/`)
| Tool / Library | Version | Purpose |
|---|---|---|
| Express | 5.1.0 | REST API server |
| bcryptjs | 3.0.2 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| cors | 2.8.5 | Cross-origin requests |
| dotenv | 16.5.0 | Environment variables |
| stripe | 14.0.0 | Payment intents |

---

## Project Structure

```
Modern Berlin Restaurant/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   ├── .env
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── cart.js
│   │   └── payments.js
│   ├── utils/
│   │   └── storage.js
│   └── data/
│       ├── users.json
│       ├── bookings.json
│       └── carts.json
├── react-app/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   │   ├── assets/
│   │   └── fonts/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       └── styles/
└── .gitignore
```

---

## Getting Started

### Prerequisites
- **Node.js** 18 or later
- **npm** (comes with Node.js)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/AFNAN7788/Modern-Berlin-Restaurant.git
cd Modern-Berlin-Restaurant
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
cd ..
```

**Frontend:**
```bash
cd react-app
npm install
cd ..
```

### 3. Environment Variables

The backend requires a `.env` file. Copy the example and configure it:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
PORT=5000
JWT_SECRET=your-secure-jwt-secret-here

# Optional: Stripe keys (leave commented if you only want Cash on Delivery)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Run the Development Servers

Open **two separate terminal windows** (or tabs):

**Terminal 1 — Backend API (port 5000):**
```bash
cd backend
npm start
```

**Terminal 2 — React Frontend (port 3000):**
```bash
cd react-app
npm run dev
```

### 5. Open the App

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

The frontend proxies all `/api` requests to the backend at `http://localhost:5000` via Vite’s dev server configuration.

---

## Available Scripts

### Backend (`backend/`)
| Script | Command | Description |
|---|---|---|
| Start | `npm start` | Starts the Express server on port 5000 |

### Frontend (`react-app/`)
| Script | Command | Description |
|---|---|---|
| Dev | `npm run dev` | Starts Vite dev server on port 3000 |
| Build | `npm run build` | Creates production build in `dist/` |
| Preview | `npm run preview` | Previews the production build |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user, returns JWT |
| GET | `/api/bookings/slots?date=YYYY-MM-DD` | Get available time slots |
| POST | `/api/bookings` | Create a table booking |
| GET | `/api/bookings?email=...` | Get bookings by email |
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add item to cart |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| GET | `/api/payments/config` | Get Stripe publishable key |
| POST | `/api/payments/create-payment-intent` | Create Stripe payment intent |

---


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
