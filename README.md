## ShopNova README

### Overview
ShopNova is a responsive React e-commerce frontend built with Vite and Tailwind CSS. It includes a product listing page, product details page, search/filter/sort functionality, loading states, error handling, and cart support via Context API.

### Tech Stack
- React
- Vite
- Tailwind CSS
- React Router DOM
- Context API

### Features
- Fetch products from `https://dummyjson.com/products`
- Product listing with search, category filter, and sort
- Responsive product grid
- Product details page with image gallery, quantity selector, and related products
- Loading and error states
- Reusable Tailwind UI components
- Cart integration using `CartContext`

### Project Structure
```
src/
├── api/
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

### Scripts
- `npm run dev` — start development server
- `npm run build` — build production bundle
- `npm run preview` — preview production build

### Usage
1. Install dependencies:
   `npm install`
2. Run dev server:
   `npm run dev`
3. Open browser at `http://localhost:5173`

### Notes
- Uses existing Tailwind theme variables in index.css
- Routes supported:
  - `/products`
  - `/products/:id`

This README is a simple summary to describe your project and how to run it.
