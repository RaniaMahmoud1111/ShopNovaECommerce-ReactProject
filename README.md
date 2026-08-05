# ShopNova

## Overview
ShopNova is a polished React e-commerce frontend built with Vite and Tailwind CSS. The app offers a smooth shopping experience with product browsing, product details, filtering, sorting, and cart management.

## Key Features
- Fetches product data from `https://dummyjson.com/products`
- Search, category filter, and sorting options
- Responsive product grid for mobile and desktop
- Product details page with image carousel and quantity selection
- Loading and error states for better UX
- Shopping cart powered by React Context API

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router DOM
- Context API

## Project Structure
```
src/
├── assets/
├── components/
│   ├── Button.jsx
│   ├── FilterBar.jsx
│   ├── Loader.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── ...
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailsPage.jsx
│   └── ...
├── App.jsx
└── main.jsx
```

## Run the project
1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`
3. Open browser at `http://localhost:5173`

## Available scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run preview` — preview production build

## Supported routes
- `/products`
- `/products/:id`
