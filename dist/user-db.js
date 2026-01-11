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
exports.save_users = exports.load_users = exports.Gender = void 0;
const fs = require('node:fs/promises');
var Gender;
(function (Gender) {
    Gender[Gender["Unknown"] = 0] = "Unknown";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (exports.Gender = Gender = {}));
const FILE_PATH = "users.json";
function load_users() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile(FILE_PATH, { encoding: 'utf8' });
            const users_json = JSON.parse(data);
            const ret = new Map();
            users_json.forEach(element => {
                ret.set(element.id, element);
            });
            return ret;
        }
        catch (err) {
            console.error(err);
            return new Map();
        }
    });
}
exports.load_users = load_users;
function save_users(users) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFile(FILE_PATH, JSON.stringify(users));
    });
}
exports.save_users = save_users;
//# sourceMappingURL=user-db.js.map