import { productsServices } from "../repositories/index.js"

export const getProducts = async (req, res) => {
    return await productsServices.getProducts(req, res)
}
export const getProductById = async (req, res) => {
    return await productsServices.getProductById(req, res)
}
export const addProduct = async (req, res) => {
    return await productsServices.addProduct(req, res)
}
export const deleteProduct = async (req, res) => {
    return await productsServices.deleteProduct(req, res)
}
export const updateProduct = async (req, res) => {
    return await productsServices.updateProduct(req, res)
}
export const getProductsView = async (req, res) => {
    return await productsServices.getProductsView(req, res)
}

