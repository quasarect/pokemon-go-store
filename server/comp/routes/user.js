"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.get('/details', auth_1.isAuth, user_1.getUserDetails);
exports.default = userRouter;
//# sourceMappingURL=user.js.map