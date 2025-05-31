# ShoppyGlobe - E-commerce Application

ShoppyGlobe is a responsive e-commerce web application built using React and Redux. It allows users to browse a list of products, view detailed information, add/remove items to/from the cart, and proceed through a basic checkout process.

## Features

- JWT Authorization
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
- **Backend:** Node, Express, MongoDB, JWT
- **Build Tool:** Vite

## Folder Structure

```
Shoppyglobe/
│
├── backend/
|   |
│   ├── controller/                     * Routes Controllers 
│   │   ├── cart.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   │
│   ├── model/                          * Models for the data
│   |    ├── cart.model.js
│   |    ├── product.model.js
│   |    └── user.model.js
|   |
|   ├── routes/                         * RESTful API routes
|   |   ├── cart.routes.js
|   |   ├── product.routes.js
|   |   └── user.routes.js
│   |
|   ├── .env                            * .env file for secreats
│   |
|   ├── package.json                    * Npm package file
│   |
|   └── server.js                       * Main server.js file   
|
├── components/                         * React components
│ ├── Header.jsx
│ ├── ProductList.jsx
│ ├── ProductItem.jsx
│ ├── ProductDetail.jsx
│ ├── Cart.jsx
│ ├── CartItem.jsx
│ ├── NotFound.jsx
| └── Checkout.jsx
│
├── redux/                              * Redux for state management
│ ├── actions.js
│ ├── reducers.js
│ └── store.js
│
├── hooks/                              * Custom hooks
│ └── useFetch.js
│
├── App.jsx                             * App component
|                             
└── main.jsx                            * Main root file for App
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
3. Create .env file in your backend
    ```
    SECRET_KEY = <Set your 256 bit key>
    MONGODB_URI = <Set your MongoDB connection string>
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the development server and backend server:
    ```bash
    npm run dev
    ```
    ```bash
    node --watch server.js
    ```
    The app will run on http://localhost:5173/.
    
    The app's backend server will run on http://localhost:300/.

## Github Link

[https://github.com/PatelKathan089/Web-Projects/tree/master/online_library_system](https://github.com/PatelKathan089/Web-Projects/tree/master/online_library_system)

## License

This project is licensed under the **MIT** License.
