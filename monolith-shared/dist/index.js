"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize_1 = __importDefault(require("pluralize"));
function getPlural(str) {
    return pluralize_1.default.plural(str);
}
exports.getPlural = getPlural;
