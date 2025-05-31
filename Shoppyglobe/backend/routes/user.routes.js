import { registerUser, loginUser } from '../controller/user.controller.js'

const userRoutes = (app) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
}

export default userRoutes;