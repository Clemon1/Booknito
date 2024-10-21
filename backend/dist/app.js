"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConnect_1 = require("./db/dbConnect");
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const bookingRoutes_1 = __importDefault(require("./router/bookingRoutes"));
const roomsRouter_1 = __importDefault(require("./router/roomsRouter"));
const analysisRoute_1 = __importDefault(require("./router/analysisRoute"));
dotenv.config();
const app = (0, express_1.default)();
(0, dbConnect_1.dbConnect)(`${process.env.DB_URL}`);
//Middlewares
// app.use(express.static("src/uploads"));
app.use("/src/uploads", express_1.default.static("src/uploads"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false,
}));
// Routes
app.get("/", (req, res) => {
    res.send("Hello Ts world");
});
app.use("/auth", authRouter_1.default);
app.use("/v1/rooms", roomsRouter_1.default);
app.use("/v1/booking", bookingRoutes_1.default);
app.use("/v1/analysis", analysisRoute_1.default);
app.listen(4000, () => console.log("Booknito App listening on port 4000"));
