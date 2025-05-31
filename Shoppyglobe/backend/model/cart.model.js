import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title: String,
    brand: String,
    description: String,
    rating: Number,
    tags: Array,
    stock: Number,
    warrantyInformation: String,
    shippingInformation: String,
    discountPercentage: Number,
    price: Number,
    qty: { type: Number, default: 1 },
    thumbnail: String
})

const Cart = mongoose.model('carts', cartSchema);
export default Cart;