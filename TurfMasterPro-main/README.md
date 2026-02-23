# TurfMasterPro — Frontend

> React 19 + Vite 7 + Tailwind CSS 4

## Tech Stack

| Package | Purpose |
|---|---|
| `react` 19.2 | UI component library |
| `vite` 7.2 | Build tool & dev server (HMR) |
| `tailwindcss` 4.1 | Utility-first CSS framework |
| `react-router-dom` 7.10 | Client-side routing |
| `axios` 1.13 | HTTP requests to the backend API |
| `react-hook-form` 7.69 | Form handling & validation |
| `react-redux` 9.2 | Global state management |
| `date-fns` 4.1 | Date formatting utilities |
| `react-compiler` 1.0 | Automatic memoization (Babel) |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with carousel & slots |
| `/login` | `Login` | User authentication |
| `/registration` | `Registration` | New user sign-up |
| `/admin` | `Admin` | Admin CRUD dashboard |
| `/member` | *Placeholder* | Member area (WIP) |
| `/contact` | *Placeholder* | Contact page (WIP) |

## Project Layout

```
src/
├── components/        # Feature components
│   ├── Admin.jsx      #   Admin dashboard
│   ├── Carousel.jsx   #   Hero carousel
│   ├── Home.jsx       #   Home page
│   ├── Login.jsx      #   Login form
│   ├── Registration.jsx  # Sign-up form
│   ├── Slot.jsx       #   Slot booking
│   ├── Footer.jsx     #   Footer
│   └── ErrorPage.jsx  #   Error boundary
├── layout/
│   └── MainLayout.jsx # App wrapper (Header + Outlet + Footer)
├── Header.jsx         # Navigation bar
├── main.jsx           # Entry point & router
└── index.css          # Tailwind imports
```

## Environment

The frontend expects the backend API to be running on `http://localhost:8080`. To change this, update the Axios base URL in the component files.

---

*Part of the [TurfMasterPro](../README.md) project.*
