import { signup, login, getById, addTodo, getTodoById } from '../_controllers/auth.controller.js';

export default (app) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'application/json; charset=utf-8');
        next();
    });
    app.post('/api/auth/user/signup', signup);
    app.post('/api/auth/user/login', login);
    app.get('/api/auth/user/getById/:userId', getById);
    app.post('/api/todo/add', addTodo);
    app.get('/api/todo/get/by/userId/:userId', getTodoById);
}