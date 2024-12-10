const productModel = require('../models/product.model')

class ProductController {

    async create (req, res) {
        let newProduct = req.body;

        const errors = validateProduct(newProduct);
        if (errors.length > 0) return res.status(400).json({ message: 'Validations falied', errors });

        newProduct = productModel.insert(newProduct);
        return newProduct
            .then((newProduct) => res.status(200).json(newProduct))
            .catch((error) => res.status(500).json({message: `Error while insert new product`, error: error.message}))
    }

    async findAll (req, res) {
        try {
            const products = await productModel.selectAll();
            res.status(200).json(products);
        } catch (error) {
            console.log({error})
            res.status(500).json({message: "Error while find All products", error: error.message});
        }
    }

    findById (req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Product ID is required.' });
        const product = productModel.select(id);
        return product
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({message: `Error while find by id: ${id}`, error: error.message}))
    }

    async update (req, res) {
        const { id } = req.params;
        const updates = req.body;

        if (!id) return res.status(400).json({ message: 'Product ID is required.' });

        const errors = validateProductUpdated(updates);
        if (errors.length > 0) return res.status(400).json({ message: 'Validations falied', errors });

        try {
            const result = await productModel.update(id, updates);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Produto não encontrado.' });
            return res.status(200).json({ message: 'Produto updated.', updates});
        } catch (error) {
            return res.status(500).json({ message: 'Error while update product.', error: error.message });
        }
    }

    delete (req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Product ID is required.' });
  
        return productModel.delete(id)
            .then(() => res.status(200).json(true))
            .catch((error) => res.status(500).json({message: `Error while delete product: ${id}`, error: error.message}))
    }
}

function validateProduct(product) {
    const errors = [];

    if (!product.name || typeof product.name !== 'string') {
        errors.push('The field "name" is required and must be a string.');
    }
    if (product.price == null || typeof product.price !== 'number' || product.price <= 0) {
        errors.push('The field "price" is required and must be a number greater than 0.');
    }
    if (product.quantity == null || typeof product.quantity !== 'number' || product.quantity < 0) {
        errors.push('The field "quantity" is required and must be a positive number.');
    }
    if (product.status ? !['available', 'unavailable'].includes(product.status) : false) {
        errors.push('"status" must be "available" or "unavailable".');
    }

    return errors;
}

function validateProductUpdated(product) {
    const errors = [];

    if (product.name ? typeof product.name !== 'string' : false) {
        errors.push('The field "name" is required and must be a string.');
    }
    if (product.price ? (typeof product.price !== 'number' || product.price <= 0) : false ) {
        errors.push('The field "price" is required and must be a number greater than 0.');
    }
    if (product.quantity ? (typeof product.quantity !== 'number' && product.quantity < 0) : false) {
        errors.push('The field "quantity" is required and must be a positive number.');
    }
    if (product.status ? !['available', 'unavailable'].includes(product.status) : false) {
        errors.push('"status" must be "available" or "unavailable".');
    }

    return errors;
}

module.exports = new ProductController;