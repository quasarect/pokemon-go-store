"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const Admins_1 = require("../types/Admins");
const IError_1 = require("../types/IError");
const checkAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Object.values(Admins_1.Admins).includes(email)) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new IError_1.IError('Unknown Error in Admin Check', 500);
    }
});
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=adminCheck.js.map