"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
const categories = (0, mongoose_1.model)("categories", categorySchema);
exports.default = categories;
