# ShoppyGlobe - E-commerce Application

ShoppyGlobe is a responsive e-commerce web application built using React and Redux. It allows users to browse a list of products, view detailed information, add/remove items to/from the cart, and proceed through a basic checkout process.

## Features

- Product listing fetched from a public API
- Search functionality to filter products
- Add to cart, update quantity, and remove items
- Checkout page with order summary
- Product detail view with dynamic routing
- 404 Not Found page for unmatched routes
- Redux-based global state management
- Lazy loading with `React.lazy` and `Suspense`
- Fully responsive and styled using TailwindCSS

## Tech Stack

- **Frontend:** React, Redux, React Router
- **Styling:** TailwindCSS
- **Data Source:** [DummyJSON API](https://dummyjson.com/products)
- **State Management:** Redux
- **Build Tool:** Vite

## Folder Structure

```
Shoppyglobe/
│
├── components/
│ ├── Header.jsx
│ ├── ProductList.jsx
│ ├── ProductItem.jsx
│ ├── ProductDetail.jsx
│ ├── Cart.jsx
│ ├── CartItem.jsx
│ ├── NotFound.jsx
| └── Checkout.jsx
│
├── redux/
│ ├── actions.js
│ ├── reducers.js
│ └── store.js
│
├── hooks/
│ └── useProductList.js
│
├── App.jsx
└── main.jsx
```

## How to Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/PatelKathan089/Web-Projects.git
    ```
2. Navigate to the project folder:
    ```bash
    cd Web-Projects/online_library_system
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
    The app will run on http://localhost:5173.

## Github Link

[https://github.com/PatelKathan089/Web-Projects/tree/master/online_library_system](https://github.com/PatelKathan089/Web-Projects/tree/master/online_library_system)

## License

This project is licensed under the **MIT** License.
