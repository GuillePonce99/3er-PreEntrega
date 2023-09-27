import Config from "../config/config.js";
export let Products
export let Carts
export let Sessions

switch (Config.PERSISTENCE) {
    case "MONGO":
        console.log("PERSISTENCIA: ", Config.PERSISTENCE);
        const { default: ProductMongo } = await import("./mongo/services/products.js")
        const { default: CartsMongo } = await import("./mongo/services/carts.js")
        const { default: SessionsMongo } = await import("./mongo/services/sessions.js")
        Products = ProductMongo
        Carts = CartsMongo
        Sessions = SessionsMongo
        break;

    case "MEMORY":
        console.log("PERSISTENCIA: ", Config.PERSISTENCE);
        const { default: ProductMemory } = await import("./memory/services/products.js")
        const { default: CartsMemory } = await import("./memory/services/carts.js")
        const { default: SessionsMemory } = await import("./mongo/services/sessions.js")

        Products = ProductMemory
        Carts = CartsMemory
        Sessions = SessionsMemory
        break;
}