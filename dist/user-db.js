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
exports.test_users = exports.delete_user_by_id = exports.get_user_by_id = exports.add_user = exports.get_next_id = exports.save_users = exports.load_users = exports.Gender = void 0;
const fs_1 = __importDefault(require("fs"));
const fs = fs_1.default.promises;
var Gender;
(function (Gender) {
    Gender[Gender["Unknown"] = 0] = "Unknown";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (exports.Gender = Gender = {}));
function load_users(file_path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile(file_path, { encoding: 'utf8' });
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
function save_users(file_path, users) {
    return __awaiter(this, void 0, void 0, function* () {
        const all_users = Array.from(users.values());
        yield fs.writeFile(file_path, JSON.stringify(all_users));
    });
}
exports.save_users = save_users;
function get_next_id(users) {
    if (!users || users.size == 0)
        return 1;
    const arr = Array.from(users.keys());
    return 1 + Math.max(...arr);
}
exports.get_next_id = get_next_id;
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
exports.add_user = add_user;
function get_user_by_id(id, users) {
    if (users.has(id))
        return users.get(id);
    return null;
}
exports.get_user_by_id = get_user_by_id;
function delete_user_by_id(id, users) {
    return users.delete(id);
}
exports.delete_user_by_id = delete_user_by_id;
const FILE_PATH = "c:\\temp\\users.json"; // Modify to your system
function test_users() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield load_users(FILE_PATH);
        add_user('סתם אחד', 1999, Gender.Male, users);
        add_user('סתם אחת', 2002, Gender.Female, users);
        yield save_users(FILE_PATH, users);
    });
}
exports.test_users = test_users;
//# sourceMappingURL=user-db.js.map