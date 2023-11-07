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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const asset_1 = __importDefault(require("../models/asset"));
const asset_2 = require("../types/models/asset");
mongoose_1.default
    .connect('mongodb+srv://cshewale23:chinmay123@cluster0.ulcm6vq.mongodb.net/pokemon')
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    const Data = fs_1.default.readFileSync('/home/chinmay/Desktop/Forks/pokemon-go-store/server/utils/DummyData.json', 'utf-8');
    const jsonData = JSON.parse(Data);
    const accounts = jsonData.accounts;
    const accountsPrivate = jsonData.accounts_private;
    const accountDisplay = jsonData.accounts_display;
    const pgSharps = jsonData.pg_sharps;
    for (let i = 0; i < 8; i++) {
        const min = 50;
        const max = 100;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        const account = new asset_1.default({
            assetType: asset_2.AssetTypes.pogo_account,
            price: randomNum,
            info: accounts[i],
            private: accountsPrivate[i],
            display: accountDisplay[i],
        });
        const pg_sharp = new asset_1.default({
            assetType: asset_2.AssetTypes.pg_sharp,
            info: pgSharps[i],
            private: accountsPrivate[i],
            price: randomNum,
        });
        yield pg_sharp.save();
        console.log(`pgsharp ${i + 1} saved`);
        yield account.save();
        console.log(`account ${i + 1} saved`);
    }
    process.exit(0);
}))
    .catch((err) => console.log(err));
//# sourceMappingURL=dummyData.js.map