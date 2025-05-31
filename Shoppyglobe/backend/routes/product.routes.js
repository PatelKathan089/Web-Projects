import { productController, productsController } from "../controller/product.controller.js";
import { verifyToken } from "../controller/user.controller.js";

const productRoutes = (app) => {
    app.get('/products', verifyToken, productsController);
    app.get('/products/:id', productController);
}

export default productRoutes;