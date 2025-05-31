import { getCart, addCart, editCart, deleteCart } from "../controller/cart.controller.js";
import { verifyToken } from '../controller/user.controller.js'

const cartRoutes = (app) => {
    app.get('/cart', verifyToken, getCart);
    app.post('/cart', verifyToken, addCart);
    app.put('/cart', verifyToken, editCart);
    app.delete('/cart', verifyToken, deleteCart);
}

export default cartRoutes;