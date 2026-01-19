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
const express_1 = __importDefault(require("express"));
const user_db_1 = require("./user-db");
const app = (0, express_1.default)();
const port = 3000;
// Middleware for Express
const set_content_type = function (req, res, next) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
};
app.use(set_content_type);
app.use(express_1.default.json()); // to support JSON-encoded bodies
app.use(express_1.default.urlencoded(// to support URL-encoded bodies
{
    extended: true
}));
const FILE_PATH = "c:\\temp\\users.json"; // Modify to your system
let users_map = null;
function init(file_path) {
    return __awaiter(this, void 0, void 0, function* () {
        const ret = yield (0, user_db_1.load_users)(file_path);
        return ret;
    });
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});
function get_user(req, res) {
    const id = req.params.id;
    const ret = (0, user_db_1.get_user_by_id)(Number(id), users_map);
    // Ignore errors for now
    res.send(JSON.stringify(ret));
}
app.get('/user/:id', get_user);
function delete_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const ret = (0, user_db_1.delete_user_by_id)(Number(id), users_map);
        yield (0, user_db_1.save_users)(FILE_PATH, users_map);
        res.send(JSON.stringify(ret));
    });
}
app.delete('/user/:id', delete_user);
function post_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const new_user = req.body;
        const id = (0, user_db_1.get_next_id)(users_map);
        // REALLY need to check the values here
        const user_to_add = { id: id, name: new_user.name,
            birth_year: new_user.birth_year, gender: new_user.gender };
        users_map.set(id, user_to_add);
        yield (0, user_db_1.save_users)(FILE_PATH, users_map);
        res.send(JSON.stringify(user_to_add));
    });
}
app.post('/user/', post_user);
function put_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const id = Number(req.params.id);
        const ret = (0, user_db_1.get_user_by_id)(Number(id), users_map);
        if (!ret) {
            res.status(404);
            res.send('No such user');
            return;
        }
        const user_to_change = { id: id, name: user.name, birth_year: user.birth_year, gender: user.gender };
        users_map.set(id, user_to_change);
        yield (0, user_db_1.save_users)(FILE_PATH, users_map);
        res.send(JSON.stringify(user_to_change));
    });
}
app.put('/user/:id', put_user);
function get_users(req, res) {
    const all_users = Array.from(users_map.values());
    res.send(JSON.stringify(all_users));
}
app.get('/users/', get_users);
init(FILE_PATH).then((result) => {
    users_map = result;
    app.listen(port, () => { return console.log(`Express is listening at http://localhost:${port}`); });
}, () => console.log('Failed to init system'));
//# sourceMappingURL=index.js.map