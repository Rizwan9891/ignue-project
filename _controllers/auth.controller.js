import { ObjectId } from 'mongodb';
import user from '../_models/user.model.js'
import todo from '../_models/todo.model.js'

export const signup = (req, res) => {
    const { name, email, password, phone } = req.body;
    if (name) {
        if (email) {
            if (password) {
                if (phone) {
                    user.findOne({ email: email }).then((userFound) => {
                        if (userFound) {
                            res.status(409).json({ error: true, message: "Email already exist." });
                        } else {
                            user.findOne({ phone: phone }).then((userFound) => {
                                if (userFound) {
                                    res.status(409).json({ error: true, message: "Phone already exist." });
                                } else {
                                    let newUser = new user({ name, email, phone, password });
                                    newUser.save().then((created) => {
                                        if (created) {
                                            res.status(201).json({ error: false, message: "Account created successfully.", created: created })
                                        } else {
                                            res.status(500).json({ error: true, message: "User not created." })
                                        }
                                    }).catch((error) => {
                                        res.status(500).json({ error: true, message: "User not created." })
                                    });
                                }
                            }).catch((error) => {
                                res.status(400).json({ error: true, message: "Invalid email address." });
                            });
                        }
                    }).catch((error) => {
                        res.status(400).json({ error: true, message: "Invalid email address." });
                    });
                } else {
                    res.status(400).json({ error: true, message: "Phone no is Required." })
                }
            } else {
                res.status(400).json({ error: true, message: "Password is Required." })
            }
        } else {
            res.status(400).json({ error: true, message: "Email is Required." })
        }
    } else {
        res.status(400).json({ error: true, message: "Name is Required." })
    }
}
export const login = (req, res) => {
    const { email, password } = req.body;
    if (email) {
        if (password) {
            user.findOne({ email }).then((userFound) => {
                if (userFound) {
                    if (password == userFound.password) {
                        res.status(200).json({ error: false, message: "Login Successfully", user: userFound })
                    } else {
                        res.status(404).json({ error: true, message: "Password not matched." });
                    }
                } else {
                    res.status(404).json({ error: true, message: "Email not exist." });
                }
            }).catch((error) => {
                res.status(400).json({ error: true, message: "Invalid email address." });
            });
        } else {
            res.status(400).json({ error: true, message: "Password is Required." })
        }
    } else {
        res.status(400).json({ error: true, message: "Email is Required." })
    }
}
export const getById = (req, res) => {
    user.findOne({ _id: new ObjectId(req.params.userId) }, { password: 0 }).then((userFound) => {
        if (userFound) {
            res.status(200).json({ error: false, message: "Found successfully.", user: userFound });
        } else {
            res.status(401).json({ error: true, message: "Account Not found." });
        }
    }).catch((error) => {
        res.status(401).json({ error: true, message: "Account Not found." });
    });
}
export const addTodo = (req, res) => {
    let newTodo = new todo({
        userId: new ObjectId(req.body.userId),
        todo: req.body.todo
    })
    newTodo.save().then((created) => {
        if (created) {
            res.status(201).json({ error: false, message: "Todo Added Successfully.", created: created })
        } else {
            res.status(500).json({ error: true, message: "User not added." })
        }
    }).catch((error) => {
        res.status(500).json({ error: true, message: "User not added." })
    });
}
export const getTodoById = (req, res) => {
    todo.findOne({ userId: new ObjectId(req.params.userId) }).then((todoFound) => {
        if (todoFound) {
            res.status(200).json({ error: false, message: "Found successfully.", todo: todoFound });
        } else {
            res.status(401).json({ error: true, message: "Todo Not found." });
        }
    }).catch((error) => {
        res.status(401).json({ error: true, message: "Todo Not found." });
    });
}