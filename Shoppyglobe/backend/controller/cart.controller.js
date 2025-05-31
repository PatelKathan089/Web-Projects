import Cart from "../model/cart.model.js"

export const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({});
        if (!cartItems) {
            return res.status(404).json({ message: "CartItems don't exist" })
        } else {
            return res.status(200).send(cartItems);
        }
    } catch (err) {
        return res.status(500).json({ message: "Server's internal error" })
    }
}

export const addCart = async (req, res) => {
    try {
        const cartItems = req.body;
        if (cartItems) {
            const cartItem = new Cart(cartItems);
            await cartItem.save();
            res.status(201).json({ message: "cartItem added successfully!" })
        } else {
            res.status(404).json({ message: "Cart item is empty!" })
        }
    } catch (err) {
        res.status(500).json({ message: "Server's internal error!" })
    }
}

export const editCart = async (req, res) => {
    try {
        const { id, sign } = req.body;
        let cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).json({ message: "cartItem not founded!" })
        }

        if (sign === '+') {

            await Cart.updateOne({ _id: id }, { $inc: { qty: 1 } })

        } else if (sign === '-' && cartItem.qty > 1) {

            await Cart.updateOne({ _id: id }, { $inc: { qty: -1 } })
        }

        return res.status(201).json({ message: "Your cartItem's qty updated", qty: cartItem.qty })

    } catch (err) {
        return res.status(500).json({ message: "Server's internal error!" })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { id, sign } = req.body
        const cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).json({ message: "cartItem not founded!" })
        }

        if (sign === '-' && cartItem.qty === 1) {
            const deletedItem = await Cart.findByIdAndDelete(id);
            return res.status(201).json({ message: "cartItem deleted successfully!", deletedItem: deletedItem })
        }

    } catch (err) {
        return res.status(500).json({ message: "Server's internal error!" })
    }
}