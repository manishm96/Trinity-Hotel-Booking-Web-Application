module.exports = app => {
    const user = require("../controllers/userController");

    app.post("/users", user.create);

    app.get("/users", user.findAll)

    app.post("/users/login", user.logins)

    app.get('/users/:id', user.findOne)

}
