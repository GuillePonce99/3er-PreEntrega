import UserModel from "../models/users.model.js"
import { createHash, generateToken, isValidPassword } from "../../../utils.js"
import Config from "../../../config/config.js"

export default class Sessions {
    constructor() { }
    login = async (email, password, res) => {

        try {
            if (email === Config.ADMIN_EMAIL && password === Config.ADMIN_PASSWORD) {
                const token = generateToken({
                    email,
                    role: "admin",
                    admin: true
                })

                res.cookie("coderCookieToken", token, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true
                }).sendSuccess()
            } else {

                const user = await UserModel.findOne({ email })
                if (user === null) {
                    return res.sendUserError({ message: "Email incorrecto!" })
                } else if (!isValidPassword(password, user)) {
                    return res.sendUserError({ message: "Contraseña incorrecta!" })
                }

                const token = generateToken({
                    email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    role: "user",
                    admin: false
                })

                res.cookie("coderCookieToken", token, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true
                }).sendSuccess()
            }

        } catch (error) {
            res.sendServerError(error)
        }

    }

    loginGitHub = async (user, res) => {

        try {
            let token = generateToken({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                role: "user"
            })

            res.cookie("coderCookieToken", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).redirect("/products")

        } catch (error) {
            res.sendServerError(error)
        }

    }

    signup = async (user, res) => {

        try {
            const repetedEmail = await UserModel.findOne({ email: user.email })

            if (repetedEmail) {
                return res.sendUserError({ message: "El email ingresado ya existe!" })
            }

            if (user.age <= 0 || user.age >= 100) {
                return res.sendUserError({ message: "Ingrese una edad correcta!" })
            }

            user.password = createHash(user.password)
            user = { ...user, role: "user" }

            const result = await UserModel.create(user)

            res.sendSuccess({ result })
        } catch (error) {
            res.sendServerError(error)
        }
    }

    forgot = async (email, newPassword, res) => {

        try {
            const user = await UserModel.findOne({ email })

            if (!user) {
                return res.sendUserError({ message: "Email incorrecto!" })
            }

            user.password = createHash(newPassword)

            await user.save()


            return res.sendSuccess({ message: "Se ha cambiado la contraseña" })


        }
        catch (error) {
            res.sendServerError(error)
        }
    }

    logout = async (res) => {

        return res.sendSuccess()

    }

    current = async (user, res) => {
        return res.sendSuccess(user)
    }
}
