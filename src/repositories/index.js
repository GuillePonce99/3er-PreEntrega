import { Products } from "../dao/factory.js";
import { Carts } from "../dao/factory.js";
import { Sessions } from "../dao/factory.js";

import CartReposity from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import SessionRepository from "./session.repository.js"

export const productsServices = new ProductRepository(new Products())
export const cartsServices = new CartReposity(new Carts())
export const sessionsServices = new SessionRepository(new Sessions())