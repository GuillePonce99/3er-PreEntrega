import Routes from "./router.js"
import { getTicketById, getTickets } from "../controllers/tickets.controller.js"

export default class TicketsRouter extends Routes {
    init() {
        this.get("/:tid", ["USER", "USER_PREMIUM", "ADMIN"], getTicketById)
    }
    init() {
        this.get("/", ["USER", "USER_PREMIUM", "ADMIN"], getTickets)
    }
}