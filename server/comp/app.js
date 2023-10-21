"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 5000;
const mongoDBurl = process.env.MONGODB_URL || '';
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('short'));
app.use(express_1.default.json());
app.use('/media', express_1.default.static('media'));
app.use('/test', (req, res) => {
    console.log('Received Request');
    res.status(200).json({ message: 'Receivec response' });
});
app.use('/', router_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    mongoose_1.default
        .connect(mongoDBurl)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
        console.log(error);
        console.log("Could'nt connect to mongoDB");
    });
});
//# sourceMappingURL=app.js.map