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
    constructor(name) {
        this.name = name;
    }
    details() {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.apiResponseJson();
            if (r === null) {
                return null;
            }
            const details = {
                name: r.name,
                description: r.meta.description,
                url: r.url,
                htmlUrl: r.html_url,
                docsHtmlUrl: r.docs_html_url,
                latestVersion: r.releases[0].version
            };
            return details;
        });
    }
    apiResponseJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `https://hex.pm/api/packages/${this.name}`;
            const response = yield axios_1.default.get(apiUrl, {
                headers: { "User-Agent": "VS Code Hex Package Lens extension" },
                responseType: "json"
            });
            if (response.status !== 200) {
                return null;
            }
            return response.data;
        });
    }
}
exports.HexPackage = HexPackage;
// EXAMPLE WITH PLUG
//
// "{
//   "name": "plug",
//   "url": "https://hex.pm/api/packages/plug",
//   "html_url": "https://hex.pm/packages/plug",
//   "docs_html_url": "https://hexdocs.pm/plug",
//   "meta": {
//     "links": {"GitHub": "https://github.com/elixir-lang/plug"},
//     "licenses": ["Apache 2"],
//     "description": "A specification and conveniences for composable modules in between web applications"
//   },
//   "downloads": {
//     "all": 43,
//     "week": 14,
//     "day": 2
//   },
//   "releases": [{
//     "version": "0.4.1",
//     "url": "https://hex.pm/api/packages/plug/releases/0.4.1",
//   }],
//   "inserted_at": "2015-03-24T20:31:35Z",
//   "updated_at": "2015-04-02T04:55:41Z"
// }"
//# sourceMappingURL=hexPackage.js.map