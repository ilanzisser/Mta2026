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
exports.Gender = void 0;
exports.load_users = load_users;
exports.save_users = save_users;
exports.get_next_id = get_next_id;
exports.add_user = add_user;
exports.test_users = test_users;
const fs = require('node:fs/promises');
var Gender;
(function (Gender) {
    Gender[Gender["Unknown"] = 0] = "Unknown";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (exports.Gender = Gender = {}));
const FILE_PATH = "c:\\temp\\users.json"; // Modify to your system
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
function save_users(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const all_users = Array.from(users.values());
        yield fs.writeFile(FILE_PATH, JSON.stringify(all_users));
    });
}
function get_next_id(users) {
    if (!users || users.size == 0)
        return 1;
    const arr = Array.from(users.keys());
    return 1 + Math.max(...arr);
}
function add_user(name, birth_year, gender, users) {
    const id = get_next_id(users);
    const new_user = {
        id: id,
        name: name,
        birth_year: birth_year,
        gender: gender
    };
    users.set(id, new_user);
    return id;
}
function test_users() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield load_users();
        add_user('סתם אחד', 1999, Gender.Male, users);
        add_user('סתם אחת', 2002, Gender.Female, users);
        yield save_users(users);
    });
}
//# sourceMappingURL=user-db.js.map