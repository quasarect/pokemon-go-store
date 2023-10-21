"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const favourites_1 = require("../controllers/favourites");
const favouriteRouter = (0, express_1.Router)();
favouriteRouter.get('/', auth_1.isAuth, favourites_1.getFavourites);
favouriteRouter.post('/add', auth_1.isAuth, favourites_1.addToFavourite);
favouriteRouter.post('/remove', auth_1.isAuth, favourites_1.removeFromFavourite);
exports.default = favouriteRouter;
//# sourceMappingURL=favourite.js.map