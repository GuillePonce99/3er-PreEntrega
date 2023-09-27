export default class SessionDTO {
    constructor(user) {
        this.firstName = user.firstName,
            this.lastName = user.lastName,
            this.age = user.age,
            this.email = user.email,
            this.password = user.password

    }
}
