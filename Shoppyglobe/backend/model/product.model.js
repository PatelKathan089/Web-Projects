import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: Array,
    brand: String,
    dimensions: Object,
    warrantyInformation: String,
    shippingInformation: String,
    reviews: Array,
    images: Array,
    thumbnail: String
})

const Product = mongoose.model('products', productsSchema);
export default Product;