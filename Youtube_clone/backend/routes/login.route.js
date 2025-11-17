import { loginUser } from "../controller/login.controller.js"

export const loginRoute = (app) => {
    app.post('/login', loginUser)
}