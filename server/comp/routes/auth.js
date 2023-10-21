"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_1.login);
authRouter.post('/signup', auth_1.signup);
authRouter.post('/google', auth_1.googleLogin);
authRouter.post('/facebook', auth_1.facebookLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map