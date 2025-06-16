import { registerUsers } from "../controller/register.controller.js"

export const registerRoute = (app) => {
    app.post('/register', registerUsers)
}