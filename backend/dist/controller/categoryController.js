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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.findSingleCategory = exports.findCategory = void 0;
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
//View all categories
const findCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const viewCategories = yield categoryModel_1.default.find();
        res.status(200).json(viewCategories);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.findCategory = findCategory;
//View single category
const findSingleCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.findSingleCategory = findSingleCategory;
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.createCategory = createCategory;
// Update a category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.updateCategory = updateCategory;
// Delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.deleteCategory = deleteCategory;
