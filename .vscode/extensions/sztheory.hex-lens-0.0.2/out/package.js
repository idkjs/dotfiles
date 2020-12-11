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
const axios_1 = require("axios");
class HexPackage {
    constructor(name, requirements) {
        this.name = name;
        this.requirements = requirements;
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://private-anon-0e4ab44d56-hexpm.apiary-mock.com/packages/${this.name}`;
            // const url = `https://rubygems.org/api/v1/gems/${this.name}.json`;
            const res = yield axios_1.default.get(url);
            if (res.status === 200) {
                return res.data;
            }
            return undefined;
        });
    }
}
exports.HexPackage = HexPackage;
//# sourceMappingURL=package.js.map