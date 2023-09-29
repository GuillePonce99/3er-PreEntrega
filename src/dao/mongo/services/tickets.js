import TicketsModel from "../models/tickets.model.js"
import UserModel from "../models/users.model.js"
import CartsModel from "../models/carts.model.js"
import ProductModel from "../models/products.model.js"
import jwt from "jsonwebtoken"
import Config from "../../../config/config.js"

export default class Tickets {
    constructor() { }

    getTickets = async (token, res) => {
        const userToken = jwt.verify(token, Config.COOKIE_KEY)
        const tickets = await TicketsModel.find({ "purchaser": userToken.email }).lean()
        return tickets
    }

    getTicketById = async (tid, res) => {
        const ticket = await TicketsModel.findById(tid)
        if (!ticket) {
            res.status(404).json({ message: "Not Found" })
        } else {
            res.status(200).json({ message: "success", ticket })
        }
    }

    createTicket = async (code, token, cid, res) => {
        const userToken = jwt.verify(token, Config.COOKIE_KEY)

        const user = await UserModel.findOne({ "email": userToken.email })
        const cart = await CartsModel.findById(cid)

        const price = []
        const ids = []
        const notProducts = []
        const products = []

        cart.products.map(async (prod) => {
            const product = prod.product
            const quantity = prod.quantity

            if (product.stock >= quantity) {
                price.push(product.price * quantity)
                products.push(prod)
                const newStock = product.stock - quantity
                product.stock = newStock
                await ProductModel.updateOne({ "code": product.code }, product)

            } else {

                let productId = product._id.toString()
                ids.push(productId)
                notProducts.push(prod)
            }
        })
        cart.products = notProducts
        cart.save()

        let total = price.reduce((acc, currentValue) => acc + currentValue, 0);

        if (products.length != 0) {
            const ticket = {
                code,
                amount: total,
                purchaser: user.email,
            }

            const newTicket = await TicketsModel.create(ticket)

            res.status(200).json({ message: "success", ticket: newTicket, ids })
        } else {
            res.status(400).json({ message: "Sin stock", ids })
        }

    }
}