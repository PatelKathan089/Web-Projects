import Product from "../model/product.model.js"

export const productsController = async (req, res) => {
    try {
        // Get all products from mongoDB:-
        let products = await Product.find({});

        // If producuts don't exist in monogoDB then added to the mongoDB by server:-
        if (products.length == 0) {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();
            products = data.products;
            await Product.insertMany(products);
        }

        // Send all products
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error while fetching products", error: err })
    }
}

export const productController = async (req, res) => {
    try {
        // Find product by it's Id:-
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).json({ message: "Product not found in the database!" })
        }
    } catch (err) {
        res.status(500).json({ message: 'Server internal error!', error: err })
    }
}