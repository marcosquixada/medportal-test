const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const groupController = require("../controllers/group.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/groups",
        [authJwt.verifyToken],
        groupController.listAll
    );

    app.post(
        "/api/groups",
        [authJwt.verifyToken],
        groupController.postGroups
    );

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
};