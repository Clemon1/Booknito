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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffLogin = exports.StaffRegister = exports.adminLogin = exports.adminRegister = exports.getSingleUser = exports.getAllUsers = void 0;
const usersModel_1 = __importDefault(require("../model/usersModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_1 = require("../middleware/JWT");
// Get all user
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.query;
        let findAllUser;
        role === ""
            ? (findAllUser = yield usersModel_1.default
                .find({ isDeleted: false })
                .sort({ createdAt: -1 })
                .select("-password -bookmark")
                .exec())
            : (findAllUser = yield usersModel_1.default
                .find({ role, isDeleted: false })
                .sort({ createdAt: -1 })
                .select("-password -bookmark")
                .exec());
        res.status(200).json(findAllUser);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getAllUsers = getAllUsers;
//Get a single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleUser = yield usersModel_1.default
            .findById(id, { isDeleted: false })
            .sort({ createdAt: -1 })
            .select("-password -bookmark")
            .exec();
        res.status(200).json(singleUser);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getSingleUser = getSingleUser;
// Admin Registration
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.fullname) {
            return res.status(400).json("Fullname cannot be empty");
        }
        if (!req.body.email) {
            return res.status(400).json("Email cannot be empty");
        }
        if (!req.body.password) {
            return res.status(400).json("Password cannot be empty");
        }
        // checking for existing admin
        const existingAdmin = yield usersModel_1.default.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(401).json("User already exist");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new usersModel_1.default({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashPassword,
        });
        const newAdmin = yield newUser.save();
        console.log(newUser);
        const token = (0, JWT_1.generateToken)({ user: newAdmin.id, role: newAdmin.role });
        const _a = newAdmin.toObject(), { password } = _a, details = __rest(_a, ["password"]);
        res.status(200).json({ details, token });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
});
exports.adminRegister = adminRegister;
// Admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json("Email or Password must not be empty");
        }
        const checkUser = yield usersModel_1.default.findOne({ email: req.body.email }); // checking for existing user
        if (!checkUser) {
            return res
                .status(401)
                .json("This user does not have an account, please register");
        }
        if (checkUser.role !== "Super-Admin") {
            // Checking if its an admin trying to login
            return res.status(401).json("You are not authorized to login here");
        }
        const checkPassword = yield bcrypt_1.default.compare(req.body.password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).json("Invalid Password");
        }
        const _b = checkUser.toObject(), { password } = _b, details = __rest(_b, ["password"]);
        const token = (0, JWT_1.generateToken)({ user: checkUser.id, role: checkUser.role });
        res.status(200).json({ details, token });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.adminLogin = adminLogin;
// Staff Registration
const StaffRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { fullname, email, role } = req.body;
        // checking if the user is already registered
        const existingAdmin = yield usersModel_1.default.findOne({ email });
        if (existingAdmin)
            return res.status(401).json("User already exist");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        const photo = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
        const user = new usersModel_1.default({
            fullname,
            email,
            avartar: photo,
            hashPassword,
            role,
        });
        const newUser = yield user.save();
        // const token = generateToken({ user: newUser.id, role: newUser.role });
        const _d = newUser.toObject(), { password } = _d, other = __rest(_d, ["password"]);
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.StaffRegister = StaffRegister;
//staff Login controller
const staffLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json("Email or Password must not be empty");
        }
        // checking for existing user
        const checkUser = yield usersModel_1.default.findOne({ email: req.body.email });
        if (!checkUser) {
            return res
                .status(401)
                .json("This user does not have an account, please register");
        }
        if (checkUser.role !== "admin" || "guest") {
            // Checking if its an admin trying to login
            return res.status(401).json("You are not authorized to login here");
        }
        const checkPassword = yield bcrypt_1.default.compare(req.body.password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).json("Invalid Password");
        }
        const { password } = checkUser, info = __rest(checkUser, ["password"]);
        const token = (0, JWT_1.generateToken)({
            user: checkUser.id,
            role: checkUser.role,
        });
        res.status(200).json({ info, token });
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.staffLogin = staffLogin;
