"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CounterSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true }, // e.g. "productId"
    seq: { type: Number, default: 0 }, // last value handed out
});
exports.default = mongoose_1.default.model("Counter", CounterSchema);
//# sourceMappingURL=counter.model.js.map