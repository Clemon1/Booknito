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
exports.isUser = exports.isStaff = exports.isAdmin = exports.verifyToken = exports.generateToken = void 0;
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error("JWT_SECRET not defined in environment variables");
}
// Generate JWT Tokens
const generateToken = ({ user, role }) => {
    const token = jsonwebtoken_1.default.sign({ user, role }, secretKey, { expiresIn: "30d" });
    return token;
};
exports.generateToken = generateToken;
// Verify JWT Tokens
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json("Unauthorized");
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json("Unauthorized");
        }
        req.user = decoded.user;
        req.role = decoded.role;
        next();
    });
};
exports.verifyToken = verifyToken;
// Checking if its an admin making the request
const isAdmin = (req, res, next) => {
    if (req.role != "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view the data" });
    }
    next();
};
exports.isAdmin = isAdmin;
// Checks if its a User making the request
const isStaff = (req, res, next) => {
    if (req.role !== "Staff") {
        return res.status(401).json({ message: "Not authorized" });
    }
    next();
};
exports.isStaff = isStaff;
// Checks if its a User making the request
const isUser = (req, res, next) => {
    if (req.role !== "user") {
        return res.status(401).json({ message: "Not authorized" });
    }
    next();
};
exports.isUser = isUser;
